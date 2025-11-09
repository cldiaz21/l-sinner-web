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
      heroSubtitleHome: 'Fotografía Profesional',
      descriptionTitle: 'L SINN3R',
      descriptionText1: 'L SINN3R es un fotógrafo profesional especializado en capturar momentos únicos y transformarlos en arte visual. Con una visión creativa y un estilo distintivo, cada proyecto es una oportunidad para contar una historia a través de la lente.',
      descriptionText2: 'Nuestro trabajo abarca desde sesiones de retrato hasta proyectos comerciales, siempre manteniendo la calidad y la autenticidad que nos caracteriza.',
      featuredProjectsTitle: 'Proyectos Destacados',
      // Identidad Sinners Page
      identidadTitle: 'Identidad Sinners',
      identidadLead: 'L SINN3R representa más que un nombre: es una identidad, una filosofía visual que busca capturar la esencia única de cada momento.',
      identidadText1: 'Nuestra identidad se forja en la pasión por la luz, la sombra y la composición. Creemos que cada imagen debe evocar una emoción, contar una historia y dejar una impresión duradera.',
      identidadText2: 'Nos esforzamos por la excelencia en cada detalle, desde la conceptualización hasta la post-producción, para entregar resultados que superen las expectativas.',
      // Proyectos Page
      proyectosSubtitle: 'Explora nuestra galería de proyectos y descubre el arte detrás de cada imagen',
      // Quienes Somos Page
      quienesSomosSubtitle: 'Conoce Nuestra Historia',
      quienesSomosLead: 'L SINN3R es un proyecto fotográfico fundado por Álvaro Meza, dedicado a crear imágenes que trascienden lo común y capturan la esencia de cada momento.',
      historiaTitle: 'Nuestra Historia',
      historiaText1: 'Comenzamos nuestro viaje con una visión clara: transformar la fotografía en arte. A lo largo de los años, hemos trabajado con diversos clientes y proyectos, siempre manteniendo nuestro compromiso con la calidad y la creatividad.',
      historiaText2: 'Cada proyecto es una nueva oportunidad para explorar, innovar y crear algo único que perdure en el tiempo.',
      fundadorTitle: 'Fundador',
      fundadorText1: 'Álvaro Meza, fundador de L SINN3R, es un fotógrafo profesional apasionado por capturar momentos únicos y transformarlos en arte visual.',
      fundadorText2: 'Con una visión creativa distintiva, cada proyecto refleja su compromiso con la excelencia y la autenticidad en la fotografía.',
      serviciosTitle: 'Nuestros Servicios',
      servicio1: 'Fotografía de Retrato',
      servicio1Desc: 'Sesiones personalizadas para individuos y grupos',
      servicio2: 'Fotografía Comercial',
      servicio2Desc: 'Imágenes de alta calidad para marcas y productos',
      servicio3: 'Edición y Post-producción',
      servicio3Desc: 'Procesamiento profesional de imágenes',
      servicio4: 'Asesoría',
      servicio4Desc: 'Consultoría para proyectos fotográficos',
      ctaTitle: '¿Listo para trabajar juntos?',
      ctaText: 'Si tienes un proyecto en mente o simplemente quieres conocer más sobre nuestro trabajo, no dudes en contactarnos.',
      ctaButton: 'Contáctanos',
      // Contacto Page
      contactoSubtitle: 'Trabajemos Juntos',
      contactIntro: 'Estamos aquí para ayudarte con tu proyecto. Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.',
      contactNote: 'El formulario de contacto se encuentra al final de esta página.',
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
      heroSubtitleHome: 'Professional Photography',
      descriptionTitle: 'L SINN3R',
      descriptionText1: 'L SINN3R is a professional photographer specializing in capturing unique moments and transforming them into visual art. With a creative vision and distinctive style, each project is an opportunity to tell a story through the lens.',
      descriptionText2: 'Our work ranges from portrait sessions to commercial projects, always maintaining the quality and authenticity that characterizes us.',
      featuredProjectsTitle: 'Featured Projects',
      // Identidad Sinners Page
      identidadTitle: 'Sinners Identity',
      identidadLead: 'L SINN3R represents more than a name: it is an identity, a visual philosophy that seeks to capture the unique essence of each moment.',
      identidadText1: 'Our identity is forged in the passion for light, shadow, and composition. We believe that every image should evoke an emotion, tell a story, and leave a lasting impression.',
      identidadText2: 'We strive for excellence in every detail, from conceptualization to post-production, to deliver results that exceed expectations.',
      // Proyectos Page
      proyectosSubtitle: 'Explore our project gallery and discover the art behind each image',
      // Quienes Somos Page
      quienesSomosSubtitle: 'Learn Our Story',
      quienesSomosLead: 'L SINN3R is a photography project founded by Álvaro Meza, dedicated to creating images that transcend the ordinary and capture the unique essence of each moment.',
      historiaTitle: 'Our History',
      historiaText1: 'We began our journey with a clear vision: to transform photography into art. Over the years, we have worked with diverse clients and projects, always maintaining our commitment to quality and creativity.',
      historiaText2: 'Each project is a new opportunity to explore, innovate, and create something unique that endures over time.',
      fundadorTitle: 'Founder',
      fundadorText1: 'Álvaro Meza, founder of L SINN3R, is a professional photographer passionate about capturing unique moments and transforming them into visual art.',
      fundadorText2: 'With a distinctive creative vision, each project reflects his commitment to excellence and authenticity in photography.',
      serviciosTitle: 'Our Services',
      servicio1: 'Portrait Photography',
      servicio1Desc: 'Personalized sessions for individuals and groups',
      servicio2: 'Commercial Photography',
      servicio2Desc: 'High-quality images for brands and products',
      servicio3: 'Editing and Post-production',
      servicio3Desc: 'Professional image processing',
      servicio4: 'Consulting',
      servicio4Desc: 'Consulting for photography projects',
      ctaTitle: 'Ready to work together?',
      ctaText: 'If you have a project in mind or just want to know more about our work, do not hesitate to contact us.',
      ctaButton: 'Contact Us',
      // Contacto Page
      contactoSubtitle: 'Let\'s Work Together',
      contactIntro: 'We are here to help you with your project. Fill out the form below and we will get back to you as soon as possible.',
      contactNote: 'The contact form is at the bottom of this page.',
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

