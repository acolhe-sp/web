import React, { useState } from 'react';

import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import logoSVG from '../images/logo.svg';
import './Login.css';


function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function verifyCredentials() {
      // TODO
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