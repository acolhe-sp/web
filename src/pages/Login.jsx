import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import logoSVG from '../images/logoWithTitle.svg';
import api from '../api';
import './Login.css';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openFailedAlert, setOpenFailedAlert] = useState(false);
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessAlert(false);
    setOpenFailedAlert(false);
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function verifyCredentials() {
    try {
      const res = await api.post('/users/logon', {
        email,
        password
      });

      setOpenSuccessAlert(true);

    } catch (err) {
      console.error(err);
      setOpenFailedAlert(true);
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


        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            variant="contained"
            className="btn"
            onClick={verifyCredentials}
          >
            Entrar
          </Button>
          <Snackbar open={openSuccessAlert} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Login efetuado com sucesso!
            </Alert>
          </Snackbar>
          <Snackbar open={openFailedAlert} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              E-mail ou senha incorreto(s)!
            </Alert>
          </Snackbar>
        </Stack>

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
