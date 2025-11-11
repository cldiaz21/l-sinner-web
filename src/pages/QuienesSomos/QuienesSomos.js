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
        subtitle={t.quienesSomosSubtitle || "Sobre L sinn3r"}
        animationType="particles"
      />
      <section className="quienes-somos-section">
        <Container>
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
                    <h2 className="alvaro-title">{t.sobreMi || 'Sobre mí'}</h2>
                    <h3 className="alvaro-name">{t.alvaroMeza || 'Álvaro Meza'}</h3>
                    <div className="alvaro-text">
                      <p>
                        {t.alvaroText1 || 'Soy Álvaro Meza, estudiante de Publicidad y creador detrás de L SINN3R. Mi propósito es transformar ideas en experiencias visuales, desarrollando cada proyecto desde un enfoque conceptual que une mi formación publicitaria con mis pasiones: el arte, la música, lo audiovisual y la fotografía.'}
                      </p>
                      <p>
                        {t.alvaroText2 || 'En cada trabajo busco transmitir una historia, una emoción y una estética propia, dejando siempre una parte de mí en lo que hago. Para mí, la creatividad es un puente entre lo que imaginamos y lo que podemos hacer sentir a los demás.'}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

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
