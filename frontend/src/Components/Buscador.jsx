import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Buscador() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px', // Ajusta la altura según sea necesario
        borderRadius: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con algo de transparencia
        boxShadow: 3,
        padding: '0 16px',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar..."
        sx={{ bgcolor: 'white', borderRadius: '4px' }}
      />
    </Box>
  );
}
