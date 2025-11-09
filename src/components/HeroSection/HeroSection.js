import React, { useMemo } from 'react';
import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import Slider from 'react-slick';
import './HeroSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroSection = ({ title, subtitle, images = [] }) => {
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  const particlesConfig = useMemo(() => ({
    background: {
      color: {
        value: "transparent",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: -1,
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "destroy",
        },
        random: false,
        speed: 0.3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40,
      },
      opacity: {
        value: 0.2,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
  }), []);

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
  const showParticles = !hasImages; // Solo mostrar partículas si no hay imágenes
  const showContent = !hasImages; // Solo mostrar texto si no hay imágenes

  return (
    <section className="hero-section">
      {/* Carrusel de imágenes de fondo si hay imágenes */}
      {hasImages && (
        <div className="hero-carousel-wrapper">
          <Slider {...carouselSettings} className="hero-carousel">
            {images.map((image, index) => (
              <div key={index} className="hero-carousel-slide">
                <div 
                  className="hero-carousel-image" 
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="hero-carousel-overlay"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      
      {/* Partículas animadas - solo si no hay imágenes */}
      {showParticles && (
        <div className="hero-particles-wrapper">
          <Particles
            id={`tsparticles-${title.replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`}
            init={particlesInit}
            options={particlesConfig}
            className="hero-particles"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
            }}
          />
        </div>
      )}
      
      {/* Contenido del hero (título y subtítulo) - solo si no hay imágenes */}
      {showContent && (
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        </div>
      )}
    </section>
  );
};

export default HeroSection;

