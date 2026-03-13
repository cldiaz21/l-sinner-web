import { supabase } from '../lib/supabase';

export const homeVideosService = {
  async getHomeVideos() {
    try {
      const { data, error } = await supabase
        .from('home_videos')
        .select('*')
        .order('position', { ascending: true });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error };
    }
  },

  async addHomeVideo(url) {
    try {
      const { data: maxPos } = await supabase
        .from('home_videos')
        .select('position')
        .order('position', { ascending: false })
        .limit(1)
        .single();

      const nextPosition = (maxPos?.position ?? -1) + 1;

      const { data, error } = await supabase
        .from('home_videos')
        .insert([{ url: url.trim(), position: nextPosition }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async deleteHomeVideo(id) {
    try {
      const { error } = await supabase
        .from('home_videos')
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
        supabase.from('home_videos').update({ position: index }).eq('id', id)
      );
      await Promise.all(updates);
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};
