import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProvinceSelector = ({ onRoutesFetched }) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');

  useEffect(() => {
    const andaluciaProvinces = [
      'Almeria', 'Cadiz', 'Cordoba', 'Granada', 
      'Huelva', 'Jaen', 'Malaga', 'Sevilla'
    ];
    setProvinces(andaluciaProvinces);
  }, []);

  const handleProvinceChange = async (event) => {
    const province = event.target.value;
    setSelectedProvince(province);

    try {
      const rutasResponse = await axios.get(`http://localhost:3000/api/rutas/provincia/${province}`);
      const galeriasResponse = await axios.get('http://localhost:3000/api/galerias');
      const rutas = rutasResponse.data;
      const galerias = galeriasResponse.data;

      const rutasConImagenes = rutas.map((ruta) => {
        const firstImage = galerias.find(image => image.ruta_id === ruta.id);
        return {
          ...ruta,
          imageUrl: firstImage ? firstImage.url_imagen : 'https://via.placeholder.com/300'
        };
      });

      onRoutesFetched(rutasConImagenes);
    } catch (error) {
      console.error('Error fetching routes or images:', error);
      alert('Hubo un problema al obtener las rutas. Por favor, inténtelo más tarde.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
  <label htmlFor="province-select" style={{ display: 'block', fontSize: '18px', marginBottom: '10px', color: '#333' }}>
    Selecciona una provincia:
  </label>
  <select 
    id="province-select" 
    value={selectedProvince} 
    onChange={handleProvinceChange}
    style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}
  >
    <option value="">Selecciona una provincia</option>
    {provinces.map((province) => (
      <option key={province} value={province}>
        {province}
      </option>
    ))}
  </select>
</div>
  );
};

export default ProvinceSelector;
