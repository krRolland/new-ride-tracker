import React from 'react';
import { BASE_TOKENS } from '../../tokens';

// RecentRefunds Component
const RecentRefunds = () => {
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
      boxShadow: BASE_TOKENS.shadows.md
    }}>
      <h3 style={{
        fontSize: BASE_TOKENS.typography.fontSize.lg,
        fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
        color: BASE_TOKENS.colors.gray[800],
        marginBottom: BASE_TOKENS.spacing['2xl'],
        margin: 10
      }}>
        Recent Refunds
      </h3>
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
  );
};

export default RecentRefunds;
