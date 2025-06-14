import React from 'react';
import { BASE_TOKENS } from '../../tokens';

// FraudSignals Component
const FraudSignals = () => {
  const fraudMetrics = [
    {
      id: 'billing-disputes',
      title: 'Billing Disputes',
      current: '50%',
      multiplier: '10x higher',
      icon: 'credit-card'
    },
    {
      id: 'call-frequency',
      title: 'Call Frequency',
      current: '6',
      multiplier: '3x higher',
      icon: 'phone'
    },
    {
      id: 'refund-rate',
      title: 'Refund Rate',
      current: '$74',
      multiplier: '5x higher',
      icon: 'arrow-left'
    },
    {
      id: 'account-age',
      title: 'Account Age',
      current: '2.5yr',
      multiplier: 'Established',
      icon: 'clock'
    }
  ];

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'credit-card':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
        );
      case 'phone':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        );
      case 'arrow-left':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12,19 5,12 12,5"/>
          </svg>
        );
      case 'clock':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        );
      default:
        return null;
    }
  };

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
          margin: 0,
          marginBottom: BASE_TOKENS.spacing.xs
        }}>
          Fraud Signals
        </h3>
        <p style={{
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          color: BASE_TOKENS.colors.gray[600],
          margin: 0
        }}>
          vs. normal customer behavior
        </p>
      </div>

      {/* Streamlined List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: BASE_TOKENS.spacing.sm,
        flex: 1
      }}>
        {fraudMetrics.map((metric, index) => {
          const isLastItem = index === fraudMetrics.length - 1;
          return (
            <div key={metric.id}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `${BASE_TOKENS.spacing.sm} 0`,
                minHeight: '40px'
              }}>
                {/* Left side - Icon and Title */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: BASE_TOKENS.spacing.sm,
                  flex: 1
                }}>
                  <div style={{
                    color: BASE_TOKENS.colors.gray[500],
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0
                  }}>
                    {getIcon(metric.icon)}
                  </div>
                  <span style={{
                    fontSize: BASE_TOKENS.typography.fontSize.sm,
                    fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                    color: BASE_TOKENS.colors.gray[800]
                  }}>
                    {metric.title}
                  </span>
                </div>

                {/* Right side - Values */}
                <div style={{
                  textAlign: 'right',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '2px'
                }}>
                  <div style={{
                    fontSize: BASE_TOKENS.typography.fontSize.lg,
                    fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                    color: BASE_TOKENS.colors.gray[900]
                  }}>
                    {metric.current}
                  </div>
                  <div style={{
                    fontSize: BASE_TOKENS.typography.fontSize.xs,
                    color: BASE_TOKENS.colors.gray[500]
                  }}>
                    {metric.multiplier}
                  </div>
                </div>
              </div>
              
              {/* Separator line (except for last item) */}
              {!isLastItem && (
                <div style={{
                  height: '1px',
                  backgroundColor: BASE_TOKENS.colors.gray[200],
                  marginLeft: '24px' // Align with text after icon
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FraudSignals;
