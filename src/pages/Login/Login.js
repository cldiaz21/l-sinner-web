import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { authService } from '../../services/authService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verificar si ya está autenticado
  useEffect(() => {
    const checkSession = async () => {
      const { session } = await authService.getSession();
      if (session) {
        navigate('/admin');
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await authService.signIn(email, password);

      if (authError) {
        setError(authError.message || 'Credenciales incorrectas');
        setLoading(false);
        return;
      }

      if (data?.session) {
        navigate('/admin');
      } else {
        setError('No se pudo iniciar sesión. Por favor, intenta de nuevo.');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background */}
      <div className="login-background"></div>

      {/* Login Card */}
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="logo-circle">
            <img src="/images/hero/logo.png" alt="L SINN3R" className="logo-image" />
          </div>
          <h1 className="company-name">L SINN3R</h1>
          <p className="company-subtitle">Panel de Administración</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="login-form">
          {error && (
            <div className="alert-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={18} />
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={18} />
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
