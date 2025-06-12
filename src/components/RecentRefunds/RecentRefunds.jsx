import React, { useState } from 'react';
import { BASE_TOKENS } from '../../tokens';

// RecentRefunds Component
const RecentRefunds = () => {
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  
  const refunds = [
    { id: 'R-7891', amount: 24.5, reason: 'Driver arrived late', date: '2025-06-08', status: 'Approved' },
    { id: 'R-7823', amount: 18.75, reason: 'Wrong route taken', date: '2025-06-02', status: 'Approved' },
    { id: 'R-7756', amount: 31.2, reason: 'Vehicle not as described', date: '2025-05-28', status: 'Under Review' },
    { id: 'R-7689', amount: 15.8, reason: 'App malfunction', date: '2025-05-16', status: 'Approved' },
  ];

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
      gap: BASE_TOKENS.spacing['2xl'],
      boxSizing: 'border-box'
    }}>
      {/* Recent Refunds Section */}
      <div>
        <div style={{
          marginBottom: BASE_TOKENS.spacing['2xl']
        }}>
          <h3 style={{
            fontSize: BASE_TOKENS.typography.fontSize.lg,
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            color: BASE_TOKENS.colors.gray[800],
            margin: 0
          }}>
            Refund Pattern Analysis
          </h3>
        </div>
        
        {/* Warning Banner */}
        <div style={{
          backgroundColor: BASE_TOKENS.colors.red[50],
          border: `1px solid ${BASE_TOKENS.colors.red[200]}`,
          borderRadius: BASE_TOKENS.borderRadius.md,
          padding: BASE_TOKENS.spacing.lg,
          marginBottom: BASE_TOKENS.spacing.lg,
          display: 'flex',
          alignItems: 'flex-start',
          gap: BASE_TOKENS.spacing.sm
        }}>
          {/* Warning Icon */}
          <div style={{
            flexShrink: 0,
            marginTop: '2px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BASE_TOKENS.colors.red[600]} strokeWidth="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <path d="M12 9v4"/>
              <path d="m12 17 .01 0"/>
            </svg>
          </div>
          
          {/* Warning Content */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: BASE_TOKENS.spacing.sm,
              marginBottom: BASE_TOKENS.spacing.xs
            }}>
              <h4 style={{
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                color: BASE_TOKENS.colors.red[800],
                margin: 0
              }}>
                Suspicious Pattern Detected
              </h4>
              <span style={{
                padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
                backgroundColor: BASE_TOKENS.colors.red[100],
                color: BASE_TOKENS.colors.red[800],
                fontSize: BASE_TOKENS.typography.fontSize.xs,
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                borderRadius: BASE_TOKENS.borderRadius.full
              }}>
                HIGH RISK
              </span>
            </div>
            <p style={{
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              color: BASE_TOKENS.colors.red[700],
              margin: 0,
              lineHeight: BASE_TOKENS.typography.lineHeight.sm
            }}>
              <strong>$74.45</strong> claimed across <strong>9 days</strong> - This is <strong>3x the normal frequency</strong> and involves similar complaint types. Pattern suggests potential fraudulent activity requiring immediate review.
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: BASE_TOKENS.spacing.lg }}>
          {refunds.map((refund) => (
            <div key={refund.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: BASE_TOKENS.colors.gray[50],
              borderRadius: BASE_TOKENS.borderRadius.md,
              padding: BASE_TOKENS.spacing.md,
              border: `1px solid ${BASE_TOKENS.colors.gray[100]}`,
              transition: 'all 0.2s ease'
            }}>
              <div>
                <p style={{
                  color: BASE_TOKENS.colors.gray[800],
                  fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.xs
                }}>
                  ${refund.amount.toFixed(2)}
                </p>
                <p style={{
                  color: BASE_TOKENS.colors.gray[600],
                  fontSize: BASE_TOKENS.typography.fontSize.sm,
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.xs
                }}>
                  {refund.reason}
                </p>
                <p style={{
                  color: BASE_TOKENS.colors.gray[500],
                  fontSize: '10px', // Made even smaller - custom size
                  margin: 0
                }}>
                  {refund.date}-R-{refund.id.split('-')[1]}
                </p>
              </div>
              <span style={{
                padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
                fontSize: BASE_TOKENS.typography.fontSize.xs,
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                borderRadius: BASE_TOKENS.borderRadius.full,
                backgroundColor: refund.status === 'Approved' ? BASE_TOKENS.colors.green[100] : BASE_TOKENS.colors.yellow[100],
                color: refund.status === 'Approved' ? BASE_TOKENS.colors.green[800] : BASE_TOKENS.colors.yellow[800]
              }}>
                {refund.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentRefunds;
