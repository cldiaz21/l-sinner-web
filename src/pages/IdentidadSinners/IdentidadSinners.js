import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import ContactForm from '../../components/ContactForm/ContactForm';
import './IdentidadSinners.css';

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
                {/* Visión */}
                <div className="identidad-block vision-block">
                  <h2 className="section-title">
                    <span className="title-icon">💫</span>
                    {t.visionTitle || 'NUESTRA VISIÓN'}
                  </h2>
                  <p className="section-text">
                    {t.visionText || 'Creemos en la creación visual como medio de expresión y conexión emocional, capaz de transformar ideas en experiencias estéticas con propósito. En L-SINN3R construimos un lenguaje donde la publicidad, el arte, la música y lo audiovisual convergen para generar impacto, identidad y emoción.'}
                  </p>
                  <p className="section-quote">
                    {t.visionQuote || 'Detrás de cada proyecto hay una historia que no se cuenta, pero que se transmite a través de la obra final.'}
                  </p>
                </div>

                {/* Estilo */}
                <div className="identidad-block style-block">
                  <h2 className="section-title">
                    <span className="title-icon">🎭</span>
                    {t.styleTitle || 'NUESTRO ESTILO'}
                  </h2>
                  <p className="section-text">
                    {t.styleText || 'Nuestro estilo se define por la autenticidad, la sensibilidad artística y la búsqueda constante de nuevas perspectivas. No seguimos fórmulas: reinterpretamos lo visual desde lo conceptual, fusionando distintas disciplinas para crear piezas únicas que hablan por sí mismas.'}
                  </p>
                  <p className="section-quote">
                    {t.styleQuote || 'Cada trabajo es un espacio donde la estética y la emoción se encuentran para dejar una huella real.'}
                  </p>
                </div>

                {/* Misión */}
                <div className="identidad-block mission-block">
                  <h2 className="section-title">
                    <span className="title-icon">🔥</span>
                    {t.missionTitle || 'NUESTRA MISIÓN'}
                  </h2>
                  <p className="section-text">
                    {t.missionText || 'Nuestra misión es dar forma a las ideas y convertirlas en arte, creando proyectos que combinen estética, concepto y emoción. Desde campañas y piezas audiovisuales hasta dirección creativa o fotografía, buscamos que cada obra cuente sin palabras, transmitiendo aquello que solo puede sentirse.'}
                  </p>
                  <p className="section-quote">
                    {t.missionQuote || 'L-SINN3R existe para crear desde la pasión, conectar desde la autenticidad y dejar una parte de sí en cada historia visual.'}
                  </p>
                </div>

                {/* Valores */}
                <div className="identidad-values values-block">
                  <h2 className="section-title">
                    <span className="title-icon">⚔️</span>
                    {t.valuesTitle || 'VALORES L-SINN3R'}
                  </h2>
                  <Row>
                    <Col md={6} lg={4}>
                      <div className="value-item">
                        <h3 className="value-title">{t.value1Title || '1. Autenticidad'}</h3>
                        <p className="value-text">
                          {t.value1Text || 'Crear desde la verdad. Cada obra nace de experiencias reales, emociones honestas y una mirada que no teme mostrar lo que otros esconden.'}
                        </p>
                      </div>
                    </Col>
                    <Col md={6} lg={4}>
                      <div className="value-item">
                        <h3 className="value-title">{t.value2Title || '2. Imperfección'}</h3>
                        <p className="value-text">
                          {t.value2Text || 'Creemos en la belleza de lo imperfecto. En los errores, en lo humano y en la espontaneidad que convierte una idea en arte.'}
                        </p>
                      </div>
                    </Col>
                    <Col md={6} lg={4}>
                      <div className="value-item">
                        <h3 className="value-title">{t.value3Title || '3. Rebelión Creativa'}</h3>
                        <p className="value-text">
                          {t.value3Text || 'Romper moldes, cuestionar lo establecido y transformar lo común en algo único. Ser un sinner es atreverse a crear sin pedir permiso.'}
                        </p>
                      </div>
                    </Col>
                    <Col md={6} lg={4}>
                      <div className="value-item">
                        <h3 className="value-title">{t.value4Title || '4. Conexión Emocional'}</h3>
                        <p className="value-text">
                          {t.value4Text || 'Cada proyecto busca tocar, no solo gustar. Lo importante no es lo que se ve, sino lo que se siente.'}
                        </p>
                      </div>
                    </Col>
                    <Col md={6} lg={4}>
                      <div className="value-item">
                        <h3 className="value-title">{t.value5Title || '5. Estética con Propósito'}</h3>
                        <p className="value-text">
                          {t.value5Text || 'No buscamos solo lo visualmente atractivo, sino aquello que transmite significado y deja una huella.'}
                        </p>
                      </div>
                    </Col>
                    <Col md={6} lg={4}>
                      <div className="value-item">
                        <h3 className="value-title">{t.value6Title || '6. Dualidad'}</h3>
                        <p className="value-text">
                          {t.value6Text || 'Vivimos entre la luz y la sombra, entre lo correcto y lo caótico. De esa tensión nace nuestra visión: sincera, cruda y profundamente humana.'}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
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
