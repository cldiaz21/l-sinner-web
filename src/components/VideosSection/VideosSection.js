import React, { useContext, useState, useRef, useCallback } from 'react';
import { Container, Card } from 'react-bootstrap';
import Slider from 'react-slick';
import { LanguageContext } from '../../context/LanguageContext';
import { ProjectContext } from '../../context/ProjectContext';
import { getEmbedUrl } from '../../utils/videoUtils';
import { getYouTubeVideoId } from '../../utils/youtubeUtils';
import { Play } from 'lucide-react';
import './VideosSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DRAG_THRESHOLD_PX = 10;

const VideoCard = ({ video, t }) => {
  const [playing, setPlaying] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, isDrag: false });

  const embedUrl = getEmbedUrl(video.url);
  const videoId = getYouTubeVideoId(video.url);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
  const thumbnailUrlFallback = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;
  const embedUrlAutoplay = embedUrl
    ? `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`
    : '';

  const handlePointerDown = useCallback(
    (e) => {
      if (playing) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      dragRef.current = { startX: clientX, startY: clientY, isDrag: false };
      const onMove = (moveE) => {
        const x = moveE.clientX ?? moveE.touches?.[0]?.clientX ?? dragRef.current.startX;
        const y = moveE.clientY ?? moveE.touches?.[0]?.clientY ?? dragRef.current.startY;
        if (Math.hypot(x - dragRef.current.startX, y - dragRef.current.startY) > DRAG_THRESHOLD_PX) {
          dragRef.current.isDrag = true;
        }
      };
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onUp);
        if (!dragRef.current.isDrag) setPlaying(true);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('touchend', onUp);
    },
    [playing]
  );

  if (!embedUrl && !thumbnailUrl) {
    return (
      <Card className="video-card video-card-no-text">
        <div className="video-embed-wrapper">
          <div className="video-placeholder">
            <p>{t.videoNotAvailable || 'Video no disponible'}</p>
          </div>
        </div>
        <div className="video-card-drag-hint" aria-hidden="true" />
      </Card>
    );
  }

  return (
    <Card className="video-card video-card-no-text">
      <div
        className="video-embed-wrapper"
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!playing) setPlaying(true); } }}
        aria-label={playing ? undefined : 'Reproducir video'}
      >
        {playing ? (
          <iframe
            src={embedUrlAutoplay}
            title="Video de YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-embed"
            aria-label="Reproductor de video"
          />
        ) : (
          <div className="video-card-poster video-card-poster-youtube">
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt=""
                className="video-card-thumbnail"
                draggable={false}
                onError={(e) => {
                  if (thumbnailUrlFallback && e.target.src !== thumbnailUrlFallback) {
                    e.target.src = thumbnailUrlFallback;
                  }
                }}
              />
            )}
            <div className="video-card-play-btn video-card-play-btn-youtube" aria-hidden="true">
              <Play size={28} strokeWidth={3} fill="currentColor" />
            </div>
          </div>
        )}
      </div>
      <div className="video-card-drag-hint" aria-hidden="true" />
    </Card>
  );
};

const VideosSection = () => {
  const { t } = useContext(LanguageContext);
  const { homeVideos } = useContext(ProjectContext);

  const videos = homeVideos || [];

  const carouselSettings = {
    dots: true,
    infinite: videos.length > 1,
    speed: 500,
    slidesToShow: Math.min(3, videos.length) || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, videos.length) || 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (videos.length === 0) {
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
        <div className="videos-carousel-container">
          <Slider {...carouselSettings} className="videos-carousel">
            {videos.map((video) => (
              <div key={video.id} className="videos-carousel-slide">
                <VideoCard video={video} t={t} />
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default VideosSection;
