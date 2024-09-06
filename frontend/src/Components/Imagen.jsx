import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

export default function Imagen() {
  return (
    <Box className="primary" 
      sx={{ 
      
        width: '100%',
        overflow: 'hidden', 
        position: 'relative',
        top: 0,
        left: 0,
        zIndex: -1,
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
          bottom: '20px',
          left: '0px',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          maxWidth: '90%',
          boxSizing: 'border-box'
        }}
      >
        <p style={{ 
          margin: 0,
          lineHeight: '1.4',
          textAlign: 'left',
          fontSize: '2rem'      
        }}>
          Descubre la ruta <br /> de tus sueños
        </p>
      </Box>
    </Box>
  );
}
