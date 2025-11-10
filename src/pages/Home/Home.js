import React, { useContext, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProjectContext } from '../../context/ProjectContext';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import ProjectsCarousel from '../../components/ProjectsCarousel/ProjectsCarousel';
import SocialMedia from '../../components/SocialMedia/SocialMedia';
import ContactForm from '../../components/ContactForm/ContactForm';
import VariableProximity from '../../components/VariableProximity/VariableProximity';
import './Home.css';

const Home = () => {
  const { getFeaturedProjects } = useContext(ProjectContext);
  const { t } = useContext(LanguageContext);
  const featuredProjects = getFeaturedProjects();
  const quoteContainerRef = useRef(null);

  // Imágenes del hero (coloca tus imágenes JPG en public/images/hero/)
  const heroImages = [
    '/images/hero/hero-1.JPG',
    '/images/hero/hero-2.jpg',
    '/images/hero/hero-3.JPG',
    '/images/hero/hero-4.JPG',
  ].filter(img => img); // Filtrar imágenes que no existan

  return (
    <div className="page-container">
      {/* Hero Section con carrusel de imágenes */}
      <HeroSection 
        title="L SINN3R" 
        subtitle={t.heroSubtitleHome || "Solo quien ha caído en la sombras puede retratar la luz"}
        images={heroImages}
      />

      {/* Cita Principal */}
      <section className="quote-hero-section" ref={quoteContainerRef}>
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="quote-hero-block">
                <p className="quote-hero-text">
                  <VariableProximity
                    label={'"' + (t.quoteText || 'El mundo no me hará una mala persona') + '"'}
                    containerRef={quoteContainerRef}
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    radius={150}
                    falloff="linear"
                    className="variable-proximity-quote"
                  />
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Descripción de L SINN3R */}
      <section className="description-section">
        <Container>
          <Row className="description-row">
            <Col lg={6} md={6} className="description-image-col">
              <img 
                src="/images/hero/logo.png" 
                alt="L SINN3R" 
                className="description-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x800/1a1a1a/ffffff?text=L+SINN3R';
                }}
              />
            </Col>
            <Col lg={6} md={6} className="description-content-col">
              <div className="description-content">
                <p className="description-text">
                  {t.descriptionText1 || "L-SINN3R representa la dualidad entre la perfección y lo imperfecto, entre las luces y las sombras que habitan en cada proceso creativo."}
                </p>
                <p className="description-text">
                  {t.descriptionText2 || "Nace desde la idea de que el arte no busca ser correcto, sino real, humano y emocional. Creemos en la creación visual como medio de expresión y conexión emocional, capaz de transformar ideas en experiencias estéticas con propósito."}
                </p>
                <p className="description-text">
                  {t.descriptionText3 || "En L-SINN3R construimos un lenguaje donde la publicidad, el arte, la música y lo audiovisual convergen para generar impacto, identidad y emoción. Detrás de cada proyecto hay una historia que no se cuenta, pero que se transmite a través de la obra final."}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Proyectos Destacados - Carrusel */}
      <section className="projects-section">
        <Container>
          <h2 className="section-title">{t.featuredProjectsTitle || "Proyectos Destacados"}</h2>
          <ProjectsCarousel projects={featuredProjects} />
        </Container>
      </section>

      {/* Redes Sociales */}
      <section className="social-section">
        <Container>
          <SocialMedia />
        </Container>
      </section>

      {/* Formulario de Contacto */}
      <section className="contact-section">
        <Container>
          <ContactForm />
        </Container>
      </section>
    </div>
  );
};

export default Home;
