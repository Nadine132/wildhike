import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function CardGrid() {
  const [rutasData, setRutasData] = useState([]); // Estado para guardar los datos de rutas
  // Obtener rutas y galerías
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Aquí hacemos la solicitud a la API con la URL correcta
        const rutasResponse = await axios.get('http://localhost:3000/api/rutas'); // Verifica la URL correcta
        const rutas = rutasResponse.data;
        // Verificar si rutas es un array
        if (!Array.isArray(rutas)) {
          throw new Error('La respuesta de rutas no es un array');
        }
        // Seleccionar las primeras 4 rutas o aleatorias
        const rutasSeleccionadas = rutas.sort(() => Math.random() - 0.5).slice(0, 4);
        setRutasData(rutasSeleccionadas);
      } catch (error) {
        console.error('Error fetching rutas:', error.message);
        console.error(error); // Imprimir el error completo
      }
    };
    fetchData(); // Llamamos a la función para que se ejecute cuando el componente se monte
  }, []); // El array vacío significa que esto corre solo una vez al montar el componente
  return (
    <Grid container spacing={3} sx={{ justifyContent: 'center', maxWidth: '100%' }}>
      {rutasData.length > 0 ? (
        rutasData.map((ruta) => (
          <Grid item key={ruta.id}>
            <Card sx={{ height: '400px', width: 300 }}>
              <CardCover>
                <img
                  src={'default_image_url.jpg'} // Usa una imagen genérica por ahora
                  loading="lazy"
                  alt={ruta.nombre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
        <Typography>Cargando rutas de senderismo...</Typography>
      )}
    </Grid>
  );
}