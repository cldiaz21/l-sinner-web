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
        animationType="silk"
      />
      <section className="contacto-section">
        <ContactForm />
      </section>
    </div>
  );
};

export default Contacto;

