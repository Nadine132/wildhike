import React from 'react';
import Imagen from '../Components/Imagen';
import { Box, Typography } from '@mui/material';
import CardGrid from '../Components/CardGrid';

function Home() {
  return (
    <div>
      {/* Contenedor de la imagen */}
      <Box sx={{ position: 'relative', flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
        <Imagen />    {/* Renderiza la imagen */}
      </Box>
      
      {/* Contenedor de las recomendaciones y las tarjetas */}
      <Box sx={{ marginTop: 10, padding: 2 }}>
        {/* Texto "Recomendaciones" */}
        <Typography variant="h4" component="h2" align="baseline" sx={{ marginBottom: 2, marginLeft: 35}}>
          Recomendaciones
        </Typography>
        
        {/* Contenedor para las tarjetas */}
        <CardGrid />  {/* Renderiza el grid de tarjetas */}
        
      </Box>
    </div>
  );
}

export default Home;
