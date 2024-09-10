import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Comentarios = ({ rutaId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [newComentario, setNewComentario] = useState('');
  const [page, setPage] = useState(1);

  const userId = localStorage.getItem("userId"); // Verifica que `userId` esté correctamente definido

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
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token available");
      }

      const comentarioData = {
        comentario: newComentario,
        ruta_id: rutaId,
        usuario_id: userId || null,
      };

      await axios.post('http://localhost:3000/api/comentarios', comentarioData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    <Box mt={4} sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
        Comentarios
      </Typography>
      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <Card key={comentario.id} variant="outlined" sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {comentario.usuario ? comentario.usuario.nombreDeUsuario : 'Anónimo'} - {new Date(comentario.fecha).toLocaleString()}
              </Typography>
              <Typography variant="body1" mt={1} sx={{ color: '#444' }}>
                {comentario.comentario}
              </Typography>
              {userId && parseInt(userId, 10) === comentario.usuario_id && ( // Comparar como enteros
                <Box display="flex" justifyContent="flex-end" mt={1}>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteComentario(comentario.id)}
                    sx={{
                      color: '#fff',
                      backgroundColor: '#f44336', // Color de fondo rojo
                      '&:hover': { 
                        backgroundColor: '#c62828', // Color rojo oscuro al pasar el cursor
                      },
                      borderRadius: '50%',
                      padding: '8px',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No hay comentarios aún.</Typography>
      )}

      <Box mt={3}>
        <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
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
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00796b',
              '&:hover': { backgroundColor: '#004d40' },
              borderRadius: 20,
            }}
            onClick={handleAddComentario}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Comentarios;
