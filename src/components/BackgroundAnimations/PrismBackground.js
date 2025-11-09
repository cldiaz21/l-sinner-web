import React, { useEffect, useRef } from 'react';
import './PrismBackground.css';

const PrismBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Crear efecto de prisma con líneas que se mueven
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.max(canvas.width, canvas.height);

      // Dibujar líneas que emanan del centro
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12 + time;
        const x1 = centerX;
        const y1 = centerY;
        const x2 = centerX + Math.cos(angle) * maxRadius;
        const y2 = centerY + Math.sin(angle) * maxRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.15 + Math.sin(time + i) * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Dibujar formas geométricas flotantes
      for (let i = 0; i < 8; i++) {
        const x = centerX + Math.cos(time * 0.5 + i) * (maxRadius * 0.3);
        const y = centerY + Math.sin(time * 0.5 + i) * (maxRadius * 0.3);
        const size = 20 + Math.sin(time * 2 + i) * 10;

        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size * 0.866, y + size * 0.5);
        ctx.lineTo(x - size * 0.866, y + size * 0.5);
        ctx.closePath();
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.2 + Math.sin(time + i) * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="prism-background" />;
};

export default PrismBackground;

