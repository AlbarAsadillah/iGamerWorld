import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: 'KOMPONEN',
    image: '/images/background-card.jpg',
    floatingImage: '/images/floating-image.png',
    description: 'Komponen berkualitas tinggi untuk membangun sistem yang handal',
    link: '/catalog?category=KOMPONEN',
  },
  {
    title: 'AKSESORIS',
    image: '/images/background-card2.jpg',
    floatingImage: '/images/floating-image2.png',
    description: 'Beragam aksesoris komputer untuk meningkatkan kenyamanan',
    link: '/catalog?category=AKSESORIS',
  },
  {
    title: 'PC BUNDLING',
    image: '/images/background-card3.jpg',
    floatingImage: '/images/floating-image3.png',
    link: '/catalog?category=PC%20BUNDLING',
  },
];

const fullHeight = 400;

const CategoryCard = ({ category, style, customContent }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(category.link);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleClick(e);
      }}
      style={{
        ...styles.card,
        ...style,
        backgroundColor: hovered ? '#FFD700' : 'rgba(114, 114, 114, 0.15)',
        boxShadow: hovered
          ? '0 10px 30px rgba(0,0,0,0.3)'
          : '0 10px 20px rgba(0,0,0,0.3)',
        backdropFilter: hovered ? 'none' : 'blur(10px)',
        WebkitBackdropFilter: hovered ? 'none' : 'blur(10px)',
        transition: 'all 0.3s ease',
        backgroundImage: `url(${category.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: style?.flexDirection || 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={category.floatingImage}
        alt={`${category.title} floating`}
        style={{
          ...styles.floatingImage,
          width: style?.imgWidth || 200,
          height: 'auto',
          position: style?.imgPosition || 'absolute',
          top: style?.imgTop || 20,
          right: style?.imgRight || 20,
          transform: hovered
            ? 'translateY(5%) translateX(-10%) scale(1.2)'
            : 'translateY(5%) translateX(-10%) scale(1)',
          transition: 'transform 0.3s ease',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 3,
        }}
      />

      {customContent ? (
        <div style={{ ...styles.textContent, position: 'relative', color: '#fff' }}>
          {customContent}
        </div>
      ) : (
        <div
          style={{
            ...styles.textContent,
            position: style?.textPosition || 'absolute',
            bottom: style?.textBottom || 30,
            left: style?.textLeft || 20,
            right: style?.textRight || 20,
            color: '#fff',
            zIndex: 3,
            textAlign: style?.textAlign || 'left',
          }}
        >
          <h3 style={styles.title}>{category.title}</h3>
          <p style={styles.description}>{category.description}</p>
        </div>
      )}
    </div>
  );
};

const CategorySection = () => {
  const styleContainer = {
    ...styles.container,
    height: fullHeight,
    backgroundImage: `url(/images/category-bg.png)`,
    backgroundSize: `100% ${fullHeight}px`,
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  };

  return (
    <div style={styleContainer}>
      <CategoryCard
        category={categories[0]}
        style={{ width: 280, height: 280, flexDirection: 'column' }}
      />
      <CategoryCard
        category={categories[1]}
        style={{ width: 280, height: 280, flexDirection: 'column' }}
      />
      <CategoryCard
        category={categories[2]}
        style={{
          width: 420,
          height: 280,
          flexDirection: 'row',
          imgPosition: 'relative',
          imgWidth: 150,
          imgTop: 10,
          imgRight: -10,
          textPosition: 'relative',
          textBottom: 'auto',
          textLeft: 20,
          textRight: 'auto',
          textAlign: 'left',
          padding: 10,
        }}
        customContent={
          <>
            <h2 style={{ margin: 0, fontWeight: 'bold' }}>PC Bundling</h2>
            <p style={{ margin: '8px 0', fontSize: 14 }}>
              Nikmati paket bundling PC lengkap dengan harga spesial.
            </p>
            {/* <button
              style={{
                backgroundColor: '#FFD700',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              Pelajari Lebih Lanjut
            </button> */}
          </>
        }
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
    padding: 40,
  },
  card: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  floatingImage: {
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 3,
    transition: 'transform 0.3s ease',
  },
  textContent: {
    color: '#FFFFFF',
    zIndex: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 1.3,
  },
};

export default CategorySection;
