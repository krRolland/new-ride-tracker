import React, { useState } from 'react';
import { BASE_TOKENS } from '../../tokens';

// QuickActionsCard Component
const QuickActionsCard = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlockAccount = () => {
    setIsBlocked(!isBlocked);
    console.log(isBlocked ? 'Account unblocked' : 'Account blocked');
  };

  const handleAddNotes = () => {
    console.log('Add Notes clicked');
    // This would typically open a modal or navigate to a notes page
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
      <h3 style={{
        fontSize: BASE_TOKENS.typography.fontSize.lg,
        fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
        color: BASE_TOKENS.colors.gray[800],
        margin: 0,
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        Quick Actions
      </h3>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: BASE_TOKENS.spacing.md,
        flex: 1
      }}>
        {/* Block Account Button */}
        <button
          onClick={handleBlockAccount}
          style={{
            width: '100%',
            padding: BASE_TOKENS.spacing.md,
            backgroundColor: isBlocked ? BASE_TOKENS.colors.green[600] : BASE_TOKENS.colors.red[600],
            color: BASE_TOKENS.colors.white,
            border: 'none',
            borderRadius: BASE_TOKENS.borderRadius.md,
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: BASE_TOKENS.spacing.sm
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = isBlocked ? BASE_TOKENS.colors.green[700] : BASE_TOKENS.colors.red[700];
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = isBlocked ? BASE_TOKENS.colors.green[600] : BASE_TOKENS.colors.red[600];
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isBlocked ? (
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            ) : (
              <circle cx="12" cy="12" r="10"/>
            )}
            {!isBlocked && <path d="m4.9 4.9 14.2 14.2"/>}
          </svg>
          {isBlocked ? 'Unblock Account' : 'Block Account'}
        </button>

        {/* Add Notes Button */}
        <button
          onClick={handleAddNotes}
          style={{
            width: '100%',
            padding: BASE_TOKENS.spacing.md,
            backgroundColor: BASE_TOKENS.colors.blue[600],
            color: BASE_TOKENS.colors.white,
            border: 'none',
            borderRadius: BASE_TOKENS.borderRadius.md,
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: BASE_TOKENS.spacing.sm
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = BASE_TOKENS.colors.blue[700];
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = BASE_TOKENS.colors.blue[600];
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
          Add Notes
        </button>
      </div>
    </div>
  );
};

export default QuickActionsCard;
