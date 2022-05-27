import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Button, IconButton, NativeSelect, Stack, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import api from "../../api";

import { styled } from '@mui/material/styles';

import "./UpdateDataUser.css";

import emptyAvatar from '../../images/empty-avatar.png';
import resetUserSession from "../../utils/resetUserSession";
import { padding } from "@mui/system";

const Input = styled('input')({
    display: 'none',
});

function UpdateDataUser() {

    document.title = 'Atualizando...';

    const participante = JSON.parse(sessionStorage.getItem('participante'));
    const navigate = useNavigate();

    useEffect(()=> {


    }, []); 

    const [imagem, setImagem] = useState("");
    const [nome, setNome] = useState("");
    const [rg, setRg] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmado, setEmailConfirmado] = useState("");

    const [cnpj, setCnpj] = useState("");
    const [descricao, setDescricao] = useState("");
  
    const [senha, setSenha] = useState("");
    const [senhaConfirmada, setSenhaConfirmada] = useState("");
  
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [complemento, setComplemento] = useState("");
  
    const [estado, setEstado] = useState("");

    const isDonor = participante && participante.user.userType === "USER_DONOR";
  
    async function updateData() {

        if (isDonor) {
            try {
                await api.put(`/donors/${participante.donor.id}`, {
                  img: imagem,
                  name: nome,
                  email,
                  password: senha,
                  addressDTO: {
                    state: estado,
                    city: cidade,
                    district: bairro,
                    cep,
                    street: rua,
                    number: numero,
                    complement: complemento
                  },
                  rg,
                  cpf,
                });

                await resetUserSession(participante.user.id);
          
                navigate('/home');
              }
              catch (err) {
                alert('Erro: ' + err.response.status);
              }
        } else {
            try {
                await api.put(`/ngos/${participante.ngo.id}`, {
                  img: imagem,
                  name: nome,
                  email,
                  password: senha,
                  addressDTO: {
                    state: estado,
                    city: cidade,
                    district: bairro,
                    cep,
                    street: rua,
                    number: numero,
                    complement: complemento
                  },
                  cnpj,
                  descricao
                });

                await resetUserSession(participante.user.id);
          
                navigate('/dashboard');
            }
            catch (err) {
            alert('Erro: ' + err.response.status);
            }
        }

    }
  
    const textStyle = {
        width: '280px',
        marginBottom: '10px'
    }
  
    const ufs = [
        'AC','AL','AP','AM','BA','CE','ES','GO','MA','MT','MS','MG',
        'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC'
    ];

    return (
        <>
            <Navbar ong={!isDonor}/>

            <br />

            <div className="container">
                <div className="content-update">

                <form>
                    <div className="upload-avatar">

                        <Stack className="input-upload-avatar" direction="column" alignItems="center" spacing={1} sx={{ position:"relative", left: "-1.2vw", top: "42vh"}}>
                            <label htmlFor="contained-button-file">
                                <img src={emptyAvatar} alt="empty-avatar"/>
                            </label>
                            <label htmlFor="icon-button-file" className="buttons">
                                <Input accept="image/*" id="icon-button-file" type="file" />
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
                            label="Nome completo"
                            variant="filled"
                            defaultValue={participante ? participante.user.name : ''}
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
                                    label="Registro Geral"
                                    variant="filled"
                                    defaultValue={participante ? participante.donor.rg : ''}
                                    select={false}
                                    size="small"
                                    onChange={(e) => setRg(e.target.value)}
                                    sx={textStyle}
                                />,
                                <TextField
                                    label="CPF"
                                    defaultValue={participante ? participante.donor.cpf : ''}
                                    variant="filled"
                                    size="small"
                                    onChange={(e) => setCpf(e.target.value)}
                                    sx={textStyle}
                                />
                             ]
                            :[
                                <TextField
                                    label="CNPJ"
                                    variant="filled"
                                    defaultValue={participante ? participante.ngo.cnpj : ''}
                                    select={false}
                                    size="small"
                                    onChange={(e) => setCnpj(e.target.value)}
                                    sx={textStyle}
                                />,
                                <TextField
                                    label="Descrição"
                                    variant="filled"
                                    defaultValue={participante ? participante.ngo.description : ''}
                                    default
                                    size="small"
                                    onChange={(e) => setDescricao(e.target.value)}
                                    sx={textStyle}
                                />
                            ]

                        }
                        <TextField
                            label="E-mail"
                            type="email"
                            variant="filled"
                            defaultValue={participante ? participante.user.email : ''}
                            size="small"
                            select={false}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={textStyle}
                        />
                        <TextField
                            label="Confirme o e-mail"
                            type="email"
                            variant="filled"
                            size="small"
                            onChange={(e) => setEmailConfirmado(e.target.value)}
                            sx={textStyle}
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            variant="filled"
                            size="small"
                            onChange={(e) => setSenha(e.target.value)}
                            sx={textStyle}
                        />
                        <TextField
                            label="Confirme a senha"
                            type="password"
                            variant="filled"
                            size="small"
                            onChange={(e) => setSenhaConfirmada(e.target.value)}
                            sx={textStyle}
                        />

                        </div>

                        <div style={{ marginLeft: "150px"}}>
                        <p><b>Endereço</b></p>
                        <TextField
                            label="CEP"
                            variant="filled"
                            defaultValue={participante ? participante.user.address.cep : ''}
                            size="small"
                            onChange={(e) => setCep(e.target.value)}
                            sx={textStyle}
                        />

                        <TextField
                            label="Rua"
                            variant="filled"
                            defaultValue={participante ? participante.user.address.street : ''}
                            size="small"
                            onChange={(e) => setRua(e.target.value)}
                            sx={textStyle}
                        />

                        <TextField
                            label="Número"
                            variant="filled"
                            defaultValue={participante ? participante.user.address.number : ''}
                            size="small"
                            onChange={(e) => setNumero(e.target.value)}
                            sx={textStyle}
                        />

                        <TextField
                            label="Cidade"
                            variant="filled"
                            defaultValue={participante ? participante.user.address.city : ''}
                            size="small"
                            onChange={(e) => setCidade(e.target.value)}
                            sx={textStyle}
                        />
                        <TextField
                            label="Bairro"
                            variant="filled"
                            defaultValue={participante ? participante.user.address.district : ''}
                            size="small"
                            onChange={(e) => setBairro(e.target.value)}
                            sx={textStyle}
                        />
                        <TextField
                            label="Complemento"
                            variant="filled"
                            defaultValue={participante ? participante.user.address.complement : ''}
                            size="small"
                            onChange={(e) => setComplemento(e.target.value)}
                            sx={textStyle}
                        />

                        <NativeSelect defaultValue={<option value={participante ? participante.user.address.state : ''}>{participante ? participante.user.address.state : ''}</option>} 
                        onChange={(e) => setEstado(e.target.value)} className="select-uf">
                            <option disabled selected>Estado</option>
                            {
                            ufs.map(uf => {
                                return <option value={uf}>{uf}</option>
                            })
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
                            onClick={updateData}
                        >
                            <b>Salvar</b>
                        </Button>
                    </div>

                    </form>

                </div>
            </div>

        </>
    )
}

export default UpdateDataUser;