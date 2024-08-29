import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const provinciasAndalucia = [
  "Almería", "Cádiz", "Córdoba", "Granada", "Huelva", 
  "Jaén", "Málaga", "Sevilla"
];

const ProvinciaSelect = ({ provinciaSeleccionada, setProvinciaSeleccionada }) => {
  const handleChange = (event) => {
    setProvinciaSeleccionada(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '50%', // Ancho del 50% del contenedor padre
        margin: '0 auto', // Centra el componente horizontalmente
        marginTop: -2, // Ajusta el espacio superior
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="provincia-select-label">Provincia</InputLabel>
        <Select
          labelId="provincia-select-label"
          id="provincia-select"
          value={provinciaSeleccionada}
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
};

export default ProvinciaSelect;
