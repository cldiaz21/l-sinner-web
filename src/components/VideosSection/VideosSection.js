import React, { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContext';
import { getEmbedUrl } from '../../utils/videoUtils';
import { useYouTubeVideo } from '../../hooks/useYouTubeVideo';
import { Eye, ThumbsUp, Calendar, ExternalLink } from 'lucide-react';
import './VideosSection.css';

const VideoCard = ({ video, t, language }) => {
  const { videoInfo, loading, error } = useYouTubeVideo(video.url);
  const embedUrl = getEmbedUrl(video.url);
  const isYouTube = video.url.includes('youtube.com') || video.url.includes('youtu.be');

  // Usar título del video de YouTube si está disponible, sino usar el título del proyecto
  const displayTitle = isYouTube && videoInfo?.title ? videoInfo.title : video.projectTitle;
  const displayViews = isYouTube && videoInfo?.views ? videoInfo.views : video.views;

  return (
    <Col xs={12} md={6} lg={4} className="video-col">
      <Card className="video-card">
        <div className="video-embed-wrapper">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={displayTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-embed"
              loading="lazy"
              aria-label={`Video: ${displayTitle}`}
            />
          ) : (
            <div className="video-placeholder">
              <p>{t.videoNotAvailable || 'Video no disponible'}</p>
            </div>
          )}
        </div>
        <Card.Body className="video-card-body">
          {loading && isYouTube ? (
            <div className="video-loading">
              <span>{t.loading || 'Cargando...'}</span>
            </div>
          ) : (
            <h4 className="video-title">{displayTitle}</h4>
          )}
          {video.projectCategory && (
            <p className="video-category">{video.projectCategory}</p>
          )}
          <div className="video-stats">
            {displayViews > 0 && (
              <div className="video-stat-item">
                <Eye size={16} />
                <span>{displayViews.toLocaleString()}</span>
              </div>
            )}
            {video.likes > 0 && (
              <div className="video-stat-item">
                <ThumbsUp size={16} />
                <span>{video.likes.toLocaleString()}</span>
              </div>
            )}
            {video.date && (
              <div className="video-stat-item">
                <Calendar size={16} />
                <span>
                  {new Date(video.date).toLocaleDateString(
                    language === 'es' ? 'es-ES' : 'en-US',
                    { year: 'numeric', month: 'short', day: 'numeric' }
                  )}
                </span>
              </div>
            )}
          </div>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            <ExternalLink size={16} />
            {t.watchOnPlatform || 'Ver en plataforma'}
          </a>
        </Card.Body>
      </Card>
    </Col>
  );
};

const VideosSection = ({ projects }) => {
  const { t, language } = useContext(LanguageContext);

  // Filtrar proyectos que tengan videos
  const projectsWithVideos = projects.filter(
    project => project.videos && project.videos.length > 0
  );

  // Extraer todos los videos con información del proyecto
  const allVideos = [];
  projectsWithVideos.forEach(project => {
    project.videos.forEach((videoUrl, index) => {
      allVideos.push({
        id: `${project.id}-${index}`,
        url: videoUrl,
        projectTitle: project.title,
        projectId: project.id,
        projectDate: project.date,
        projectCategory: project.category,
        // Estadísticas (por ahora vacías, se pueden agregar desde el admin)
        views: project.videoStats?.[index]?.views || 0,
        likes: project.videoStats?.[index]?.likes || 0,
        date: project.videoStats?.[index]?.date || project.date
      });
    });
  });

  if (allVideos.length === 0) {
    return (
      <section className="videos-section">
        <Container>
          <h2 className="section-title">{t.videosTitle || 'Videos'}</h2>
          <div className="no-videos">
            <p>{t.noVideosAvailable || 'No hay videos disponibles.'}</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="videos-section">
      <Container>
        <h2 className="section-title">{t.videosTitle || 'Videos'}</h2>
        <Row className="videos-row">
          {allVideos.map((video) => (
            <VideoCard key={video.id} video={video} t={t} language={language} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default VideosSection;
