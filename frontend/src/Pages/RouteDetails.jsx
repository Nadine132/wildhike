import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import ImageDetails from './ImageDetails';

const RouteDetails = () => {
  const { id } = useParams();  
  const [ruta, setRuta] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchRuta = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/rutas/${id}`);  
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();  // Parsear el resultado a JSON
        setRuta(data);  // Almacena los datos de la ruta en el estado
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);  // Desactiva el estado de carga
      }
    };

    fetchRuta();  // Ejecuta la función para obtener la ruta
  }, [id]);  // Dependencia en el ID de la ruta para que se ejecute cada vez que cambie

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />  {/* Indicador de carga */}
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error" align="center">
          {error}  {/* Mensaje de error */}
        </Typography>
      </Box>
    );
  }

  if (!ruta) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="text.secondary" align="center">
          Ruta no encontrada.  {/* Mensaje si no se encuentra la ruta */}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <ImageDetails ruta_id={ruta.id} />

      <Typography variant="h4" gutterBottom align="center">
        {ruta.nombre}  
      </Typography>

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
        <Button variant="contained" href={ruta.localizacion_url} target="_blank">
          Ver Localización  {/* Botón para ver la localización en un mapa o similar */}
        </Button>
      </Box>
    </Box>
  );
};

export default RouteDetails;
