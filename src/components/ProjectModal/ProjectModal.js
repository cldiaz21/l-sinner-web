import React, { useContext, useState } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import { X } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { getEmbedUrl } from '../../utils/videoUtils';
import './ProjectModal.css';

const ProjectModal = ({ project, show, onHide }) => {
  const { t, language } = useContext(LanguageContext);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());

  if (!project) return null;

  const hasMultipleImages = project.images && project.images.length > 1;

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
    setIsZoomed(false); // Reset zoom cuando cambia la imagen
  };

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <Modal 
      show={show && project !== null} 
      onHide={onHide} 
      size="lg" 
      centered
      backdrop={true}
      keyboard={true}
      className="project-modal"
      dialogClassName="project-modal-dialog"
      style={{ zIndex: 10000 }}
    >
      <Modal.Header className="project-modal-header" closeButton={false}>
        <h3 className="project-modal-title">{project.title}</h3>
        <button
          type="button"
          className="project-modal-close"
          onClick={onHide}
          aria-label={t.modalClose || 'Cerrar'}
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </Modal.Header>
      <Modal.Body className="project-modal-body">
        {/* Carrusel de imágenes - Visualizador principal */}
        {project.images && project.images.length > 0 && (
          <div className="project-modal-image-viewer">
            <div className={`project-modal-carousel ${!hasMultipleImages ? 'single-image' : ''} ${isZoomed ? 'zoomed' : ''}`}>
              <Carousel
                controls={hasMultipleImages}
                indicators={hasMultipleImages}
                interval={null}
                activeIndex={activeIndex}
                onSelect={handleSelect}
              >
                {project.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <div className="project-modal-image-container">
                      {!loadedImages.has(index) && (
                        <div className="image-loading-placeholder">
                          <div className="loading-spinner"></div>
                        </div>
                      )}
                      <img
                        src={image}
                        alt={`${project.title} - Imagen ${index + 1}`}
                        className={`project-modal-image ${isZoomed ? 'zoomed' : ''} ${loadedImages.has(index) ? 'loaded' : 'loading'}`}
                        onClick={handleImageClick}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => {
                          console.error('Error loading image:', image);
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        )}

        {/* Descripción abajo */}
        <div className="project-modal-description">
          <div className="project-modal-info">
            {project.category && (
              <span className="project-modal-category">{project.category.toUpperCase()}</span>
            )}
            {project.date && (
              <span className="project-modal-date">
                {new Date(project.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>

          {project.description && (
            <p className="project-modal-text">{project.description}</p>
          )}

          {project.videos && project.videos.length > 0 && (
            <div className="project-modal-videos">
              <h4 className="project-modal-videos-title">{t.modalVideos || 'Videos'}</h4>
              <div className="project-modal-videos-list">
                {project.videos.map((video, index) => {
                  const embedUrl = getEmbedUrl(video);
                  if (!embedUrl) return null;
                  return (
                    <a
                      key={index}
                      href={embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-video-link"
                    >
                      {t.modalVideos || 'Video'} {index + 1}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectModal;
