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
          ? 'L SINN3R - Fotografía, Arte Visual y Dirección Creativa | Portfolio Profesional'
          : 'L SINN3R - Photography, Visual Art and Creative Direction | Professional Portfolio',
        description: language === 'es'
          ? 'L SINN3R es un estudio creativo que fusiona fotografía, arte visual, publicidad y dirección creativa. Transformamos ideas en experiencias estéticas con propósito. Portfolio de Álvaro Meza.'
          : 'L SINN3R is a creative studio that merges photography, visual art, advertising and creative direction. We transform ideas into aesthetic experiences with purpose. Portfolio by Álvaro Meza.',
        keywords: language === 'es'
          ? 'fotografía profesional, arte visual, dirección creativa, publicidad, portfolio fotográfico, Álvaro Meza, L SINN3R, fotógrafo, diseñador, creativo'
          : 'professional photography, visual art, creative direction, advertising, photography portfolio, Álvaro Meza, L SINN3R, photographer, designer, creative'
      },
      '/identidad-sinners': {
        title: language === 'es'
          ? 'Identidad Sinners - Visión, Estilo y Valores | L SINN3R'
          : 'Sinners Identity - Vision, Style and Values | L SINN3R',
        description: language === 'es'
          ? 'La identidad de L SINN3R: visión, estilo, misión y valores. La dualidad entre la perfección y lo imperfecto en cada proceso creativo.'
          : 'L SINN3R identity: vision, style, mission and values. The duality between perfection and imperfection in every creative process.',
        keywords: language === 'es'
          ? 'identidad creativa, valores, visión, estilo artístico, filosofía creativa, L SINN3R'
          : 'creative identity, values, vision, artistic style, creative philosophy, L SINN3R'
      },
      '/proyectos': {
        title: language === 'es'
          ? 'Proyectos - Portfolio de Fotografía y Arte Visual | L SINN3R'
          : 'Projects - Photography and Visual Art Portfolio | L SINN3R',
        description: language === 'es'
          ? 'Explora el portfolio de proyectos de L SINN3R. Fotografía profesional, arte visual, dirección creativa y campañas publicitarias.'
          : 'Explore L SINN3R project portfolio. Professional photography, visual art, creative direction and advertising campaigns.',
        keywords: language === 'es'
          ? 'proyectos fotográficos, portfolio, galería, trabajos realizados, fotografía artística, L SINN3R'
          : 'photography projects, portfolio, gallery, completed work, artistic photography, L SINN3R'
      },
      '/quienes-somos': {
        title: language === 'es'
          ? 'Quienes Somos - Sobre Álvaro Meza / L SINN3R'
          : 'About Us - About Álvaro Meza / L SINN3R',
        description: language === 'es'
          ? 'Conoce a Álvaro Meza, creador detrás de L SINN3R. Estudiante de Publicidad y artista visual que transforma ideas en experiencias estéticas.'
          : 'Meet Álvaro Meza, creator behind L SINN3R. Advertising student and visual artist who transforms ideas into aesthetic experiences.',
        keywords: language === 'es'
          ? 'Álvaro Meza, sobre mí, biografía, creador, artista visual, publicidad, L SINN3R'
          : 'Álvaro Meza, about me, biography, creator, visual artist, advertising, L SINN3R'
      },
      '/contacto': {
        title: language === 'es'
          ? 'Contacto - Trabajemos Juntos | L SINN3R'
          : 'Contact - Let\'s Work Together | L SINN3R',
        description: language === 'es'
          ? 'Contacta con L SINN3R para tu proyecto. Formulario de contacto para consultas sobre fotografía, arte visual y dirección creativa.'
          : 'Contact L SINN3R for your project. Contact form for inquiries about photography, visual art and creative direction.',
        keywords: language === 'es'
          ? 'contacto, formulario, consulta, presupuesto, trabajo, L SINN3R'
          : 'contact, form, inquiry, quote, work, L SINN3R'
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

