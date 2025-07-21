import React, { useState, useEffect } from 'react';
import './SectionBrandList.css';

const brands = [
  { name: 'ASUS', img: '/images/brands/Asus.png', link: '/brands/asus' },
  { name: 'MSI', img: '/images/brands/MSI.png', link: '/brands/msi' },
  { name: 'GIGABYTE', img: '/images/brands/Gigabyte.png', link: '/brands/gigabyte' },
  { name: 'Intel', img: '/images/brands/intel.png', link: '/brands/intel' },
  { name: 'AMD', img: '/images/brands/AMD.png', link: '/brands/amd' },
  { name: 'Logitech', img: '/images/brands/Logitech.png', link: '/brands/logitech' },
  { name: 'Ajazz', img: '/images/brands/Ajazz.png', link: '/brands/ajazz' },
  { name: 'Fantech', img: '/images/brands/Fantech.png', link: '/brands/fantech' },
];

const SectionBrandList = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="brand-section" style={{ background: 'transparent', padding: isMobile ? '16px 0' : '32px 0', margin: isMobile ? '16px 0' : '32px 0' }}>
      <div className="container" style={{ maxWidth: '100%', width: '100%', margin: '0 auto', textAlign: 'center', padding: isMobile ? '0 8px' : '0 72px' }}>
        <div style={{ textAlign: 'left', marginBottom: 8 }}>
          <h5 style={{ color: '#FDD700', fontWeight: 500, }}>OUR ASSOCIATES</h5>
        </div>
        {isMobile ? (
          <div className="brand-list-mobile" style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '8px 0' }}>
            {brands.map((brand, idx) => (
              <div key={idx} className="brand-item" style={{ minWidth: 90, maxWidth: 100, textAlign: 'center', cursor: 'pointer' }}>
                <a href={`/catalog?brand=${encodeURIComponent(brand.name)}`} style={{ display: 'inline-block' }}>
                  <img src={brand.img} alt={brand.name} style={{ maxHeight: 60, maxWidth: 80, objectFit: 'contain', marginBottom: 4, filter: 'grayscale(100%)', transition: 'filter 0.2s' }} />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="brand-list" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 32, rowGap: 32 }}>
            {brands.map((brand, idx) => (
              <div key={idx} className="brand-item" style={{ flex: '0 1 140px', minWidth: 100, textAlign: 'center', cursor: 'pointer' }}>
                <a href={`/catalog?brand=${encodeURIComponent(brand.name)}`} style={{ display: 'inline-block' }}>
                  <img src={brand.img} alt={brand.name} style={{ maxHeight: 100, maxWidth: 120, objectFit: 'contain', marginBottom: 8, filter: 'grayscale(100%)', transition: 'filter 0.2s' }} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionBrandList;
