import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { getToken } from '../utils/auth';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function FavoriteButton({ rutaId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritoId, setFavoritoId] = useState(null);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const token = getToken();
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error('No se encontró el ID de usuario');
          return;
        }

        const response = await axios.get(`/favoritos?usuario_id=${userId}&ruta_id=${rutaId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.length > 0) {
          setIsFavorite(true);
          setFavoritoId(response.data[0].id);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error('Error checking if favorite:', error);
      }
    };

    checkIfFavorite();
  }, [rutaId]);

  const handleToggleFavorite = async () => {
    const token = getToken();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error('No se encontró el ID de usuario');
      return;
    }

    try {
      if (isFavorite) {
        // Eliminar
        await axios.delete(`/favoritos/${favoritoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFavorite(false);
        setFavoritoId(null);
      } else {
        // Añadir
        const response = await axios.post('/favoritos', {
          usuario_id: userId,
          ruta_id: rutaId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFavorite(true);
        setFavoritoId(response.data.id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button onClick={handleToggleFavorite} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      {isFavorite ? (
        <AiFillHeart color="red" size={24} />
      ) : (
        <AiOutlineHeart color="gray" size={24} />
      )}
    </button>
  );
}

export default FavoriteButton;
