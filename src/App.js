import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import IdentidadSinners from './pages/IdentidadSinners/IdentidadSinners';
import Proyectos from './pages/Proyectos/Proyectos';
import QuienesSomos from './pages/QuienesSomos/QuienesSomos';
import Contacto from './pages/Contacto/Contacto';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import { ProjectProvider } from './context/ProjectContext';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

// Componente para proteger la ruta de Admin
const ProtectedAdmin = () => {
  const isAuthenticated = localStorage.getItem('lSinnerAdmin') === 'authenticated';
  return isAuthenticated ? <Admin /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <LanguageProvider>
      <ProjectProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/identidad-sinners" element={<IdentidadSinners />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedAdmin />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ProjectProvider>
    </LanguageProvider>
  );
}

export default App;

