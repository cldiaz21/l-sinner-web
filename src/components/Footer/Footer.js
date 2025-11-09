import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import ContactForm from '../ContactForm/ContactForm';
import './Footer.css';

const Footer = () => {
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
            <p>Fotografía profesional que captura momentos únicos</p>
          </Col>
          <Col md={6} className="footer-social">
            <h5>Síguenos</h5>
            <div className="social-icons">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center footer-copyright" style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }}>
            <p>&copy; {currentYear} L SINN3R. Todos los derechos reservados.</p>
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
              Admin
            </button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

