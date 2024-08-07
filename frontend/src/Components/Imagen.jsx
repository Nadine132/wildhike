import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

export default function Imagen() {
  return (
    <Box 
      sx={{ 
        width: '100%',      // Ocupa todo el ancho
        height: '60vh',     // Ajusta la altura a 60% de la ventana
        overflow: 'hidden', 
        position: 'relative', // Relativo para evitar desbordamientos
        top: 0,              // Colocado en la parte superior
        left: 0,             // Alinea con el borde izquierdo de la pantalla
        zIndex: -1,          // Envía el componente al fondo, detrás de otros elementos
        p: 0 
      }}
    >
      <AspectRatio 
        sx={{ 
          width: '100%', 
          height: '100%',
        }}
      >
        <img
          src="https://images.pexels.com/photos/206796/pexels-photo-206796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Scenic View"
          style={{ 
            width: '100%', 
            height: '60%', 
            objectFit: 'cover',
            objectPosition: 'center' // Centra la imagen en su contenedor
          }}
        />
      </AspectRatio>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',         // Coloca el texto en la parte inferior
          left: '250px',          // Ajusta la distancia desde el borde izquierdo
          color: 'white',        // Color del texto
          padding: '10px',
          borderRadius: '5px',
          maxWidth: '90%',       // Limita el ancho del contenedor del texto
          boxSizing: 'border-box' // Incluye el padding en el ancho total
        }}
      >
        <p style={{ 
          margin: 0,            // Elimina el margen por defecto
          lineHeight: '1.4',    // Ajusta el espaciado entre líneas
          textAlign: 'left',    // Alinea el texto a la izquierda
          fontSize: '2rem'      
        }}>
          Descubre la ruta <br /> de tus sueños
        </p>
      </Box>
    </Box>
  );
}
