import React, { useContext } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import { X } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { getEmbedUrl } from '../../utils/videoUtils';
import './ProjectModal.css';

const ProjectModal = ({ project, show, onHide }) => {
  const { t, language } = useContext(LanguageContext);
  
  if (!project) return null;

  const hasMultipleImages = project.images && project.images.length > 1;

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
        <div className="item-section-custom1 item-section-custom1-invert">
          {project.images && project.images.length > 0 && (
            <div className="item-section-custom1-img">
              <div className={`project-modal-carousel ${!hasMultipleImages ? 'single-image' : ''}`}>
                <Carousel fade controls={hasMultipleImages} indicators={hasMultipleImages}>
                  {project.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <div className="box-content-img-custom1">
                        <div className="box-shadown-custom-img"></div>
                        <img
                          src={image}
                          alt={`${project.title} - Imagen ${index + 1}`}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
          
          <div className="item-section-custom1-text">
            <div 
              className="text-background-logo"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL || ''}/images/hero/logo.png)`
              }}
            ></div>
            <div className="text-content-wrapper">
              <h3 className="title2">{project.title}</h3>
              
              <div className="box-text1">
                {project.category && (
                  <p>
                    <b>{project.category.toUpperCase()}</b>
                    {project.description && (
                      <>
                        <br />
                        {project.description}
                      </>
                    )}
                    {project.date && (
                      <>
                        <br />
                        <br />
                        <b>{t.modalDate || 'Fecha:'}</b> {new Date(project.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </>
                    )}
                  </p>
                )}
                {!project.category && project.description && (
                  <p>{project.description}</p>
                )}
                {!project.category && !project.description && project.date && (
                  <p>
                    <b>{t.modalDate || 'Fecha:'}</b> {new Date(project.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>

              {project.videos && project.videos.length > 0 && (
                <div className="project-modal-videos">
                  <h4>{t.modalVideos || 'Videos'}</h4>
                  {project.videos.map((video, index) => {
                    const embedUrl = getEmbedUrl(video);
                    if (!embedUrl) return null;
                    return (
                      <a
                        key={index}
                        href={embedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-design1"
                      >
                        {t.modalVideos || 'Videos'} {index + 1}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectModal;
