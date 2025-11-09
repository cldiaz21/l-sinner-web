import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProjectContext } from '../../context/ProjectContext';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import ProjectGrid from '../../components/ProjectGrid/ProjectGrid';
import SocialMedia from '../../components/SocialMedia/SocialMedia';
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
        title="L SINNER" 
        subtitle={t.heroSubtitleHome || "Fotografía Profesional"}
        images={heroImages}
      />

      {/* Descripción de L SINNER */}
      <section className="description-section">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="section-title">{t.descriptionTitle || "L SINNER"}</h2>
              <p className="description-text">
                {t.descriptionText1 || "L SINNER es un fotógrafo profesional especializado en capturar momentos únicos y transformarlos en arte visual. Con una visión creativa y un estilo distintivo, cada proyecto es una oportunidad para contar una historia a través de la lente."}
              </p>
              <p className="description-text">
                {t.descriptionText2 || "Nuestro trabajo abarca desde sesiones de retrato hasta proyectos comerciales, siempre manteniendo la calidad y la autenticidad que nos caracteriza."}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Proyectos Destacados */}
      <section className="projects-section">
        <Container>
          <h2 className="section-title">{t.featuredProjectsTitle || "Proyectos Destacados"}</h2>
          <ProjectGrid projects={featuredProjects} limit={6} />
        </Container>
      </section>

      {/* Redes Sociales */}
      <section className="social-section">
        <Container>
          <SocialMedia />
        </Container>
      </section>
    </div>
  );
};

export default Home;

