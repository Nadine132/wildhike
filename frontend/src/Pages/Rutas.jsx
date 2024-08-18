import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import Imagen from '../Components/Imagen';

const rutas = [
  {
    nombre: 'Ruta del Bosque Encantado',
    descripcion: 'Una ruta mágica que atraviesa un bosque lleno de encanto.',
    imagen: 'https://images.pexels.com/photos/1696763/pexels-photo-1696763.jpeg'
  },
  {
    nombre: 'Sendero del Bosque Oscuro',
    descripcion: 'Una caminata a través de un misterioso bosque denso.',
    imagen: 'https://images.pexels.com/photos/69911/pexels-photo-69911.jpeg'
  },
  {
    nombre: 'Camino del Bosque Frondoso',
    descripcion: 'Explora un bosque con vegetación exuberante y fauna diversa.',
    imagen: 'https://images.pexels.com/photos/2878741/pexels-photo-2878741.jpeg'
  },
  {
    nombre: 'Sendero del Bosque Nevado',
    descripcion: 'Una caminata a través de un bosque cubierto de nieve.',
    imagen: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg'
  },
  {
    nombre: 'Ruta del Bosque de Bambú',
    descripcion: 'Un sendero que atraviesa un bosque de bambú.',
    imagen: 'https://images.pexels.com/photos/129797/pexels-photo-129797.jpeg'
  },
  {
    nombre: 'Ruta del Bosque Templado',
    descripcion: 'Un paseo por un bosque templado con un clima agradable.',
    imagen: 'https://images.pexels.com/photos/45847/pexels-photo-45847.jpeg'
  },
  {
    nombre: 'Sendero del Bosque de Pinos',
    descripcion: 'Explora un sendero rodeado de altos pinos.',
    imagen: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg'
  },
  {
    nombre: 'Camino del Bosque Esmeralda',
    descripcion: 'Una ruta a través de un bosque verde y vibrante.',
    imagen: 'https://images.pexels.com/photos/36762/pexels-photo.jpg'
  },
  {
    nombre: 'Ruta del Bosque Mágico',
    descripcion: 'Un bosque lleno de luces y sombras, ideal para explorar.',
    imagen: 'https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg'
  },
  {
    nombre: 'Sendero del Bosque Primordial',
    descripcion: 'Un paseo a través de un antiguo bosque lleno de historia.',
    imagen: 'https://images.pexels.com/photos/167684/pexels-photo-167684.jpeg'
  },
  {
    nombre: 'Ruta del Bosque Verdeante',
    descripcion: 'Una ruta en un bosque con un verde vibrante y fresco.',
    imagen: 'https://images.pexels.com/photos/1066808/pexels-photo-1066808.jpeg'
  },
  {
    nombre: 'Sendero del Bosque Encantado',
    descripcion: 'Explora un bosque lleno de historias y leyendas.',
    imagen: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg'
  },
  // Puedes añadir más rutas aquí si lo deseas
];

const itemsPerPage = 12; // Mostrar 12 tarjetas por página
const totalPages = 5; // Establecer el número total de páginas, aunque no estén todas llenas

// Estilos para la animación de ampliación
const StyledCard = styled(Card)({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)', // Aumenta el tamaño al pasar el ratón
  },
});

function Rutas() {
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Determinar las rutas que se muestran en la página actual
  const currentRutas = rutas.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <Box sx={{ position: 'relative', flexGrow: 1 }}>
        <Imagen /> {/* Renderiza la imagen */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40%',
            paddingBottom: 27,
          }}
        >
          {/* Aquí podrías agregar un buscador u otro contenido */}
        </Box>
      </Box>

      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Rutas de Senderismo por Bosques
        </Typography>
        <Grid container spacing={2}>
          {currentRutas.map((ruta, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="150"
                  image={ruta.imagen}
                  alt={ruta.nombre}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {ruta.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ruta.descripcion}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Paginación */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            count={totalPages} // Total de páginas establecido a 5
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>
    </div>
  );
}

export default Rutas;
