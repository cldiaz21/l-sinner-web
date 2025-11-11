import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FlowingMenu.css';

function FlowingMenu({ items = [] }) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (link) {
      // Disparar evento para cerrar el menú
      window.dispatchEvent(new CustomEvent('closeMenu'));
      // Navegar después de un pequeño delay para que la animación de cierre se vea
      setTimeout(() => {
        navigate(link);
      }, 400);
    }
  };

  return (
    <div className="menu__item">
      <a 
        className="menu__item-link" 
        href={link || '#'} 
        onClick={handleClick}
      >
        {text}
      </a>
    </div>
  );
}

export default FlowingMenu;

