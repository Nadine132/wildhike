import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import FavoriteCardGrid from '../Components/FavoriteCardGrid';

function Profile() {
  const [user, setUser] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error('No se encontró el ID de usuario');
          navigate('/login');
          return;
        }

        const userResponse = await axios.get(`/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const favoritosResponse = await axios.get(`/favoritos/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(userResponse.data);
        setFavoritos(favoritosResponse.data);
      } catch (error) {
        console.error('Error fetching user profile or favorites:', error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user) return <div>Cargando perfil...</div>;

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user.nombreDeUsuario}</p>
      <p><strong>Correo:</strong> {user.email}</p>

      <h3>Rutas Favoritas:</h3>
      {favoritos.length > 0 ? (
        <FavoriteCardGrid favoritos={favoritos} />
      ) : (
        <p>No tienes rutas favoritas.</p>
      )}
    </div>
  );
}

export default Profile;
