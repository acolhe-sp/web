import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import GroupButtonsNavbar from '../groupButtonsNavbar/GroupButtonsNavbar'

export default function PopComentsPublication() {
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
        position: 'relative', color: 'black', boxShadow: 'none', cursor: 'pointer' 
      }} 
      elevation={0}>
        <CommentIcon sx={{ position: 'relative', top: '9px', height: '40px', width: '40px'}} />
      </Typography>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          width: '250px',
          height: '300px',
          display: 'flex',
          '& > *': {
            m: 0,
          },
          justifyItems: 'center',
          justifyContent: 'space-between'
        }}>

        <div className='content-pop-coments'></div>

      </Popover>
    </div>
  );
}