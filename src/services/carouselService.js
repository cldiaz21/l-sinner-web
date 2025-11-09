import { supabase } from '../lib/supabase';

export const carouselService = {
  // Obtener todas las imágenes del carrusel
  async getCarouselImages() {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error };
    }
  },

  // Agregar una imagen al carrusel
  async addCarouselImage(imageUrl) {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .insert([{
          image_url: imageUrl,
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Eliminar una imagen del carrusel
  async deleteCarouselImage(id) {
    try {
      const { error } = await supabase
        .from('carousel_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};

