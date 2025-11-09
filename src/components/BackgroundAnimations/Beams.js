import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Beams.css';

const Beams = ({
  beamWidth = 4,
  beamHeight = 25,
  beamNumber = 10,
  lightColor = '#ffffff',
  speed = 1.5,
  noiseIntensity = 1.5,
  scale = 0.3,
  rotation = 0
}) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setMousePosition({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0.5, y: 0.5 });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const beams = Array.from({ length: beamNumber }, (_, i) => {
    const spacing = 100 / (beamNumber + 1);
    const baseLeft = (i + 1) * spacing;
    const mouseInfluenceX = (mousePosition.x - 0.5) * 12;
    const mouseInfluenceY = (mousePosition.y - 0.5) * 8;
    const offsetX = mouseInfluenceX * (i % 2 === 0 ? 1 : -1) * 0.5;
    const currentLeft = Math.max(2, Math.min(98, baseLeft + offsetX));
    const yInfluence = Math.abs(mousePosition.y - 0.5) * 1.2;
    const scale = 1 + yInfluence * 0.4;
    const opacity = 0.5 + yInfluence * 0.4;

    return (
      <div
        key={i}
        className="beam-line"
        style={{
          left: `${currentLeft}%`,
          animationDelay: `${i * 0.1}s`,
          animationDuration: `${7 + (i % 3) * 0.5}s`,
          width: `${beamWidth * 18}px`,
          transform: `translateX(-50%) scaleY(${scale}) scaleX(${scale * 0.9})`,
          opacity: opacity,
          transition: 'left 0.15s ease-out, transform 0.15s ease-out, opacity 0.15s ease-out',
        }}
      />
    );
  });

  return (
    <div 
      ref={containerRef} 
      className="beams-container" 
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="beams-overlay" />
      {beams}
    </div>
  );
};

export default Beams;
