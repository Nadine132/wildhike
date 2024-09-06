// Components/Zonas.jsx
import React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButtom';

export default function Zonas({ rutas = [] }) {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} sx={{ justifyContent: 'center', maxWidth: '100%' }}>
      {rutas.length > 0 ? (
        rutas.map((ruta) => (
          <Grid item key={ruta.id}>
            <Card
              sx={{
                height: '400px',
                width: 300,
                cursor: 'pointer',
                '&:hover img': {
                  transform: 'scale(1.1)',
                },
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
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
              </CardCover>
              <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography level="title-lg" textColor="#fff">
                  {ruta.nombre}
                </Typography>
                <Typography textColor="neutral.300">Provincia: {ruta.provincia || 'Desconocido'}</Typography>
                <Typography textColor="neutral.300">Dificultad: {ruta.dificultad || 'No especificado'}</Typography>
                <Typography textColor="neutral.300">Distancia: {ruta.distancia || 'No especificada'} km</Typography>
                <Typography textColor="neutral.300">Duración: {ruta.duracion || 'No especificada'} horas</Typography>
                <FavoriteButton rutaId={ruta.id} />
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No hay rutas disponibles para esta provincia</Typography>
      )}
    </Grid>
  );
}
