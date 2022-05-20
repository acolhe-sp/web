import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GroupButtonsNavbar from '../groupButtonsNavbar/GroupButtonsNavbar'

export default function PopFunctionNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div style={{ width: 10 }}>
      
      <Typography aria-describedby={id} variant="contained" onClick={handleClick}
      sx={{ 
        position: 'relative', left: '-20px', top: '4px', 
        color: 'black', boxShadow: 'none', cursor: 'pointer' 
      }} 
      elevation={0}>
        <ArrowDropDownIcon />
      </Typography>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        sx={{
          width: '190px',
          height: 'auto',
          display: 'flex',
          '& > *': {
            m: 0,
          },
          justifyItems: 'center',
          justifyContent: 'space-between'
        }}>

        <GroupButtonsNavbar />

      </Popover>
    </div>
  );
}