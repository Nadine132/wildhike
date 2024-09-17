import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminRutaForm from './AdminRutaForm';
import { Snackbar, Alert } from '@mui/material'; // Importa los componentes de Material UI
import '../styles/AdminRutaManager.css';

const AdminRutaManager = () => {
  const [rutas, setRutas] = useState([]);
  const [selectedRuta, setSelectedRuta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchRutas = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/admin/rutas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setRutas(response.data);
      } catch (err) {
        console.error('Error al obtener rutas:', err);
        setError('Hubo un error al obtener la lista de rutas.');
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  const handleEditClick = (ruta) => {
    setSelectedRuta(ruta);
  };

  const handleDeleteClick = async (rutaId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta ruta?")) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/rutas/${rutaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSnackbar({ open: true, message: 'Ruta eliminada correctamente', severity: 'success' });
        
        const response = await axios.get('http://localhost:3000/api/admin/rutas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setRutas(response.data);
      } catch (error) {
        console.error('Error al eliminar la ruta:', error);
        setSnackbar({ open: true, message: 'Hubo un error al eliminar la ruta.', severity: 'error' });
      }
    }
  };

  const handleFormSubmit = async (updatedRutaData) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/rutas/${updatedRutaData.id}`, updatedRutaData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSnackbar({ open: true, message: 'Ruta actualizada correctamente', severity: 'success' });
      setSelectedRuta(null);

      const response = await axios.get('http://localhost:3000/api/admin/rutas', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRutas(response.data);
    } catch (error) {
      console.error('Error al actualizar la ruta:', error);
      setSnackbar({ open: true, message: 'Hubo un error al actualizar la ruta.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <div className="admin-ruta-loading">Cargando rutas...</div>;
  }

  if (error) {
    return <div className="admin-ruta-error">{error}</div>;
  }

  return (
    <div className="admin-ruta-manager">
      {selectedRuta ? (
        <div className="admin-ruta-form-container">
          <h2>Editando la ruta {selectedRuta.nombre}</h2>
          <AdminRutaForm ruta={selectedRuta} onSubmit={handleFormSubmit} />
          <button className="cancel-btn" onClick={() => setSelectedRuta(null)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h2>Lista de Rutas</h2>
          <table className="admin-ruta-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Provincia</th>
                <th>Dificultad</th>
                <th>Distancia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rutas.map((ruta) => (
                <tr key={ruta.id}>
                  <td>{ruta.id}</td>
                  <td>{ruta.nombre}</td>
                  <td>{ruta.provincia}</td>
                  <td>{ruta.dificultad}</td>
                  <td>{ruta.distancia} km</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditClick(ruta)}>Editar</button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(ruta.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminRutaManager;
