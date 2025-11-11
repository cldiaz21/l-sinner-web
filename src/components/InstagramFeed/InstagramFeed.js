import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import './InstagramFeed.css';

const InstagramFeed = ({ username = 'l_sinn3r' }) => {
  const { t } = useContext(LanguageContext);
  // Usar el embed oficial de Instagram
  const embedUrl = `https://www.instagram.com/${username}/embed/`;

  return (
    <div className="instagram-feed-container">
      <div className="instagram-feed-header">
        <h3 className="instagram-feed-title">{t.instagramTitle || 'Síguenos en Instagram'}</h3>
        <a 
          href={`https://instagram.com/${username}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="instagram-feed-link"
        >
          @{username}
        </a>
      </div>
      <div className="instagram-feed-wrapper">
        <iframe
          src={embedUrl}
          className="instagram-feed-iframe"
          title="Instagram Feed"
          allowTransparency="true"
          frameBorder="0"
          scrolling="no"
          style={{ border: 'none', overflow: 'hidden', width: '100%' }}
        />
      </div>
      <div className="instagram-feed-footer">
        <a 
          href={`https://instagram.com/${username}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="instagram-view-all"
        >
          {t.instagramViewMore || 'Ver más en Instagram →'}
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;
