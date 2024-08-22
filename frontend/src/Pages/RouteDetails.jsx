import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';

const RouteDetails = () => {
  const { id } = useParams();  // Obtén el ID de la ruta desde la URL
  const [ruta, setRuta] = useState(null);  // Estado para almacenar la ruta
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState(null);  // Estado de error

  useEffect(() => {
    const fetchRuta = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/rutas/${id}`);  // Llama al endpoint de la API para obtener la ruta
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: 'url("https://images.pexels.com/photos/26860473/pexels-photo-26860473/free-photo-of-madera-ligero-carretera-paisaje.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',  // Hace que la imagen de fondo se mantenga fija al hacer scroll
        }}
      >
        <CircularProgress />  {/* Indicador de carga */}
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: 'url("https://images.pexels.com/photos/26860473/pexels-photo-26860473/free-photo-of-madera-ligero-carretera-paisaje.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <Typography variant="h6" color="error" align="center">
          {error}  {/* Mensaje de error */}
        </Typography>
      </Box>
    );
  }

  if (!ruta) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: 'url("https://images.pexels.com/photos/26860473/pexels-photo-26860473/free-photo-of-madera-ligero-carretera-paisaje.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <Typography variant="h6" color="text.secondary" align="center">
          Ruta no encontrada.  {/* Mensaje si no se encuentra la ruta */}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 2,
        backgroundImage: 'url("https://images.pexels.com/photos/26860473/pexels-photo-26860473/free-photo-of-madera-ligero-carretera-paisaje.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: 'white'  // Cambia el color del texto para asegurar contraste sobre la imagen
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        {ruta.nombre}  {/* Nombre de la ruta */}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Provincia:</strong> {ruta.provincia}  {/* Provincia */}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Descripción:</strong> {ruta.descripcion}  {/* Descripción */}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Zona Natural:</strong> {ruta.zona_natural}  {/* Zona natural */}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Estimación:</strong> {ruta.estimacion}  {/* Estimación */}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Duración:</strong> {ruta.duracion} horas  {/* Duración */}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Dificultad:</strong> {ruta.dificultad}  {/* Dificultad */}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Distancia:</strong> {ruta.distancia} km  {/* Distancia */}
      </Typography>

      <Typography variant="body1" paragraph align="center">
        <strong>Desnivel:</strong> {ruta.desnivel} metros  {/* Desnivel */}
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
