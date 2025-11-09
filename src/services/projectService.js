import { supabase } from '../lib/supabase';

export const projectService = {
  // Obtener todos los proyectos
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error };
    }
  },

  // Obtener un proyecto por ID
  async getProjectById(id) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Crear un nuevo proyecto
  async createProject(project) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: project.title,
          description: project.description || null,
          category: project.category || null,
          images: project.images || [],
          videos: project.videos || [],
          date: project.date || new Date().toISOString(),
          featured: project.featured || false,
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Actualizar un proyecto
  async updateProject(id, project) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          description: project.description || null,
          category: project.category || null,
          images: project.images || [],
          videos: project.videos || [],
          date: project.date || null,
          featured: project.featured || false,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Eliminar un proyecto
  async deleteProject(id) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Obtener proyectos destacados
  async getFeaturedProjects(limit = 6) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error };
    }
  },
};

