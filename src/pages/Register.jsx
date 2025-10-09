import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { GoEyeClosed } from "react-icons/go";
import "./Register.css";


export function Register({ onLoginClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [simaUsername, setSimaUsername] = useState("");
  const [simaPassword, setSimaPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSimaPassword, setShowSimaPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Requisitos de contraseña
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!requirements.length || !requirements.uppercase || !requirements.number || !requirements.special) {
      setMessage("❌ La contraseña no cumple los requisitos.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username, 
          password,
          simaUsername,
          simaPassword
        }),
      });

      const data = await response.json();
console.log(data);
      if (response.ok) {
        setMessage("✅ Registro exitoso. ¡Bienvenido!");
        setSuccess(true);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setSimaUsername("");
        setSimaPassword("");
      } else {
        setMessage(`❌ ${data.message || "Error al registrar usuario."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Crear una cuenta</h1>

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Crea tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <BiSolidShow /> :  <GoEyeClosed />}
          </span>
        </div>

        {/* Ventana de requisitos */}
        {passwordFocus && (
          <div className="password-requirements">
            <p><strong>La contraseña debe tener:</strong></p>
            <ul>
              <li className={requirements.length ? "valid" : "invalid"}>Al menos 8 caracteres</li>
              <li className={requirements.uppercase ? "valid" : "invalid"}>Una letra mayúscula</li>
              <li className={requirements.number ? "valid" : "invalid"}>Un número</li>
              <li className={requirements.special ? "valid" : "invalid"}>Un carácter especial</li>
            </ul>
          </div>
        )}

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Nombre de usuario SIMA"
          value={simaUsername}
          onChange={(e) => setSimaUsername(e.target.value)}
          required
        />

        <div className="password-container">
          <input
            type={showSimaPassword ? "text" : "password"}
            placeholder="Contraseña de SIMA"
            value={simaPassword}
            onChange={(e) => setSimaPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowSimaPassword(!showSimaPassword)}
            title={showSimaPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showSimaPassword ? <BiSolidShow /> :  <GoEyeClosed />}
          </span>
        </div>

        <button type="submit">Registrarme</button>

        {message && (
          <p className={`message ${success ? "success" : "error"}`}>{message}</p>
        )}

        <p className="switch-text">
          ¿Ya tienes una cuenta?{" "}
          <span className="link" onClick={() => navigate("/")}>
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
}








