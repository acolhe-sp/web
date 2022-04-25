import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import logoSVG from '../images/logoWithTitle.svg';
import api from '../api';
import './Login.css';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function verifyCredentials() {
    try {
      const res = await api.post('/users/logon', {
        email,
        password
      });

      if (res.status == 200) alert('Login efetuado com sucesso!');

    } catch (err) {
      console.error(err);
      if (err.response.status == 404) alert('Usuário não encontrado!');
      if (err.response.status == 500) alert('Problema interno!');
    }
  }


  return (
    <div className='container'>

      <div className='logo'>
        <img src={logoSVG} />
      </div>

      <div className='form-group'>

        <TextField
          type="email"
          label="E-mail"
          variant="standard"
          className="input-login"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          type="password"
          label="Senha"
          variant="standard"
          className="input-login"
          onChange={(e) => setPassword(e.target.value)}
        />

          
          <Button
            variant="contained"
            className="btn"
            onClick={verifyCredentials}
          >
            Entrar
          </Button>
          <p>--- OU ---</p>

          <Button
            variant="contained"
            className="btn"
            onClick={() => navigate("/donor-register")}
          >
            Cadastre-se
          </Button>
      </div>
    </div>
  );
}

export default Login;
