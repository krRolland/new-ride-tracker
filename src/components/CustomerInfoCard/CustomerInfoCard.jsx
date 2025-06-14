import React from 'react';
import { BASE_TOKENS } from '../../tokens';

// CustomerInfoCard Component
const CustomerInfoCard = () => {
  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Customer Profile */}
      <div style={{
        display: 'flex',
        alignItems: 'center', // Changed from flex-start to center for vertical centering
        gap: BASE_TOKENS.spacing.lg,
        flex: 1
      }}>
        <div style={{
          width: '130px',
          height: '130px',
          borderRadius: BASE_TOKENS.borderRadius.full,
          backgroundColor: BASE_TOKENS.colors.gray[200],
          border: `3px solid ${BASE_TOKENS.colors.white}`,
          boxShadow: BASE_TOKENS.shadows.lg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <img 
            src="/headshot-8.png" 
            alt="Customer avatar"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: BASE_TOKENS.borderRadius.full,
              objectFit: 'cover'
            }}
          />
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            marginBottom: '3px' // Decreased by 3px more from 6px
          }}>
            <h4 style={{
              fontSize: '19px', // Decreased by 2px more from 21px
              fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
              color: BASE_TOKENS.colors.gray[900],
              margin: 0
            }}>
              Sarah Johnson
            </h4>
          </div>
          
          {/* Subtitle Text - First Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '5px'
          }}>
            {/* Email */}
            <div style={{
              fontSize: '14px',
              lineHeight: BASE_TOKENS.typography.lineHeight.xs,
              color: '#4B5563',
              fontWeight: BASE_TOKENS.typography.fontWeight.light
            }}>
              sarah.j@email.com
            </div>
            
            {/* Rating with Star */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="#4B5563"
                style={{
                  flexShrink: 0
                }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span style={{
                fontSize: '14px',
                lineHeight: BASE_TOKENS.typography.lineHeight.xs,
                color: '#4B5563',
                fontWeight: BASE_TOKENS.typography.fontWeight.light
              }}>
                4.8 rating
              </span>
            </div>
          </div>
          
          {/* Subtitle Text - Second Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '12px' // Reduced by 4px from 16px
          }}>
            {/* Rides */}
            <div style={{
              fontSize: '14px',
              lineHeight: BASE_TOKENS.typography.lineHeight.xs,
              color: '#4B5563',
              fontWeight: BASE_TOKENS.typography.fontWeight.light
            }}>
              247 rides
            </div>
            
            {/* Lifetime Value */}
            <div style={{
              fontSize: '14px',
              lineHeight: BASE_TOKENS.typography.lineHeight.xs,
              color: '#4B5563',
              fontWeight: BASE_TOKENS.typography.fontWeight.light
            }}>
              $3,847 lifetime value
            </div>
          </div>
          
          {/* Uber One Logo Pill */}
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '50px',
            paddingTop: `calc(${BASE_TOKENS.spacing.xs} + 1px)`, // Increased by 1px
            paddingBottom: `calc(${BASE_TOKENS.spacing.xs} + 1px)`, // Increased by 1px
            paddingLeft: `calc(${BASE_TOKENS.spacing.sm} + 1px)`, // Increased by 2px (was -1px, now +1px)
            paddingRight: `calc(${BASE_TOKENS.spacing.sm} + 2px)`, // Increased by 2px
            display: 'inline-flex', // Back to inline-flex to maintain natural width
            alignItems: 'center',
            transform: 'scale(0.85)', // Shrink to 85% of current size
            transformOrigin: 'left center' // Ensure scaling happens from left edge
          }}>
            <img 
              src="/uber-one-logo-pill.png" 
              alt="Uber One"
              style={{
                height: '24px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CustomerInfoCard;
