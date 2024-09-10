import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ProvinciaSelect({ onProvinciaChange }) {
  const [provincia, setProvincia] = React.useState('');

  const handleChange = (event) => {
    const newProvincia = event.target.value;
    setProvincia(newProvincia);
    onProvinciaChange(newProvincia);
  };

  const provinciasAndalucia = [
    "Almería", "Cádiz", "Córdoba", "Granada", "Huelva", 
    "Jaén", "Málaga", "Sevilla"
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        margin: '0 auto',
        marginTop: -2,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="provincia-select-label">Provincia</InputLabel>
        <Select
          labelId="provincia-select-label"
          id="provincia-select"
          value={provincia}
          label="Provincia"
          onChange={handleChange}
        >
          {provinciasAndalucia.map((provincia) => (
            <MenuItem key={provincia} value={provincia}>
              {provincia}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
