import React from 'react';
import { STATUS_VARIANTS } from '../../tokens/componentTokens';

const StatusTag = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  className = '',
  ...props 
}) => {
  const sizes = {
    small: {
      padding: '2px 6px',
      fontSize: 'var(--font-size-100)',
      lineHeight: 'var(--line-height-100)'
    },
    medium: {
      padding: '4px 8px',
      fontSize: 'var(--font-size-100)',
      lineHeight: 'var(--line-height-100)'
    },
    large: {
      padding: '6px 12px',
      fontSize: 'var(--font-size-200)',
      lineHeight: 'var(--line-height-200)'
    }
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'var(--radius-full)',
    fontWeight: 'var(--font-weight-semibold)',
    border: 'none',
    whiteSpace: 'nowrap'
  };

  const variantStyle = STATUS_VARIANTS[variant] || STATUS_VARIANTS.default;
  const sizeStyle = sizes[size];

  return (
    <span
      style={{
        ...baseStyle,
        ...sizeStyle,
        ...variantStyle
      }}
      className={className}
      {...props}
    >
      {children}
    </span>
  );
};

export default StatusTag;