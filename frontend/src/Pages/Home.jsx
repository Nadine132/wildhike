import React from 'react';
import Imagen from '../Components/Imagen';
import { Box, Typography } from '@mui/material';
import CardGrid from '../Components/CardGrid';
import Zonas from '../Components/Zonas';  // Importar el componente Zonas

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
        <Typography variant="h4" component="h2" align="baseline" sx={{ marginBottom: 2 }}>
          Recomendaciones
        </Typography>
        
        {/* Contenedor para las tarjetas */}
        <CardGrid />  {/* Renderiza el grid de tarjetas */}

        {/* Espacio entre secciones */}
        <Box sx={{ marginTop: 8 }}>
          {/* Título "Zonas" */}
          <Typography variant="h4" component="h2" align="baseline" sx={{ marginBottom: 2 }}>
            Zonas
          </Typography>

          {/* Contenedor para las zonas */}
          <Zonas />  {/* Renderiza las zonas */}
        </Box>
      </Box>
    </div>
  );
}

export default Home;
