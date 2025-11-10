import React, { useState } from 'react';
import ProjectModal from '../ProjectModal/ProjectModal';
import GlareHover from '../GlareHover/GlareHover';
import './ProjectsCarousel.css';

const ProjectsCarousel = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleProjectClick = (project, index) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleMouseEnter = (index) => {
    setExpandedIndex(index);
  };

  const handleMouseLeave = () => {
    setExpandedIndex(null);
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="no-projects">
        <p>No hay proyectos destacados disponibles.</p>
      </div>
    );
  }

  return (
    <>
      <div className="expandable-grid-container">
        {projects.map((project, index) => (
          <GlareHover
            key={project.id}
            width="100%"
            height="100%"
            background="transparent"
            borderRadius="0"
            borderColor="transparent"
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="expandable-card-glare-wrapper"
            style={{ opacity: expandedIndex === index ? 1 : expandedIndex === null ? 1 : 0.7 }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="expandable-card-item"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleProjectClick(project, index);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjectClick(project, index);
                }
              }}
            >
              <div className="expandable-card-inner">
                <div>
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="expandable-card-image"
                    />
                  ) : (
                    <div className="expandable-card-placeholder">
                      <span>Sin imagen</span>
                    </div>
                  )}
                </div>
                <div className="expandable-card-text-wrapper">
                  <h3 className="expandable-card-title">
                    {project.title}
                  </h3>
                  {project.date && (
                    <p className="expandable-card-subtitle">
                      {new Date(project.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </GlareHover>
        ))}
      </div>
      
      <ProjectModal
        project={selectedProject}
        show={showModal}
        onHide={handleCloseModal}
      />
    </>
  );
};

export default ProjectsCarousel;
