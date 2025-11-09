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
        animationType="lightning"
      />
      <section className="identidad-section">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="identidad-content">
                <p className="lead-text">
                  L SINN3R representa más que un nombre: es una identidad, una filosofía 
                  visual que busca capturar la esencia única de cada momento.
                </p>

                <div className="identidad-block">
                  <h2>Nuestra Visión</h2>
                  <p>
                    Creemos en la fotografía como medio de expresión artística y herramienta 
                    para contar historias. Cada imagen que creamos lleva consigo una parte 
                    de nuestra identidad y visión única del mundo.
                  </p>
                </div>

                <div className="identidad-block">
                  <h2>Nuestro Estilo</h2>
                  <p>
                    Nuestro estilo se caracteriza por la autenticidad, la creatividad y la 
                    atención al detalle. Buscamos siempre ir más allá de lo convencional, 
                    explorando nuevas perspectivas y técnicas que nos permitan crear 
                    imágenes impactantes y memorables.
                  </p>
                </div>

                <div className="identidad-block">
                  <h2>Nuestra Misión</h2>
                  <p>
                    Nuestra misión es transformar momentos ordinarios en arte extraordinario, 
                    ayudando a nuestros clientes a preservar sus recuerdos más preciados 
                    y a contar sus historias de la manera más auténtica y hermosa posible.
                  </p>
                </div>

                <div className="identidad-values">
                  <h2>Valores</h2>
                  <Row>
                    <Col md={6}>
                      <div className="value-item">
                        <h3>Creatividad</h3>
                        <p>Innovación constante en cada proyecto</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="value-item">
                        <h3>Calidad</h3>
                        <p>Compromiso con la excelencia en cada detalle</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="value-item">
                        <h3>Autenticidad</h3>
                        <p>Captura de la esencia real de cada momento</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="value-item">
                        <h3>Pasión</h3>
                        <p>Amor por la fotografía en cada click</p>
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

