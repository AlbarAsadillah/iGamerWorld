import React from 'react';
import { Carousel } from 'react-bootstrap';

const BannerCarousel = () => {
  return (
    <Carousel fade controls={true} indicators={true} interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/Banner1.png"
          alt="Banner 1"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/Banner2.png"
          alt="Banner 2"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
