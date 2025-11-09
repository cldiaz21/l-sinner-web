import React from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import './FlowingMenu.css';

function FlowingMenu({ items = [] }) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} index={idx + 1} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, gradient, index }) {
  const navigate = useNavigate();
  const itemRef = React.useRef(null);

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

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div 
      className="menu__item" 
      ref={itemRef}
      style={{ 
        background: gradient || 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(20, 20, 20, 0.5) 100%)'
      }}
    >
      <a 
        className="menu__item-link" 
        href={link || '#'} 
        onClick={handleClick}
      >
        <span className="menu__item-text">{text}</span>
        <span className="menu__item-number">{formatNumber(index)}</span>
      </a>
    </div>
  );
}

export default FlowingMenu;

