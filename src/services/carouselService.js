import { supabase } from '../lib/supabase';

export const carouselService = {
  async getCarouselImages() {
    try {
      let { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('position', { ascending: true });

      if (error) {
        const fallback = await supabase
          .from('carousel_images')
          .select('*')
          .order('created_at', { ascending: false });
        if (!fallback.error) {
          data = fallback.data;
          error = null;
        }
      }
      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error };
    }
  },

  async addCarouselImage(imageUrl) {
    try {
      const payload = { image_url: imageUrl };
      try {
        const { data: maxRow } = await supabase
          .from('carousel_images')
          .select('position')
          .order('position', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (maxRow != null && typeof maxRow.position === 'number') {
          payload.position = maxRow.position + 1;
        }
      } catch (_) {
        // Columna position puede no existir aún
      }

      const { data, error } = await supabase
        .from('carousel_images')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return { data: { ...data, position: data?.position ?? 0 }, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

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

  async updateOrder(orderedIds) {
    try {
      const updates = orderedIds.map((id, index) =>
        supabase.from('carousel_images').update({ position: index }).eq('id', id)
      );
      await Promise.all(updates);
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};

