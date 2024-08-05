import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Rutas from "./Pages/Rutas";
import Contacto from "./Pages/Contacto";

import Layout from "./Components/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rutas" element={<Rutas />} />
            <Route path="/contacto" element={<Contacto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
