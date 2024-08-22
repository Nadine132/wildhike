import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';

const Rutas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener todas las rutas desde la API
  const getRutas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/rutas'); // Asegúrate de que esta URL esté correcta
      if (!response.ok) {
        throw new Error('Error fetching rutas');
      }
      const data = await response.json(); // Asumimos que el servidor devuelve JSON
      return data;
    } catch (err) {
      console.error('Error en getRutas:', err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const data = await getRutas();
        setRutas(data); // Guarda las rutas obtenidas en el estado
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Rutas
      </Typography>
      <Grid container spacing={3}>
        {rutas && rutas.length > 0 ? (
          rutas.map((ruta) => (
            <Grid item xs={12} sm={6} md={4} key={ruta.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" align="center">
                    {ruta.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {ruta.descripcion}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/rutas/${ruta.id}`}
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center">
            No se encontraron rutas.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Rutas;
