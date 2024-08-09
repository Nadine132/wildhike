import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'lightgray',
        padding: '16px',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; 2024 Tu Empresa. Todos los derechos reservados.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }}>
        <Link to="/politica-de-privacidad" style={{ textDecoration: 'none', color: 'inherit' }}>
          Política de Privacidad
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }}>
        <Link to="/contacto" style={{ textDecoration: 'none', color: 'inherit' }}>
          Contáctenos
        </Link>
      </Typography>
    </Box>
  );
}
