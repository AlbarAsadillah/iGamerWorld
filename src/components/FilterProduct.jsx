import React, { useState, useRef, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';

const categories = [
  'All',
  'Mouse',
  'Keyboard',
  'Headset',
];

const filterOptions = {
  category: ['Komponen', 'Aksesoris', 'PC Bundling'],
  subcategory: ['Mouse', 'Keyboard'],
  brand: ['Logitech', 'Razer', 'SteelSeries', 'Fantech', 'Ajazz'],
  socket: ['Intel', 'AMD'],
  stockStatus: ['Ready Stock', 'Out of Stock'],
  sortBy: ['Harga Terendah', 'Harga Tertinggi', 'Terbaru'],
};

const FilterProduct = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('Web Design');
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    socket: '',
    stockStatus: '',
    sortBy: '',
  });

  const panelRef = useRef();

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) onCategoryChange(category);
  };

  const toggleFilterPanel = () => setFilterOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !event.target.closest('.filter-toggle-button')
      ) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterOpen]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    console.log('Filters applied:', filters);
    // Kirim filter ke parent atau lakukan aksi filter
    setFilterOpen(false);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Bar kategori dengan garis bawah dan bg hitam lembut */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: '8px 16px',
          borderRadius: 32,
          borderBottom: '2px solid #FFD700',  // Garis bawah kuning
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          background: 'rgba(20, 20, 20, 0.8)', // hitam transparan lembut
          boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
        }}
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{
                backgroundColor: isActive ? '#FFD700' : 'transparent',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#000' : '#fff',
                border: 'none',
                borderRadius: 32,
                padding: '6px 20px',
                cursor: 'pointer',
                fontSize: 14,
                whiteSpace: 'nowrap',
                transition: 'background-color 0.3s, color 0.3s',
              }}
            >
              {category}
            </button>
          );
        })}

        <button
          onClick={toggleFilterPanel}
          className="filter-toggle-button"
          style={{
            marginLeft: 'auto',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: '1px solid #555',
            padding: '6px 14px',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            color: '#fff',
          }}
          aria-label="Filter"
        >
          <FilterListIcon style={{ fontSize: 20, color: '#fff' }} />
          Filters
        </button>
      </div>

      {/* Panel filter dengan bg hitam lembut dan shadow */}
      {filterOpen && (
        <div
          ref={panelRef}
          style={{
            marginTop: 12,
            padding: 16,
            background: 'rgba(20, 20, 20, 0.85)', // gradasi hitam transparan lembut
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.9)',
            maxWidth: 1920,
            width: '100%',
            color: '#fff',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key} style={{ flex: '1 1 180px' }}>
                <label
                  htmlFor={key}
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    fontWeight: 'light',
                    color: '#fff',
                    textTransform: 'capitalize',
                  }}
                >
                  {key === 'sortBy' ? 'Urutkan' : key === 'stockStatus' ? 'Status Stok' : key}
                </label>
                <select
                  id={key}
                  name={key}
                  value={filters[key]}
                  onChange={handleFilterChange}
                  style={{
                    width: '100%',
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid #555',
                    backgroundColor: '#000000',
                    color: '#fff',
                  }}
                >
                  <option value="">
                    {key === 'sortBy' ? 'Semua Urutan' : key === 'stockStatus' ? 'Semua Status' : `Semua ${key}`}
                  </option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, textAlign: 'right' }}>
            <button
              onClick={applyFilters}
              style={{
                backgroundColor: '#FFD700',
                border: 'none',
                padding: '10px 24px',
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 'medium',
                color: '#000',
              }}
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterProduct;
