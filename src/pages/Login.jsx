import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import logoSVG from '../images/logo.svg';
import './Login.css';
import api from '../api';

function Login() {
  
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
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <TextField
          type="password"
          label="Senha"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button 
          variant="contained"
          style={{ marginTop: '40px' }}
          onClick={verifyCredentials}  
        >
          Entrar
        </Button>
        <p>---- OU ----</p>
        <Button id="btn" variant="contained">
          Cadastre-se
        </Button>
      </div>

    </div>
  );
}

export default Login;