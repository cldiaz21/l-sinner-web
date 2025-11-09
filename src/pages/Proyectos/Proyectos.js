import React, { useContext, useState } from 'react';
import { Container, Row, Col, Modal, Button, Carousel } from 'react-bootstrap';
import { ProjectContext } from '../../context/ProjectContext';
import { LanguageContext } from '../../context/LanguageContext';
import HeroSection from '../../components/HeroSection/HeroSection';
import ProjectGrid from '../../components/ProjectGrid/ProjectGrid';
import { getEmbedUrl } from '../../utils/videoUtils';
import './Proyectos.css';

const Proyectos = () => {
  const { projects } = useContext(ProjectContext);
  const { t } = useContext(LanguageContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="page-container">
      <HeroSection title={t.proyectos || "Proyectos"} subtitle={t.proyectosSubtitle || "Nuestro Trabajo"} />
      <section className="proyectos-section">
        <Container>
          <p className="section-subtitle text-center mb-5">
            {t.proyectosSubtitle || "Explora nuestra galería de proyectos y descubre el arte detrás de cada imagen"}
          </p>
          
          {projects.length > 0 ? (
            <ProjectGrid projects={projects} onProjectClick={handleProjectClick} />
          ) : (
            <div className="no-projects">
              <p>No hay proyectos disponibles en este momento.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Modal para ver detalles del proyecto */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        size="lg"
        centered
        className="project-modal"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          {selectedProject && (
            <>
              {/* Imágenes */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="mb-4">
                  <h5>Imágenes</h5>
                  <Carousel className="project-carousel-modal">
                    {selectedProject.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          src={image}
                          alt={`${selectedProject.title} - ${index + 1}`}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              )}
              
              {/* Videos */}
              {selectedProject.videos && selectedProject.videos.length > 0 && (
                <div className="mb-4">
                  <h5>Videos</h5>
                  <div className="videos-list-modal">
                    {selectedProject.videos.map((video, index) => {
                      const embedUrl = getEmbedUrl(video);
                      return (
                        <div key={index} className="video-item-modal">
                          <iframe
                            src={embedUrl}
                            title={`${selectedProject.title} - Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="video-iframe"
                          ></iframe>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {(!selectedProject.images || selectedProject.images.length === 0) && 
               (!selectedProject.videos || selectedProject.videos.length === 0) && (
                <div className="no-image-placeholder">
                  <p>No hay contenido multimedia disponible</p>
                </div>
              )}

              <div className="project-details mt-4">
                <p><strong>Descripción:</strong></p>
                <p>{selectedProject.description || 'Sin descripción disponible'}</p>
                {selectedProject.category && (
                  <p><strong>Categoría:</strong> {selectedProject.category}</p>
                )}
                {selectedProject.date && (
                  <p><strong>Fecha:</strong> {new Date(selectedProject.date).toLocaleDateString()}</p>
                )}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="outline-light" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Proyectos;

