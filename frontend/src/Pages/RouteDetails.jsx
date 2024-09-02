import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import ImageDetails from './ImageDetails';
import MapView from '../Components/MapView';
import axios from 'axios';

const RouteDetails = () => {
  const { id } = useParams();
  const [ruta, setRuta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);

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
    fetchRuta();
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

  return (
    <Box p={3} sx={{ backgroundColor: '#E8F5E9' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
        {ruta.nombre}
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} sx={{ mb: 3 }}>
        <ImageDetails ruta_id={ruta.id} />
      </Box>
      <Typography variant="body1" paragraph align="center" sx={{ mb: 3 }}>
        {ruta.descripcion}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {coords && (
            <Box sx={{ height: '400px', mb: 3 }}>
              <MapView lat={coords.lat} lng={coords.lng} nombre={ruta.nombre} />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box display="flex" flexDirection="column" justifyContent="center">
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
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RouteDetails;
