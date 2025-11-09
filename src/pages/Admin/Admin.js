import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectContext';
import { authService } from '../../services/authService';
import './Admin.css';

const Admin = () => {
  const { 
    projects, 
    carouselImages, 
    loading,
    error,
    addProject, 
    updateProject, 
    deleteProject, 
    addCarouselImage, 
    removeCarouselImage 
  } = useContext(ProjectContext);

  const navigate = useNavigate();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [showDeleteCarouselConfirm, setShowDeleteCarouselConfirm] = useState(false);
  const [deleteCarouselIndex, setDeleteCarouselIndex] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageInputUrl, setImageInputUrl] = useState('');
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [videoInputUrl, setVideoInputUrl] = useState('');
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
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = async () => {
    await authService.signOut();
    navigate('/login');
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      let result;
      if (editingProject) {
        result = await updateProject(editingProject.id, projectForm);
        if (result.success) {
          setAlert({ show: true, message: 'Proyecto actualizado correctamente', type: 'success' });
        } else {
          setAlert({ show: true, message: result.error || 'Error al actualizar proyecto', type: 'danger' });
        }
      } else {
        result = await addProject(projectForm);
        if (result.success) {
          setAlert({ show: true, message: 'Proyecto creado correctamente', type: 'success' });
        } else {
          setAlert({ show: true, message: result.error || 'Error al crear proyecto', type: 'danger' });
        }
      }

      if (result.success) {
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
      }
    } catch (err) {
      setAlert({ show: true, message: err.message || 'Error al guardar proyecto', type: 'danger' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
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
    setDeleteProjectId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProject = async () => {
    if (deleteProjectId) {
      const result = await deleteProject(deleteProjectId);
      if (result.success) {
        setAlert({ show: true, message: 'Proyecto eliminado correctamente', type: 'success' });
      } else {
        setAlert({ show: true, message: result.error || 'Error al eliminar proyecto', type: 'danger' });
      }
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
    setShowDeleteConfirm(false);
    setDeleteProjectId(null);
  };

  const handleAddImage = () => {
    setShowImageInput(true);
  };

  const confirmAddImage = () => {
    if (imageInputUrl.trim()) {
      setProjectForm({
        ...projectForm,
        images: [...projectForm.images, imageInputUrl.trim()]
      });
      setImageInputUrl('');
    }
    setShowImageInput(false);
  };

  const handleRemoveImage = (index) => {
    setProjectForm({
      ...projectForm,
      images: projectForm.images.filter((_, i) => i !== index)
    });
  };

  const handleAddVideo = () => {
    setShowVideoInput(true);
  };

  const confirmAddVideo = () => {
    if (videoInputUrl.trim()) {
      setProjectForm({
        ...projectForm,
        videos: [...projectForm.videos, videoInputUrl.trim()]
      });
      setVideoInputUrl('');
    }
    setShowVideoInput(false);
  };

  const handleRemoveVideo = (index) => {
    setProjectForm({
      ...projectForm,
      videos: projectForm.videos.filter((_, i) => i !== index)
    });
  };

  const handleAddCarouselImage = async () => {
    if (carouselImageUrl.trim()) {
      const result = await addCarouselImage(carouselImageUrl.trim());
      if (result.success) {
        setCarouselImageUrl('');
        setAlert({ show: true, message: 'Imagen agregada al carrusel', type: 'success' });
      } else {
        setAlert({ show: true, message: result.error || 'Error al agregar imagen', type: 'danger' });
      }
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  const handleRemoveCarouselImage = (index) => {
    setDeleteCarouselIndex(index);
    setShowDeleteCarouselConfirm(true);
  };

  const confirmDeleteCarouselImage = async () => {
    if (deleteCarouselIndex !== null) {
      const result = await removeCarouselImage(deleteCarouselIndex);
      if (result.success) {
        setAlert({ show: true, message: 'Imagen eliminada del carrusel', type: 'success' });
      } else {
        setAlert({ show: true, message: result.error || 'Error al eliminar imagen', type: 'danger' });
      }
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
    setShowDeleteCarouselConfirm(false);
    setDeleteCarouselIndex(null);
  };

  if (loading) {
    return (
      <div className="page-container">
        <section className="admin-section">
          <Container>
            <div className="text-center">
              <p>Cargando...</p>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="page-container">
      <section className="admin-section">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="section-title">Panel de Administración</h1>
            <Button variant="outline-danger" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
          
          {error && (
            <Alert variant="danger" dismissible onClose={() => {}}>
              Error: {error}
            </Alert>
          )}

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
                    {projects.length === 0 ? (
                      <Col>
                        <p>No hay proyectos aún. Crea uno nuevo para comenzar.</p>
                      </Col>
                    ) : (
                      projects.map((project) => (
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
                      ))
                    )}
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
                    {carouselImages.length === 0 ? (
                      <Col>
                        <p>No hay imágenes en el carrusel. Agrega una para comenzar.</p>
                      </Col>
                    ) : (
                      carouselImages.map((image, index) => (
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
                      ))
                    )}
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
                disabled={submitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                disabled={submitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={projectForm.date}
                onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                disabled={submitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={projectForm.category}
                onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                placeholder="Ej: Fotografía, Retrato, Comercial..."
                disabled={submitting}
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
                      disabled={submitting}
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
                disabled={submitting}
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
                      disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowProjectModal(false)}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Guardando...' : (editingProject ? 'Actualizar' : 'Crear')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal de confirmación para eliminar proyecto */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este proyecto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteProject}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación para eliminar imagen del carrusel */}
      <Modal show={showDeleteCarouselConfirm} onHide={() => setShowDeleteCarouselConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta imagen del carrusel?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteCarouselConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteCarouselImage}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para agregar imagen */}
      <Modal show={showImageInput} onHide={() => setShowImageInput(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              value={imageInputUrl}
              onChange={(e) => setImageInputUrl(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageInput(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmAddImage}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para agregar video */}
      <Modal show={showVideoInput} onHide={() => setShowVideoInput(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>URL del Video (YouTube, Vimeo, etc.)</Form.Label>
            <Form.Control
              type="text"
              value={videoInputUrl}
              onChange={(e) => setVideoInputUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVideoInput(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmAddVideo}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
