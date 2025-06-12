import React from 'react';
import { BASE_TOKENS } from '../../tokens';

// FraudSignals Component
const FraudSignals = () => {
  const fraudMetrics = [
    {
      id: 'billing-disputes',
      title: 'Billing Disputes',
      normal: '5%',
      current: '50%',
      multiplier: '10x higher',
      severity: 'high'
    },
    {
      id: 'call-frequency',
      title: 'Call Frequency',
      normal: '2/month',
      current: '6',
      multiplier: '3x higher',
      severity: 'medium'
    },
    {
      id: 'refund-rate',
      title: 'Refund Rate',
      normal: '$15/month',
      current: '$74',
      multiplier: '5x higher',
      severity: 'high'
    },
    {
      id: 'account-age',
      title: 'Account Age',
      normal: 'Good indicator',
      current: '2.5yr',
      multiplier: 'Established',
      severity: 'low'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return {
          bg: BASE_TOKENS.colors.red[50],
          text: BASE_TOKENS.colors.red[700],
          border: BASE_TOKENS.colors.red[200],
          multiplier: BASE_TOKENS.colors.red[800]
        };
      case 'medium':
        return {
          bg: BASE_TOKENS.colors.yellow[50],
          text: BASE_TOKENS.colors.yellow[700],
          border: BASE_TOKENS.colors.yellow[200],
          multiplier: BASE_TOKENS.colors.yellow[800]
        };
      case 'low':
        return {
          bg: BASE_TOKENS.colors.green[50],
          text: BASE_TOKENS.colors.green[700],
          border: BASE_TOKENS.colors.green[200],
          multiplier: BASE_TOKENS.colors.green[800]
        };
      default:
        return {
          bg: BASE_TOKENS.colors.gray[50],
          text: BASE_TOKENS.colors.gray[700],
          border: BASE_TOKENS.colors.gray[200],
          multiplier: BASE_TOKENS.colors.gray[800]
        };
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

      {/* Metrics List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: BASE_TOKENS.spacing.lg,
        flex: 1
      }}>
        {fraudMetrics.map((metric) => {
          const colors = getSeverityColor(metric.severity);
          return (
            <div
              key={metric.id}
              style={{
                padding: BASE_TOKENS.spacing.md,
                borderRadius: BASE_TOKENS.borderRadius.md,
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.bg
              }}
            >
              {/* Metric Title */}
              <h4 style={{
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                color: BASE_TOKENS.colors.gray[800],
                margin: 0,
                marginBottom: BASE_TOKENS.spacing.sm
              }}>
                {metric.title}
              </h4>

              {/* Normal vs Current - Restructured Layout */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: BASE_TOKENS.spacing.xs
              }}>
                <div style={{
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  color: BASE_TOKENS.colors.gray[500]
                }}>
                  Normal: {metric.normal}
                </div>
                <div style={{
                  textAlign: 'right',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}>
                  <div style={{
                    fontSize: BASE_TOKENS.typography.fontSize.lg,
                    fontWeight: BASE_TOKENS.typography.fontWeight.bold,
                    color: colors.text,
                    marginBottom: '2px'
                  }}>
                    {metric.current}
                  </div>
                  <div style={{
                    fontSize: BASE_TOKENS.typography.fontSize.sm,
                    fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                    color: colors.multiplier
                  }}>
                    {metric.multiplier}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FraudSignals;
