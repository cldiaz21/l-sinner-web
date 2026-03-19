import React, { useState, useContext, useRef, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { ProjectContext } from '../../context/ProjectContext';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import { Plus, Edit, Trash2, Image as ImageIcon, Video, Calendar, Tag, Star, Folder, Upload, X as XIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { uploadService } from '../../services/uploadService';
import { getYouTubeVideoInfo } from '../../utils/youtubeUtils';
import AdminContent from '../../components/AdminContent/AdminContent';
import './Admin.css';

const Admin = () => {
  const { 
    projects, 
    carouselItems,
    homeVideos,
    loading,
    error,
    addProject, 
    updateProject, 
    deleteProject, 
    addCarouselImage, 
    removeCarouselImage,
    updateCarouselOrder,
    addHomeVideo,
    removeHomeVideo,
    updateHomeVideosOrder,
  } = useContext(ProjectContext);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [showDeleteCarouselConfirm, setShowDeleteCarouselConfirm] = useState(false);
  const [deleteCarouselId, setDeleteCarouselId] = useState(null);
  const [draggedCarouselIndex, setDraggedCarouselIndex] = useState(null);
  const [dragOverCarouselIndex, setDragOverCarouselIndex] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageInputUrl, setImageInputUrl] = useState('');
  const [imageUploadMode, setImageUploadMode] = useState('upload'); // 'upload' or 'url'
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef(null);
  const carouselFileInputRef = useRef(null);
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
  const [carouselUploadMode, setCarouselUploadMode] = useState('upload');
  const [uploadingCarousel, setUploadingCarousel] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);
  const [homeVideoUrl, setHomeVideoUrl] = useState('');
  const [showDeleteHomeVideoConfirm, setShowDeleteHomeVideoConfirm] = useState(false);
  const [deleteHomeVideoId, setDeleteHomeVideoId] = useState(null);
  const [homeVideoInfos, setHomeVideoInfos] = useState({});
  const [draggedVideoIndex, setDraggedVideoIndex] = useState(null);
  const [dragOverVideoIndex, setDragOverVideoIndex] = useState(null);

  useEffect(() => {
    if (!homeVideos?.length) {
      setHomeVideoInfos({});
      return;
    }
    let cancelled = false;
    const load = async () => {
      const infos = {};
      for (const video of homeVideos) {
        try {
          const info = await getYouTubeVideoInfo(video.url);
          if (!cancelled && info) infos[video.id] = { title: info.title, thumbnail: info.thumbnail };
        } catch {
          if (!cancelled) infos[video.id] = null;
        }
      }
      if (!cancelled) setHomeVideoInfos(infos);
    };
    load();
    return () => { cancelled = true; };
  }, [homeVideos]);

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

  const handleImageFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    setUploadProgress(`Subiendo ${files.length} imagen(es)...`);

    try {
      const result = await uploadService.uploadMultipleImages(files, 'projects');
      
      if (result.success && result.urls.length > 0) {
        setProjectForm({
          ...projectForm,
          images: [...projectForm.images, ...result.urls]
        });
        setAlert({ 
          show: true, 
          message: `${result.urls.length} imagen(es) subida(s) correctamente`, 
          type: 'success' 
        });
        setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
        setShowImageInput(false);
      } else {
        const errorMsg = result.errors.length > 0 
          ? `Error: ${result.errors.join(', ')}` 
          : 'Error al subir las imágenes';
        setAlert({ show: true, message: errorMsg, type: 'danger' });
        setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 5000);
      }
    } catch (error) {
      setAlert({ 
        show: true, 
        message: error.message || 'Error al subir las imágenes', 
        type: 'danger' 
      });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 5000);
    } finally {
      setUploadingImages(false);
      setUploadProgress('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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

  const handleCarouselImageFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingCarousel(true);
    setUploadProgress(`Subiendo ${files.length} imagen(es) al header...`);

    try {
      for (const file of files) {
        const result = await uploadService.uploadImage(file, 'carousel');
        if (result.url) {
          const addResult = await addCarouselImage(result.url);
          if (!addResult.success) {
            setAlert({ 
              show: true, 
              message: `Error al agregar imagen: ${addResult.error}`, 
              type: 'danger' 
            });
          }
        } else {
          setAlert({ 
            show: true, 
            message: `Error al subir imagen: ${result.error}`, 
            type: 'danger' 
          });
        }
      }
      
      if (files.length > 0) {
        setAlert({ 
          show: true, 
          message: `${files.length} imagen(es) agregada(s) al header del home`, 
          type: 'success' 
        });
        setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
        setCarouselImageUrl('');
      }
    } catch (error) {
      setAlert({ 
        show: true, 
        message: error.message || 'Error al subir las imágenes', 
        type: 'danger' 
      });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 5000);
    } finally {
      setUploadingCarousel(false);
      setUploadProgress('');
      if (carouselFileInputRef.current) {
        carouselFileInputRef.current.value = '';
      }
    }
  };

  const handleAddCarouselImage = async () => {
    if (carouselImageUrl.trim()) {
      const result = await addCarouselImage(carouselImageUrl.trim());
      if (result.success) {
        setCarouselImageUrl('');
        setAlert({ show: true, message: 'Imagen agregada al header del home', type: 'success' });
      } else {
        setAlert({ show: true, message: result.error || 'Error al agregar imagen', type: 'danger' });
      }
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  const handleRemoveCarouselImage = (id) => {
    setDeleteCarouselId(id);
    setShowDeleteCarouselConfirm(true);
  };

  const confirmDeleteCarouselImage = async () => {
    if (deleteCarouselId) {
      const result = await removeCarouselImage(deleteCarouselId);
      if (result.success) {
        setAlert({ show: true, message: 'Imagen eliminada del header', type: 'success' });
      } else {
        setAlert({ show: true, message: result.error || 'Error al eliminar imagen', type: 'danger' });
      }
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
    setShowDeleteCarouselConfirm(false);
    setDeleteCarouselId(null);
  };

  const handleCarouselDragStart = (e, index) => {
    setDraggedCarouselIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleCarouselDragEnd = () => {
    setDraggedCarouselIndex(null);
    setDragOverCarouselIndex(null);
  };

  const handleCarouselDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedCarouselIndex !== null && draggedCarouselIndex !== index) {
      setDragOverCarouselIndex(index);
    }
  };

  const handleCarouselDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverCarouselIndex(null);
    }
  };

  const handleCarouselDrop = async (e, dropIndex) => {
    e.preventDefault();
    setDragOverCarouselIndex(null);
    const fromIndex = draggedCarouselIndex;
    if (fromIndex === null || fromIndex === dropIndex) {
      setDraggedCarouselIndex(null);
      return;
    }
    const newOrder = [...carouselItems];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(dropIndex, 0, moved);
    const orderedIds = newOrder.map(item => item.id);
    const result = await updateCarouselOrder(orderedIds);
    if (result.success) setAlert({ show: true, message: 'Orden del header actualizado', type: 'success' });
    else setAlert({ show: true, message: result.error || 'Error al reordenar', type: 'danger' });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    setDraggedCarouselIndex(null);
  };

  const handleAddHomeVideo = async () => {
    if (!homeVideoUrl.trim()) return;
    const result = await addHomeVideo(homeVideoUrl.trim());
    if (result.success) {
      setHomeVideoUrl('');
      setAlert({ show: true, message: 'Video agregado a la home', type: 'success' });
    } else {
      setAlert({ show: true, message: result.error || 'Error al agregar video', type: 'danger' });
    }
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleRemoveHomeVideo = (id) => {
    setDeleteHomeVideoId(id);
    setShowDeleteHomeVideoConfirm(true);
  };

  const confirmDeleteHomeVideo = async () => {
    if (deleteHomeVideoId) {
      const result = await removeHomeVideo(deleteHomeVideoId);
      if (result.success) setAlert({ show: true, message: 'Video eliminado', type: 'success' });
      else setAlert({ show: true, message: result.error || 'Error al eliminar', type: 'danger' });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    }
    setShowDeleteHomeVideoConfirm(false);
    setDeleteHomeVideoId(null);
  };

  const handleMoveHomeVideo = async (index, direction) => {
    const newOrder = [...homeVideos];
    const other = direction === 'up' ? index - 1 : index + 1;
    if (other < 0 || other >= newOrder.length) return;
    [newOrder[index], newOrder[other]] = [newOrder[other], newOrder[index]];
    const orderedIds = newOrder.map(v => v.id);
    const result = await updateHomeVideosOrder(orderedIds);
    if (result.success) setAlert({ show: true, message: 'Orden actualizado', type: 'success' });
    else setAlert({ show: true, message: result.error || 'Error al reordenar', type: 'danger' });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleVideoDragStart = (e, index) => {
    setDraggedVideoIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleVideoDragEnd = () => {
    setDraggedVideoIndex(null);
    setDragOverVideoIndex(null);
  };

  const handleVideoDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedVideoIndex !== null && draggedVideoIndex !== index) {
      setDragOverVideoIndex(index);
    }
  };

  const handleVideoDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverVideoIndex(null);
    }
  };

  const handleVideoDrop = async (e, dropIndex) => {
    e.preventDefault();
    setDragOverVideoIndex(null);
    const fromIndex = draggedVideoIndex;
    if (fromIndex === null || fromIndex === dropIndex) {
      setDraggedVideoIndex(null);
      return;
    }
    const newOrder = [...homeVideos];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(dropIndex, 0, moved);
    const orderedIds = newOrder.map(v => v.id);
    const result = await updateHomeVideosOrder(orderedIds);
    if (result.success) setAlert({ show: true, message: 'Orden actualizado', type: 'success' });
    else setAlert({ show: true, message: result.error || 'Error al reordenar', type: 'danger' });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    setDraggedVideoIndex(null);
  };

  const renderHomeVideos = () => {
    return (
      <div>
        <Card className="admin-card mb-4">
          <Card.Header className="admin-card-header">
            <h5 className="admin-card-title mb-0">Agregar video de YouTube</h5>
          </Card.Header>
          <Card.Body>
            <p className="text-muted small mb-3">
              Los videos se muestran en la sección &quot;Videos&quot; de la home. Solo enlaces de YouTube (ej: https://www.youtube.com/watch?v=... o https://youtu.be/...).
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Form.Control
                type="url"
                value={homeVideoUrl}
                onChange={(e) => setHomeVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="admin-form-control flex-grow-1"
                style={{ minWidth: '200px' }}
              />
              <Button
                className="admin-btn admin-btn-primary"
                onClick={handleAddHomeVideo}
                disabled={!homeVideoUrl.trim()}
              >
                <Plus size={18} className="me-1" />
                Agregar video
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Card className="admin-card">
          <Card.Header className="admin-card-header">
            <h5 className="admin-card-title mb-0">Videos de la Home (arrastra para reordenar)</h5>
          </Card.Header>
          <Card.Body>
            {homeVideos.length === 0 ? (
              <p className="text-muted">No hay videos. Agrega enlaces de YouTube arriba.</p>
            ) : (
              <div className="list-group list-group-flush">
                {homeVideos.map((video, index) => {
                  const info = homeVideoInfos[video.id];
                  const isDragging = draggedVideoIndex === index;
                  const isDragOver = dragOverVideoIndex === index;
                  return (
                    <div
                      key={video.id}
                      className={`list-group-item d-flex align-items-center gap-3 flex-wrap py-3 home-video-row ${isDragging ? 'home-video-dragging' : ''} ${isDragOver ? 'home-video-drag-over' : ''}`}
                      draggable
                      onDragStart={(e) => handleVideoDragStart(e, index)}
                      onDragEnd={handleVideoDragEnd}
                      onDragOver={(e) => handleVideoDragOver(e, index)}
                      onDragLeave={handleVideoDragLeave}
                      onDrop={(e) => handleVideoDrop(e, index)}
                    >
                      <span className="home-video-drag-handle text-muted me-1" title="Arrastra para reordenar">⋮⋮</span>
                      <span className="text-muted fw-bold" style={{ minWidth: '24px' }}>{index + 1}.</span>
                      {info?.thumbnail && (
                        <img
                          src={info.thumbnail}
                          alt=""
                          className="home-video-thumb rounded"
                        />
                      )}
                      <div className="flex-grow-1 min-w-0">
                        {info?.title ? (
                          <div className="fw-semibold text-dark mb-1">{info.title}</div>
                        ) : (
                          info === null ? (
                            <div className="text-muted small mb-1">No se pudo cargar la info</div>
                          ) : (
                            <div className="text-muted small mb-1">Cargando...</div>
                          )
                        )}
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="small text-break">
                          {video.url}
                        </a>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleMoveHomeVideo(index, 'up')}
                          disabled={index === 0}
                          title="Subir"
                        >
                          <ChevronUp size={18} />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleMoveHomeVideo(index, 'down')}
                          disabled={index === homeVideos.length - 1}
                          title="Bajar"
                        >
                          <ChevronDown size={18} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveHomeVideo(video.id)}
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  };

  const renderDashboard = () => {
    const featuredProjects = projects.filter(p => p.featured).length;
    const totalProjects = projects.length;
    const totalCarouselImages = carouselItems.length;
    const totalHomeVideos = homeVideos.length;

    return (
      <div>
        <Row className="mb-4">
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="text-muted small mb-1">Imágenes Header</div>
                    <div className="h4 mb-0">{totalCarouselImages}</div>
                  </div>
                  <div className="text-info">
                    <ImageIcon size={32} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="text-muted small mb-1">Videos Home</div>
                    <div className="h4 mb-0">{totalHomeVideos}</div>
                  </div>
                  <div className="text-danger">
                    <Video size={32} />
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
            <h5 className="admin-card-title mb-0">Agregar imagen al header del Home</h5>
          </Card.Header>
          <Card.Body>
            <p className="text-muted small mb-3">
              Estas imágenes se muestran en el <strong>header (portada)</strong> de la página de inicio. La <strong>primera imagen</strong> de la lista es la que se ve como fondo principal. Puedes reordenar arrastrando.
            </p>
            <div className="mb-3">
              <div className="btn-group" role="group">
                <Button
                  variant={carouselUploadMode === 'upload' ? 'primary' : 'outline-primary'}
                  onClick={() => setCarouselUploadMode('upload')}
                  size="sm"
                >
                  <Upload size={16} className="me-1" />
                  Subir Archivo
                </Button>
                <Button
                  variant={carouselUploadMode === 'url' ? 'primary' : 'outline-primary'}
                  onClick={() => setCarouselUploadMode('url')}
                  size="sm"
                >
                  <ImageIcon size={16} className="me-1" />
                  URL
                </Button>
              </div>
            </div>

            {carouselUploadMode === 'upload' ? (
              <Form.Group className="admin-form-group">
                <Form.Label className="admin-form-label">Seleccionar Imagen(es)</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  ref={carouselFileInputRef}
                  onChange={handleCarouselImageFileSelect}
                  className="admin-form-control"
                  disabled={uploadingCarousel}
                />
                <Form.Text className="text-muted">
                  Puedes seleccionar múltiples imágenes. Formatos: JPG, PNG, WebP (máx. 10MB cada una)
                </Form.Text>
                {uploadingCarousel && (
                  <div className="mt-2">
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                      <span className="visually-hidden">Subiendo...</span>
                    </div>
                    <span className="ms-2">{uploadProgress}</span>
                  </div>
                )}
              </Form.Group>
            ) : (
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
                  <Button 
                    className="admin-btn admin-btn-primary" 
                    onClick={handleAddCarouselImage}
                    disabled={!carouselImageUrl.trim()}
                  >
                    <Plus size={18} />
                    Agregar
                  </Button>
                </div>
              </Form.Group>
            )}
          </Card.Body>
        </Card>

        <Card className="admin-card">
          <Card.Header className="admin-card-header">
            <h5 className="admin-card-title mb-0">Imágenes del header (la primera = portada del home · arrastra para reordenar)</h5>
          </Card.Header>
          <Card.Body>
            {carouselItems.length === 0 ? (
              <p className="text-muted">No hay imágenes para el header. Agrega una arriba para que se vea en la portada del home.</p>
            ) : (
              <Row>
                {carouselItems.map((item, index) => {
                  const isDragging = draggedCarouselIndex === index;
                  const isDragOver = dragOverCarouselIndex === index;
                  return (
                    <Col key={item.id} md={6} lg={4} className="mb-4">
                      <Card
                        className={`carousel-image-card carousel-image-card-draggable ${isDragging ? 'carousel-dragging' : ''} ${isDragOver ? 'carousel-drag-over' : ''}`}
                        draggable
                        onDragStart={(e) => handleCarouselDragStart(e, index)}
                        onDragEnd={handleCarouselDragEnd}
                        onDragOver={(e) => handleCarouselDragOver(e, index)}
                        onDragLeave={handleCarouselDragLeave}
                        onDrop={(e) => handleCarouselDrop(e, index)}
                      >
                        <span className="carousel-drag-handle" title="Arrastra para reordenar">⋮⋮</span>
                        <Card.Img variant="top" src={item.image_url} className="carousel-image-preview" alt="" />
                        <Card.Body>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveCarouselImage(item.id)}
                            className="w-100"
                          >
                            <Trash2 size={16} className="me-1" />
                            Eliminar
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  };

  const renderContent = () => {
    return <AdminContent />;
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
      {activeTab === 'content' && renderContent()}
      {activeTab === 'homeVideos' && renderHomeVideos()}

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
              <div className="images-list mb-3">
                {projectForm.images.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image} alt={`Imagen ${index + 1}`} className="thumb-image" />
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveImage(index)}
                      disabled={submitting || uploadingImages}
                      title="Eliminar imagen"
                    >
                      <XIcon size={14} />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mb-2">
                <div className="btn-group" role="group">
                  <Button
                    variant={imageUploadMode === 'upload' ? 'primary' : 'outline-primary'}
                    onClick={() => {
                      setImageUploadMode('upload');
                      setShowImageInput(true);
                    }}
                    type="button"
                    disabled={submitting || uploadingImages}
                    size="sm"
                  >
                    <Upload size={16} className="me-1" />
                    Subir Archivo
                  </Button>
                  <Button
                    variant={imageUploadMode === 'url' ? 'primary' : 'outline-primary'}
                    onClick={() => {
                      setImageUploadMode('url');
                      setShowImageInput(true);
                    }}
                    type="button"
                    disabled={submitting || uploadingImages}
                    size="sm"
                  >
                    <ImageIcon size={16} className="me-1" />
                    URL
                  </Button>
                </div>
              </div>
              {uploadingImages && (
                <div className="mt-2">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Subiendo...</span>
                  </div>
                  <span className="ms-2">{uploadProgress}</span>
                </div>
              )}
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

      {/* Modal de confirmación para eliminar imagen del header */}
      <Modal show={showDeleteCarouselConfirm} onHide={() => setShowDeleteCarouselConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Eliminar esta imagen del header del home?
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

      {/* Modal de confirmación para eliminar video de la home */}
      <Modal show={showDeleteHomeVideoConfirm} onHide={() => setShowDeleteHomeVideoConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Eliminar este video de la sección Videos de la home?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteHomeVideoConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteHomeVideo}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para agregar imagen */}
      <Modal show={showImageInput} onHide={() => {
        setShowImageInput(false);
        setImageInputUrl('');
        setImageUploadMode('upload');
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="btn-group" role="group">
              <Button
                variant={imageUploadMode === 'upload' ? 'primary' : 'outline-primary'}
                onClick={() => setImageUploadMode('upload')}
                size="sm"
              >
                <Upload size={16} className="me-1" />
                Subir Archivo
              </Button>
              <Button
                variant={imageUploadMode === 'url' ? 'primary' : 'outline-primary'}
                onClick={() => setImageUploadMode('url')}
                size="sm"
              >
                <ImageIcon size={16} className="me-1" />
                URL
              </Button>
            </div>
          </div>

          {imageUploadMode === 'upload' ? (
            <Form.Group>
              <Form.Label>Seleccionar Imagen(es)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageFileSelect}
                disabled={uploadingImages}
              />
              <Form.Text className="text-muted">
                Puedes seleccionar múltiples imágenes. Formatos: JPG, PNG, WebP (máx. 10MB cada una)
              </Form.Text>
              {uploadingImages && (
                <div className="mt-2">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Subiendo...</span>
                  </div>
                  <span className="ms-2">{uploadProgress}</span>
                </div>
              )}
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                value={imageInputUrl}
                onChange={(e) => setImageInputUrl(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <Form.Text className="text-muted">
                Ingresa la URL completa de la imagen
              </Form.Text>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowImageInput(false);
              setImageInputUrl('');
              setImageUploadMode('upload');
            }}
          >
            Cancelar
          </Button>
          {imageUploadMode === 'url' && (
            <Button 
              variant="primary" 
              onClick={confirmAddImage}
              disabled={!imageInputUrl.trim()}
            >
              Agregar
            </Button>
          )}
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
