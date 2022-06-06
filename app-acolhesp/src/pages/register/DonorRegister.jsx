import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import signupSVG from '../../images/sign-up.svg';
import logoSVG from '../../images/logo.svg';
import emptyAvatar from '../../images/empty-avatar.png';
import doadorIcon from '../../images/doador.png';
import ongIcon from '../../images/ong-icon.png';

import { styled } from '@mui/material/styles';
import { Alert, Button, ButtonGroup, Snackbar, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import NativeSelect from '@mui/material/NativeSelect';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { get } from 'axios';


import './DonorRegister.css';
import api from '../../api';

const Input = styled('input')({
  display: 'none',
});


function DonorRegister() {
  document.title = 'Cadastre-se';
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpenONG = () => {
    setOpen(true);
  };

  const handleCloseONG = () => {
    setOpen(false);
  };

  const [openFailedAlert, setOpenFailedAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenFailedAlert(false);
};

  const [imagem, setImagem] = useState("");
  const [nome, setNome] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmado, setEmailConfirmado] = useState("");
  const [emailValido, setEmailValido] = useState("");

  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");
  const [senhaValida, setSenhaValida] = useState();

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");

  const [focusedViacep ,setFocusedViacep] = useState(false);

  const [estado, setEstado] = useState("");

  const [cnpj, setCnpj] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

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

  function changeFormOng() {

    document.querySelector('.form-signup-donor').classList.add('hide');
    document.querySelector('.form-signup-ong').classList.remove('hide');

  }

  function changeFormDonor() {

    document.querySelector('.form-signup-ong').classList.add('hide');
    document.querySelector('.form-signup-donor').classList.remove('hide');

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


  async function ViacepHandle(cep) {
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

  async function registerDonor() {
    handleCloseONG();

    if (!senhaValida || !emailValido) {
      setOpenFailedAlert(true);
      return;
    }

    try {

      const newDonor = {
        rg: rg,
        cpf: cpf,
        user: {
          name: nome,
          email: email,
          password: senha,
          addressDTO: {
              state: estado,
              city: cidade,
              district: bairro,
              cep: cep,
              street: rua,
              number: numero,
              complement: complemento
          },
          userType: "USER_DONOR",
          connect: false
        },
        notifications: []
      };

      const res = await api.post('/donors', newDonor);

      await api.patch(`/users/pic/${res.data.user.id}`, {
          img: imagem
      });

      if (res.status === 201) alert("Cadastrado com sucesso!");

      navigate('/');
    }
    catch (err) {
      setOpenFailedAlert(true);
    }
  }

  async function registerOng() {

    if (!senhaValida || !emailValido) {
      setOpenFailedAlert(true);
      return;
    }

    try {

      const newNgo = {
        cnpj: cnpj,
        description: description,
        category: category,
        user: {
            name: nome,
            email: email,
            password: senha,
            addressDTO: {
                state: estado,
                city: cidade,
                district: bairro,
                cep: cep,
                street: rua,
                number: numero,
                complement: complemento
            },
            userType: "USER_NGO",
            connect: false
        },
        assessment: 0.0
      };

      const res = await api.post('/ngos', newNgo);

      if (res.status === 201) alert("Cadastrado com sucesso!");

      await api.patch(`/users/pic/${res.data.user.id}`, {
          img: imagem
      });

      navigate('/');
    }
    catch (err) {
      setOpenFailedAlert(true);
    }
  }


  const ufs = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
  ];

  const categories = [
    {id: 1, desc: 'Animais' },
    {id: 2, desc: 'Assistência social'},
    {id: 3, desc: 'Educação e Pesquisa'},
    {id: 4, desc: 'Saúde'},
    {id: 5, desc: 'Cultura'},
    {id: 6, desc: 'Defesa de direitos'},
    {id: 7, desc: 'Habitação'},
    {id: 8, desc: 'Meio ambiente'}
  ];

  const textStyle = {
    width: '220px',
    marginBottom: '10px',
  }

  return (
    <div className="container-fluid">

      <div className="c-signup-illustration">
        <img src={signupSVG} alt="sign-up" />
      </div>

      <div style={{ cursor: 'pointer' }} className="logo-footer" onClick={() => navigate('/')}>
        <img src={logoSVG} alt="logo" />
      </div>

      <div className="toggle-btn">
        <ButtonGroup variant="contained" className="mui-btn-group">
          <Button
            title="Cadastro de ONG"
            className="mui-btn btn-ong"
            onClick={() => changeFormOng()}>
            <img src={ongIcon} />
          </Button>

          <Button
            title="Cadastro de Doador"
            className="mui-btn btn-doador"
            onClick={() => changeFormDonor()}>
            <img src={doadorIcon} />
          </Button>
        </ButtonGroup>
      </div>

      <div className="form-signup-donor" id="form-donor">
        <h2>
          Cadastro de <b id="title-type-user">doador</b>
        </h2>

        <form>
          <div className="upload-avatar">
            <Stack className="input-upload-avatar" direction="column" alignItems="center" spacing={1} style={{ position: 'relative', left: '-25px', top: '5px'}}>
              <div className="container-image">
                <img src={imagem && imagem !== '' ? imagem : emptyAvatar} alt="empty-avatar" />
              </div>
              <label htmlFor="icon-button-file" className="buttons" style={{ position: 'relative', top: '-10px'}}>
                  <Input accept="image/*" id="icon-button-file" onChange={() => setImageInput()} type="file" />
                  <Button variant="contained" component="span" >
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
                variant="standard"
                size="small"
                onChange={(e) => setNome(e.target.value)}
                sx={textStyle}
              />
              <TextField
                label="Registro Geral"
                variant="standard"
                size="small"
                onChange={(e) => setRg(e.target.value)}
                inputProps={{
                  maxLength: 12,
                }}
                sx={textStyle}
              />
              <TextField
                label="CPF"
                variant="standard"
                size="small"
                onChange={(e) => setCpf(e.target.value)}
                inputProps={{
                  maxLength: 14,
                }}
                sx={textStyle}
              />
              <TextField
                label="E-mail"
                type="email"
                variant="standard"
                size="small"
                onChange={(e) => setEmailTruth(e.target.value)}
                sx={textStyle}
              />
              <TextField
                label="Confirme o e-mail"
                type="email"
                variant="standard"
                size="small"
                color={emailValido ? 'success' : 'warning'}
                onChange={(e) => validEmail(e.target.value)}
                focused
                sx={textStyle}
              />
              <TextField
                label="Senha"
                type="password"
                variant="standard"
                size="small"
                onChange={(e) => setSenhaTruth(e.target.value)}
                sx={textStyle}
              />
              <TextField
                label="Confirme a senha"
                type="password"
                variant="standard"
                size="small"
                color={senhaValida ? 'success' : 'warning'}
                onChange={(e) => validSenha(e.target.value)}
                focused
                sx={textStyle}
              />

            </div>

            <div>
              <p><b>Endereço</b></p>
              <TextField
                label="CEP"
                variant="standard"
                size="small"
                onChange={(e) => ViacepHandle(e.target.value)}
                sx={{marginBottom: '10px'}}
              />

              <TextField
                label="Rua"
                variant="standard"
                size="small"
                onChange={(e) => setRua(e.target.value)}
                id="input-rua"
                focused={focusedViacep}
                sx={{marginBottom: '10px'}}
              />

              <TextField
                label="Número"
                variant="standard"
                size="small"
                onChange={(e) => setNumero(e.target.value)}
                sx={{marginBottom: '10px'}}
              />

              <TextField
                label="Cidade"
                variant="standard"
                size="small"
                onChange={(e) => setCidade(e.target.value)}
                id="input-cidade"
                focused={focusedViacep}
                sx={{marginBottom: '10px'}}
              />
              <TextField
                label="Bairro"
                variant="standard"
                size="small"
                onChange={(e) => setBairro(e.target.value)}
                id="input-bairro"
                focused={focusedViacep}
                sx={{marginBottom: '10px'}}
              />
              <TextField
                label="Complemento"
                variant="standard"
                size="small"
                onChange={(e) => setComplemento(e.target.value)}
                sx={{marginBottom: '10px'}}
              />

              <NativeSelect
              onChange={(e) => setEstado(e.target.value)} 
              className="select-uf"
              id="input-uf" 
              sx={{marginBottom: '10px'}}>
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
              variant="contained"
              onClick={registerDonor}
            >
              <b>Enviar</b>
            </Button>
          </div>

        </form>
        <Snackbar open={openFailedAlert} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '50%', fontSize: '17px' }}>
              Falha ao cadastrar, certifique-se que todos os dados estão preenchidos corretamente!
          </Alert>
        </Snackbar>
      </div>



      <div className="form-signup-ong hide" id="form-ong">
        <h2>
          Cadastro de <b id="title-type-user">ONG</b>
        </h2>

        <form>
          <div className="upload-avatar">
            <Stack className="input-upload-avatar" direction="column" alignItems="center" spacing={1} style={{ position: 'relative', left: '-25px', top: '5px'}}>
              
              <div className="container-image">
                <img src={imagem && imagem !== '' ? imagem : emptyAvatar} alt="empty-avatar" />
              </div>
              
              <label htmlFor="icon-button-file" className="buttons" style={{ position: 'relative', top: '-10px'}}>
                  <Input accept="image/*" id="icon-button-file" onChange={() => setImageInput()} type="file" />
                  <Button variant="contained" component="span" >
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
              <p><b>Dados da ONG</b></p>
              <TextField
                label="Nome fantasia"
                variant="standard"
                size="small"
                onChange={(e) => setNome(e.target.value)}
                sx={textStyle}
              />
              <TextField
                label="CNPJ"
                variant="standard"
                size="small"
                onChange={(e) => setCnpj(e.target.value)}
                inputProps={{
                  maxLength: 18,
                }}
                sx={textStyle}
              />

              <NativeSelect onChange={(e) => setCategory(e.target.value)} className="select-category" sx={textStyle}>
                <option disabled selected>Categoria</option>
                {
                  categories.map(category => {
                    return <option value={category.id}>{category.desc}</option>
                  })
                }
              </NativeSelect>

              <TextField
                label="E-mail"
                type="email"
                variant="standard"
                size="small"
                onChange={(e) => setEmailTruth(e.target.value)}
                sx={textStyle}
              />
              <TextField
                label="Confirme o e-mail"
                type="email"
                variant="standard"
                size="small"
                color={emailValido ? 'success' : 'warning'}
                onChange={(e) => validEmail(e.target.value)}
                focused
                sx={textStyle}
              />
              <TextField
                label="Senha"
                type="password"
                variant="standard"
                size="small"
                onChange={(e) => setSenhaTruth(e.target.value)}
                sx={textStyle}
              />
              <TextField
                label="Confirme a senha"
                type="password"
                variant="standard"
                size="small"
                color={senhaValida ? 'success' : 'warning'}
                onChange={(e) => validSenha(e.target.value)}
                focused
                sx={textStyle}
              />

            </div>

            <div>
              <p><b>Endereço</b></p>
              <TextField
                label="CEP"
                variant="standard"
                size="small"
                onChange={(e) => ViacepHandle(e.target.value)}
                sx={{marginBottom: '10px'}}
              />

              <TextField
                label="Rua"
                variant="standard"
                size="small"
                id="input-rua"
                focused={focusedViacep}
                onChange={(e) => setRua(e.target.value)}
                sx={{marginBottom: '10px'}}
              />


              <TextField
                label="Número"
                variant="standard"
                size="small"
                onChange={(e) => setNumero(e.target.value)}
                sx={{marginBottom: '10px'}}
              />

              <TextField
                label="Cidade"
                variant="standard"
                size="small"
                id="input-cidade"
                focused={focusedViacep}
                onChange={(e) => setCidade(e.target.value)}
                sx={{marginBottom: '10px'}}
              />
              <TextField
                label="Bairro"
                variant="standard"
                size="small"
                id="input-bairro"
                focused={focusedViacep}
                onChange={(e) => setBairro(e.target.value)}
                sx={{marginBottom: '10px'}}
              />
              <TextField
                label="Complemento"
                variant="standard"
                size="small"
                onChange={(e) => setComplemento(e.target.value)}
                sx={{marginBottom: '10px'}}
              />

              <NativeSelect onChange={(e) => setEstado(e.target.value)} className="select-uf" sx={{marginBottom: '10px'}}>
                <option disabled selected>Estado</option>
                {
                  ufs.map(uf => {
                    return <option value={uf}>{uf}</option>
                  })
                }
              </NativeSelect>


              <div>
                <Dialog open={open} onClose={handleCloseONG}>
                  <DialogTitle>Biografia</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Adicione uma breve descrição à sua ONG para atrair potenciais doadores.
                    </DialogContentText>
                    <br></br>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descrição"
                      multiline
                      onChange={(e) => setDescription(e.target.value)}
                      sx={{ width: '200px'}}
                      rows={4}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseONG}>Cancelar</Button>
                    <Button onClick={registerOng}>Cadastrar</Button>
                  </DialogActions>
                </Dialog>
              </div>


            </div>
          </div>

          <div className="btn-group">
            <Button
              variant="contained"
              onClick={handleClickOpenONG}
            >
              <b>Enviar</b>
            </Button>
          </div>

        </form>

        <Snackbar open={openFailedAlert} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '50%', fontSize: '17px' }}>
              Falha ao cadastrar, certifique-se que todos os dados estão preenchidos corretamente!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default DonorRegister;