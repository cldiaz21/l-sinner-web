import { useState, useEffect } from 'react';
import { getYouTubeVideoInfo, getYouTubeVideoStats, getYouTubeVideoId } from '../utils/youtubeUtils';

// Hook para obtener información de un video de YouTube
export const useYouTubeVideo = (videoUrl) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      if (!videoUrl) {
        setLoading(false);
        return;
      }

      // Verificar si es un video de YouTube
      const videoId = getYouTubeVideoId(videoUrl);
      if (!videoId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Obtener información básica con oEmbed (no requiere API key)
        const info = await getYouTubeVideoInfo(videoUrl);
        
        if (info) {
          // Intentar obtener estadísticas si hay API key configurada
          const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
          let stats = null;
          
          if (apiKey) {
            stats = await getYouTubeVideoStats(videoId, apiKey);
          }

          setVideoInfo({
            ...info,
            views: stats?.views || 0,
            likes: stats?.likes || 0,
            publishedAt: stats?.publishedAt || null
          });
        } else {
          setVideoInfo(null);
        }
      } catch (err) {
        console.error('Error al obtener información del video:', err);
        setError(err.message);
        setVideoInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoInfo();
  }, [videoUrl]);

  return { videoInfo, loading, error };
};
