import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


export default function GroupButtonsNavbar() {

  const navigate = useNavigate();

  function logout() {

    sessionStorage.removeItem('participante');
  
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