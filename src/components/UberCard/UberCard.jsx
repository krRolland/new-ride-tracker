import React, { useState } from 'react';

const UberCard = ({ 
  title = "Sample Title", 
  subtitle = "Sample subtitle text", 
  description = "Sample description text",
  imageUrl = "/uber-one-logo-pill.png",
  backgroundColor = "#FFFFFF",
  titleColor = "#EE0004"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to lighten a hex color
  const lightenColor = (color, amount = 0.1) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const newR = Math.min(255, Math.floor(r + (255 - r) * amount));
    const newG = Math.min(255, Math.floor(g + (255 - g) * amount));
    const newB = Math.min(255, Math.floor(b + (255 - b) * amount));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  return (
    <div 
      className="uber-card"
      style={{
        borderRadius: '12px',
        backgroundColor: isHovered ? lightenColor(backgroundColor, 0.25) : backgroundColor,
        position: 'relative',
        display: 'flex',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        height: '144px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left side - Text content with padding */}
      <div 
        className="uber-card-content" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          padding: '16px 16px 16px 16px',
          flex: 1,
          zIndex: 1
        }}
      >
        {/* Title */}
        <h2 
          className="uber-card-title"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            color: titleColor,
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '5px',
            letterSpacing: '-1px'
          }}
        >
          {title}
        </h2>
        
        {/* Subtitle */}
        <p 
          className="uber-card-subtitle"
          style={{
            fontSize: '14px',
            lineHeight: '19px',
            fontWeight: 'normal',
            color: '#050C4D',
            margin: 0,
            marginBottom: '33px'
          }}
        >
          {subtitle}
        </p>
        
        {/* Description */}
        <div 
          className="uber-card-description"
          style={{
            fontSize: '14px',
            lineHeight: '16px',
            fontWeight: '500',
            color: '#050C4D',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>{description}</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#050C4D" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
      
      {/* Right side - Full height image */}
      <div 
        className="uber-card-image-container"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <img 
          src={imageUrl}
          alt="Card image"
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  );
};

export default UberCard;
