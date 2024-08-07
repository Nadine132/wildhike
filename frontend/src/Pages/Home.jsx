import React from 'react'
import Imagen from '../Components/Imagen'
import Buscador from '../Components/Buscador'
import { Box } from '@mui/material'

function Home() {
  return (
    <div>      <Box sx={{ position: 'relative', flexGrow: 1 }}>
    <Imagen />    {/* Renderiza la imagen */}
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40%', // Ajusta el ancho del buscador según sea necesario
        paddingBottom: 27,
      }}
    >
      <Buscador />  {/* Renderiza el buscador */}
    </Box>
  </Box></div>
  )
}

export default Home