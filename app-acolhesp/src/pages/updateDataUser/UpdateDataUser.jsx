import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Alert, Button, IconButton, NativeSelect, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { get } from 'axios';

import api from "../../api";

import { styled } from '@mui/material/styles';

import "./UpdateDataUser.css";

import emptyAvatar from '../../images/empty-avatar.png';
import resetUserSession from "../../utils/resetUserSession";
import getImageBanco from "../../utils/getImageUser";

const Input = styled('input')({
    display: 'none',
});

function UpdateDataUser() {

    document.title = 'Atualizando...';

    const participante = JSON.parse(sessionStorage.getItem('participante'));
    const navigate = useNavigate();

    const [imagem, setImagem] = useState("");
    const [nome, setNome] = useState("");
    const [rg, setRg] = useState("");
    const [cpf, setCpf] = useState("");

    const [email, setEmail] = useState("");
    const [emailConfirmado, setEmailConfirmado] = useState("");
    const [emailValido, setEmailValido] = useState("");

    const [cnpj, setCnpj] = useState("");
    const [descricao, setDescricao] = useState("");

    const [senha, setSenha] = useState("");
    const [senhaConfirmada, setSenhaConfirmada] = useState("");
    const [senhaValida, setSenhaValida] = useState();
    const [viewSenha, setViewSenha] = useState();
    const [viewSenhaConfirm, setViewSenhaConfirm] = useState();

    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [complemento, setComplemento] = useState("");

    const [estado, setEstado] = useState("");

    const [focusedViaCep, setFocusedViacep] = useState(false);

    const [openFailedAlert, setOpenFailedAlert] = useState(false);

    async function setUserData(part) {

        setImagem(await getImageBanco(part.user.id));
        setNome(part.user.name);
        setEmail(part.user.email);
        setCep(part.user.address.cep);
        setRua(part.user.address.street);
        setNumero(part.user.address.number);
        setCidade(part.user.address.city);
        setBairro(part.user.address.district);
        setComplemento(part.user.address.complement);
        setEstado(part.user.address.state);

    }

    async function viaCepHandle(cep) {
        setCep(cep);
    
        if (cep.length === 8 || cep.length === 9) {
          const res = await get(`https://viacep.com.br/ws/${cep}/json/`);
          console.log(res.data);
    
          setRua(res.data.logradouro);
          setBairro(res.data.bairro);
          setEstado(res.data.uf);
          setCidade(res.data.localidade);
    
          document.getElementById('input-rua').value = res.data.logradouro;
          setFocusedViacep(true);
    
    
          
          document.getElementById('input-bairro').value = res.data.bairro;
          document.getElementById('input-cidade').value = res.data.localidade;
          document.getElementById('input-uf').value = res.data.uf;
        }
      }

    function initializeComponentes() {
        if (participante && participante.user.userType === "USER_DONOR") {

            setRg(participante ? participante.donor.rg : '');
            setCpf(participante ? participante.donor.cpf : '');
            setUserData(participante);

        } else {

            setCnpj(participante ? participante.ngo.cnpj : '');
            setDescricao(participante ? participante.ngo.description : '');
            setUserData(participante);

        }
    }

    useEffect(() => {
        initializeComponentes();
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenFailedAlert(false);
    };

    const isDonor = participante && participante.user.userType === "USER_DONOR";

    function setEmailTruth(e) {
        setEmail(e);
        setEmailValido(emailConfirmado === String(e));
    }

    function validEmail(e) {
        setEmailConfirmado(e);
        setEmailValido(email === String(e));
    }

    function setSenhaTruth(e) {
        setSenha(e);
        setSenhaValida(senhaConfirmada === String(e) && e.length > 7);
    }

    function validSenha(e) {
        setSenhaConfirmada(e);
        setSenhaValida(senha === String(e) && e.length > 7);
    }

    function setImageInput() {
        const inputImage = document.getElementById('icon-button-file');
        
        const file = inputImage.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagem(reader.result);
        };
        reader.readAsDataURL(file);

    }

    async function updateData() {

        if (!senhaValida || !emailValido) {

            setOpenFailedAlert(true);
            return;
        }

        if (isDonor) {
            try {

                const newDonor = {
                    rg: rg,
                    cpf: cpf,
                    user: {
                        id: participante.user.id,
                        name: nome,
                        email: email,
                        password: senha,
                        addressDTO: {
                            id: participante.user.address.id,
                            state: estado,
                            city: cidade,
                            district: bairro,
                            cep: cep,
                            street: rua,
                            number: numero,
                            complement: complemento
                        },
                        userType: "USER_DONOR",
                        connect: true
                    },
                    notifications: []
                };

                await api.put(`/donors/${participante.donor.id}`, newDonor);

                await api.patch(`/users/pic/${participante.user.id}`, {
                    img: imagem
                });

                await resetUserSession(participante.user.id);

                navigate('/home');
            }
            catch (err) {
                alert('Erro: ' + err.response.status);
            }
        } else {
            try {

                const newNgo = {
                    cnpj: cnpj,
                    description: descricao,
                    category: participante.ngo.category.id,
                    user: {
                        id: participante.user.id,
                        name: nome,
                        email: email,
                        password: senha,
                        addressDTO: {
                            id: participante.user.address.id,
                            state: estado,
                            city: cidade,
                            district: bairro,
                            cep: cep,
                            street: rua,
                            number: numero,
                            complement: complemento
                        },
                        userType: "USER_NGO",
                        connect: true
                    },
                    assessment: participante.donor.assessment
                };

                await api.put(`/ngos/${participante.ngo.id}`, newNgo);

                await api.patch(`/users/pic/${participante.user.id}`, 
                    JSON.stringify({
                        img: imagem
                    })
                );

                await resetUserSession(participante.user.id);

                navigate('/dashboard');
            }
            catch (err) {
                alert('Erro: ' + err.response.status);
            }
        }

    }

    const textStyle = {
        width: '300px',
        marginBottom: '15px',
    }

    const ufs = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
        'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP',
    ];

    return (
        <>
            <Navbar ong={!isDonor} />

            <br />

            <div className="container">
                <div className="content-update">

                    <form>
                        <div className="upload-avatar">

                            <Stack className="input-upload-avatar" direction="column" alignItems="center" spacing={1} sx={{ position: "relative", left: "-1.2vw", top: "42vh" }}>
                                <label htmlFor="contained-button-file" style={{ height: "120px", width: "120px", overflow: "hidden", borderRadius: "100%" }}>
                                    <img width="100%" height="100%" src={imagem && imagem !== '' ? imagem : emptyAvatar} alt="empty-avatar" />
                                </label>
                                <label htmlFor="icon-button-file" className="buttons">
                                    <Input accept="image/*" id="icon-button-file" onChange={() => setImageInput()} type="file" />
                                    <Button variant="contained" component="span">
                                        Upload
                                    </Button>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </Stack>
                        </div>

                        <div className="input-group">
                            <div>
                                <p><b>Dados pessoais</b></p>
                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> Nome Completo </Typography>
                                    }
                                    variant="filled"
                                    value={nome}
                                    select={false}
                                    size="small"
                                    autoComplete="no"
                                    onChange={(e) => setNome(e.target.value)}
                                    sx={textStyle}
                                />
                                {
                                    isDonor
                                        ? [
                                            <TextField
                                                label={
                                                    <Typography variant="headline" component="h3"> RG </Typography>
                                                }
                                                variant="filled"
                                                value={rg}
                                                select={false}
                                                size="small"
                                                onChange={(e) => setRg(e.target.value)}
                                                sx={textStyle}
                                            />,
                                            <TextField
                                                label={
                                                    <Typography variant="headline" component="h3"> CPF </Typography>
                                                }
                                                value={cpf}
                                                variant="filled"
                                                size="small"
                                                onChange={(e) => setCpf(e.target.value)}
                                                sx={textStyle}
                                            />
                                        ]
                                        : [
                                            <TextField
                                                label={
                                                    <Typography variant="headline" component="h3"> CNPJ </Typography>
                                                }
                                                variant="filled"
                                                value={cnpj}
                                                select={false}
                                                size="small"
                                                onChange={(e) => setCnpj(e.target.value)}
                                                sx={textStyle}
                                            />,
                                            <TextField
                                                label={
                                                    <Typography variant="headline" component="h3"> Descrição </Typography>
                                                }
                                                variant="filled"
                                                value={descricao}
                                                default
                                                size="small"
                                                onChange={(e) => setDescricao(e.target.value)}
                                                sx={textStyle}
                                            />
                                        ]

                                }
                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> E-Mail </Typography>
                                    }
                                    type="email"
                                    variant="filled"
                                    value={email}
                                    size="small"
                                    select={false}
                                    onChange={(e) => setEmailTruth(e.target.value)}
                                    sx={textStyle}
                                />
                                <TextField
                                    id="email_confirm"
                                    label={
                                        <Typography variant="headline" component="h3"> Confirme o E-Mail </Typography>
                                    }
                                    type="email"
                                    variant="filled"
                                    size="small"
                                    color={emailValido ? 'success' : 'warning'}
                                    onChange={(e) => validEmail(e.target.value)}
                                    focused
                                    sx={textStyle}
                                />
                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> Senha </Typography>
                                    }
                                    variant="filled"
                                    size="small"
                                    onChange={(e) => setSenhaTruth(e.target.value)}
                                    type={viewSenha ? 'text' : 'password'}
                                    onMouseEnter={() => setViewSenha(true)}
                                    onMouseLeave={() => setViewSenha(false)}
                                    sx={textStyle}
                                />
                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> Confirme a senha </Typography>
                                    }
                                    variant="filled"
                                    size="small"
                                    color={senhaValida ? 'success' : 'warning'}
                                    onChange={(e) => validSenha(e.target.value)}
                                    type={viewSenhaConfirm ? 'text' : 'password'}
                                    onMouseEnter={() => setViewSenhaConfirm(true)}
                                    onMouseLeave={() => setViewSenhaConfirm(false)}
                                    focused
                                    sx={textStyle}
                                />

                            </div>

                            <div style={{ marginLeft: "150px" }}>
                                <p><b>Endereço</b></p>
                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> CEP </Typography>
                                    }
                                    variant="filled"
                                    value={cep}
                                    size="small"
                                    onChange={(e) => viaCepHandle(e.target.value)}
                                    sx={textStyle}
                                />

                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> Rua </Typography>
                                    }
                                    variant="filled"
                                    value={rua}
                                    size="small"
                                    id="input-rua"
                                    focused={focusedViaCep}
                                    onChange={(e) => setRua(e.target.value)}
                                    sx={textStyle}
                                />

                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> Número </Typography>
                                    }
                                    variant="filled"
                                    value={numero}
                                    size="small"
                                    onChange={(e) => setNumero(e.target.value)}
                                    sx={textStyle}
                                />

                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> Cidade </Typography>
                                    }
                                    variant="filled"
                                    value={cidade}
                                    size="small"
                                    id="input-cidade"
                                    focused={focusedViaCep}
                                    onChange={(e) => setCidade(e.target.value)}
                                    sx={textStyle}
                                />
                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> Bairro </Typography>
                                    }
                                    variant="filled"
                                    value={bairro}
                                    size="small"
                                    id="input-bairro"
                                    focused={focusedViaCep}
                                    onChange={(e) => setBairro(e.target.value)}
                                    sx={textStyle}
                                />
                                <TextField
                                    label={
                                        <Typography variant="headline" component="h3"> Complemento </Typography>
                                    }
                                    variant="filled"
                                    value={complemento}
                                    size="small"
                                    onChange={(e) => setComplemento(e.target.value)}
                                    sx={textStyle}
                                />

                                <NativeSelect value={!!estado === true ? estado : null}
                                    onChange={(e) => setEstado(e.target.value)} className="select-uf">
                                    <option disabled selected>Estado</option>
                                    {
                                        ufs.map(uf => <option value={uf}>{uf}</option>)
                                    }
                                </NativeSelect>
                            </div>
                        </div>

                        <div className="btn-group">
                            <Button
                                variant="navbar"
                                onClick={() => isDonor ? navigate("/home") : navigate("/dashboard")}
                            >
                                <b>Cancelar</b>
                            </Button>

                            <Button
                                variant="contained"
                                onClick={() => updateData()}
                            >
                                <b>Salvar</b>
                            </Button>
                            <Snackbar open={openFailedAlert} autoHideDuration={5000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '50%', fontSize: '17px' }}>
                                    Falha ao atualizar, certifique-se que todos os dados estão preenchidos corretamente!
                                </Alert>
                            </Snackbar>
                        </div>

                    </form>

                </div>
            </div>

        </>
    )
}

export default UpdateDataUser;