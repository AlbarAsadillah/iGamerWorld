import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import '../styles/ProductCarousel.css'; // Import file CSS untuk styling tambahan
import '../styles/ProductCarouselResponsive.css'; // Import file CSS responsif

const ProductCarousel = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // State untuk gambar utama

  return (
    <div className="product-carousel" style={{ display: 'flex', gap: '20px' }}>
      {/* Thumbnail Images */}
      <div className="thumbnail-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(img)} // Set gambar utama saat thumbnail diklik
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '5px',
              cursor: 'pointer',
              border: selectedImage === img ? '2px solid #FFD700' : '1px solid #ccc',
            }}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="main-image-container" style={{ flex: 1, minWidth: 0 }}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="main-swiper"
          style={{ width: '100%' }}
        >
          <SwiperSlide>
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '350px',
                objectFit: 'contain',
                borderRadius: '10px',
                display: 'block',
                margin: '0 auto',
                maxWidth: '100%',
              }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCarousel;