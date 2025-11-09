import { supabase } from '../lib/supabase';

export const uploadService = {
  // Subir una imagen a Supabase Storage
  async uploadImage(file, folder = 'projects') {
    try {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        throw new Error('El archivo debe ser una imagen');
      }

      // Validar tamaño (máximo 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error('La imagen no puede ser mayor a 10MB');
      }

      // Generar un nombre único para el archivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Subir el archivo
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Obtener la URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return { 
        url: publicUrl, 
        path: filePath,
        error: null 
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { 
        url: null, 
        path: null,
        error: error.message || 'Error al subir la imagen' 
      };
    }
  },

  // Subir múltiples imágenes
  async uploadMultipleImages(files, folder = 'projects') {
    try {
      const uploadPromises = Array.from(files).map(file => 
        this.uploadImage(file, folder)
      );
      
      const results = await Promise.all(uploadPromises);
      
      const successful = results.filter(r => r.url);
      const failed = results.filter(r => r.error);
      
      return {
        urls: successful.map(r => r.url),
        errors: failed.map(r => r.error),
        success: failed.length === 0
      };
    } catch (error) {
      return {
        urls: [],
        errors: [error.message],
        success: false
      };
    }
  },

  // Eliminar una imagen de Supabase Storage
  async deleteImage(filePath) {
    try {
      const { error } = await supabase.storage
        .from('images')
        .remove([filePath]);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { error: error.message || 'Error al eliminar la imagen' };
    }
  },

  // Extraer el path de una URL de Supabase Storage
  extractPathFromUrl(url) {
    try {
      const urlObj = new URL(url);
      // El path en Supabase Storage está después de /storage/v1/object/public/images/
      const pathMatch = urlObj.pathname.match(/\/storage\/v1\/object\/public\/images\/(.+)/);
      return pathMatch ? pathMatch[1] : null;
    } catch (error) {
      return null;
    }
  }
};

