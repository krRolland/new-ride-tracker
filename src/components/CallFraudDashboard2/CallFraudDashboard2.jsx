import React from 'react';
import { BASE_TOKENS } from '../../tokens';

// CallFraudDashboard2 Component
const CallFraudDashboard2 = () => {
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
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        <h3 style={{
          fontSize: BASE_TOKENS.typography.fontSize.lg,
          fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
          color: BASE_TOKENS.colors.gray[800],
          margin: 0
        }}>
          Call Fraud Dashboard 2
        </h3>
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          color: BASE_TOKENS.colors.gray[500],
          margin: 0
        }}>
          Component content goes here
        </p>
      </div>
    </div>
  );
};

export default CallFraudDashboard2;
