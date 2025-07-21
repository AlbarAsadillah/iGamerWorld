import React, { useState, useEffect } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          background: 'linear-gradient(to right, #222222, #000000)',
          borderRadius: 16,
          padding: '10px 6px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowX: 'auto',
          boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
          marginBottom: 18,
          gap: 8,
        }}
      >
        {pcSteps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const canClick = isCompleted || isActive;
          const stepColor = isActive ? '#FFD700' : isCompleted ? '#FFD700' : '#ccc';
          return (
            <div
              key={index}
              onClick={() => { if (canClick) onChange(index); }}
              style={{
                minWidth: 54,
                textAlign: 'center',
                cursor: canClick ? 'pointer' : 'default',
                color: stepColor,
                fontWeight: isActive ? '700' : '500',
                position: 'relative',
                fontSize: 12,
                zIndex: 1,
                margin: '0 2px',
              }}
              aria-disabled={!canClick}
            >
              <div
                style={{
                  margin: '0 auto 4px',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: stepColor,
                  color: isCompleted ? '#fff' : '#000',
                  lineHeight: '24px',
                  fontWeight: 'bold',
                  fontSize: 13,
                  userSelect: 'none',
                }}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <div style={{ userSelect: 'none', color: stepColor, fontSize: 11 }}>{step}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #222222, #000000)',
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
        const stepColor = isActive ? '#FFD700' : isCompleted ? '#FFD700' : '#ccc';
        const lineColor = isCompleted ? '#FFD700' : '#FFECB3';
        return (
          <div
            key={index}
            onClick={() => { if (canClick) onChange(index); }}
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
            <div
              style={{
                margin: '0 auto 10px',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: stepColor,
                color: isCompleted ? '#fff' : '#000',
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
            <div style={{ userSelect: 'none', color: stepColor }}>{step}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
