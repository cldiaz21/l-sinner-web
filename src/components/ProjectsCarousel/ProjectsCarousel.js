import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProjectsCarousel.css';

const ProjectsCarousel = ({ projects }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
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
        <p>No hay proyectos destacados disponibles.</p>
      </div>
    );
  }

  return (
    <div className="projects-carousel-container">
      <Slider {...settings}>
        {projects.map((project) => (
          <div key={project.id} className="project-carousel-slide">
            <div className="project-carousel-item">
              <div className="project-carousel-image-wrapper">
                {project.images && project.images.length > 0 ? (
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    className="project-carousel-image"
                  />
                ) : (
                  <div className="project-carousel-placeholder">
                    <span>Sin imagen</span>
                  </div>
                )}
              </div>
              <div className="project-carousel-title">
                <h3>{project.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectsCarousel;

