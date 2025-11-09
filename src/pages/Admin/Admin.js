import React, { useState, useContext } from 'react';
import { Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { ProjectContext } from '../../context/ProjectContext';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import { Plus, Edit, Trash2, Image as ImageIcon, Video, Calendar, Tag, Star, Folder } from 'lucide-react';
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

  const [activeTab, setActiveTab] = useState('dashboard');
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

  const renderDashboard = () => {
    const featuredProjects = projects.filter(p => p.featured).length;
    const totalProjects = projects.length;
    const totalCarouselImages = carouselImages.length;

    return (
      <div>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="text-muted small mb-1">Total Proyectos</div>
                    <div className="h4 mb-0">{totalProjects}</div>
                  </div>
                  <div className="text-primary">
                    <Folder size={32} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="text-muted small mb-1">Proyectos Destacados</div>
                    <div className="h4 mb-0">{featuredProjects}</div>
                  </div>
                  <div className="text-warning">
                    <Star size={32} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="text-muted small mb-1">Imágenes en Carrusel</div>
                    <div className="h4 mb-0">{totalCarouselImages}</div>
                  </div>
                  <div className="text-info">
                    <ImageIcon size={32} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="admin-card">
          <Card.Header className="admin-card-header">
            <h5 className="admin-card-title mb-0">Actividad Reciente</h5>
          </Card.Header>
          <Card.Body>
            {projects.length === 0 ? (
              <p className="text-muted mb-0">No hay proyectos aún. Crea uno nuevo para comenzar.</p>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Categoría</th>
                      <th>Fecha</th>
                      <th>Destacado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.slice(0, 5).map((project) => (
                      <tr key={project.id}>
                        <td>{project.title}</td>
                        <td>{project.category || '-'}</td>
                        <td>{project.date ? new Date(project.date).toLocaleDateString() : '-'}</td>
                        <td>{project.featured ? '✓' : '-'}</td>
                        <td>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-primary p-0 me-2"
                            onClick={() => handleEditProject(project)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-danger p-0"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  };

  const renderProjects = () => {
    return (
      <div>
        <Card className="admin-card mb-4">
          <Card.Header className="admin-card-header d-flex justify-content-between align-items-center">
            <h5 className="admin-card-title mb-0">Proyectos</h5>
            <Button
              className="admin-btn admin-btn-primary"
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
            >
              <Plus size={18} />
              Nuevo Proyecto
            </Button>
          </Card.Header>
          <Card.Body>
            {projects.length === 0 ? (
              <p className="text-muted">No hay proyectos aún. Crea uno nuevo para comenzar.</p>
            ) : (
              <Row>
                {projects.map((project) => (
                  <Col key={project.id} md={6} lg={4} className="mb-4">
                    <Card className="admin-project-card h-100">
                      {project.images && project.images.length > 0 ? (
                        <Card.Img variant="top" src={project.images[0]} className="admin-project-image" />
                      ) : (
                        <div className="no-image-placeholder">
                          <ImageIcon size={48} />
                        </div>
                      )}
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="admin-project-title">{project.title}</Card.Title>
                        <Card.Text className="admin-project-text flex-grow-1">
                          {project.description?.substring(0, 100)}...
                        </Card.Text>
                        <div className="d-flex gap-2 mt-auto">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditProject(project)}
                            className="flex-grow-1"
                          >
                            <Edit size={16} className="me-1" />
                            Editar
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  };

  const renderCarousel = () => {
    return (
      <div>
        <Card className="admin-card mb-4">
          <Card.Header className="admin-card-header">
            <h5 className="admin-card-title mb-0">Agregar Imagen al Carrusel</h5>
          </Card.Header>
          <Card.Body>
            <Form.Group className="admin-form-group">
              <Form.Label className="admin-form-label">URL de la Imagen</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  value={carouselImageUrl}
                  onChange={(e) => setCarouselImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="admin-form-control"
                />
                <Button className="admin-btn admin-btn-primary" onClick={handleAddCarouselImage}>
                  <Plus size={18} />
                  Agregar
                </Button>
              </div>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="admin-card">
          <Card.Header className="admin-card-header">
            <h5 className="admin-card-title mb-0">Imágenes del Carrusel</h5>
          </Card.Header>
          <Card.Body>
            {carouselImages.length === 0 ? (
              <p className="text-muted">No hay imágenes en el carrusel. Agrega una para comenzar.</p>
            ) : (
              <Row>
                {carouselImages.map((image, index) => (
                  <Col key={index} md={6} lg={4} className="mb-4">
                    <Card className="carousel-image-card">
                      <Card.Img variant="top" src={image} className="carousel-image-preview" />
                      <Card.Body>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveCarouselImage(index)}
                          className="w-100"
                        >
                          <Trash2 size={16} className="me-1" />
                          Eliminar
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {error && (
        <Alert variant="danger" dismissible className="admin-alert admin-alert-danger">
          Error: {error}
        </Alert>
      )}

      {alert.show && (
        <Alert 
          variant={alert.type} 
          dismissible 
          onClose={() => setAlert({ show: false, message: '', type: 'success' })}
          className={alert.type === 'success' ? 'admin-alert admin-alert-success' : 'admin-alert admin-alert-danger'}
        >
          {alert.message}
        </Alert>
      )}

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'projects' && renderProjects()}
      {activeTab === 'carousel' && renderCarousel()}

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

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <Calendar size={16} className="me-1" />
                    Fecha
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={projectForm.date}
                    onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                    disabled={submitting}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <Tag size={16} className="me-1" />
                    Categoría
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    placeholder="Ej: Fotografía, Retrato, Comercial..."
                    disabled={submitting}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                <ImageIcon size={16} className="me-1" />
                Imágenes
              </Form.Label>
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
                disabled={submitting}
              >
                <Plus size={16} className="me-1" />
                Agregar Imagen
              </Button>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <Video size={16} className="me-1" />
                Videos
              </Form.Label>
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
                <Plus size={16} className="me-1" />
                Agregar Video
              </Button>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    <Star size={16} className="me-1" />
                    Proyecto destacado (aparecerá en el home)
                  </>
                }
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
    </AdminLayout>
  );
};

export default Admin;
