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
      display: 'flex',
      flexDirection: 'column',
      gap: BASE_TOKENS.spacing['2xl']
    }}>
      {/* Recent Refunds Section */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: BASE_TOKENS.spacing['2xl']
        }}>
          <h3 style={{
            fontSize: BASE_TOKENS.typography.fontSize.lg,
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            color: BASE_TOKENS.colors.gray[800],
            margin: 0
          }}>
            Recent Refunds
          </h3>
          
          {/* Device Info Button */}
          <button
            onClick={() => setShowDeviceDetails(!showDeviceDetails)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: BASE_TOKENS.spacing.xs,
              padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
              backgroundColor: BASE_TOKENS.colors.gray[100],
              border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
              borderRadius: BASE_TOKENS.borderRadius.md,
              cursor: 'pointer',
              fontSize: BASE_TOKENS.typography.fontSize.xs,
              color: BASE_TOKENS.colors.gray[600],
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.gray[200];
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.gray[100];
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            Device Info
          </button>
        </div>
        
        {/* Device Details Expandable Section */}
        {showDeviceDetails && (
          <div style={{
            backgroundColor: BASE_TOKENS.colors.gray[50],
            border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
            borderRadius: BASE_TOKENS.borderRadius.md,
            padding: BASE_TOKENS.spacing.lg,
            marginBottom: BASE_TOKENS.spacing.lg
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: BASE_TOKENS.spacing.lg,
              marginBottom: BASE_TOKENS.spacing.md
            }}>
              <img 
                src="/iphone-13-mockup.png" 
                alt="iPhone 13 mockup"
                style={{
                  width: '60px',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
              <div>
                <h4 style={{
                  fontSize: BASE_TOKENS.typography.fontSize.sm,
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[800],
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.xs
                }}>
                  Device Information
                </h4>
                <p style={{
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  color: BASE_TOKENS.colors.gray[600],
                  margin: 0
                }}>
                  Customer device usage and history
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: BASE_TOKENS.spacing.lg
            }}>
              <div>
                <p style={{
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[700],
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.xs
                }}>
                  Current Devices:
                </p>
                <p style={{
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  color: BASE_TOKENS.colors.gray[600],
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  iPhone 13 (iOS 16.3)<br/>
                  MacBook Pro (Web)
                </p>
              </div>
              
              <div>
                <p style={{
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[700],
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.xs
                }}>
                  Signup Device:
                </p>
                <p style={{
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  color: BASE_TOKENS.colors.gray[600],
                  margin: 0
                }}>
                  iPhone 11 (iOS 15.6)
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: BASE_TOKENS.spacing.lg }}>
          {refunds.map((refund) => (
            <div key={refund.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
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
