import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Grid } from '@mui/material';

const cardData = [
  { src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', title: 'Title 1', location: 'Location 1' },
  { src: 'https://images.pexels.com/photos/1047051/pexels-photo-1047051.jpeg', title: 'Title 2', location: 'Location 2' },
  { src: 'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg', title: 'Title 3', location: 'Location 3' },
  { src: 'https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg', title: 'Title 4', location: 'Location 4' },
];

export default function CardGrid() {
  return (
    <Grid container spacing={3} sx={{ justifyContent: 'center', paddingLeft: '165px', maxWidth: '100%' }}>
      {cardData.map((card, index) => (
        <Grid item key={index}>
          <Card sx={{ height: '300px', width: 280 }}>
            <CardCover>
              <img
                src={card.src}
                srcSet={`${card.src} 2x`}
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
                {card.title}
              </Typography>
              <Typography
                startDecorator={<LocationOnRoundedIcon />}
                textColor="neutral.300"
              >
                {card.location}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
