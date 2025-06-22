import React from 'react';
import './SectionBrandList.css';

const brands = [
  { name: 'ASUS', img: '/images/brands/Asus.png', link: '/brands/asus' },
  { name: 'MSI', img: '/images/brands/MSI.png', link: '/brands/msi' },
  { name: 'GIGABYTE', img: '/images/brands/Gigabyte.png', link: '/brands/gigabyte' },
  { name: 'Intel', img: '/images/brands/intel.png', link: '/brands/intel' },
  { name: 'AMD', img: '/images/brands/AMD.png', link: '/brands/amd' },
  { name: 'Logitech', img: '/images/brands/Logitech.png', link: '/brands/logitech' },
  { name: 'Razer', img: '/images/brands/Razer.png', link: '/brands/razer' },
  { name: 'Fantech', img: '/images/brands/Fantech.png', link: '/brands/fantech' },
];

const SectionBrandList = () => (
  <section className="brand-section" style={{ background: 'transparent', padding: '32px 0', margin: '32px 0' }}>
    <div className="container" style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ textAlign: 'left', marginBottom: 8 }}>
        <h5 style={{ color: '#FDD700', fontWeight: 500, }}>OUR ASSOCIATES</h5>
      </div>
      <div className="brand-list" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32 }}>
        {brands.map((brand, idx) => (
          <div key={idx} className="brand-item" style={{ flex: '1 1 100px', minWidth: 100, textAlign: 'center', cursor: 'pointer' }}>
            <a href={`/catalog?brand=${encodeURIComponent(brand.name)}`} style={{ display: 'inline-block' }}>
              <img src={brand.img} alt={brand.name} style={{ maxHeight: 100, maxWidth: 100, objectFit: 'contain', marginBottom: 8, filter: 'grayscale(100%)', transition: 'filter 0.2s' }} />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SectionBrandList;
