import React, { useState } from 'react';
import '../styles/AdminUserForm.css';

const AdminUserForm = ({ user, onSubmit }) => {
  const [nombreDeUsuario, setNombreDeUsuario] = useState(user?.nombreDeUsuario || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState(user?.rol || 'user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      id: user.id,
      nombreDeUsuario,
      email,
      rol,
      ...(password && { password }),
    };

    onSubmit(updatedUserData);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-user-form">
      <input
        type="text"
        value={nombreDeUsuario}
        onChange={(e) => setNombreDeUsuario(e.target.value)}
        placeholder="Nombre de Usuario"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo Electrónico"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña (opcional)"
      />
      <select value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit">Actualizar Usuario</button>
    </form>
  );
};

export default AdminUserForm;
