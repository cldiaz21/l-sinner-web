import React from 'react';
import InstagramFeed from '../InstagramFeed/InstagramFeed';
import './SocialMedia.css';

const SocialMedia = () => {
  return (
    <div className="social-media-section">
      <InstagramFeed username="l_sinn3r" postsCount={6} />
    </div>
  );
};

export default SocialMedia;

