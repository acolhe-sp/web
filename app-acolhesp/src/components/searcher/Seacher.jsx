import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function Searcher() {
  return (
    <Paper
      // component="form"
      sx={{ display: 'flex', width: 500, height: 50, alignItems: 'center', p: '2px 5px' }}
    >
      <InputBase
        sx={{ width: 450, ml: 1, textAlign: 'center'  }}
        placeholder="Pesquise aqui"
        inputProps={{ 'aria-label': 'Pesquise aqui' }}
      />
      <IconButton type="submit" sx={{ position: 'relative', top: -10 }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
