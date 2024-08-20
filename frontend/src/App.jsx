import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Registro";
import Home from "./Pages/Home";
import Rutas from "./Pages/Rutas";
import Contacto from "./Pages/Contacto";
import Profile from "./Pages/Profile";

import Layout from "./Components/Layout";
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
