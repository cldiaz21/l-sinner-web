import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import ContactForm from '../../components/ContactForm/ContactForm';
import './Contacto.css';

const Contacto = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="page-container">
      <HeroSection 
        title={t.contacto || "Contacto"} 
        subtitle={t.contactoSubtitle || "Trabajemos Juntos"}
        animationType="beams"
      />
      <section className="contacto-section">
        <Container>
          <Row>
            <Col lg={5} className="contact-text-col">
              <div className="contact-text-content">
                <h2 className="contact-section-title">Trabajemos Juntos</h2>
                <p className="contact-intro">
                  {t.contactIntro || "Estamos aquí para ayudarte con tu proyecto. Completa el formulario y nos pondremos en contacto contigo lo antes posible."}
                </p>
                <div className="contact-info">
                  <p className="contact-info-item">
                    <strong>Email:</strong> contacto@lsinner.com
                  </p>
                  <p className="contact-info-item">
                    <strong>Teléfono:</strong> +34 123 456 789
                  </p>
                  <p className="contact-info-item">
                    <strong>Horario:</strong> Lunes - Viernes, 9:00 - 18:00
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={7} className="contact-form-col">
              <ContactForm />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contacto;

