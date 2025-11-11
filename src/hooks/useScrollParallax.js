import { useEffect, useRef, useState } from 'react';

export const useScrollParallax = (speed = 0.5) => {
  const elementRef = useRef(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calcular cuánto del elemento está visible
      const visibleTop = Math.max(0, -elementTop);
      const visibleBottom = Math.min(elementHeight, windowHeight - elementTop);
      const visibleHeight = visibleBottom - visibleTop;
      
      // Calcular el porcentaje de scroll dentro del elemento
      const scrollProgress = visibleTop / (elementHeight + windowHeight);
      
      // Aplicar transformación basada en el scroll
      // La imagen se moverá hacia arriba cuando el elemento entra en vista
      const maxTransform = elementHeight * 0.3; // Máximo 30% del alto del elemento
      const translateY = scrollProgress * maxTransform * speed;
      
      setTransform(translateY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Llamar una vez para establecer el estado inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return { elementRef, transform };
};

