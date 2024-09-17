import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material'; // Importa Snackbar y Alert de Material UI
import "../styles/AdminComentarioManager.css";

const AdminComentarioManager = () => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchComentarios = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/admin/comentarios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setComentarios(response.data);
      } catch (err) {
        console.error('Error al obtener comentarios:', err);
        setError('Hubo un error al obtener la lista de comentarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchComentarios();
  }, []);

  const handleDeleteClick = async (comentarioId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/comentarios/${comentarioId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSnackbar({ open: true, message: 'Comentario eliminado correctamente', severity: 'success' });

        const response = await axios.get('http://localhost:3000/api/admin/comentarios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setComentarios(response.data);
      } catch (error) {
        console.error('Error al eliminar el comentario:', error);
        setSnackbar({ open: true, message: 'Hubo un error al eliminar el comentario.', severity: 'error' });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <div className="loading">Cargando comentarios...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-comentarios-container">
      <h2>Lista de Comentarios</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Comentario</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {comentarios.map((comentario) => (
            <tr key={comentario.id}>
              <td>{comentario.id}</td>
              <td>{comentario.usuario?.nombreDeUsuario || 'Anónimo'}</td>
              <td>{comentario.comentario}</td>
              <td>{new Date(comentario.fecha).toLocaleString()}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(comentario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminComentarioManager;
