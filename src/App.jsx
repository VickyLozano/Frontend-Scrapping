import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<h1>Home - Bienvenido</h1>} />
        {/* Puedes agregar más rutas luego, como Home */}
      </Routes>
    </Router>
  );
}

export default App;




