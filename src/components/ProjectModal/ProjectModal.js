import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import { X } from 'lucide-react';
import { getEmbedUrl } from '../../utils/videoUtils';
import './ProjectModal.css';

const ProjectModal = ({ project, show, onHide }) => {
  if (!project) return null;

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
        <Modal.Title className="project-modal-title">{project.title}</Modal.Title>
        <button 
          type="button" 
          className="project-modal-close" 
          onClick={onHide}
          aria-label="Cerrar"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </Modal.Header>
      <Modal.Body className="project-modal-body">
        {project.images && project.images.length > 0 && (
          <div className="project-modal-carousel">
            <Carousel fade>
              {project.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <div className="project-modal-image-wrapper">
                    <img
                      className="project-modal-image"
                      src={image}
                      alt={`${project.title} - Imagen ${index + 1}`}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        )}
        
        <div className="project-modal-content">
          {project.date && (
            <div className="project-modal-date">
              <strong>Fecha:</strong> {new Date(project.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
          
          {project.category && (
            <div className="project-modal-category">
              <strong>Categoría:</strong> {project.category}
            </div>
          )}
          
          {project.description && (
            <div className="project-modal-description">
              <p>{project.description}</p>
            </div>
          )}
          
          {project.videos && project.videos.length > 0 && (
            <div className="project-modal-videos">
              <h5>Videos</h5>
              {project.videos.map((video, index) => {
                const embedUrl = getEmbedUrl(video);
                if (embedUrl) {
                  return (
                    <div key={index} className="project-modal-video-embed">
                      <iframe
                        src={embedUrl}
                        title={`${project.title} - Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="project-modal-video-iframe"
                      ></iframe>
                    </div>
                  );
                }
                return (
                  <div key={index} className="project-modal-video">
                    <a 
                      href={video} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-modal-video-link"
                    >
                      Ver video {index + 1}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectModal;

