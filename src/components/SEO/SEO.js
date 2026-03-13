import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';

const SEO = () => {
  const location = useLocation();
  const { language, t } = useContext(LanguageContext);

  useEffect(() => {
    // Obtener el dominio base
    const baseUrl = window.location.origin;
    const currentPath = location.pathname;
    const currentUrl = `${baseUrl}${currentPath}`;

    // Definir títulos y descripciones para cada página
    const pageData = {
      '/': {
        title: language === 'es' 
          ? 'SINN3RS - Fotografía, Arte Visual y Dirección Creativa | Marca Creativa'
          : 'SINN3RS - Photography, Visual Art and Creative Direction | Creative Brand',
        description: language === 'es'
          ? 'SINN3RS es un estudio creativo que fusiona fotografía, arte visual, publicidad y dirección creativa. Transformamos ideas en experiencias estéticas con propósito. Marca creativa.'
          : 'SINN3RS is a creative studio that merges photography, visual art, advertising and creative direction. We transform ideas into aesthetic experiences with purpose. Creative brand.',
        keywords: language === 'es'
          ? 'fotografía profesional, arte visual, dirección creativa, publicidad, portfolio fotográfico, Álvaro Meza, SINN3RS, fotógrafo, diseñador, creativo'
          : 'professional photography, visual art, creative direction, advertising, photography portfolio, Álvaro Meza, SINN3RS, photographer, designer, creative'
      },
      '/identidad-sinners': {
        title: language === 'es'
          ? 'Identidad Sinners - Visión, Estilo y Valores | SINN3RS'
          : 'Sinners Identity - Vision, Style and Values | SINN3RS',
        description: language === 'es'
          ? 'La identidad de SINN3RS: visión, estilo, misión y valores. La dualidad entre la perfección y lo imperfecto en cada proceso creativo.'
          : 'SINN3RS identity: vision, style, mission and values. The duality between perfection and imperfection in every creative process.',
        keywords: language === 'es'
          ? 'identidad creativa, valores, visión, estilo artístico, filosofía creativa, SINN3RS'
          : 'creative identity, values, vision, artistic style, creative philosophy, SINN3RS'
      },
      '/proyectos': {
        title: language === 'es'
          ? 'Proyectos - Portfolio de Fotografía y Arte Visual | SINN3RS'
          : 'Projects - Photography and Visual Art Portfolio | SINN3RS',
        description: language === 'es'
          ? 'Explora el portfolio de proyectos de SINN3RS. Fotografía profesional, arte visual, dirección creativa y campañas publicitarias.'
          : 'Explore SINN3RS project portfolio. Professional photography, visual art, creative direction and advertising campaigns.',
        keywords: language === 'es'
          ? 'proyectos fotográficos, portfolio, galería, trabajos realizados, fotografía artística, SINN3RS'
          : 'photography projects, portfolio, gallery, completed work, artistic photography, SINN3RS'
      },
      '/quienes-somos': {
        title: language === 'es'
          ? 'Quienes Somos - Sobre nosotros / SINN3RS'
          : 'About Us - About Us / SINN3RS',
        description: language === 'es'
          ? 'Conoce al equipo detrás de SINN3RS. Estudiante de Publicidad y artista visual que transforma ideas en experiencias estéticas.'
          : 'Meet the team behind SINN3RS. Advertising student and visual artist who transforms ideas into aesthetic experiences.',
        keywords: language === 'es'
          ? 'Álvaro Meza, sobre mí, biografía, creador, artista visual, publicidad, SINN3RS'
          : 'Álvaro Meza, about me, biography, creator, visual artist, advertising, SINN3RS'
      },
      '/contacto': {
        title: language === 'es'
          ? 'Contacto - Trabajemos Juntos | SINN3RS'
          : 'Contact - Let\'s Work Together | SINN3RS',
        description: language === 'es'
          ? 'Contacta con SINN3RS para tu proyecto. Formulario de contacto para consultas sobre fotografía, arte visual y dirección creativa.'
          : 'Contact SINN3RS for your project. Contact form for inquiries about photography, visual art and creative direction.',
        keywords: language === 'es'
          ? 'contacto, formulario, consulta, presupuesto, trabajo, SINN3RS'
          : 'contact, form, inquiry, quote, work, SINN3RS'
      }
    };

    // Obtener datos de la página actual
    const pageInfo = pageData[currentPath] || pageData['/'];
    const langCode = language === 'es' ? 'es-ES' : 'en-US';

    // Actualizar título
    document.title = pageInfo.title;

    // Actualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', pageInfo.description);

    // Actualizar meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', pageInfo.keywords);

    // Actualizar lang attribute
    document.documentElement.setAttribute('lang', langCode);

    // Actualizar canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Actualizar Open Graph tags
    const updateMetaProperty = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaProperty('og:title', pageInfo.title);
    updateMetaProperty('og:description', pageInfo.description);
    updateMetaProperty('og:url', currentUrl);
    updateMetaProperty('og:locale', langCode);

    // Actualizar Twitter Card tags
    const updateMetaName = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaName('twitter:title', pageInfo.title);
    updateMetaName('twitter:description', pageInfo.description);

  }, [location, language, t]);

  return null;
};

export default SEO;

