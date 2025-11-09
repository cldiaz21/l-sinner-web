import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import ContactForm from '../ContactForm/ContactForm';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <ContactForm />
      <Container>
        <Row className="footer-content">
          <Col md={6} className="footer-info">
            <h5>L SINNER</h5>
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
          <Col className="text-center footer-copyright">
            <p>&copy; {currentYear} L SINNER. Todos los derechos reservados.</p>
            <Link to="/login" className="admin-link-footer">
              Admin
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

