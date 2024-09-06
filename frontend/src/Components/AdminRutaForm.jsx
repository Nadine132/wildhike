import React, { useState } from 'react';
import '../styles/AdminRutaForm.css';

const AdminRutaForm = ({ ruta, onSubmit }) => {
  const [nombre, setNombre] = useState(ruta?.nombre || '');
  const [provincia, setProvincia] = useState(ruta?.provincia || '');
  const [dificultad, setDificultad] = useState(ruta?.dificultad || '');
  const [distancia, setDistancia] = useState(ruta?.distancia || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRutaData = {
      id: ruta.id,
      nombre,
      provincia,
      dificultad,
      distancia,
    };

    onSubmit(updatedRutaData);
  };

  return (
    <form className="admin-ruta-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="provincia">Provincia:</label>
        <input
          type="text"
          id="provincia"
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
          placeholder="Provincia"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dificultad">Dificultad:</label>
        <input
          type="text"
          id="dificultad"
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          placeholder="Dificultad"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="distancia">Distancia (km):</label>
        <input
          type="number"
          id="distancia"
          value={distancia}
          onChange={(e) => setDistancia(e.target.value)}
          placeholder="Distancia (km)"
          required
        />
      </div>

      <button className="submit-btn" type="submit">Actualizar Ruta</button>
    </form>
  );
};

export default AdminRutaForm;
