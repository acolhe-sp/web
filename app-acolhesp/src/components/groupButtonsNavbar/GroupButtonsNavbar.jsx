import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import api from '../../api';


export default function GroupButtonsNavbar() {

  const participante = JSON.parse(sessionStorage.getItem('participante'));
  
  const navigate = useNavigate();

  async function logout() {

    await api.put(`/users/logout/${participante.user.id}`).catch(console.log);

    sessionStorage.clear();
  
    navigate('/');
  
  }

  function config() {
  
    navigate('/update-user');
  
  }

  const buttons = [
    <Button elevation={0} variant="navbar" endIcon={<SettingsSuggestIcon onClick={() => { config() }}/> }>
      Config.
    </Button>,
    <Button elevation={0} variant="navbar" endIcon={<LogoutIcon />} onClick={() => { logout() }}>
      Logout
    </Button>
];

  return (
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        {buttons}
      </ButtonGroup>
  );
}