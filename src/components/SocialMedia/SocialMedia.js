import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './SocialMedia.css';

const SocialMedia = () => {
  const socialLinks = [
    { icon: FaInstagram, url: 'https://instagram.com', name: 'Instagram' },
    { icon: FaFacebook, url: 'https://facebook.com', name: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com', name: 'Twitter' },
    { icon: FaLinkedin, url: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: FaYoutube, url: 'https://youtube.com', name: 'YouTube' }
  ];

  return (
    <div className="social-media-section">
      <h2 className="section-title">Síguenos en Redes Sociales</h2>
      <p className="social-description">
        Mantente al día con nuestro trabajo y proyectos más recientes
      </p>
      <div className="social-icons-container">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label={social.name}
            >
              <Icon className="social-icon" />
              <span className="social-name">{social.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialMedia;

