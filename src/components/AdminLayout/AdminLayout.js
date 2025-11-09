import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { LayoutDashboard, Folder, Image as ImageIcon, LogOut, Menu, X, Home } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.signOut();
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { id: 'projects', label: 'Proyectos', icon: Folder, href: '/admin' },
    { id: 'carousel', label: 'Carrusel', icon: ImageIcon, href: '/admin' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <nav className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/images/hero/logo.png" alt="L SINN3R" className="sidebar-logo-img" />
            <span className="sidebar-logo-text">L SINN3R</span>
          </div>
          <button 
            className="sidebar-toggle-mobile"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-divider"></div>

        <ul className="sidebar-menu">
          <li>
            <a 
              href="/" 
              className="sidebar-menu-item"
              onClick={(e) => {
                e.preventDefault();
                window.open('/', '_blank');
              }}
            >
              <Home size={20} />
              <span>Ver Sitio Web</span>
            </a>
          </li>
          <li className="sidebar-divider-item"></li>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  className={`sidebar-menu-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer">
          <button className="sidebar-menu-item logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className={`admin-main ${sidebarOpen ? 'main-expanded' : 'main-collapsed'}`}>
        {/* Top Navigation Bar */}
        <header className="admin-header">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="admin-header-content">
            <h1 className="admin-header-title">Panel de Administración</h1>
            <div className="admin-header-user">
              <span>Administrador</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          {children}
        </main>
      </div>

      {/* Overlay for mobile - only shown on mobile devices */}
      <div 
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
        style={{ display: sidebarOpen ? 'block' : 'none' }}
      />
    </div>
  );
};

export default AdminLayout;

