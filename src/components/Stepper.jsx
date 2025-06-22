import React from 'react';

const pcSteps = [
  'CPU',
  'Motherboard',
  'GPU',
  'RAM',
  'Storage',
  'Casing',
  'Power Supply',
  'Cooler',
];

const Stepper = ({ currentStep, onChange }) => {
  return (
    <div
      style={{
        background: 'linear-gradient(to right, #222222, #000000)', // gradasi hitam lembut
        borderRadius: 20,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        userSelect: 'none',
        boxShadow: '0 4px 8px rgba(0,0,0,0.7)',
        marginBottom: 32,
      }}
    >
      {pcSteps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        const canClick = isCompleted || isActive;

        // Warna lingkaran dan teks:
        // - Aktif: kuning (#FFD700)
        // - Selesai: hitam (#000000)
        // - Belum selesai: abu-abu terang (#ccc)
        const stepColor = isActive
          ? '#FFD700' 
          : isCompleted 
          ? '#FFD700' 
          : '#ccc';

        // Warna garis penghubung kuning cerah jika selesai, abu-abu jika belum
        const lineColor = isCompleted ? '#FFD700' : '#FFECB3';

        return (
          <div
            key={index}
            onClick={() => {
              if (canClick) onChange(index);
            }}
            style={{
              flex: 1,
              textAlign: 'center',
              cursor: canClick ? 'pointer' : 'default',
              color: stepColor,
              fontWeight: isActive ? '700' : '500',
              position: 'relative',
              padding: '10px 6px',
              zIndex: 1,
              pointerEvents: canClick ? 'auto' : 'none',
              userSelect: canClick ? 'auto' : 'none',
              margin: '0 8px',
              fontSize: 14,
            }}
            aria-disabled={!canClick}
          >
            {/* Garis kiri, kecuali step pertama */}
            {index > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: 0,
                  width: '50%',
                  height: 3,
                  backgroundColor: lineColor,
                  borderRadius: 2,
                  zIndex: 0,
                }}
              />
            )}

            {/* Garis kanan, kecuali step terakhir */}
            {index < pcSteps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: 0,
                  width: '50%',
                  height: 3,
                  backgroundColor: lineColor,
                  borderRadius: 2,
                  zIndex: 0,
                }}
              />
            )}

            {/* Bulatan step */}
            <div
              style={{
                margin: '0 auto 10px',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: stepColor,
                color: isCompleted ? '#fff' : '#000', // tanda centang tetap putih di lingkaran hitam
                lineHeight: '32px',
                fontWeight: 'bold',
                fontSize: 16,
                position: 'relative',
                zIndex: 1,
                userSelect: 'none',
              }}
            >
              {isCompleted ? '✓' : index + 1}
            </div>

            {/* Label */}
            <div style={{ userSelect: 'none', color: stepColor }}>{step}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
