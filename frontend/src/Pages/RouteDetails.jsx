import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import ImageDetails from './ImageDetails';
import FavoriteButton from '../Components/FavoriteButtom';
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

  // Build Google Maps URL based on coordinates or name
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
      <Typography variant="h4" gutterBottom align="center">
        {ruta.nombre}
      </Typography>

      {/* Centraliza el botón de favoritos */}
      <Box display="flex" justifyContent="center" mb={2}>
        <FavoriteButton rutaId={ruta.id} />
      </Box>

      <Box sx={{ marginY: 6 }}>
        <ImageDetails ruta_id={ruta.id} />
      </Box>

      <Typography variant="body1" paragraph align="center">
        <strong>Provincia:</strong> {ruta.provincia}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Descripción:</strong> {ruta.descripcion}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Zona Natural:</strong> {ruta.zona_natural}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Estimación:</strong> {ruta.estimacion}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Duración:</strong> {ruta.duracion} horas
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Dificultad:</strong> {ruta.dificultad}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Distancia:</strong> {ruta.distancia} km
      </Typography>

      <Typography variant="body1" paragraph align="center">
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
    </Box>
  );
};
export default RouteDetails;