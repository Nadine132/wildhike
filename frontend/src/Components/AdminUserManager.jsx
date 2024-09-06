import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminUserForm from './AdminUserForm';
import '../styles/AdminUserManager.css';

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        alert('Usuario eliminado correctamente');
        
        const response = await axios.get('http://localhost:3000/api/admin/usuarios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        alert('Hubo un error al eliminar el usuario.');
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
      alert('Usuario actualizado correctamente');
      setSelectedUser(null);

      const response = await axios.get('http://localhost:3000/api/admin/usuarios', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert('Hubo un error al actualizar el usuario.');
    }
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
    </div>
  );
};

export default AdminUserManager;
