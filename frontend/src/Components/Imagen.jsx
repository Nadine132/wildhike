// Imagen.jsx
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

export default function Imagen() {
  return (
    <Box 
      sx={{ 
        width: '100%',      // Ocupa todo el ancho
        height: '60vh',     // Ajusta la altura a 75% de la ventana
        overflow: 'hidden', 
        position: 'absolute', // Asegura que el Box esté en una posición absoluta
        top: 0,              // Colocado en la parte superior
        left: 0,             // Colocado en el borde izquierdo
        zIndex: -1,          // Envia el componente al fondo, detrás de otros elementos
        p: 0 
      }}
    >
      <AspectRatio 
        sx={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0 
        }}
      >
        <img
          src="https://images.pexels.com/photos/206796/pexels-photo-206796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Scenic View"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
        />
      </AspectRatio>
    </Box>
  );
}
