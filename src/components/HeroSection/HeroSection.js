import React, { useMemo } from 'react';
import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import Slider from 'react-slick';
import Prism from '../BackgroundAnimations/Prism';
import Lightning from '../BackgroundAnimations/Lightning';
import ParticlesOGL from '../BackgroundAnimations/Particles';
import Beams from '../BackgroundAnimations/Beams';
import Silk from '../BackgroundAnimations/Silk';
import './HeroSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroSection = ({ title, subtitle, images = [], animationType = 'particles' }) => {
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
          value: "#000000",
        },
        links: {
          color: "#000000",
          distance: 150,
          enable: true,
          opacity: 0.2,
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
          value: 0.3,
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
  const showContent = !hasImages; // Solo mostrar texto si no hay imágenes

  // Renderizar la animación de fondo según el tipo
  const renderBackgroundAnimation = () => {
    if (hasImages) return null;
    
    switch (animationType) {
      case 'prism':
        return (
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
            <Prism
              animationType="hover"
              timeScale={0.8}
              height={3.5}
              baseWidth={5.5}
              scale={2.8}
              hueShift={0}
              colorFrequency={0.8}
              noise={0.3}
              glow={1.5}
              hoverStrength={3}
              inertia={0.08}
            />
          </div>
        );
      case 'lightning':
        return (
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
            <Lightning
              hue={210}
              xOffset={0}
              speed={1.5}
              intensity={1.2}
              size={1.5}
            />
          </div>
        );
      case 'beams':
        return (
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
            <Beams
              beamWidth={4}
              beamHeight={25}
              beamNumber={10}
              lightColor="#ffffff"
              speed={1.5}
              noiseIntensity={1.5}
              scale={0.3}
              rotation={0}
            />
          </div>
        );
      case 'silk':
        return (
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
            <Silk
              speed={5}
              scale={1}
              color="#ffffff"
              noiseIntensity={1.5}
              rotation={0}
            />
          </div>
        );
      case 'particles':
      default:
        return (
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
            <ParticlesOGL
              particleColors={['#ffffff', '#ffffff', '#cccccc']}
              particleCount={150}
              particleSpread={12}
              speed={0.15}
              particleBaseSize={120}
              moveParticlesOnHover={false}
              particleHoverFactor={2}
              alphaParticles={true}
              disableRotation={false}
            />
          </div>
        );
    }
  };

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
      
      {/* Animaciones de fondo según el tipo */}
      {!hasImages && renderBackgroundAnimation()}
      
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

