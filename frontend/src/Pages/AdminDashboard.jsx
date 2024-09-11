import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Panel de Administración</h1>
      </div>
      <ul className="admin-dashboard-list">
        <li>
          <Link className="admin-link" to="/admin/rutas">Gestionar Rutas</Link>
        </li>
        <li>
          <Link className="admin-link" to="/admin/usuarios">Gestionar Usuarios</Link>
        </li>
        <li>
          <Link className="admin-link" to="/admin/comentarios">Gestionar Comentarios</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
