import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid, Paper, Button } from '@mui/material';
import ImageDetails from './ImageDetails';
import MapView from '../Components/MapView';
import FavoriteButton from '../Components/FavoriteButtom';
import Comentarios from '../Components/Comentarios'; // Importa el componente Comentarios
import axios from 'axios';

const RouteDetails = () => {
  const { id } = useParams();
  const [ruta, setRuta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [user, setUser] = useState(null); // Simula la autenticación del usuario
  useEffect(() => {
    const fetchRuta = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/rutas/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setRuta(data);
        if (data.nombre) {
          const geocodeResponse = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(data.nombre)}&format=json`
          );
          const { lat, lon } = geocodeResponse.data[0] || {};
          setCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    // Simular la autenticación del usuario
    const fetchUser = () => {
      // Simula un usuario logueado
      setUser({ id: 1, nombre: 'Usuario de Prueba' });
    };
    fetchRuta();
    fetchUser(); // Simula la obtención de un usuario autenticado
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#E8F5E9' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#E8F5E9' }}>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!ruta) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#E8F5E9' }}>
        <Typography variant="h6" color="text.secondary" align="center">
          Ruta no encontrada.
        </Typography>
      </Box>
    );
  }
  // Construir la URL de Google Maps en función de las coordenadas o el nombre
  const buildMapUrl = () => {
    if (ruta.coordenadas) {
      return `https://www.google.com/maps?q=${encodeURIComponent(ruta.coordenadas)}`;
    } else if (ruta.nombre) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ruta.nombre)}`;
    } else {
      return '#';
    }
  };
  return (
    <Box p={3} sx={{ backgroundColor: '#E8F5E9' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
        {ruta.nombre}
      </Typography>
      {/* Centraliza el botón de favoritos */}
      <Box display="flex" justifyContent="center" mb={2}>
        <FavoriteButton rutaId={ruta.id} />
      </Box>
      <Grid container spacing={4}>
        {/* Sección de imágenes */}
        <Grid item xs={12} md={8}>
          <Box sx={{ marginY: 6 }}>
            <ImageDetails ruta_id={ruta.id} />
          </Box>
        </Grid>
        {/* Sección de información de la ruta */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1" paragraph>
              <strong>Provincia:</strong> {ruta.provincia}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Zona Natural:</strong> {ruta.zona_natural}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Estimación:</strong> {ruta.estimacion}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Duración:</strong> {ruta.duracion} horas
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Dificultad:</strong> {ruta.dificultad}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Distancia:</strong> {ruta.distancia} km
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Desnivel:</strong> {ruta.desnivel} metros
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                href={buildMapUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Localización
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Mapa */}
      {coords && (
        <Box sx={{ height: '400px', my: 4 }}>
          <MapView lat={coords.lat} lng={coords.lng} nombre={ruta.nombre} />
        </Box>
      )}
      {/* Sección de comentarios */}
      <Box mt={4}>
        <Comentarios rutaId={ruta.id} user={user} /> {/* Pasa el ID de la ruta y el usuario autenticado */}
      </Box>
    </Box>
  );
};

export default RouteDetails;
