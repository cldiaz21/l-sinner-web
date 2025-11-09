import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Tab, Tabs } from 'react-bootstrap';
import { ProjectContext } from '../../context/ProjectContext';
import './Admin.css';

const Admin = () => {
  const { 
    projects, 
    carouselImages, 
    addProject, 
    updateProject, 
    deleteProject, 
    addCarouselImage, 
    removeCarouselImage 
  } = useContext(ProjectContext);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showCarouselModal, setShowCarouselModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    images: [],
    videos: [],
    date: '',
    featured: false
  });
  const [carouselImageUrl, setCarouselImageUrl] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    
    if (editingProject) {
      updateProject(editingProject.id, projectForm);
      setAlert({ show: true, message: 'Proyecto actualizado correctamente', type: 'success' });
    } else {
      addProject(projectForm);
      setAlert({ show: true, message: 'Proyecto creado correctamente', type: 'success' });
    }

    setProjectForm({
      title: '',
      description: '',
      category: '',
      images: [],
      videos: [],
      date: '',
      featured: false
    });
    setEditingProject(null);
    setShowProjectModal(false);
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description || '',
      category: project.category || '',
      images: project.images || [],
      videos: project.videos || [],
      date: project.date ? project.date.split('T')[0] : '',
      featured: project.featured || false
    });
    setShowProjectModal(true);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      deleteProject(id);
      setAlert({ show: true, message: 'Proyecto eliminado correctamente', type: 'success' });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  const handleAddImage = () => {
    const imageUrl = prompt('Ingresa la URL de la imagen:');
    if (imageUrl) {
      setProjectForm({
        ...projectForm,
        images: [...projectForm.images, imageUrl]
      });
    }
  };

  const handleRemoveImage = (index) => {
    setProjectForm({
      ...projectForm,
      images: projectForm.images.filter((_, i) => i !== index)
    });
  };

  const handleAddVideo = () => {
    const videoUrl = prompt('Ingresa la URL del video (YouTube, Vimeo, etc.):');
    if (videoUrl) {
      setProjectForm({
        ...projectForm,
        videos: [...projectForm.videos, videoUrl]
      });
    }
  };

  const handleRemoveVideo = (index) => {
    setProjectForm({
      ...projectForm,
      videos: projectForm.videos.filter((_, i) => i !== index)
    });
  };

  const handleAddCarouselImage = () => {
    if (carouselImageUrl.trim()) {
      addCarouselImage(carouselImageUrl);
      setCarouselImageUrl('');
      setAlert({ show: true, message: 'Imagen agregada al carrusel', type: 'success' });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  const handleRemoveCarouselImage = (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta imagen del carrusel?')) {
      removeCarouselImage(index);
      setAlert({ show: true, message: 'Imagen eliminada del carrusel', type: 'success' });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  return (
    <div className="page-container">
      <section className="admin-section">
        <Container>
          <h1 className="section-title">Panel de Administración</h1>
          
          {alert.show && (
            <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false, message: '', type: 'success' })}>
              {alert.message}
            </Alert>
          )}

          <Tabs defaultActiveKey="projects" className="admin-tabs">
            {/* Tab de Proyectos */}
            <Tab eventKey="projects" title="Proyectos">
              <Row className="mt-4">
                <Col>
                  <Button 
                    variant="outline-light" 
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({
                        title: '',
                        description: '',
                        category: '',
                        images: [],
                        videos: [],
                        date: '',
                        featured: false
                      });
                      setShowProjectModal(true);
                    }}
                    className="mb-4"
                  >
                    + Nuevo Proyecto
                  </Button>

                  <Row>
                    {projects.map((project) => (
                      <Col key={project.id} md={6} lg={4} className="mb-4">
                        <Card className="admin-project-card">
                          {project.images && project.images.length > 0 ? (
                            <Card.Img variant="top" src={project.images[0]} />
                          ) : (
                            <div className="no-image-placeholder">Sin imagen</div>
                          )}
                          <Card.Body>
                            <Card.Title>{project.title}</Card.Title>
                            <Card.Text>
                              {project.description?.substring(0, 100)}...
                            </Card.Text>
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => handleEditProject(project)}
                              >
                                Editar
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Tab>

            {/* Tab de Carrusel */}
            <Tab eventKey="carousel" title="Carrusel">
              <Row className="mt-4">
                <Col>
                  <Card className="mb-4">
                    <Card.Body>
                      <h3>Agregar Imagen al Carrusel</h3>
                      <Form.Group className="mb-3">
                        <Form.Label>URL de la Imagen</Form.Label>
                        <Form.Control
                          type="text"
                          value={carouselImageUrl}
                          onChange={(e) => setCarouselImageUrl(e.target.value)}
                          placeholder="https://ejemplo.com/imagen.jpg"
                        />
                      </Form.Group>
                      <Button variant="outline-light" onClick={handleAddCarouselImage}>
                        Agregar Imagen
                      </Button>
                    </Card.Body>
                  </Card>

                  <Row>
                    {carouselImages.map((image, index) => (
                      <Col key={index} md={6} lg={4} className="mb-4">
                        <Card className="carousel-image-card">
                          <Card.Img variant="top" src={image} />
                          <Card.Body>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleRemoveCarouselImage(index)}
                              className="w-100"
                            >
                              Eliminar
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </section>

      {/* Modal para crear/editar proyecto */}
      <Modal 
        show={showProjectModal} 
        onHide={() => {
          setShowProjectModal(false);
          setEditingProject(null);
          setProjectForm({
            title: '',
            description: '',
            category: '',
            images: [],
            videos: [],
            date: '',
            featured: false
          });
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleProjectSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Título *</Form.Label>
              <Form.Control
                type="text"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={projectForm.date}
                onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={projectForm.category}
                onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                placeholder="Ej: Fotografía, Retrato, Comercial..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imágenes</Form.Label>
              <div className="images-list mb-2">
                {projectForm.images.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image} alt={`Imagen ${index + 1}`} className="thumb-image" />
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline-secondary" 
                onClick={handleAddImage}
                type="button"
                className="me-2"
              >
                + Agregar Imagen
              </Button>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Videos</Form.Label>
              <div className="videos-list mb-2">
                {projectForm.videos.map((video, index) => (
                  <div key={index} className="video-item">
                    <div className="video-url">{video}</div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveVideo(index)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline-secondary" 
                onClick={handleAddVideo}
                type="button"
              >
                + Agregar Video
              </Button>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Proyecto destacado (aparecerá en el home)"
                checked={projectForm.featured}
                onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProjectModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingProject ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;

