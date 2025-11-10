import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import ContactForm from '../../components/ContactForm/ContactForm';
import './QuienesSomos.css';

const QuienesSomos = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="page-container">
      <HeroSection 
        title={t.quienesSomos || "Quienes Somos"} 
        subtitle={t.quienesSomosSubtitle || "Sobre mí — Álvaro Meza / L SINN3R"}
        animationType="particles"
      />
      <section className="quienes-somos-section">
        <Container>
          {/* Cita Principal */}
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="quote-block">
                <p className="main-quote">
                  "Solo quien ha caído en la sombras puede retratar la luz"
                </p>
                <p className="secondary-quote">
                  El mundo no me hará una mala persona
                </p>
              </div>
            </Col>
          </Row>

          {/* Sección de Álvaro Meza - Full Width */}
          <div className="alvaro-meza-section">
            <Container>
              <Row className="alvaro-meza-row">
                <Col lg={5} md={6} className="alvaro-photo-col">
                  <div className="alvaro-photo-wrapper">
                    <img 
                      src="/images/alvaromeza.jpg" 
                      alt="Álvaro Meza - Fundador de L SINN3R" 
                      className="alvaro-photo"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Álvaro+Meza';
                      }}
                    />
                  </div>
                </Col>
                <Col lg={7} md={6} className="alvaro-content-col">
                  <div className="alvaro-content">
                    <h2 className="alvaro-title">Sobre mí</h2>
                    <h3 className="alvaro-name">Álvaro Meza</h3>
                    <div className="alvaro-text">
                      <p>
                        Soy Álvaro Meza, estudiante de Publicidad y creador detrás de L SINN3R. Mi propósito es transformar ideas en experiencias visuales, desarrollando cada proyecto desde un enfoque conceptual que une mi formación publicitaria con mis pasiones: el arte, la música, lo audiovisual y la fotografía.
                      </p>
                      <p>
                        En cada trabajo busco transmitir una historia, una emoción y una estética propia, dejando siempre una parte de mí en lo que hago. Para mí, la creatividad es un puente entre lo que imaginamos y lo que podemos hacer sentir a los demás.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          {/* Sección L-SINN3R */}
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="content-block">
                <p className="l-sinner-intro">
                  L-SINN3R representa la dualidad entre la perfección y lo imperfecto, entre las luces y las sombras que habitan en cada proceso creativo.
                </p>
                <p className="l-sinner-text">
                  Nace desde la idea de que el arte no busca ser correcto, sino real, humano y emocional.
                </p>
              </div>
            </Col>
          </Row>

          {/* Sección Visión */}
          <Row className="vision-row">
            <Col lg={10} className="mx-auto">
              <div className="vision-block">
                <h2 className="section-title">
                  <span className="title-icon">💫</span>
                  NUESTRA VISIÓN
                </h2>
                <p className="section-text">
                  Creemos en la creación visual como medio de expresión y conexión emocional, capaz de transformar ideas en experiencias estéticas con propósito. En L-SINN3R construimos un lenguaje donde la publicidad, el arte, la música y lo audiovisual convergen para generar impacto, identidad y emoción.
                </p>
                <p className="section-quote">
                  Detrás de cada proyecto hay una historia que no se cuenta, pero que se transmite a través de la obra final.
                </p>
              </div>
            </Col>
          </Row>

          {/* Sección Estilo */}
          <Row className="style-row">
            <Col lg={10} className="mx-auto">
              <div className="style-block">
                <h2 className="section-title">
                  <span className="title-icon">🎭</span>
                  NUESTRO ESTILO
                </h2>
                <p className="section-text">
                  Nuestro estilo se define por la autenticidad, la sensibilidad artística y la búsqueda constante de nuevas perspectivas. No seguimos fórmulas: reinterpretamos lo visual desde lo conceptual, fusionando distintas disciplinas para crear piezas únicas que hablan por sí mismas.
                </p>
                <p className="section-quote">
                  Cada trabajo es un espacio donde la estética y la emoción se encuentran para dejar una huella real.
                </p>
              </div>
            </Col>
          </Row>

          {/* Sección Misión */}
          <Row className="mission-row">
            <Col lg={10} className="mx-auto">
              <div className="mission-block">
                <h2 className="section-title">
                  <span className="title-icon">🔥</span>
                  NUESTRA MISIÓN
                </h2>
                <p className="section-text">
                  Nuestra misión es dar forma a las ideas y convertirlas en arte, creando proyectos que combinen estética, concepto y emoción. Desde campañas y piezas audiovisuales hasta dirección creativa o fotografía, buscamos que cada obra cuente sin palabras, transmitiendo aquello que solo puede sentirse.
                </p>
                <p className="section-quote">
                  L-SINN3R existe para crear desde la pasión, conectar desde la autenticidad y dejar una parte de sí en cada historia visual.
                </p>
              </div>
            </Col>
          </Row>

          {/* Sección Valores */}
          <Row className="values-row">
            <Col lg={10} className="mx-auto">
              <div className="values-block">
                <h2 className="section-title">
                  <span className="title-icon">⚔️</span>
                  VALORES L-SINN3R
                </h2>
                <Row>
                  <Col md={6} lg={4}>
                    <div className="value-item">
                      <h3 className="value-title">1. Autenticidad</h3>
                      <p className="value-text">
                        Crear desde la verdad. Cada obra nace de experiencias reales, emociones honestas y una mirada que no teme mostrar lo que otros esconden.
                      </p>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="value-item">
                      <h3 className="value-title">2. Imperfección</h3>
                      <p className="value-text">
                        Creemos en la belleza de lo imperfecto. En los errores, en lo humano y en la espontaneidad que convierte una idea en arte.
                      </p>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="value-item">
                      <h3 className="value-title">3. Rebelión Creativa</h3>
                      <p className="value-text">
                        Romper moldes, cuestionar lo establecido y transformar lo común en algo único. Ser un sinner es atreverse a crear sin pedir permiso.
                      </p>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="value-item">
                      <h3 className="value-title">4. Conexión Emocional</h3>
                      <p className="value-text">
                        Cada proyecto busca tocar, no solo gustar. Lo importante no es lo que se ve, sino lo que se siente.
                      </p>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="value-item">
                      <h3 className="value-title">5. Estética con Propósito</h3>
                      <p className="value-text">
                        No buscamos solo lo visualmente atractivo, sino aquello que transmite significado y deja una huella.
                      </p>
                    </div>
                  </Col>
                  <Col md={6} lg={4}>
                    <div className="value-item">
                      <h3 className="value-title">6. Dualidad</h3>
                      <p className="value-text">
                        Vivimos entre la luz y la sombra, entre lo correcto y lo caótico. De esa tensión nace nuestra visión: sincera, cruda y profundamente humana.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          {/* CTA */}
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="contact-cta mt-5 text-center">
                <h2>{t.ctaTitle || "¿Listo para trabajar juntos?"}</h2>
                <p>
                  {t.ctaText || "Si tienes un proyecto en mente o simplemente quieres conocer más sobre nuestro trabajo, no dudes en contactarnos."}
                </p>
                <Link to="/contacto" className="cta-button">
                  {t.ctaButton || "Contáctanos"}
                </Link>
              </div>
            </Col>
          </Row>
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

export default QuienesSomos;
