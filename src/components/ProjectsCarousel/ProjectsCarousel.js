import React, { useState, useContext } from 'react';
import Slider from 'react-slick';
import ProjectModal from '../ProjectModal/ProjectModal';
import TiltedCard from '../TiltedCard/TiltedCard';
import { LanguageContext } from '../../context/LanguageContext';
import './ProjectsCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProjectsCarousel = ({ projects }) => {
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

  const carouselSettings = {
    dots: true,
    infinite: projects && projects.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
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
      <div className="projects-carousel-container">
        <Slider {...carouselSettings} className="projects-carousel">
          {projects.map((project) => (
            <div key={project.id} className="projects-carousel-slide">
              <div className="tilted-card-wrapper">
                <TiltedCard
                  imageSrc={project.images && project.images.length > 0 ? project.images[0] : `https://via.placeholder.com/400x400/1a1a1a/ffffff?text=${encodeURIComponent(t.noImage || 'Sin imagen')}`}
                  altText={project.title}
                  captionText={project.title}
                  containerHeight="400px"
                  containerWidth="100%"
                  imageHeight="400px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="tilted-card-overlay-content">
                      <h3 className="tilted-card-title">{project.title}</h3>
                      {project.date && (
                        <p className="tilted-card-date">
                          {new Date(project.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                        </p>
                      )}
                    </div>
                  }
                  onClick={() => handleProjectClick(project)}
                />
              </div>
            </div>
          ))}
        </Slider>
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
