import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Grid } from '@mui/material';

// Lista de imágenes, títulos y ubicaciones
const zonasData = [
  { src: 'https://images.pexels.com/photos/286579/pexels-photo-286579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Zona 1', location: 'Ubicación 1' },
  { src: 'https://images.pexels.com/photos/3668200/pexels-photo-3668200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Zona 2', location: 'Ubicación 2' },
  { src: 'https://images.pexels.com/photos/3426361/pexels-photo-3426361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Zona 3', location: 'Ubicación 3' },
  { src: 'https://images.pexels.com/photos/551854/pexels-photo-551854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Zona 4', location: 'Ubicación 4' },
];

export default function Zonas() {
  return (
    <Grid container spacing={3} sx={{ justifyContent: 'center', maxWidth: '100%' }}>
      {zonasData.map((zona, index) => (
        <Grid item key={index}>
          <Card sx={{ height: '300px', width: 280 }}>
            <CardCover>
              <img
                src={zona.src}
                srcSet={`${zona.src} 2x`}
                loading="lazy"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CardCover>
            <CardCover
              sx={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
              }}
            />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
              <Typography level="title-lg" textColor="#fff">
                {zona.title}
              </Typography>
              <Typography
                startDecorator={<LocationOnRoundedIcon />}
                textColor="neutral.300"
              >
                {zona.location}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
