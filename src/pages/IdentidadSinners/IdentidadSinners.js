import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import ContactForm from '../../components/ContactForm/ContactForm';
import GlareHover from '../../components/GlareHover/GlareHover';
import MagicBento from '../../components/MagicBento/MagicBento';
import './IdentidadSinners.css';

const ValueFlipCard = ({ title, text }) => {
  const { t } = useContext(LanguageContext);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <GlareHover
      width="100%"
      height="100%"
      background="transparent"
      borderRadius="8px"
      borderColor="transparent"
      glareColor="#ffffff"
      glareOpacity={0.3}
      glareAngle={-30}
      glareSize={300}
      transitionDuration={800}
      playOnce={false}
      className="value-flip-card-wrapper"
    >
      <div className={`value-flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
        <div className="value-flip-card-inner">
          <div className="value-flip-card-front">
            <span className="flip-indicator">↻ {t.flipCardText || 'Click para voltear'}</span>
            <h3 className="value-title">{title}</h3>
          </div>
          <div className="value-flip-card-back">
            <span className="flip-indicator">↻ {t.flipCardText || 'Click para voltear'}</span>
            <p className="value-text">{text}</p>
          </div>
        </div>
      </div>
    </GlareHover>
  );
};

const IdentidadSinners = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="page-container">
      <HeroSection 
        title={t.identidad || "Identidad Sinners"} 
        subtitle={t.identidadSubtitle || "La dualidad entre la perfección y lo imperfecto"}
        animationType="lightning"
      />
      <section className="identidad-section">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="identidad-content">
                {/* Valores - Movidos arriba */}
                <div className="identidad-values values-block">
                  <h2 className="section-title">
                    {t.valuesTitle || 'VALORES L-SINN3R'}
                  </h2>
                  <Row>
                    <Col md={6} lg={4}>
                      <ValueFlipCard 
                        title={t.value1Title || 'Autenticidad'}
                        text={t.value1Text || 'Crear desde la verdad. Cada obra nace de experiencias reales, emociones honestas y una mirada que no teme mostrar lo que otros esconden.'}
                      />
                    </Col>
                    <Col md={6} lg={4}>
                      <ValueFlipCard 
                        title={t.value2Title || 'Imperfección'}
                        text={t.value2Text || 'Creemos en la belleza de lo imperfecto. En los errores, en lo humano y en la espontaneidad que convierte una idea en arte.'}
                      />
                    </Col>
                    <Col md={6} lg={4}>
                      <ValueFlipCard 
                        title={t.value3Title || 'Rebelión Creativa'}
                        text={t.value3Text || 'Romper moldes, cuestionar lo establecido y transformar lo común en algo único. Ser un sinner es atreverse a crear sin pedir permiso.'}
                      />
                    </Col>
                    <Col md={6} lg={4}>
                      <ValueFlipCard 
                        title={t.value4Title || 'Conexión Emocional'}
                        text={t.value4Text || 'Cada proyecto busca tocar, no solo gustar. Lo importante no es lo que se ve, sino lo que se siente.'}
                      />
                    </Col>
                    <Col md={6} lg={4}>
                      <ValueFlipCard 
                        title={t.value5Title || 'Estética con Propósito'}
                        text={t.value5Text || 'No buscamos solo lo visualmente atractivo, sino aquello que transmite significado y deja una huella.'}
                      />
                    </Col>
                    <Col md={6} lg={4}>
                      <ValueFlipCard 
                        title={t.value6Title || 'Dualidad'}
                        text={t.value6Text || 'Vivimos entre la luz y la sombra, entre lo correcto y lo caótico. De esa tensión nace nuestra visión: sincera, cruda y profundamente humana.'}
                      />
                    </Col>
                  </Row>
                </div>

                {/* Visión */}
                <MagicBento
                  textAutoHide={false}
                  enableStars={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  spotlightRadius={150}
                  particleCount={12}
                  glowColor="128, 128, 128"
                >
                  <div className="magic-bento-content">
                    <h2 className="section-title">
                      {t.visionTitle || 'NUESTRA VISIÓN'}
                    </h2>
                    <p className="section-text">
                      {t.visionText || 'Creemos en la creación visual como medio de expresión y conexión emocional, capaz de transformar ideas en experiencias estéticas con propósito. En L-SINN3R construimos un lenguaje donde la publicidad, el arte, la música y lo audiovisual convergen para generar impacto, identidad y emoción.'}
                    </p>
                    <p className="section-quote">
                      {t.visionQuote || 'Detrás de cada proyecto hay una historia que no se cuenta, pero que se transmite a través de la obra final.'}
                    </p>
                  </div>
                </MagicBento>

                {/* Estilo */}
                <MagicBento
                  textAutoHide={false}
                  enableStars={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  spotlightRadius={150}
                  particleCount={12}
                  glowColor="128, 128, 128"
                >
                  <div className="magic-bento-content">
                    <h2 className="section-title">
                      {t.styleTitle || 'NUESTRO ESTILO'}
                    </h2>
                    <p className="section-text">
                      {t.styleText || 'Nuestro estilo se define por la autenticidad, la sensibilidad artística y la búsqueda constante de nuevas perspectivas. No seguimos fórmulas: reinterpretamos lo visual desde lo conceptual, fusionando distintas disciplinas para crear piezas únicas que hablan por sí mismas.'}
                    </p>
                    <p className="section-quote">
                      {t.styleQuote || 'Cada trabajo es un espacio donde la estética y la emoción se encuentran para dejar una huella real.'}
                    </p>
                  </div>
                </MagicBento>

                {/* Misión */}
                <MagicBento
                  textAutoHide={false}
                  enableStars={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  spotlightRadius={150}
                  particleCount={12}
                  glowColor="128, 128, 128"
                >
                  <div className="magic-bento-content">
                    <h2 className="section-title">
                      {t.missionTitle || 'NUESTRA MISIÓN'}
                    </h2>
                    <p className="section-text">
                      {t.missionText || 'Nuestra misión es dar forma a las ideas y convertirlas en arte, creando proyectos que combinen estética, concepto y emoción. Desde campañas y piezas audiovisuales hasta dirección creativa o fotografía, buscamos que cada obra cuente sin palabras, transmitiendo aquello que solo puede sentirse.'}
                    </p>
                    <p className="section-quote">
                      {t.missionQuote || 'L-SINN3R existe para crear desde la pasión, conectar desde la autenticidad y dejar una parte de sí en cada historia visual.'}
                    </p>
                  </div>
                </MagicBento>
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

export default IdentidadSinners;
