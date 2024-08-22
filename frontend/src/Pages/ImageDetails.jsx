import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, CircularProgress } from '@mui/material';

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener las imágenes
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/galerias'); // Verifica que este endpoint sea correcto
      setImages(response.data); // Asegúrate de que response.data contiene las URLs correctas
    } catch (error) {
      console.error('Error fetching images:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (images.length === 0) {
    return <Typography>No se encontraron imágenes.</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
      {images.map((image) => (
        <Grid item key={image.id}>
          <div>
            <img
              src={image.url} // Asegúrate de que las URLs sean correctas y accesibles
              alt={`Imagen ${image.id}`}
              style={{ width: '300px', height: 'auto' }}
            />
            <Typography variant="subtitle1">{`Imagen ${image.id}`}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
