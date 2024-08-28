import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Box, Pagination } from '@mui/material';
import ImageDetails from './ImageDetails';

const Rutas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rutasPerPage] = useState(6); // Ajusta la cantidad de rutas por página aquí
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/galerias'); // Verifica que este endpoint sea correcto
      if (!response.ok) {
        throw new Error('Error fetching rutas');
      }
      const data = await response.json();
      setImages(data);
      return data;
      // Asegúrate de que response.data contiene las URLs correctas
    } catch (error) {
      console.error('Error fetching images:', error.message);
    } finally {
      setLoading(false);
    }
  };

   console.log(images)
  useEffect(() => {
    fetchImages();
  }, []);

  console.log(images)

  // Función para obtener todas las rutas desde la API
  const getRutas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/rutas');
      if (!response.ok) {
        throw new Error('Error fetching rutas');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error en getRutas:', err);
      throw err;
    }
  };
  console.log(rutas)

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const data = await getRutas();
        setRutas(data);
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

  // Calcular las rutas a mostrar en la página actual
  const indexOfLastRuta = page * rutasPerPage;
  const indexOfFirstRuta = indexOfLastRuta - rutasPerPage;
  const currentRutas = rutas.slice(indexOfFirstRuta, indexOfLastRuta);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        component="img"
        src="https://images.pexels.com/photos/206796/pexels-photo-206796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Cabecera"
        sx={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: 2 }}
        
      />
      
      
      <Typography variant="h4" gutterBottom align="center">
        Rutas
      </Typography>
      <Grid container spacing={3}>
  {currentRutas.length > 0 ? (
    currentRutas.map((ruta) => {
      // Encuentra la primera imagen que coincide con el ruta_id
      const firstImage = images.find((image) => image.ruta_id === ruta.id);
console.log(firstImage , "hola que pasa")
      return (
        <Grid item xs={12} sm={6} md={4} key={ruta.id}>
          <Card>
            <CardContent>
              {/* Pasa la primera imagen a ImageDetails */}
              {firstImage && <img src={firstImage.url_imagen} alt='' />}
              
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
      );
    })
  ) : (
    <Typography>No hay rutas disponibles</Typography>
  )}
</Grid>

      <Box display="flex" justifyContent="center" marginTop={3}>
        <Pagination
          count={Math.ceil(rutas.length / rutasPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Rutas;
