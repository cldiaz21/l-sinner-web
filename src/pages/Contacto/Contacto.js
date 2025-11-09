import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import './Contacto.css';

const Contacto = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="page-container">
      <HeroSection title={t.contacto || "Contacto"} subtitle={t.contactoSubtitle || "Trabajemos Juntos"} />
      <section className="contacto-section">
        <Container>
          <p className="text-center mb-5 contact-intro">
            {t.contactIntro || "Estamos aquí para ayudarte con tu proyecto. Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible."}
          </p>
          <p className="text-center contact-note">
            {t.contactNote || "El formulario de contacto se encuentra al final de esta página."}
          </p>
        </Container>
      </section>
    </div>
  );
};

export default Contacto;

