import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { getToken } from '../utils/auth';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();
        const response = await axios.get('/usuarios/profile', {
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
  }, []);

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
