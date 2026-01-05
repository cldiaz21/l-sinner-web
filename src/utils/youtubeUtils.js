// Función para extraer el ID del video de YouTube desde diferentes formatos de URL
export const getYouTubeVideoId = (url) => {
  if (!url) return null;

  // Formato: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('youtube.com/watch')) {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  }

  // Formato: https://youtu.be/VIDEO_ID
  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?&]+)/);
    return match ? match[1] : null;
  }

  // Formato: https://www.youtube.com/embed/VIDEO_ID
  if (url.includes('youtube.com/embed')) {
    const match = url.match(/embed\/([^?&]+)/);
    return match ? match[1] : null;
  }

  return null;
};

// Función para obtener información del video de YouTube usando oEmbed API
export const getYouTubeVideoInfo = async (videoUrl) => {
  try {
    const videoId = getYouTubeVideoId(videoUrl);
    if (!videoId) {
      return null;
    }

    // Usar oEmbed API de YouTube (no requiere API key)
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    
    const response = await fetch(oembedUrl);
    if (!response.ok) {
      throw new Error('Error al obtener información del video');
    }

    const data = await response.json();
    
    return {
      title: data.title,
      thumbnail: data.thumbnail_url,
      author: data.author_name,
      videoId: videoId
    };
  } catch (error) {
    console.error('Error al obtener información de YouTube:', error);
    return null;
  }
};

// Función para obtener estadísticas del video usando YouTube Data API v3
// Requiere API key configurada en las variables de entorno
export const getYouTubeVideoStats = async (videoId, apiKey) => {
  if (!apiKey || !videoId) {
    return null;
  }

  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=statistics,snippet`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener estadísticas del video');
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return {
        views: parseInt(video.statistics.viewCount) || 0,
        likes: parseInt(video.statistics.likeCount) || 0,
        title: video.snippet.title,
        publishedAt: video.snippet.publishedAt
      };
    }

    return null;
  } catch (error) {
    console.error('Error al obtener estadísticas de YouTube:', error);
    return null;
  }
};
