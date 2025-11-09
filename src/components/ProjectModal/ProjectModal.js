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
        <div className="item-section-custom1 item-section-custom1-invert">
          {project.images && project.images.length > 0 && (
            <div className="item-section-custom1-img">
              <div className="project-modal-carousel">
                <Carousel fade>
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
                      <b>Fecha:</b> {new Date(project.date).toLocaleDateString('es-ES', {
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
            </div>
            
            {project.videos && project.videos.length > 0 && (
              <div className="project-modal-videos">
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
                    <a 
                      key={index}
                      href={video} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-design1"
                    >
                      Ver video {index + 1}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectModal;

