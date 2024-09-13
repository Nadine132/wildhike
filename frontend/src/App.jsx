// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Registro';
import Home from './Pages/Home';
import Rutas from './Pages/Rutas';
import RouteDetails from './Pages/RouteDetails';
import Contacto from './Pages/Contacto';
import Profile from './Pages/Profile';
import Layout from './Components/Layout';
import PrivateRoute from './Components/PrivateRoute';
import AdminDashboard from './Pages/AdminDashboard';
import AdminRutaPage from './Pages/AdminRutaPage';
import AdminUserManagerPage from './Pages/AdminUserManagerPage';
import AdminComentarioManager from './Pages/AdminComentarioManager';
import AdminRoute from './Components/AdminRoute';

// Importa los estilos de slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/rutas/:id" element={<RouteDetails />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/profile/:id" element={<PrivateRoute element={<Profile />} />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/rutas" element={<AdminRutaPage />} />
            <Route path="/admin/usuarios" element={<AdminUserManagerPage />} />
            <Route path="/admin/comentarios" element={<AdminComentarioManager />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
