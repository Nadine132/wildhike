import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminUserForm from './AdminUserForm';
import { Snackbar, Alert } from '@mui/material'; // Importamos Snackbar y Alert de Material UI
import '../styles/AdminUserManager.css';

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/admin/usuarios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error al obtener usuarios:', err);
        setError('Hubo un error al obtener la lista de usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSnackbar({ open: true, message: 'Usuario eliminado correctamente', severity: 'success' });
        
        const response = await axios.get('http://localhost:3000/api/admin/usuarios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        setSnackbar({ open: true, message: 'Hubo un error al eliminar el usuario.', severity: 'error' });
      }
    }
  };

  const handleFormSubmit = async (updatedUserData) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/usuarios/${updatedUserData.id}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSnackbar({ open: true, message: 'Usuario actualizado correctamente', severity: 'success' });
      setSelectedUser(null);

      const response = await axios.get('http://localhost:3000/api/admin/usuarios', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setSnackbar({ open: true, message: 'Hubo un error al actualizar el usuario.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-user-manager">
      {selectedUser ? (
        <div className="edit-user-container">
          <h2>Editando a {selectedUser.nombreDeUsuario}</h2>
          <AdminUserForm user={selectedUser} onSubmit={handleFormSubmit} />
          <button className="cancel-button" onClick={() => setSelectedUser(null)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h2>Lista de Usuarios</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de Usuario</th>
                <th>Correo Electrónico</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombreDeUsuario}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(user)}>Editar</button>
                    <button className="delete-button" onClick={() => handleDeleteClick(user.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
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

export default AdminUserManager;
