import React, { useEffect, useRef } from 'react';
import './BeamsBackground.css';

const BeamsBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Crear haces de luz
    const createBeams = () => {
      container.innerHTML = '';
      const numBeams = 5;

      for (let i = 0; i < numBeams; i++) {
        const beam = document.createElement('div');
        beam.className = 'beam';
        beam.style.left = `${(i * 100) / (numBeams + 1)}%`;
        beam.style.animationDelay = `${i * 0.2}s`;
        beam.style.transform = `rotate(${-15 + Math.random() * 30}deg)`;
        container.appendChild(beam);
      }
    };

    createBeams();

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="beams-background" />;
};

export default BeamsBackground;

