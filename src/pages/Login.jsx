import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success && data.token) {
        // Guardar el token en memoria (usando una variable o contexto)
        // NUNCA usar localStorage para tokens en producción
        console.log("Token recibido:", data.token);
        
        localStorage.setItem("token", data.token);
        
        setErrorMessage("");
        alert("Inicio de sesión exitoso ✅");
        navigate("/home");
      } else {
        setErrorMessage(`❌ ${data.error || data.message || "Error al iniciar sesión"}`);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrorMessage("❌ Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (

    
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>

        <label>Nombre de usuario</label>
        <input
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <p className="forgot-password">
         <a href="#">¿Olvidaste tu contraseña?</a>
        </p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>

        <p className="register-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>

      </form>
    </div>
  );
}

export default Login;



