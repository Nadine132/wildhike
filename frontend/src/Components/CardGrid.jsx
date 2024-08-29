import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para la redirección

export default function CardGrid() {
  const [rutasData, setRutasData] = useState([]); // Estado para guardar los datos de rutas
  const [loading, setLoading] = useState(true); // Estado para el loading
  const navigate = useNavigate();  // Hook para redireccionar

  // Obtener rutas y galerías
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rutasResponse = await axios.get('http://localhost:3000/api/rutas'); // Verifica la URL correcta
        const galeriasResponse = await axios.get('http://localhost:3000/api/galerias'); // Obtén las imágenes
        const rutas = rutasResponse.data;
        const galerias = galeriasResponse.data;

        // Verificar si rutas es un array
        if (!Array.isArray(rutas)) {
          throw new Error('La respuesta de rutas no es un array');
        }

        // Seleccionar las primeras 4 rutas o aleatorias
        const rutasSeleccionadas = rutas.sort(() => Math.random() - 0.5).slice(0, 4);

        // Asignar las imágenes a las rutas
        const rutasConImagenes = rutasSeleccionadas.map(ruta => {
          const firstImage = galerias.find(image => image.ruta_id === ruta.id);
          return { ...ruta, imageUrl: firstImage ? firstImage.url_imagen : 'https://via.placeholder.com/300' };
        });

        setRutasData(rutasConImagenes);
      } catch (error) {
        console.error('Error fetching rutas o imágenes:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // Llamamos a la función para que se ejecute cuando el componente se monte
  }, []); // El array vacío significa que esto corre solo una vez al montar el componente

  if (loading) {
    return <Typography>Cargando rutas de senderismo...</Typography>;
  }

  // Función para manejar el click en la imagen
  const handleImageClick = (rutaId) => {
    navigate(`/rutas/${rutaId}`);  // Redirigir al componente RouteDetails con el ID de la ruta
  };

  return (
    <Grid container spacing={3} sx={{ justifyContent: 'center', maxWidth: '100%' }}>
      {rutasData.length > 0 ? (
        rutasData.map((ruta) => (
          <Grid item key={ruta.id}>
            <Card
              sx={{
                height: '400px',
                width: 300,
                cursor: 'pointer',  // Cambia el cursor cuando pasas el mouse sobre la tarjeta
                '&:hover img': {
                  transform: 'scale(1.1)',  // Ampliar la imagen al pasar el ratón
                }
              }}
              onClick={() => handleImageClick(ruta.id)}  // Añade el evento de click para redireccionar
            >
              <CardCover>
                <img
                  src={ruta.imageUrl} // Usa la imagen obtenida de la API
                  loading="lazy"
                  alt={ruta.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out'  // Transición suave en la ampliación
                  }}
                />
              </CardCover>
              <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography level="title-lg" textColor="#fff">
                  {ruta.nombre}
                </Typography>
                <Typography textColor="neutral.300">Provincia: {ruta.provincia}</Typography>
                <Typography textColor="neutral.300">Dificultad: {ruta.dificultad}</Typography>
                <Typography textColor="neutral.300">Distancia: {ruta.distancia} km</Typography>
                <Typography textColor="neutral.300">Duración: {ruta.duracion} horas</Typography>
                <Typography startDecorator={<LocationOnRoundedIcon />} textColor="neutral.300">
                  <a href={ruta.localizacion_url} target="_blank" rel="noopener noreferrer">
                    Ver en mapa
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No hay rutas disponibles</Typography>
      )}
    </Grid>
  );
}
