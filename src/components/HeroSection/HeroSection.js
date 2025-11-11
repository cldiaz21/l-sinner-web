import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
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

  // Si no hay imágenes, no mostrar nada
  if (!hasImages) {
    return null;
  }


  return (
    <section className="hero-section">
      {/* Carrusel de imágenes de fondo */}
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
    </section>
  );
};

export default HeroSection;

