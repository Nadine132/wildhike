import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid } from '@mui/material';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'; // Unused import
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButtom';

export default function CardGrid() {
  const [rutasData, setRutasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rutasResponse = await axios.get('http://localhost:3000/api/rutas');
        const galeriasResponse = await axios.get('http://localhost:3000/api/galerias');
        const rutas = rutasResponse.data;
        const galerias = galeriasResponse.data;

        const rutasConImagenes = rutas.map(ruta => {
          const firstImage = galerias.find(image => image.ruta_id === ruta.id);
          return { ...ruta, imageUrl: firstImage ? firstImage.url_imagen : 'https://via.placeholder.com/300' };
        });

        setRutasData(rutasConImagenes);
      } catch (error) {
        console.error('Error fetching rutas o imágenes:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFavoriteChange = () => {
    // Aquí puedes manejar cambios en los favoritos si es necesario
  };

  if (loading) {
    return <Typography>Cargando rutas de senderismo...</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ justifyContent: 'center', maxWidth: '100%' }}>
      {rutasData.length > 0 ? (
        rutasData.map((ruta) => (
          <Grid item key={ruta.id}>
            <Card
              sx={{
                height: '400px',
                width: 300,
                cursor: 'pointer',
                '&:hover img': {
                  transform: 'scale(1.1)',
                }
              }}
              onClick={() => navigate(`/rutas/${ruta.id}`)}
            >
              <CardCover>
                <img
                  src={ruta.imageUrl}
                  loading="lazy"
                  alt={ruta.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                />
              </CardCover>
              <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography level="title-lg" textColor="#fff">
                  {ruta.nombre}
                </Typography>
                <Typography textColor="neutral.300">Provincia: {ruta.provincia}</Typography>
                <Typography textColor="neutral.300">Dificultad: {ruta.dificultad}</Typography>
                <Typography textColor="neutral.300">Distancia: {ruta.distancia} km</Typography>
                <Typography textColor="neutral.300">Duración: {ruta.duracion} horas</Typography>
                <FavoriteButton rutaId={ruta.id} onFavoriteChange={handleFavoriteChange} />
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No hay rutas disponibles</Typography>
      )}
    </Grid>
  );
}

