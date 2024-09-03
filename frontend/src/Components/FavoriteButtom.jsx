import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { getToken } from '../utils/auth';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function FavoriteButton({ rutaId, onFavoriteChange }) {
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

        const response = await axios.get(`/favoritos/buscar?usuario_id=${userId}&ruta_id=${rutaId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.id) {
          setIsFavorite(true);
          setFavoritoId(response.data.id);
        } else {
          setIsFavorite(false);
          setFavoritoId(null);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsFavorite(false);
          setFavoritoId(null);
        } else {
          console.error('Error checking if favorite:', error);
        }
      }
    };

    checkIfFavorite();
  }, [rutaId]);

  const handleToggleFavorite = async (event) => {
    event.stopPropagation();

    const token = getToken();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error('No se encontró el ID de usuario');
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(`/favoritos/${favoritoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFavorite(false);
        setFavoritoId(null);
      } else {
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

      if (onFavoriteChange) {
        onFavoriteChange();
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
