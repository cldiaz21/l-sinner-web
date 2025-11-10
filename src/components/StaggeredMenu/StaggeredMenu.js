import React, { useCallback, useLayoutEffect, useRef, useState, useContext } from 'react';
import { gsap } from 'gsap';
import { LanguageContext } from '../../context/LanguageContext';
import './StaggeredMenu.css';

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#000000', '#1a1a1a'],
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
  isFixed = false,
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
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);

  // Inicializar elementos cuando el componente se monta
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      // Inicializar iconos
      if (plusH && plusV && icon) {
        gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
        gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
        gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      }

      // Inicializar texto
      if (textInner) {
        gsap.set(textInner, { yPercent: 0 });
      }

      // Inicializar botón
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }

      // Inicializar panel y prelayers si existen
      if (panel) {
        let preLayers = [];
        if (preContainer) {
          preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
        }
        preLayerElsRef.current = preLayers;

        const offscreen = position === 'left' ? -100 : 100;
        // Inicializar panel y prelayers fuera de la pantalla
        // Asegurar que pointer-events esté deshabilitado desde el inicio
        panel.style.pointerEvents = 'none';
        panel.setAttribute('aria-hidden', 'true');
        gsap.set(panel, { 
          xPercent: offscreen,
          autoAlpha: 0
        });
        preLayers.forEach(layer => {
          gsap.set(layer, {
            xPercent: offscreen,
            autoAlpha: 0
          });
        });
      }
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  // Efecto para resetear el estado cuando el menú se cierra
  React.useEffect(() => {
    if (!open) {
      const panel = panelRef.current;
      const layers = preLayerElsRef.current || [];
      if (panel) {
        const offscreen = position === 'left' ? -100 : 100;
        // Asegurar que pointer-events esté deshabilitado cuando está cerrado
        panel.style.pointerEvents = 'none';
        panel.setAttribute('aria-hidden', 'true');
        gsap.set(panel, { 
          xPercent: offscreen,
          autoAlpha: 0
        });
        layers.forEach(layer => {
          gsap.set(layer, {
            xPercent: offscreen,
            autoAlpha: 0
          });
        });
      }
    } else {
      // Cuando se abre, asegurar que pointer-events esté habilitado
      const panel = panelRef.current;
      if (panel) {
        panel.setAttribute('aria-hidden', 'false');
        // El pointer-events se establecerá en buildOpenTimeline
      }
    }
  }, [open, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current || [];
    if (!panel) {
      console.warn('Panel not found');
      return null;
    }

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;

    // Asegurar que el panel y los prelayers estén en el estado inicial correcto
    // Deshabilitar pointer-events cuando está cerrado
    gsap.set(panel, {
      xPercent: offscreen,
      autoAlpha: 0,
      pointerEvents: 'none'
    });
    
    layers.forEach(layer => {
      gsap.set(layer, {
        xPercent: offscreen,
        autoAlpha: 0
      });
    });

    // Configurar estados iniciales de los elementos internos
    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10, opacity: 0 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    // Animar prelayers primero
    if (layers.length > 0) {
      layers.forEach((layer, i) => {
        tl.to(
          layer, 
          { 
            xPercent: 0, 
            autoAlpha: 1,
            duration: 0.5, 
            ease: 'power4.out' 
          }, 
          i * 0.07
        );
      });
    }

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    // Animar panel
    // Primero asegurar que pointer-events esté habilitado
    if (panel) {
      panel.style.pointerEvents = 'auto';
      panel.setAttribute('aria-hidden', 'false');
    }
    
    tl.to(
      panel,
      { 
        xPercent: 0, 
        autoAlpha: 1,
        duration: panelDuration, 
        ease: 'power4.out' 
      },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    
    // Pequeño delay para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const tl = buildOpenTimeline();
      if (tl) {
        tl.eventCallback('onComplete', () => {
          busyRef.current = false;
        });
        tl.play(0);
      } else {
        console.warn('Failed to build open timeline');
        busyRef.current = false;
        // Fallback: mostrar el panel directamente
        const panel = panelRef.current;
        if (panel) {
          gsap.to(panel, { 
            xPercent: 0, 
            autoAlpha: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
    });
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      autoAlpha: 0,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        // Deshabilitar pointer-events cuando está cerrado
        if (panel) {
          panel.style.pointerEvents = 'none';
          panel.setAttribute('aria-hidden', 'true');
        }
        
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10, opacity: 0 });
        }
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
    } else {
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  }, []);

  const animateColor = useCallback(
    opening => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

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

  const animateText = useCallback(opening => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    
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
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

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

  // Convertir items de FlowingMenu a formato de StaggeredMenu
  const menuItems = items.map((item, index) => ({
    label: item.text || item.label || '',
    ariaLabel: item.text || item.label || '',
    link: item.link || '#'
  }));

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={accentColor ? { '--sm-accent': accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#000000', '#1a1a1a'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>

      <header className="staggered-menu-header" aria-label="Main navigation header">
        <div className="sm-logo" aria-label="Logo">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              className="sm-logo-img"
              draggable={false}
              width={110}
              height={70}
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
            <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
              <span ref={textInnerRef} className="sm-toggle-textInner">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span ref={plusHRef} className="sm-icon-line" />
              <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
            </span>
          </button>
        </div>
      </header>

      <aside 
        id="staggered-menu-panel" 
        ref={panelRef} 
        className="staggered-menu-panel" 
        aria-hidden={!open}
        style={{ 
          display: 'flex',
          pointerEvents: open ? 'auto' : 'none'
        }}
      >
        <div className="sm-panel-inner">
          {children || (
            <>
              <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
                {menuItems && menuItems.length ? (
                  menuItems.map((it, idx) => (
                    <li className="sm-panel-itemWrap" key={it.label + idx}>
                      <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel} data-index={idx + 1}>
                        <span className="sm-panel-itemLabel">{it.label}</span>
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="sm-panel-itemWrap" aria-hidden="true">
                    <span className="sm-panel-item">
                      <span className="sm-panel-itemLabel">No items</span>
                    </span>
                  </li>
                )}
              </ul>

              {displaySocials && socialItems && socialItems.length > 0 && (
                <div className="sm-socials" aria-label="Social links">
                  <h3 className="sm-socials-title">{t.footerFollow || 'Socials'}</h3>
                  <ul className="sm-socials-list" role="list">
                    {socialItems.map((s, i) => (
                      <li key={s.label + i} className="sm-socials-item">
                        <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
