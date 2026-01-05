import React, { useState, useContext } from 'react';
import ProjectModal from '../ProjectModal/ProjectModal';
import { LanguageContext } from '../../context/LanguageContext';
import './ProjectsGallery.css';

const ProjectsGallery = ({ projects }) => {
  const { t } = useContext(LanguageContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const handleKeyPress = (e, project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProjectClick(project);
    }
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="no-projects">
        <p>{t.noProjectsAvailable || 'No hay proyectos destacados disponibles.'}</p>
      </div>
    );
  }

  return (
    <>
      <div className="projects-gallery-wrapper">
        <div className="projects-gallery-row">
          {projects.map((project) => {
            const hasError = imageErrors[project.id];
            const imageSrc = hasError 
              ? `https://via.placeholder.com/400x400/1a1a1a/ffffff?text=${encodeURIComponent(t.noImage || 'Sin imagen')}`
              : (project.images && project.images.length > 0 ? project.images[0] : `https://via.placeholder.com/400x400/1a1a1a/ffffff?text=${encodeURIComponent(t.noImage || 'Sin imagen')}`);

            return (
              <div key={project.id} className="projects-gallery-col">
                <div 
                  className="project-gallery-item"
                  onClick={() => handleProjectClick(project)}
                  onKeyPress={(e) => handleKeyPress(e, project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver proyecto: ${project.title}`}
                >
                  <div className="project-gallery-image-wrapper">
                    <img
                      src={imageSrc}
                      alt={project.title}
                      className="project-gallery-image"
                      loading="lazy"
                      onError={() => handleImageError(project.id)}
                    />
                    <div className="project-gallery-overlay">
                      <h3 className="project-gallery-title">{project.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <ProjectModal
        project={selectedProject}
        show={showModal}
        onHide={handleCloseModal}
      />
    </>
  );
};

export default ProjectsGallery;
