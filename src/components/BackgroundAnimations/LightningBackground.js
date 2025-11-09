import React, { useEffect, useRef } from 'react';
import './LightningBackground.css';

const LightningBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Crear múltiples líneas de rayo
    const createLightning = () => {
      container.innerHTML = '';
      const numLightnings = 3;

      for (let i = 0; i < numLightnings; i++) {
        const lightning = document.createElement('div');
        lightning.className = 'lightning-bolt';
        lightning.style.left = `${Math.random() * 100}%`;
        lightning.style.animationDelay = `${Math.random() * 2}s`;
        lightning.style.opacity = `${0.4 + Math.random() * 0.3}`;
        container.appendChild(lightning);
      }
    };

    createLightning();
    const interval = setInterval(createLightning, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="lightning-background" />;
};

export default LightningBackground;

