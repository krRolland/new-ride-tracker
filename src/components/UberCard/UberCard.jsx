import React from 'react';
import { motion } from 'framer-motion';

const UberCard = ({ 
  title = "Sample Title", 
  subtitle = "Sample subtitle text", 
  description = "Sample description text",
  imageUrl = "/uber-one-logo-pill.png",
  backgroundColor = "#FFFFFF",
  titleColor = "#EE0004"
}) => {
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
    <motion.div 
      className="uber-card"
      style={{
        borderRadius: '12px',
        backgroundColor: backgroundColor,
        position: 'relative',
        display: 'flex',
        cursor: 'pointer',
        height: '144px'
      }}
      initial={{
        y: 0,
        rotateY: 0,
        backgroundColor: backgroundColor,
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0)'
      }}
      whileHover={{
        y: -4,
        rotateY: 2,
        backgroundColor: lightenColor(backgroundColor, 0.15),
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06)'
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3
      }}
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
            letterSpacing: '0px'
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
      
      {/* Right side - 90% height image, vertically centered */}
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
            height: '90%', // Reduced to 90% of container height
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
    </motion.div>
  );
};

export default UberCard;
