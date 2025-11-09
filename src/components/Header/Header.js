import React, { useContext, useState, useEffect, useRef } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import { LanguageContext } from '../../context/LanguageContext';
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';
import FlowingMenu from '../FlowingMenu/FlowingMenu';
import './Header.css';

const Header = () => {
  const { getFeaturedProjects } = useContext(ProjectContext);
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItemsRef = useRef([]);

  // Obtener proyectos destacados para usar sus imágenes en el menú
  const featuredProjects = getFeaturedProjects();

  // Crear items del menú con gradientes en escala de grises
  useEffect(() => {
    const items = [
      { 
        link: '/', 
        text: t.home,
        gradient: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)'
      },
      { 
        link: '/identidad-sinners', 
        text: t.identidad,
        gradient: 'linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)'
      },
      { 
        link: '/proyectos', 
        text: t.proyectos,
        gradient: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(40, 40, 40, 0.8) 100%)'
      },
      { 
        link: '/quienes-somos', 
        text: t.quienesSomos,
        gradient: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%)'
      },
      { 
        link: '/contacto', 
        text: t.contacto,
        gradient: 'linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(30, 30, 30, 0.8) 100%)'
      }
    ];

    menuItemsRef.current = items;
  }, [t, featuredProjects]);


  return (
    <StaggeredMenu
      position="right"
      colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)']}
      menuButtonColor="#fff"
      openMenuButtonColor="#fff"
      accentColor="#fff"
      changeMenuColorOnOpen={true}
      isFixed={true}
      displayItemNumbering={false}
      displaySocials={false}
      language={language}
      onChangeLanguage={changeLanguage}
      onMenuOpen={() => {
        setMenuOpen(true);
      }}
      onMenuClose={() => {
        setMenuOpen(false);
      }}
    >
      <FlowingMenu items={menuItemsRef.current} />
    </StaggeredMenu>
  );
};

export default Header;
