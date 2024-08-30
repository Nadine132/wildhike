import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

function Profile() {
  const [user, setUser] = useState(null);
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

        const response = await axios.get(`/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
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
    </div>
  );
}

export default Profile;
