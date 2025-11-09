import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProjectContext } from '../../context/ProjectContext';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import ProjectsCarousel from '../../components/ProjectsCarousel/ProjectsCarousel';
import SocialMedia from '../../components/SocialMedia/SocialMedia';
import ContactForm from '../../components/ContactForm/ContactForm';
import './Home.css';

const Home = () => {
  const { getFeaturedProjects } = useContext(ProjectContext);
  const { t } = useContext(LanguageContext);
  const featuredProjects = getFeaturedProjects();

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
        subtitle={t.heroSubtitleHome || "Fotografía Profesional"}
        images={heroImages}
      />

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
                <h2 className="section-title">{t.descriptionTitle || "L SINN3R"}</h2>
                <p className="description-text">
                  {t.descriptionText1 || "L SINN3R es un fotógrafo profesional especializado en capturar momentos únicos y transformarlos en arte visual. Con una visión creativa y un estilo distintivo, cada proyecto es una oportunidad para contar una historia a través de la lente."}
                </p>
                <p className="description-text">
                  {t.descriptionText2 || "Nuestro trabajo abarca desde sesiones de retrato hasta proyectos comerciales, siempre manteniendo la calidad y la autenticidad que nos caracteriza."}
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

