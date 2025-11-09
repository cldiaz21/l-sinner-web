import React, { createContext, useState, useEffect } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);

  // Cargar proyectos desde localStorage al iniciar
  useEffect(() => {
    const savedProjects = localStorage.getItem('lSinnerProjects');
    const savedCarousel = localStorage.getItem('lSinnerCarousel');
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Proyectos de ejemplo
      const defaultProjects = [
        {
          id: 1,
          title: 'Proyecto Ejemplo 1',
          description: 'Descripción del proyecto ejemplo',
          images: [],
          videos: [],
          category: 'Fotografía',
          date: new Date().toISOString(),
          featured: true
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('lSinnerProjects', JSON.stringify(defaultProjects));
    }

    if (savedCarousel) {
      setCarouselImages(JSON.parse(savedCarousel));
    } else {
      // Imágenes de carrusel de ejemplo
      const defaultCarousel = [];
      setCarouselImages(defaultCarousel);
      localStorage.setItem('lSinnerCarousel', JSON.stringify(defaultCarousel));
    }
  }, []);

  // Guardar proyectos en localStorage cuando cambien
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('lSinnerProjects', JSON.stringify(projects));
    }
  }, [projects]);

  // Guardar carrusel en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('lSinnerCarousel', JSON.stringify(carouselImages));
  }, [carouselImages]);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updatedProject } : p));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addCarouselImage = (imageUrl) => {
    setCarouselImages([...carouselImages, imageUrl]);
  };

  const removeCarouselImage = (index) => {
    setCarouselImages(carouselImages.filter((_, i) => i !== index));
  };

  const getFeaturedProjects = () => {
    return projects.filter(p => p.featured).slice(0, 6);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      carouselImages,
      addProject,
      updateProject,
      deleteProject,
      addCarouselImage,
      removeCarouselImage,
      getFeaturedProjects
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

