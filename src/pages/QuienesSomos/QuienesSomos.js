import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import './QuienesSomos.css';

const QuienesSomos = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="page-container">
      <HeroSection 
        title={t.quienesSomos || "Quienes Somos"} 
        subtitle={t.quienesSomosSubtitle || "Conoce Nuestra Historia"}
        animationType="particles"
      />
      <section className="quienes-somos-section">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="quienes-content">
                <div className="intro-block">
                  <p className="lead-text">
                    {t.quienesSomosLead || "L SINN3R es un proyecto fotográfico fundado por Álvaro Meza, dedicado a crear imágenes que trascienden lo común y capturan la esencia de cada momento."}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

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
                  <h2 className="alvaro-title">{t.fundadorTitle || "Fundador"}</h2>
                  <h3 className="alvaro-name">Álvaro Meza</h3>
                  <div className="alvaro-text">
                    <p>
                      {t.fundadorText1 || "Fundador de L SINN3R, es un fotógrafo profesional apasionado por capturar momentos únicos y transformarlos en arte visual."}
                    </p>
                    <p>
                      {t.fundadorText2 || "Con una visión creativa distintiva, cada proyecto refleja su compromiso con la excelencia y la autenticidad en la fotografía."}
                    </p>
                    <p>
                      {t.fundadorText3 || "Su pasión por la fotografía lo ha llevado a explorar diferentes estilos y técnicas, siempre buscando la perfección en cada imagen que crea."}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="quienes-content">
                {/* Sección de Historia */}
                <div className="historia-section">
                  <Row>
                    <Col lg={12}>
                      <div className="info-block">
                        <h2>{t.historiaTitle || "Nuestra Historia"}</h2>
                        <p>
                          {t.historiaText1 || "Comenzamos nuestro viaje con una visión clara: transformar la fotografía en arte. A lo largo de los años, hemos trabajado con diversos clientes y proyectos, siempre manteniendo nuestro compromiso con la calidad y la creatividad."}
                        </p>
                        <p>
                          {t.historiaText2 || "Cada proyecto es una nueva oportunidad para explorar, innovar y crear algo único que perdure en el tiempo."}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="services-block mt-5">
                  <h2>{t.serviciosTitle || "Nuestros Servicios"}</h2>
                  <Row>
                    <Col md={4}>
                      <div className="service-item">
                        <h3>{t.servicio1 || "Fotografía de Retrato"}</h3>
                        <p>{t.servicio1Desc || "Sesiones personalizadas para individuos y grupos"}</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="service-item">
                        <h3>{t.servicio2 || "Fotografía Comercial"}</h3>
                        <p>{t.servicio2Desc || "Imágenes de alta calidad para marcas y productos"}</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="service-item">
                        <h3>{t.servicio3 || "Edición y Post-producción"}</h3>
                        <p>{t.servicio3Desc || "Procesamiento profesional de imágenes"}</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="service-item">
                        <h3>{t.servicio4 || "Asesoría"}</h3>
                        <p>{t.servicio4Desc || "Consultoría para proyectos fotográficos"}</p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="contact-cta mt-5 text-center">
                  <h2>{t.ctaTitle || "¿Listo para trabajar juntos?"}</h2>
                  <p>
                    {t.ctaText || "Si tienes un proyecto en mente o simplemente quieres conocer más sobre nuestro trabajo, no dudes en contactarnos."}
                  </p>
                  <Link to="/contacto" className="cta-button">
                    {t.ctaButton || "Contáctanos"}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default QuienesSomos;
