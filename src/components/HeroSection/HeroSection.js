import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Particles from '../BackgroundAnimations/Particles';
import Prism from '../BackgroundAnimations/Prism';
import Beams from '../BackgroundAnimations/Beams';
import Silk from '../BackgroundAnimations/Silk';
import Lightning from '../BackgroundAnimations/Lightning';
import './HeroSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroSection = ({ title, subtitle, images = [], animationType = 'particles' }) => {
  const heroImageRefs = useRef({});

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false,
    arrows: false,
    cssEase: 'linear'
  };

  const hasImages = images && images.length > 0;

  // Efecto de scroll parallax para las imágenes del hero
  useEffect(() => {
    if (!hasImages) return;

    const handleScroll = () => {
      Object.keys(heroImageRefs.current).forEach((key) => {
        const imageElement = heroImageRefs.current[key];
        
        if (!imageElement) return;

        const rect = imageElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calcular el porcentaje de scroll dentro del elemento
        // Cuando el elemento está completamente visible, scrollProgress = 1
        // Cuando está fuera de vista arriba, scrollProgress = 0
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (elementHeight + windowHeight)));
        
        // Calcular el desplazamiento del background
        // La imagen es 150% de altura, así que puede moverse un 50% adicional
        const imageHeight = imageElement.offsetHeight;
        const containerHeight = windowHeight;
        const maxTranslate = imageHeight - containerHeight;
        const translateY = -scrollProgress * maxTranslate * 1.5; // Factor de velocidad aumentado
        
        // Aplicar transform al elemento con background-image
        imageElement.style.transform = `translateY(${translateY}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Llamar una vez para establecer el estado inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasImages, images]);

  // Función para renderizar animaciones de fondo
  const renderBackgroundAnimation = () => {
    if (hasImages) return null; // Si hay imágenes, no mostrar animación

    switch (animationType) {
      case 'particles':
        return (
          <div className="hero-particles-wrapper" style={{ pointerEvents: 'none' }}>
            <Particles 
              particleCount={50}
              speed={0.5}
              particleColors={['#ffffff', '#ffffff', '#ffffff']}
              moveParticlesOnHover={false}
            />
          </div>
        );
      case 'prism':
        return (
          <div style={{ pointerEvents: 'none' }}>
            <Prism />
          </div>
        );
      case 'beams':
        return (
          <div style={{ pointerEvents: 'none' }}>
            <Beams />
          </div>
        );
      case 'silk':
        return (
          <div style={{ pointerEvents: 'none' }}>
            <Silk />
          </div>
        );
      case 'lightning':
        return (
          <div style={{ pointerEvents: 'none' }}>
            <Lightning />
          </div>
        );
      default:
        return (
          <div className="hero-particles-wrapper" style={{ pointerEvents: 'none' }}>
            <Particles 
              particleCount={50}
              speed={0.5}
              particleColors={['#ffffff', '#ffffff', '#ffffff']}
              moveParticlesOnHover={false}
            />
          </div>
        );
    }
  };

  // Si no hay imágenes ni animación, no mostrar nada
  if (!hasImages && !animationType) {
    return null;
  }

  return (
    <section className="hero-section">
      {/* Animaciones de fondo (solo si no hay imágenes) */}
      {renderBackgroundAnimation()}
      
      {/* Carrusel de imágenes de fondo (solo si hay imágenes) */}
      {hasImages && (
        <div className="hero-carousel-wrapper">
          <Slider {...carouselSettings} className="hero-carousel">
            {images.map((image, index) => (
              <div key={index} className="hero-carousel-slide">
                <div 
                  className="hero-carousel-image" 
                  ref={(el) => {
                    if (el) {
                      heroImageRefs.current[`hero-${index}`] = el;
                    }
                  }}
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="hero-carousel-overlay"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Contenido del hero (título y subtítulo) - Siempre visible */}
      {(title || subtitle) && (
        <div className="hero-content">
          {title && <h1 className="hero-title">{title}</h1>}
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        </div>
      )}
    </section>
  );
};

export default HeroSection;

