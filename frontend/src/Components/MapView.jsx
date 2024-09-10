import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapView = ({ nombre }) => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Llamada a la API de Nominatim para obtener las coordenadas por nombre
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: nombre,
            format: 'json',
            limit: 1
          }
        });

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
        } else {
          setError('No se encontraron resultados para esta ubicación');
        }
      } catch (err) {
        setError('Hubo un error al buscar la ubicación');
      }
    };

    fetchCoordinates();
  }, [nombre]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : coords ? (
        <MapContainer center={[coords.lat, coords.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords.lat, coords.lng]}>
            <Popup>{nombre}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Cargando mapa...</p>
      )}
    </div>
  );
};

export default MapView;
