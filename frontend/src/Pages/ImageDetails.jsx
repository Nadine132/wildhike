// src/Components/ImageDetails.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';
import Slider from 'react-slick'; // Importa Slider de react-slick

const ImageDetails = ({ ruta_id }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/galerias');
      setImages(response.data);
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

  // Configuración de slick carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Opcional: añade flechas de navegación
  };

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
      <Slider {...settings}>
        {images.map((image) => (
          image.ruta_id === ruta_id && (
            <div key={image.id} style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
              <img
                src={image.url_imagen}
                alt={`Imagen ${image.id}`}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '500px', // Ajusta la altura máxima
                  objectFit: 'contain' 
                }} 
              />
            </div>
          )
        ))}
      </Slider>
    </div>
  );
};

export default ImageDetails;
