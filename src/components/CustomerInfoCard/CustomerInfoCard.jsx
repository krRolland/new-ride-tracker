import React from 'react';
import { BASE_TOKENS } from '../../tokens';

// CustomerInfoCard Component
const CustomerInfoCard = () => {
  return (
    <div style={{
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      padding: BASE_TOKENS.spacing['2xl'],
      boxShadow: BASE_TOKENS.shadows.md,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Uber One Logo Pill - Top Right Corner Badge */}
      <div style={{
        position: 'absolute',
        top: BASE_TOKENS.spacing.lg,
        right: BASE_TOKENS.spacing.lg,
        zIndex: 10,
        backgroundColor: '#000000',
        borderRadius: '50px',
        padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
      {/* <h3 style={{
        fontSize: BASE_TOKENS.typography.fontSize.lg,
        fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
        color: BASE_TOKENS.colors.gray[800],
        margin: 0,
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        Customer Information
      </h3> */}
      
      {/* Customer Profile */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: BASE_TOKENS.spacing.lg,
        flex: 1
      }}>
        <div style={{
          width: '80px',
          height: '80px',
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
            marginBottom: BASE_TOKENS.spacing.sm
          }}>
            <h4 style={{
              fontSize: BASE_TOKENS.typography.fontSize.lg,
              fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
              color: BASE_TOKENS.colors.gray[900],
              margin: 0
            }}>
              Sarah Johnson
            </h4>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: BASE_TOKENS.spacing.xs
          }}>
            {/* Email */}
            <div style={{
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              lineHeight: BASE_TOKENS.typography.lineHeight.xs,
              color: BASE_TOKENS.colors.gray[600],
              fontWeight: BASE_TOKENS.typography.fontWeight.medium
            }}>
              sarah.j@email.com
            </div>
            
            {/* Membership Info */}
            <div style={{
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              lineHeight: BASE_TOKENS.typography.lineHeight.xs,
              color: BASE_TOKENS.colors.gray[500],
              fontWeight: BASE_TOKENS.typography.fontWeight.normal
            }}>
              Member since March 2023 • 247 rides
            </div>
            
            {/* Stats Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: BASE_TOKENS.spacing.lg,
              flexWrap: 'wrap',
              marginTop: BASE_TOKENS.spacing.xs
            }}>
              {/* Lifetime Value */}
              <div style={{
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                lineHeight: BASE_TOKENS.typography.lineHeight.xs,
                color: BASE_TOKENS.colors.gray[700],
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold
              }}>
                $3,847 lifetime value
              </div>
              
              {/* Rating */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: BASE_TOKENS.spacing.xs
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: BASE_TOKENS.colors.yellow[500] }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{
                  fontSize: BASE_TOKENS.typography.fontSize.sm,
                  lineHeight: BASE_TOKENS.typography.lineHeight.xs,
                  color: BASE_TOKENS.colors.gray[700],
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold
                }}>
                  4.8 rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CustomerInfoCard;
