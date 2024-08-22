import React from 'react';
import Imagen from '../Components/Imagen';
import { Box, Typography } from '@mui/material';
import CardGrid from '../Components/CardGrid';
import Zonas from '../Components/Zonas';
import ProvinciaSelect from '../Components/Select';  // Importa el nuevo componente

function Home() {
  return (
    <div>
      {/* Contenedor de la imagen */}
      <Box sx={{ position: 'relative', flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
        <Imagen />    {/* Renderiza la imagen */}
      </Box>
      
      {/* Contenedor del select */}
      <Box sx={{ marginTop: 2, padding: 2 }}>
        <ProvinciaSelect /> {/* Renderiza el componente select */}
      </Box>
      
      {/* Contenedor de las recomendaciones y las tarjetas */}
      <Box sx={{ marginTop: 10, padding: 2 }}>
        {/* Texto "Recomendaciones" */}
        <Typography variant="h4" component="h2" align="center" sx={{ marginBottom: 2 }}>
          Recomendaciones
        </Typography>
        
        {/* Contenedor para las tarjetas */}
        <CardGrid />  {/* Renderiza el grid de tarjetas */}

        {/* Espacio entre secciones */}
        <Box sx={{ marginTop: 8 }}>
          {/* Título "Zonas" */}
          <Typography variant="h4" component="h2" align="center" sx={{ marginBottom: 2 }}>
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
