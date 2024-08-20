import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

export default function Imagen() {
  return (
    <Box className="primary" 
      sx={{ 
      
        width: '100%',      // Ocupa todo el ancho
        overflow: 'hidden', 
        position: 'relative', // Relativo para evitar desbordamientos
        top: 0,              // Colocado en la parte superior
        left: 0,             // Alinea con el borde izquierdo de la pantalla
        zIndex: -1,          // Envía el componente al fondo, detrás de otros elementos
        p: 0 ,
        paddingTop: '200px',
        paddingBottom: '40px'
      }}
    >

        <img
          src="https://images.pexels.com/photos/206796/pexels-photo-206796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Scenic View"
          style={{ 
            top: '0',
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: 'center',
            position: 'absolute', 
           
          }}
        />
     
      <Box
        sx={{
          position: 'relative',
          bottom: '20px',         // Coloca el texto en la parte inferior
          left: '0px',          // Ajusta la distancia desde el borde izquierdo
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
