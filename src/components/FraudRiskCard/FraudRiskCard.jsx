import React from 'react';
import { BASE_TOKENS } from '../../tokens';

// FraudRiskCard Component
const FraudRiskCard = () => {
  return (
    <div style={{
      backgroundColor: '#BF1F20',
      borderRadius: BASE_TOKENS.borderRadius.lg,
      padding: BASE_TOKENS.spacing['2xl'],
      boxShadow: BASE_TOKENS.shadows.xl,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    }}>
      {/* Warning Image on the right side */}
      <div style={{
        position: 'absolute',
        top: BASE_TOKENS.spacing.lg,
        right: BASE_TOKENS.spacing.lg,
        bottom: BASE_TOKENS.spacing.lg,
        width: '80px',
        opacity: 1
      }}>
        <img 
          src="/stylized-warning-img.png" 
          alt="Warning"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Content Section - Left aligned */}
      <div style={{
        textAlign: 'left',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingRight: '80px' // Add padding to avoid overlap with warning image
      }}>
        {/* Heading - Title case instead of all caps */}
        <h3 style={{
          fontSize: BASE_TOKENS.typography.fontSize.lg,
          fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
          color: BASE_TOKENS.colors.white,
          margin: 0,
          marginBottom: BASE_TOKENS.spacing.md,
          lineHeight: BASE_TOKENS.typography.lineHeight.tight
        }}>
          High Fraud Risk
        </h3>

        {/* Description text - Title case, no period */}
        <p style={{
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          color: BASE_TOKENS.colors.white,
          margin: 0,
          marginBottom: BASE_TOKENS.spacing.lg,
          lineHeight: BASE_TOKENS.typography.lineHeight.relaxed
        }}>
          Multiple Risk Factors Detected
        </p>

        {/* Block Account Button - White pill-shaped button with black text */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          marginTop: 'auto'
        }}>
          <button style={{
            backgroundColor: BASE_TOKENS.colors.white,
            color: BASE_TOKENS.colors.black,
            border: 'none',
            borderRadius: BASE_TOKENS.borderRadius.full,
            padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            fontWeight: BASE_TOKENS.typography.fontWeight.medium,
            cursor: 'pointer',
            boxShadow: BASE_TOKENS.shadows.sm,
            fontFamily: 'inherit'
          }}>
            Block Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default FraudRiskCard;
