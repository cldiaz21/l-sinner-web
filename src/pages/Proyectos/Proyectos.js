import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProjectContext } from '../../context/ProjectContext';
import { LanguageContext } from '../../context/LanguageContext';
import { Search } from 'lucide-react';
import ContactForm from '../../components/ContactForm/ContactForm';
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import './Proyectos.css';

const Proyectos = () => {
  const { projects } = useContext(ProjectContext);
  const { t } = useContext(LanguageContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Obtener proyecto destacado (el primero o el que tenga featured: true)
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => p.id !== featuredProject?.id);

  // Filtrar proyectos por búsqueda
  const filteredProjects = otherProjects.filter(project => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      project.title?.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query) ||
      project.category?.toLowerCase().includes(query)
    );
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="page-container proyectos-page">
      {/* Banner de Búsqueda */}
      <section className="banner-articles">
        <Container>
          <div className="search-banner-articles">
            <button 
              className="btn-search-article"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Buscar proyectos"
            >
              <Search size={24} />
            </button>
            {showSearch && (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="box-search-projects">
                  <div className="box-input-search-projects">
                    <Search size={20} />
                    <input
                      type="search"
                      name="buscar"
                      placeholder="INTRODUCE TU BÚSQUEDA"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button
                    className="btn-close-search-projects"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    type="button"
                    aria-label="Cerrar búsqueda"
                  >
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Proyecto Destacado */}
          {featuredProject && (
            <div className="item-blog item-blog-destaqued">
              <h6 className="item-blog-date">{formatDate(featuredProject.date)}</h6>
              <a
                href="#"
                className="item-blog-img"
                onClick={(e) => {
                  e.preventDefault();
                  handleProjectClick(featuredProject);
                }}
              >
                {featuredProject.images && featuredProject.images.length > 0 ? (
                  <img
                    src={featuredProject.images[0]}
                    alt={featuredProject.title}
                    className="img-fluid"
                  />
                ) : (
                  <div className="project-placeholder-large">
                    <span>Sin imagen</span>
                  </div>
                )}
              </a>
              <div className="item-blog-content">
                <h3 className="title4">{featuredProject.title}</h3>
                <div className="box-text1">
                  <p>{truncateText(featuredProject.description)}</p>
                </div>
                <a
                  href="#"
                  className="link-design1"
                  onClick={(e) => {
                    e.preventDefault();
                    handleProjectClick(featuredProject);
                  }}
                >
                  Ver proyecto
                </a>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Lista de Proyectos */}
      <section className="articles-list">
        <Container>
          <Row className="row-articles-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Col key={project.id} lg={6} className="mb-4">
                  <div className="item-blog">
                    <h6 className="item-blog-date">{formatDate(project.date)}</h6>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProjectClick(project);
                      }}
                    >
                      {project.images && project.images.length > 0 ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="item-blog-img"
                        />
                      ) : (
                        <div className="project-placeholder">
                          <span>Sin imagen</span>
                        </div>
                      )}
                    </a>
                    <div className="item-blog-content">
                      <h3 className="title4">{project.title}</h3>
                      <div className="box-text1">
                        <p>{truncateText(project.description)}</p>
                      </div>
                      <a
                        href="#"
                        className="link-design1"
                        onClick={(e) => {
                          e.preventDefault();
                          handleProjectClick(project);
                        }}
                      >
                        Ver proyecto
                      </a>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <Col lg={12}>
                <div className="no-projects">
                  <p>{searchQuery ? 'No se encontraron proyectos que coincidan con tu búsqueda.' : 'No hay proyectos disponibles en este momento.'}</p>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      {/* Modal para ver detalles del proyecto */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          show={showModal}
          onHide={handleCloseModal}
        />
      )}

      {/* Formulario de Contacto */}
      <section className="contact-section">
        <Container>
          <ContactForm />
        </Container>
      </section>
    </div>
  );
};

export default Proyectos;
