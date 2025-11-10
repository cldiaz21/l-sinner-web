import React, { useCallback, useLayoutEffect, useRef, useState, useContext } from 'react';
import { gsap } from 'gsap';
import { LanguageContext } from '../../context/LanguageContext';
import './StaggeredMenu.css';

export const StaggeredMenu = ({
  position = 'right',
  colors = ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#fff',
  changeMenuColorOnOpen = true,
  isFixed = true,
  onMenuOpen,
  onMenuClose,
  language: propLanguage,
  onChangeLanguage,
  children
}) => {
  const languageContext = useContext(LanguageContext);
  const currentLanguage = propLanguage || languageContext?.language || 'es';
  const t = languageContext?.t || {};
  
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const toggleBtnRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      if (!plusH || !plusV || !icon) return;

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const playOpen = useCallback(() => {
    // Menu opened
  }, []);

  const playClose = useCallback(() => {
    // Menu closed
  }, []);

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current;
    if (!icon) return;
    if (opening) {
      gsap.set(icon, { rotate: 45 });
    } else {
      gsap.set(icon, { rotate: 0 });
    }
  }, []);

  const animateColor = useCallback(opening => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    if (changeMenuColorOnOpen) {
      const targetColor = opening ? openMenuButtonColor : menuButtonColor;
      gsap.set(btn, { color: targetColor });
    } else {
      gsap.set(btn, { color: menuButtonColor });
    }
  }, [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]);

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  // Removido animateText ya que no usamos el carrusel de texto


  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    
    // Prevenir scroll del body cuando el menú está abierto
    if (target) {
      document.body.style.overflow = 'hidden';
      onMenuOpen?.();
      playOpen();
    } else {
      document.body.style.overflow = '';
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

  // Escuchar evento global para cerrar el menú
  React.useEffect(() => {
    const handleCloseMenuEvent = () => {
      if (openRef.current) {
        toggleMenu();
      }
    };
    window.addEventListener('closeMenu', handleCloseMenuEvent);
    return () => {
      window.removeEventListener('closeMenu', handleCloseMenuEvent);
    };
  }, [toggleMenu]);

  // Limpiar el overflow del body cuando el componente se desmonta
  React.useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleLanguageChange = (lang) => {
    if (onChangeLanguage) {
      onChangeLanguage(lang);
    } else if (languageContext?.changeLanguage) {
      languageContext.changeLanguage(lang);
    }
  };

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper'}
      style={accentColor ? { '--sm-accent': accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <div className="sm-logo" aria-label="Logo">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              className="sm-logo-img"
              draggable={false}
              width={110}
              height={24}
            />
          ) : (
            <span className="sm-logo-text">L SINN3R</span>
          )}
        </div>
        <div className="sm-header-right">
          {(onChangeLanguage || languageContext?.changeLanguage) && (
            <ul className="links-language">
              <li>
                <button
                  className={`link-language ${currentLanguage === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                  type="button"
                >
                  ENG
                </button>
              </li>
              <li><span className="separate-item-menu">/</span></li>
              <li>
                <button
                  className={`link-language ${currentLanguage === 'es' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('es')}
                  type="button"
                >
                  ESP
                </button>
              </li>
            </ul>
          )}
          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={open ? (t.menuClose || 'Cerrar menú') : (t.menuOpen || 'Abrir menú')}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span ref={plusHRef} className="sm-icon-line" />
              <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <aside 
          id="staggered-menu-panel" 
          ref={panelRef} 
          className="staggered-menu-panel" 
          aria-hidden={false}
          style={{ display: 'flex' }}
        >
          <button
            className="sm-close-button"
            onClick={toggleMenu}
            aria-label={t.menuClose || 'Cerrar menú'}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="sm-panel-inner">
            {children}
          </div>
        </aside>
      )}
    </div>
  );
};

export default StaggeredMenu;
