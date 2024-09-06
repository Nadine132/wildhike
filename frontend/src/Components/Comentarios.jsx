import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const Comentarios = ({ rutaId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [newComentario, setNewComentario] = useState('');
  const [page, setPage] = useState(1);

const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/rutas/${rutaId}/comentarios`, {
          params: { page }
        });
  
        if (response.data && Array.isArray(response.data.rows)) {
          setComentarios(response.data.rows);
        } else {
          console.error('La respuesta de la API no contiene un array de comentarios.');
        }
      } catch (error) {
        console.error('Error fetching comentarios:', error);
      }
    };
  
    fetchComentarios();
  }, [rutaId, page]);

  const handleAddComentario = async () => {
    try {
      const comentarioData = {
        comentario: newComentario,
        ruta_id: rutaId,
        usuario_id: userId || null,
      };
      
      console.log("Sending comentario data:", comentarioData);
      
      await axios.post('http://localhost:3000/api/comentarios', comentarioData); 
      setNewComentario('');
  
      const response = await axios.get(`http://localhost:3000/api/rutas/${rutaId}/comentarios`, {
        params: { page }
      });
  
      if (response.data && Array.isArray(response.data.rows)) {
        setComentarios(response.data.rows);
      } else {
        console.error('La respuesta de la API no contiene un array de comentarios.');
      }
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
    }
  };
  
  const handleDeleteComentario = async (comentarioId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token available");
      }
  
      await axios.delete(`http://localhost:3000/api/comentarios/${comentarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const response = await axios.get(`http://localhost:3000/api/rutas/${rutaId}/comentarios`, {
        params: { page },
      });
  
      if (response.data && Array.isArray(response.data.rows)) {
        setComentarios(response.data.rows);
      } else {
        console.error('La respuesta de la API no contiene un array de comentarios.');
      }
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
    }
  };
  
  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Comentarios
      </Typography>
      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <Box key={comentario.id} mb={2} p={2} sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="body2" color="textSecondary">
              {comentario.usuario ? comentario.usuario.nombreDeUsuario : 'Anónimo'} - {new Date(comentario.fecha).toLocaleString()}
            </Typography>
            <Typography variant="body1" mt={1}>
              {comentario.comentario}
            </Typography>
            {userId && userId == comentario.usuario_id && (
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteComentario(comentario.id)}>
                Eliminar
              </Button>
            )}
          </Box>
        ))
      ) : (
        <Typography>No hay comentarios aún.</Typography>
      )}

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Agregar un comentario
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Comentario"
          value={newComentario}
          onChange={(e) => setNewComentario(e.target.value)}
          multiline
          rows={4}
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleAddComentario}>
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Comentarios;
