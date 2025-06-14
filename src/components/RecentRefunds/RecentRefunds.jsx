import React, { useState } from 'react';
import { BASE_TOKENS } from '../../tokens';

// Recent Refunds Component
const RecentRefunds = () => {
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const refunds = [
    { id: 'R-7891', amount: 24.5, reason: 'Driver arrived late', date: '2025-06-08', status: 'Approved' },
    { id: 'R-7823', amount: 18.75, reason: 'Wrong route taken', date: '2025-06-02', status: 'Approved' },
    { id: 'R-7756', amount: 31.2, reason: 'Vehicle not as described', date: '2025-05-28', status: 'Pending' },
    { id: 'R-7689', amount: 15.8, reason: 'App malfunction', date: '2025-05-16', status: 'Approved' },
  ];

  // Function to get badge colors based on status
  const getBadgeColors = (status) => {
    switch (status) {
      case 'Approved':
        return {
          backgroundColor: '#0E8345',
          color: '#FFFFFF'
        };
      case 'Pending':
        return {
          backgroundColor: '#F6BC2F',
          color: '#FFFFFF'
        };
      case 'Rejected':
        return {
          backgroundColor: '#DE1135',
          color: '#FFFFFF'
        };
      default:
        return {
          backgroundColor: '#6B7280',
          color: '#FFFFFF'
        };
    }
  };

  return (
    <div style={{
      backgroundColor: 'transparent',
      paddingTop: '16px',
      paddingBottom: '16px',
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '17px', // Decreased by 1px from lg (18px)
            fontWeight: 800, // One step lower from maximum font weight
            color: BASE_TOKENS.colors.gray[800],
            lineHeight: BASE_TOKENS.typography.lineHeight.lg,
            letterSpacing: '0px', // Normal letter spacing
            margin: 0
          }}>
            Recent Refunds
          </h3>
          <button style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: BASE_TOKENS.colors.gray[500],
            fontSize: '13px', // Decreased by 1px from sm (14px)
            fontWeight: BASE_TOKENS.typography.fontWeight.medium,
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            View All
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {refunds.map((refund, index) => {
            const isHovered = hoveredItem === refund.id;
            
            return (
              <div 
                key={refund.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: isHovered ? BASE_TOKENS.colors.gray[50] : 'transparent',
                  borderRadius: BASE_TOKENS.borderRadius.md,
                  paddingTop: '17px',
                  paddingBottom: '17px',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  transition: 'all 0.2s ease',
                  borderBottom: index < refunds.length - 1 ? `1px solid ${BASE_TOKENS.colors.gray[200]}` : 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredItem(refund.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
              <div>
                <p style={{
                  color: BASE_TOKENS.colors.gray[800],
                  fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                  margin: 0,
                  fontSize: '15px' // Decreased by 1px from base (16px)
                }}>
                  ${refund.amount.toFixed(2)}
                </p>
                {/* <p style={{
                  color: BASE_TOKENS.colors.gray[600],
                  fontSize: BASE_TOKENS.typography.fontSize.sm,
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.xs
                }}>
                  {refund.reason}
                </p> */}
                {/* <p style={{
                  color: BASE_TOKENS.colors.gray[500],
                  fontSize: '10px', // Made even smaller - custom size
                  margin: 0
                }}>
                  {refund.date}
                </p> */}
              </div>
              <div style={{
                textAlign: 'right'
              }}>
                <p style={{
                  color: BASE_TOKENS.colors.gray[600],
                  fontSize: '13px', // Decreased by 1px from sm (14px)
                  margin: 0
                }}>
                  {refund.reason}
                </p>
              </div>
              {/* <span style={{
                padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
                fontSize: BASE_TOKENS.typography.fontSize.xs,
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                borderRadius: BASE_TOKENS.borderRadius.full,
                ...getBadgeColors(refund.status)
              }}>
                {refund.status}
              </span> */}
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentRefunds;
