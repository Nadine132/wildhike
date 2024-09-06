import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/AdminComentarioManager.css";

const AdminComentarioManager = () => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        alert('Comentario eliminado correctamente');

        const response = await axios.get('http://localhost:3000/api/admin/comentarios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setComentarios(response.data);
      } catch (error) {
        console.error('Error al eliminar el comentario:', error);
        alert('Hubo un error al eliminar el comentario.');
      }
    }
  };

  if (loading) {
    return <div>Cargando comentarios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
    </div>
  );
};

export default AdminComentarioManager;
