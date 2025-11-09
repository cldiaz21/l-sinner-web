import React, { createContext, useState, useEffect, useCallback } from 'react';
import { projectService } from '../services/projectService';
import { carouselService } from '../services/carouselService';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar proyectos desde Supabase
  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: projectError } = await projectService.getProjects();
      
      if (projectError) {
        setError(projectError.message);
        return;
      }

      setProjects(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar imágenes del carrusel desde Supabase
  const loadCarouselImages = useCallback(async () => {
    try {
      const { data, error: carouselError } = await carouselService.getCarouselImages();
      
      if (carouselError) {
        setError(carouselError.message);
        return;
      }

      // Extraer las URLs de las imágenes
      const imageUrls = (data || []).map(item => item.image_url);
      setCarouselImages(imageUrls);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Cargar datos al iniciar
  useEffect(() => {
    loadProjects();
    loadCarouselImages();
  }, [loadProjects, loadCarouselImages]);

  const addProject = async (project) => {
    try {
      const { data, error: projectError } = await projectService.createProject(project);
      
      if (projectError) {
        throw new Error(projectError.message);
      }

      if (data) {
        setProjects([data, ...projects]);
      }
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateProject = async (id, updatedProject) => {
    try {
      const { data, error: projectError } = await projectService.updateProject(id, updatedProject);
      
      if (projectError) {
        throw new Error(projectError.message);
      }

      if (data) {
        setProjects(projects.map(p => p.id === id ? data : p));
      }
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteProject = async (id) => {
    try {
      const { error: projectError } = await projectService.deleteProject(id);
      
      if (projectError) {
        throw new Error(projectError.message);
      }

      setProjects(projects.filter(p => p.id !== id));
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const addCarouselImage = async (imageUrl) => {
    try {
      const { data, error: carouselError } = await carouselService.addCarouselImage(imageUrl);
      
      if (carouselError) {
        throw new Error(carouselError.message);
      }

      if (data) {
        setCarouselImages([...carouselImages, data.image_url]);
      }
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const removeCarouselImage = async (index) => {
    try {
      // Obtener todas las imágenes con sus IDs desde Supabase
      const { data: carouselData, error: fetchError } = await carouselService.getCarouselImages();
      
      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const imageToDelete = carouselData[index];
      
      if (!imageToDelete) {
        throw new Error('Imagen no encontrada');
      }

      const { error: carouselError } = await carouselService.deleteCarouselImage(imageToDelete.id);
      
      if (carouselError) {
        throw new Error(carouselError.message);
      }

      // Recargar las imágenes del carrusel después de eliminar
      await loadCarouselImages();
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const getFeaturedProjects = () => {
    return projects.filter(p => p.featured).slice(0, 6);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      carouselImages,
      loading,
      error,
      addProject,
      updateProject,
      deleteProject,
      addCarouselImage,
      removeCarouselImage,
      getFeaturedProjects,
      refreshProjects: loadProjects,
      refreshCarousel: loadCarouselImages,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
