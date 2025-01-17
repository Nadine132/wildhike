import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid, Paper, Button } from '@mui/material';
import ImageDetails from './ImageDetails';
import MapView from '../Components/MapView';
import FavoriteButton from '../Components/FavoriteButtom';
import Comentarios from '../Components/Comentarios';
import axios from 'axios';

const RouteDetails = () => {
  const { id } = useParams();
  const [ruta, setRuta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchRuta = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/rutas/${id}`);
        if (!response.ok) throw new Error('Error fetching data');
        const data = await response.json();
        setRuta(data);

        const rutasRealizadasResponse = await axios.get('http://localhost:3000/api/rutas-realizadas', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const isCompleted = rutasRealizadasResponse.data.some(
          (rutaRealizada) => rutaRealizada.ruta_id === parseInt(id)
        );
        setCompleted(isCompleted);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = () => {
      const storedUser = localStorage.getItem('user_id');
      setUser({ id: storedUser });
    };

    fetchRuta();
    fetchUser();
  }, [id]);

  const handleToggleCompleted = async () => {
    const userId = localStorage.getItem("userId");
    try {
      if (!user) {
        setError('Usuario no encontrado');
        return;
      }

      if (completed) {
        const rutasRealizadasResponse = await axios.get('http://localhost:3000/api/rutas-realizadas', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const rutaRealizada = rutasRealizadasResponse.data.find(
          (r) => r.ruta_id === parseInt(id)
        );
        if (rutaRealizada) {
          await axios.delete(`http://localhost:3000/api/rutas-realizadas/${rutaRealizada.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setCompleted(false);
        }
      } else {
        await axios.post(
          'http://localhost:3000/api/rutas-realizadas',
          { ruta_id: id, usuario_id: userId },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setCompleted(true);
      }
    } catch (err) {
      setError('Error al actualizar la ruta completada');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#e8f5e9' }}>
        <CircularProgress size={60} sx={{ color: '#00796b' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#e8f5e9' }}>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!ruta) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#e8f5e9' }}>
        <Typography variant="h6" color="text.secondary" align="center">
          Ruta no encontrada.
        </Typography>
      </Box>
    );
  }

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
    <Box p={3} sx={{ backgroundColor: '#e8f5e9', minHeight: '100vh' }}> {/* Color de fondo actualizado */}
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4, fontWeight: 700, color: '#004d40' }}>
        {ruta.nombre}
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <FavoriteButton rutaId={ruta.id} />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 6 }}>
            <ImageDetails ruta_id={ruta.id} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={6} sx={{ p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#ffffff' }}>
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
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              <Button
                variant="contained"
                href={buildMapUrl()}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderRadius: 20, backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' }, mb: 2 }}
              >
                Ver Localización
              </Button>
              <Button
                variant="contained"
                onClick={handleToggleCompleted}
                sx={{ borderRadius: 20, backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }}
              >
                {completed ? "Desmarcar como completada" : "Marcar como completada"}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ height: '400px', my: 4, borderRadius: 2, overflow: 'hidden' }}>
        <MapView nombre={ruta.nombre} />
      </Box>
      <Box mt={4}>
        <Comentarios rutaId={ruta.id} user={user} />
      </Box>
    </Box>
  );
};

export default RouteDetails;
