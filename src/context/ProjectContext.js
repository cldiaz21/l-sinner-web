import React, { createContext, useState, useEffect, useCallback } from 'react';
import { projectService } from '../services/projectService';
import { carouselService } from '../services/carouselService';
import { homeVideosService } from '../services/homeVideosService';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [homeVideos, setHomeVideos] = useState([]);
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

      setCarouselItems(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Cargar videos de la home (YouTube) desde Supabase
  const loadHomeVideos = useCallback(async () => {
    try {
      const { data, error: videosError } = await homeVideosService.getHomeVideos();
      if (videosError) {
        setError(videosError.message);
        return;
      }
      setHomeVideos(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Cargar datos al iniciar
  useEffect(() => {
    loadProjects();
    loadCarouselImages();
    loadHomeVideos();
  }, [loadProjects, loadCarouselImages, loadHomeVideos]);

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
        setCarouselItems(prev => [...prev, data].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)));
      }
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const removeCarouselImage = async (id) => {
    try {
      const { error: carouselError } = await carouselService.deleteCarouselImage(id);
      if (carouselError) throw new Error(carouselError.message);
      setCarouselItems(prev => prev.filter(i => i.id !== id));
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateCarouselOrder = async (orderedIds) => {
    try {
      const { error: carouselError } = await carouselService.updateOrder(orderedIds);
      if (carouselError) throw new Error(carouselError.message);
      setCarouselItems(prev => orderedIds.map(id => prev.find(i => i.id === id)).filter(Boolean));
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const getFeaturedProjects = () => {
    return projects.filter(p => p.featured).slice(0, 6);
  };

  const addHomeVideo = async (url) => {
    try {
      const { data, error: videoError } = await homeVideosService.addHomeVideo(url);
      if (videoError) throw new Error(videoError.message);
      if (data) setHomeVideos(prev => [...prev, data].sort((a, b) => a.position - b.position));
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const removeHomeVideo = async (id) => {
    try {
      const { error: videoError } = await homeVideosService.deleteHomeVideo(id);
      if (videoError) throw new Error(videoError.message);
      setHomeVideos(prev => prev.filter(v => v.id !== id));
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateHomeVideosOrder = async (orderedIds) => {
    try {
      const { error: videoError } = await homeVideosService.updateOrder(orderedIds);
      if (videoError) throw new Error(videoError.message);
      const reordered = orderedIds.map(id => homeVideos.find(v => v.id === id)).filter(Boolean);
      setHomeVideos(reordered);
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      carouselItems,
      carouselImages: carouselItems.map(i => i.image_url),
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
      getFeaturedProjects,
      refreshProjects: loadProjects,
      refreshCarousel: loadCarouselImages,
      refreshHomeVideos: loadHomeVideos,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
