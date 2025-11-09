// Utilidad para asegurar que los elementos interactivos funcionen
export const fixPointerEvents = () => {
  // Asegurar que todos los botones sean clickeables
  const buttons = document.querySelectorAll('button, a[href], input, select, textarea, [role="button"]');
  buttons.forEach(btn => {
    if (btn.style) {
      btn.style.pointerEvents = 'auto';
      btn.style.position = 'relative';
      btn.style.zIndex = '1000';
    }
  });

  // Asegurar que los overlays no bloqueen
  const overlays = document.querySelectorAll('.hero-carousel-overlay, .carousel-overlay, .beams-overlay');
  overlays.forEach(overlay => {
    if (overlay.style) {
      overlay.style.pointerEvents = 'none';
    }
  });
};

// Ejecutar cuando el DOM esté listo
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixPointerEvents);
  } else {
    fixPointerEvents();
  }
  
  // Ejecutar después de que React renderice
  setTimeout(fixPointerEvents, 100);
  setTimeout(fixPointerEvents, 500);
  setTimeout(fixPointerEvents, 1000);
}

