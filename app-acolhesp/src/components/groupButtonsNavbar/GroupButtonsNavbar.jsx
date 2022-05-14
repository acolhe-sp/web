import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';

const buttons = [
    <Button elevation='0' variant="navbar" endIcon={<SettingsSuggestIcon />}>
      Config.
    </Button>,
    <Button elevation='0' variant="navbar" endIcon={<LogoutIcon />}>
      Logout
    </Button>
];

export default function GroupButtonsNavbar() {
  return (
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        {buttons}
      </ButtonGroup>
  );
}