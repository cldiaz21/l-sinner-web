import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './ProjectGrid.css';

const ProjectGrid = ({ projects, limit, onProjectClick }) => {
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  if (displayProjects.length === 0) {
    return (
      <div className="no-projects">
        <p>No hay proyectos disponibles en este momento.</p>
      </div>
    );
  }

  const handleCardClick = (project) => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  return (
    <Row className="project-grid">
      {displayProjects.map((project) => (
        <Col key={project.id} md={6} lg={4} className="mb-4">
          <Card 
            className={`project-card ${onProjectClick ? 'clickable' : ''}`}
            onClick={() => handleCardClick(project)}
            style={{ cursor: onProjectClick ? 'pointer' : 'default' }}
          >
            {project.images && project.images.length > 0 ? (
              <Card.Img 
                variant="top" 
                src={project.images[0]} 
                alt={project.title}
                className="project-image"
              />
            ) : (
              <div className="project-placeholder">
                <span>Sin imagen</span>
              </div>
            )}
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text className="project-description">
                {project.description?.substring(0, 100)}
                {project.description?.length > 100 ? '...' : ''}
              </Card.Text>
              {onProjectClick && (
                <span className="project-link">
                  Ver más →
                </span>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProjectGrid;

