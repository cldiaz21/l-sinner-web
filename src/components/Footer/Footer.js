import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { LanguageContext } from '../../context/LanguageContext';
import ContactForm from '../ContactForm/ContactForm';
import './Footer.css';

const Footer = () => {
  const { t } = useContext(LanguageContext);
  const currentYear = new Date().getFullYear();

  const handleAdminClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Abrir login en nueva pestaña
    const loginUrl = window.location.origin + '/login';
    window.open(loginUrl, '_blank');
  };

  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          <Col md={6} className="footer-info">
            <div className="footer-logo-wrapper">
              <img 
                src="/images/hero/logo.png" 
                alt="L SINN3R" 
                className="footer-logo"
              />
            </div>
            <p>{t.footerDescription || 'Fotografía profesional que captura momentos únicos'}</p>
          </Col>
          <Col md={6} className="footer-social">
            <h5>{t.footerFollow || 'Síguenos'}</h5>
            <div className="social-icons">
              <a 
                href="https://instagram.com/l_sinn3r" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://tiktok.com/@art_sinn3er" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center footer-copyright" style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }}>
            <p>&copy; {currentYear} {t.footerCopyright || 'L SINN3R. Todos los derechos reservados.'}</p>
            <button
              onClick={handleAdminClick}
              className="admin-link-footer"
              type="button"
              style={{ 
                position: 'relative',
                zIndex: 99999,
                pointerEvents: 'auto'
              }}
            >
              {t.footerAdmin || 'Admin'}
            </button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
