import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import signupSVG from '../../images/sign-up.svg';
import logoSVG from '../../images/logo.svg';
import emptyAvatar from '../../images/empty-avatar.png';

import { styled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import NativeSelect from '@mui/material/NativeSelect';



import './DonorRegister.css';
import api from '../../api';

const Input = styled('input')({
  display: 'none',
});


function DonorRegister() {
  document.title = 'Cadastre-se';
  const navigate = useNavigate();
  

  const [nome, setNome] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmado, setEmailConfirmado] = useState("");

  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");

  const [estado, setEstado] = useState("");

  async function register() {

    document.title = 'Cadastro';

    try {
      const res = await api.post('/donors', {
        img: "teste.jpg",
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
        userType: "USER_DONOR",
        connect: false
      });

      if (res.status === 201) alert("Cadastrado com sucesso!");

      navigate('/login');
    }
    catch (err) {
      alert('Erro: ' + err.response.status);
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
    'SC'
  ];

  return (
    <div className="container-fluid">

      <div className="c-signup-illustration">
        <img src={signupSVG} alt="sign-up"/>
      </div>

      <div className="logo-footer">
        <img src={logoSVG} alt="logo"/>
      </div>

      <div className="form-signup-donor">
        <h2>
          Cadastro de <b>doador</b>
        </h2>

        <form>
          <div className="upload-avatar">
            <img src={emptyAvatar} alt="empty-avatar"/>

            


            <Stack className="input-upload-avatar" direction="row" alignItems="center" spacing={1}>
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
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
              />
              <TextField
                label="Registro Geral"
                variant="standard"
                size="small"
                onChange={(e) => setRg(e.target.value)}
              />
              <TextField
                label="CPF"
                variant="standard"
                size="small"
                onChange={(e) => setCpf(e.target.value)}
              />
              <TextField
                label="E-mail"
                type="email"
                variant="standard"
                size="small"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Confirme o e-mail"
                type="email"
                variant="standard"
                size="small"
                onChange={(e) => setEmailConfirmado(e.target.value)}
              />
              <TextField
                label="Senha"
                type="password"
                variant="standard"
                size="small"
                onChange={(e) => setSenha(e.target.value)}
              />
              <TextField
                label="Confirme a senha"
                type="password"
                variant="standard"
                size="small"
                onChange={(e) => setSenhaConfirmada(e.target.value)}
              />

            </div>

            <div>
              <p><b>Endereço</b></p>
              <TextField
                label="CEP"
                variant="standard"
                size="small"
                onChange={(e) => setCep(e.target.value)}
              />

              <TextField
                label="Rua"
                variant="standard"
                size="small"
                onChange={(e) => setRua(e.target.value)}
              />


              <TextField
                label="Número"
                variant="standard"
                size="small"
                onChange={(e) => setNumero(e.target.value)}
              />

              <TextField
                label="Cidade"
                variant="standard"
                size="small"
                onChange={(e) => setCidade(e.target.value)}
              />
              <TextField
                label="Bairro"
                variant="standard"
                size="small"
                onChange={(e) => setBairro(e.target.value)}
              />
              <TextField
                label="Complemento"
                variant="standard"
                size="small"
                onChange={(e) => setComplemento(e.target.value)}
              />

              <NativeSelect onChange={(e) => setEstado(e.target.value)} className="select-uf">
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
              onClick={register}
            >
              <b>Enviar</b>
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default DonorRegister;