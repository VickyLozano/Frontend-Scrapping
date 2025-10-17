import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://localhost:3000/api/auth/validate", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
        else {
          localStorage.removeItem("token");
          navigate("/");
        }
      })
      .catch(() => navigate("/"));
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>ScrappingSIMA</h2>
        </div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Cursos</li>
            <li>Calendario</li>
            <li>Mensajes</li>
          </ul>
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-content">
        <header className="topbar">
          <div>
            <h1>Hola, {user?.username || "Usuario"} </h1>
            <p>Aquí tienes un resumen de tu progreso académico.</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
        </header>

        <main className="dashboard-main">
          {/* Próximos eventos */}
          <section className="events-section">
            <h2>Próximos Eventos</h2>
            <div className="events-grid">
              <div className="event-card">
                <h3>Entrega de Ensayo</h3>
                <p>Mañana, 15:30</p>
                <span>Seguridad de Software</span>
              </div>
              <div className="event-card">
                <h3>Evaluación de Arquitectura de Software</h3>
                <p>Viernes, 23:59</p>
                <span>Arquitectura de Software</span>
              </div>
              <div className="event-card">
                <h3>Foro de Programación Distribuida</h3>
                <p> Martes, 23:59</p>
                <span>Programación Distribuida</span>
              </div>
            </div>
          </section>

          {/* Mis cursos */}
          <section className="courses-section">
            <h2>Mis Cursos</h2>
            <div className="courses-grid">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course._id} className="course-card">
                    <h3>{course.name}</h3>
                    <p>{course.code}</p>
                  </div>
                ))
              ) : (
                <p className="no-courses">No hay cursos registrados.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
