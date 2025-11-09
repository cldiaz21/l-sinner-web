// Función para convertir URLs de YouTube/Vimeo a URLs de embed
export const getEmbedUrl = (url) => {
  if (!url) return '';
  
  // YouTube
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }
  
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }
  
  // Vimeo
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  }
  
  // Si ya es una URL de embed, devolverla tal cual
  if (url.includes('youtube.com/embed') || url.includes('vimeo.com/video')) {
    return url;
  }
  
  // Si no es ninguna de las anteriores, devolver la URL original
  return url;
};

