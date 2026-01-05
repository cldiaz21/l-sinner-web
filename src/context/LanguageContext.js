import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('lSinnerLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('lSinnerLanguage', lang);
  };

  const translations = {
    es: {
      home: 'Home',
      identidad: 'Identidad Sinners',
      proyectos: 'Proyectos',
      quienesSomos: 'Quienes Somos',
      contacto: 'Contacto',
      menu: 'Menu',
      close: 'Cerrar',
      // Home Page
      heroSubtitleHome: 'Solo quien ha caído en la sombras puede retratar la luz',
      descriptionTitle: 'L SINN3R',
      descriptionText1: 'L-SINN3R representa la dualidad entre la perfección y lo imperfecto. Creemos en el arte como expresión real y emocional, donde la publicidad, el arte, la música y lo audiovisual convergen para generar impacto e identidad. Detrás de cada proyecto hay una historia que se transmite a través de la obra final.',
      descriptionText2: '',
      descriptionText3: '',
      featuredProjectsTitle: 'Proyectos Destacados',
      quoteText: 'El mundo no me hará una mala persona',
      // Identidad Sinners Page
      identidadTitle: 'Identidad Sinners',
      identidadSubtitle: 'La dualidad entre la perfección y lo imperfecto',
      visionTitle: 'NUESTRA VISIÓN',
      visionText: 'Creemos en la creación visual como medio de expresión y conexión emocional, capaz de transformar ideas en experiencias estéticas con propósito. En L-SINN3R construimos un lenguaje donde la publicidad, el arte, la música y lo audiovisual convergen para generar impacto, identidad y emoción.',
      visionQuote: 'Detrás de cada proyecto hay una historia que no se cuenta, pero que se transmite a través de la obra final.',
      styleTitle: 'NUESTRO ESTILO',
      styleText: 'Nuestro estilo se define por la autenticidad, la sensibilidad artística y la búsqueda constante de nuevas perspectivas. No seguimos fórmulas: reinterpretamos lo visual desde lo conceptual, fusionando distintas disciplinas para crear piezas únicas que hablan por sí mismas.',
      styleQuote: 'Cada trabajo es un espacio donde la estética y la emoción se encuentran para dejar una huella real.',
      missionTitle: 'NUESTRA MISIÓN',
      missionText: 'Nuestra misión es dar forma a las ideas y convertirlas en arte, creando proyectos que combinen estética, concepto y emoción. Desde campañas y piezas audiovisuales hasta dirección creativa o fotografía, buscamos que cada obra cuente sin palabras, transmitiendo aquello que solo puede sentirse.',
      missionQuote: 'L-SINN3R existe para crear desde la pasión, conectar desde la autenticidad y dejar una parte de sí en cada historia visual.',
      valuesTitle: 'VALORES L-SINN3R',
      value1Title: 'Autenticidad',
      value1Text: 'Crear desde la verdad. Cada obra nace de experiencias reales, emociones honestas y una mirada que no teme mostrar lo que otros esconden.',
      value2Title: 'Imperfección',
      value2Text: 'Creemos en la belleza de lo imperfecto. En los errores, en lo humano y en la espontaneidad que convierte una idea en arte.',
      value3Title: 'Rebelión Creativa',
      value3Text: 'Romper moldes, cuestionar lo establecido y transformar lo común en algo único. Ser un sinner es atreverse a crear sin pedir permiso.',
      value4Title: 'Conexión Emocional',
      value4Text: 'Cada proyecto busca tocar, no solo gustar. Lo importante no es lo que se ve, sino lo que se siente.',
      value5Title: 'Estética con Propósito',
      value5Text: 'No buscamos solo lo visualmente atractivo, sino aquello que transmite significado y deja una huella.',
      value6Title: 'Dualidad',
      value6Text: 'Vivimos entre la luz y la sombra, entre lo correcto y lo caótico. De esa tensión nace nuestra visión: sincera, cruda y profundamente humana.',
      // Proyectos Page
      proyectosSubtitle: 'Explora nuestra galería de proyectos y descubre el arte detrás de cada imagen',
      searchPlaceholder: 'INTRODUCE TU BÚSQUEDA',
      viewProject: 'Ver proyecto',
      noProjectsFound: 'No se encontraron proyectos que coincidan con tu búsqueda.',
      noProjectsAvailable: 'No hay proyectos disponibles en este momento.',
      searchProjects: 'Buscar proyectos',
      closeSearch: 'Cerrar búsqueda',
      // Quienes Somos Page
      quienesSomosSubtitle: 'Sobre L sinn3r',
      sobreMi: 'Sobre mí',
      alvaroMeza: 'Álvaro Meza',
      alvaroText1: 'Soy Álvaro Meza, estudiante de Publicidad y creador detrás de L SINN3R. Mi propósito es transformar ideas en experiencias visuales, desarrollando cada proyecto desde un enfoque conceptual que une mi formación publicitaria con mis pasiones: el arte, la música, lo audiovisual y la fotografía.',
      alvaroText2: 'En cada trabajo busco transmitir una historia, una emoción y una estética propia, dejando siempre una parte de mí en lo que hago. Para mí, la creatividad es un puente entre lo que imaginamos y lo que podemos hacer sentir a los demás.',
      // Contacto Page
      contactoSubtitle: 'Trabajemos Juntos',
      contactIntro: 'Estamos aquí para ayudarte con tu proyecto. Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.',
      contactNote: 'El formulario de contacto se encuentra al final de esta página.',
      // Contact Form
      contactSectionLabel: 'CONTACTO',
      contactTitle: 'Hablemos de tu proyecto',
      contactDescription: '¿Tienes preguntas? ¿Necesitas una demo? ¿Quieres integrar L-SINN3R en tu organización? Estamos aquí para ayudarte.',
      contactEmail: 'Email',
      contactEmailValue: 'artsinn3r@gmail.com',
      contactSchedule: 'Horario',
      contactScheduleValue: '24/7 Soporte',
      contactNameLabel: 'Nombre completo',
      contactNamePlaceholder: 'Tu nombre',
      contactEmailLabel: 'Email',
      contactEmailPlaceholder: 'tu@email.com',
      contactSubjectLabel: 'Asunto',
      contactSubjectPlaceholder: 'Tema de consulta',
      contactMessageLabel: 'Mensaje',
      contactMessagePlaceholder: 'Cuéntanos sobre tu proyecto...',
      contactSendButton: 'Enviar Mensaje',
      contactSending: 'Enviando...',
      contactSuccessMessage: '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.',
      contactErrorMessage: 'Error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos directamente.',
      contactSubjectOptions: {
        demo: 'Demo',
        sales: 'Sales',
        support: 'Support',
        partnership: 'Partnership',
        other: 'Other'
      },
      // Footer
      footerDescription: 'Fotografía profesional que captura momentos únicos',
      footerFollow: 'Síguenos',
      footerCopyright: 'L SINN3R. Todos los derechos reservados.',
      footerAdmin: 'Admin',
      // Instagram Feed
      instagramTitle: 'Síguenos en Instagram',
      instagramViewMore: 'Ver más en Instagram →',
      // Project Modal
      modalClose: 'Cerrar',
      modalDate: 'Fecha:',
      modalVideos: 'Videos',
      // CTA
      ctaTitle: '¿Listo para trabajar juntos?',
      ctaText: 'Si tienes un proyecto en mente o simplemente quieres conocer más sobre nuestro trabajo, no dudes en contactarnos.',
      ctaButton: 'Contáctanos',
      // Staggered Menu
      menuOpen: 'Abrir menú',
      menuClose: 'Cerrar menú',
      // Flip Card
      flipCardText: 'Click para voltear',
      // No Image
      noImage: 'Sin imagen',
      // Loading
      loading: 'Cargando...',
      // Videos Section
      videosTitle: 'Videos',
      noVideosAvailable: 'No hay videos disponibles.',
      videoNotAvailable: 'Video no disponible',
      watchOnPlatform: 'Ver en plataforma',
    },
    en: {
      home: 'Home',
      identidad: 'Sinners Identity',
      proyectos: 'Projects',
      quienesSomos: 'About Us',
      contacto: 'Contact',
      menu: 'Menu',
      close: 'Close',
      // Home Page
      heroSubtitleHome: 'Only those who have fallen into shadows can capture the light',
      descriptionTitle: 'L SINN3R',
      descriptionText1: 'L-SINN3R represents the duality between perfection and imperfection. We believe in art as real and emotional expression, where advertising, art, music and audiovisual converge to generate impact and identity. Behind each project there is a story that is transmitted through the final work.',
      descriptionText2: '',
      descriptionText3: '',
      featuredProjectsTitle: 'Featured Projects',
      quoteText: 'The world will not make me a bad person',
      // Identidad Sinners Page
      identidadTitle: 'Sinners Identity',
      identidadSubtitle: 'The duality between perfection and imperfection',
      visionTitle: 'OUR VISION',
      visionText: 'We believe in visual creation as a means of expression and emotional connection, capable of transforming ideas into aesthetic experiences with purpose. In L-SINN3R we build a language where advertising, art, music and audiovisual converge to generate impact, identity and emotion.',
      visionQuote: 'Behind each project there is a story that is not told, but that is transmitted through the final work.',
      styleTitle: 'OUR STYLE',
      styleText: 'Our style is defined by authenticity, artistic sensibility and the constant search for new perspectives. We don\'t follow formulas: we reinterpret the visual from the conceptual, merging different disciplines to create unique pieces that speak for themselves.',
      styleQuote: 'Each work is a space where aesthetics and emotion meet to leave a real mark.',
      missionTitle: 'OUR MISSION',
      missionText: 'Our mission is to shape ideas and turn them into art, creating projects that combine aesthetics, concept and emotion. From campaigns and audiovisual pieces to creative direction or photography, we seek that each work tells without words, transmitting what can only be felt.',
      missionQuote: 'L-SINN3R exists to create from passion, connect from authenticity and leave a part of itself in each visual story.',
      valuesTitle: 'L-SINN3R VALUES',
      value1Title: 'Authenticity',
      value1Text: 'Create from truth. Each work is born from real experiences, honest emotions and a look that is not afraid to show what others hide.',
      value2Title: 'Imperfection',
      value2Text: 'We believe in the beauty of imperfection. In mistakes, in the human and in the spontaneity that turns an idea into art.',
      value3Title: 'Creative Rebellion',
      value3Text: 'Break molds, question the established and transform the common into something unique. Being a sinner is daring to create without asking permission.',
      value4Title: 'Emotional Connection',
      value4Text: 'Each project seeks to touch, not just please. What matters is not what is seen, but what is felt.',
      value5Title: 'Aesthetic with Purpose',
      value5Text: 'We don\'t just seek what is visually attractive, but what transmits meaning and leaves a mark.',
      value6Title: 'Duality',
      value6Text: 'We live between light and shadow, between what is correct and what is chaotic. From that tension our vision is born: sincere, raw and deeply human.',
      // Proyectos Page
      proyectosSubtitle: 'Explore our project gallery and discover the art behind each image',
      searchPlaceholder: 'ENTER YOUR SEARCH',
      viewProject: 'View project',
      noProjectsFound: 'No projects found matching your search.',
      noProjectsAvailable: 'No projects available at this time.',
      searchProjects: 'Search projects',
      closeSearch: 'Close search',
      // Quienes Somos Page
      quienesSomosSubtitle: 'About L sinn3r',
      sobreMi: 'About me',
      alvaroMeza: 'Álvaro Meza',
      alvaroText1: 'I am Álvaro Meza, Advertising student and creator behind L SINN3R. My purpose is to transform ideas into visual experiences, developing each project from a conceptual approach that unites my advertising background with my passions: art, music, audiovisual and photography.',
      alvaroText2: 'In each work I seek to transmit a story, an emotion and my own aesthetics, always leaving a part of me in what I do. For me, creativity is a bridge between what we imagine and what we can make others feel.',
      // Contacto Page
      contactoSubtitle: 'Let\'s Work Together',
      contactIntro: 'We are here to help you with your project. Fill out the form below and we will get back to you as soon as possible.',
      contactNote: 'The contact form is at the bottom of this page.',
      // Contact Form
      contactSectionLabel: 'CONTACT',
      contactTitle: 'Let\'s talk about your project',
      contactDescription: 'Do you have questions? Do you need a demo? Do you want to integrate L-SINN3R into your organization? We are here to help you.',
      contactEmail: 'Email',
      contactEmailValue: 'artsinn3r@gmail.com',
      contactSchedule: 'Schedule',
      contactScheduleValue: '24/7 Support',
      contactNameLabel: 'Full name',
      contactNamePlaceholder: 'Your name',
      contactEmailLabel: 'Email',
      contactEmailPlaceholder: 'your@email.com',
      contactSubjectLabel: 'Subject',
      contactSubjectPlaceholder: 'Query topic',
      contactMessageLabel: 'Message',
      contactMessagePlaceholder: 'Tell us about your project...',
      contactSendButton: 'Send Message',
      contactSending: 'Sending...',
      contactSuccessMessage: 'Message sent successfully! We will get in touch with you soon.',
      contactErrorMessage: 'Error sending message. Please try again or contact us directly.',
      contactSubjectOptions: {
        demo: 'Demo',
        sales: 'Sales',
        support: 'Support',
        partnership: 'Partnership',
        other: 'Other'
      },
      // Footer
      footerDescription: 'Professional photography that captures unique moments',
      footerFollow: 'Follow us',
      footerCopyright: 'L SINN3R. All rights reserved.',
      footerAdmin: 'Admin',
      // Instagram Feed
      instagramTitle: 'Follow us on Instagram',
      instagramViewMore: 'View more on Instagram →',
      // Project Modal
      modalClose: 'Close',
      modalDate: 'Date:',
      modalVideos: 'Videos',
      // CTA
      ctaTitle: 'Ready to work together?',
      ctaText: 'If you have a project in mind or just want to know more about our work, do not hesitate to contact us.',
      ctaButton: 'Contact Us',
      // Staggered Menu
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      // Flip Card
      flipCardText: 'Click to flip',
      // No Image
      noImage: 'No image',
      // Loading
      loading: 'Loading...',
      // Videos Section
      videosTitle: 'Videos',
      noVideosAvailable: 'No videos available.',
      videoNotAvailable: 'Video not available',
      watchOnPlatform: 'Watch on platform',
    }
  };

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      t: translations[language] || translations.es
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
