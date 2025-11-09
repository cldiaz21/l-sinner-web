import React from 'react';
import Slider from 'react-slick';
import { Container } from 'react-bootstrap';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true
  };

  // Si no hay imágenes, mostrar imagen placeholder
  const displayImages = images.length > 0 
    ? images 
    : ['https://via.placeholder.com/1200x600/000000/FFFFFF?text=L+SINNER'];

  return (
    <div className="image-carousel-container">
      <Container fluid className="px-0">
        <Slider {...settings} className="main-carousel">
          {displayImages.map((image, index) => (
            <div key={index} className="carousel-slide">
              <div 
                className="carousel-image" 
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="carousel-overlay"></div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default ImageCarousel;

