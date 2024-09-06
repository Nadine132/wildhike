import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken, decodeToken } from '../utils/auth';

const AdminRoute = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  const user = decodeToken(token);

  if (user?.rol !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
