import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Asegúrate de que los íconos de Leaflet estén correctamente cargados
import 'leaflet/dist/leaflet.css';

const MapView = ({ nombre }) => {
  const [coords, setCoords] = useState([]);
  const [center, setCenter] = useState([0, 0]); // Estado para el centro del mapa
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: nombre,
            format: 'json',
            limit: 10
          }
        });

        if (response.data.length > 0) {
          const coordinates = response.data.map(item => ({
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            displayName: item.display_name
          }));

          // Calcula el centro del mapa basado en las coordenadas obtenidas
          const avgLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
          const avgLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0) / coordinates.length;

          setCenter([avgLat, avgLng]);
          setCoords(coordinates);
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
      ) : coords.length > 0 ? (
        <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {coords.map((coord, index) => (
            <Marker key={index} position={[coord.lat, coord.lng]}>
              <Popup>{coord.displayName}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Cargando mapa...</p>
      )}
    </div>
  );
};

export default MapView;
