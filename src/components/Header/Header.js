import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';
import FlowingMenu from '../FlowingMenu/FlowingMenu';
import './Header.css';

const Header = () => {
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const [menuItems, setMenuItems] = useState([]);

  // Crear items del menú
  useEffect(() => {
    const items = [
      { 
        link: '/', 
        text: t.home || 'Home'
      },
      { 
        link: '/identidad-sinners', 
        text: t.identidad || 'Identidad'
      },
      { 
        link: '/proyectos', 
        text: t.proyectos || 'Proyectos'
      },
      { 
        link: '/quienes-somos', 
        text: t.quienesSomos || 'Quienes Somos'
      },
      { 
        link: '/contacto', 
        text: t.contacto || 'Contacto'
      }
    ];

    setMenuItems(items);
  }, [t]);


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
      logoUrl="/images/hero/logo.png"
    >
      <FlowingMenu items={menuItems} />
    </StaggeredMenu>
  );
};

export default Header;
