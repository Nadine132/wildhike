import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Box, Pagination } from '@mui/material';
import Imagen from '../Components/Imagen';
import FavoriteButton from '../Components/FavoriteButtom';

const Rutas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rutasPerPage] = useState(6);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/galerias');
      if (!response.ok) {
        throw new Error('Error fetching rutas');
      }
      const data = await response.json();
      setImages(data);
      return data;
    } catch (error) {
      console.error('Error fetching images:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

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

  const indexOfLastRuta = page * rutasPerPage;
  const indexOfFirstRuta = indexOfLastRuta - rutasPerPage;
  const currentRutas = rutas.slice(indexOfFirstRuta, indexOfLastRuta);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ position: 'relative', flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
        <Imagen />
      </Box>

      <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: '50px', marginTop: '30px', color: '#00796b', fontWeight: 'bold' }}>
        Rutas
      </Typography>

      <Grid container spacing={4}>
        {currentRutas.length > 0 ? (
          currentRutas.map((ruta) => {
            const firstImage = images.find((image) => image.ruta_id === ruta.id);
            return (
              <Grid item xs={12} sm={6} md={4} key={ruta.id}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={firstImage ? firstImage.url_imagen : 'https://via.placeholder.com/300'}
                    alt={ruta.nombre}
                    sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                  />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
                    <Typography variant="h6" component="div" align="center" sx={{ color: '#00796b', fontWeight: '600' }}>
                      {ruta.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ flexGrow: 1, marginTop: '10px', fontSize: '0.95rem' }}>
                      {ruta.descripcion}
                    </Typography>
                    <Box display="flex" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
                      <FavoriteButton rutaId={ruta.id} />
                    </Box>
                    <Button
                      component={Link}
                      to={`/rutas/${ruta.id}`}
                      variant="contained"
                      sx={{
                        mt: 2,
                        backgroundColor: '#00796b',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#004d40' },
                        padding: '10px 20px',
                        borderRadius: '8px',
                      }}
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

      <Box display="flex" justifyContent="center" marginTop={4}>
        <Pagination
          count={Math.ceil(rutas.length / rutasPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{
            '& .Mui-selected': {
              backgroundColor: '#00796b !important',
              color: '#fff',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: '#004d40',
              color: '#fff',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Rutas;
