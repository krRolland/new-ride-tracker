import React from 'react';
import { BASE_TOKENS } from '../../../tokens';

const CallItem = ({ 
  call, 
  isSelected, 
  onSelectCall, 
  colorBy, 
  getCallBackgroundColor, 
  getCallBorder 
}) => {
  // Function to format date to "July 3rd, 2025" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options).replace(/(\d+),/, (match, day) => {
      const dayNum = parseInt(day);
      let suffix = 'th';
      if (dayNum % 10 === 1 && dayNum !== 11) suffix = 'st';
      else if (dayNum % 10 === 2 && dayNum !== 12) suffix = 'nd';
      else if (dayNum % 10 === 3 && dayNum !== 13) suffix = 'rd';
      return dayNum + suffix + ',';
    });
  };

  return (
    <div
      style={{
        padding: BASE_TOKENS.spacing.md,
        borderRadius: BASE_TOKENS.borderRadius.md,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: getCallBackgroundColor(call, isSelected),
        border: getCallBorder(call, isSelected)
      }}
      onClick={() => onSelectCall(call)}
      onMouseEnter={(e) => {
        if (!isSelected) {
          const hoverColor = colorBy === 'Fraud Risk' && call.fraudRisk 
            ? BASE_TOKENS.colors.red[200]
            : colorBy === 'Sentiment' && call.details.sentiment < 6 
            ? BASE_TOKENS.colors.yellow[200]
            : colorBy === 'Sentiment' && call.details.sentiment >= 8 
            ? BASE_TOKENS.colors.green[200]
            : BASE_TOKENS.colors.gray[50];
          e.currentTarget.style.backgroundColor = hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = getCallBackgroundColor(call, false);
        }
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: BASE_TOKENS.spacing.sm,
        marginBottom: BASE_TOKENS.spacing.xs
      }}>
        {/* Agent Avatar */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: BASE_TOKENS.borderRadius.full,
          backgroundColor: BASE_TOKENS.colors.gray[200],
          border: `2px solid ${BASE_TOKENS.colors.white}`,
          boxShadow: BASE_TOKENS.shadows.sm,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          <img 
            src={call.agent === 'Agent Smith' ? '/headshot-1.png' : 
                 call.agent === 'Agent Davis' ? '/headshot-2.png' : 
                 call.agent === 'Agent Johnson' ? '/headshot-5.png' : 
                 '/headshot-6.png'} 
            alt={`${call.agent} avatar`}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: BASE_TOKENS.borderRadius.full,
              objectFit: 'cover'
            }}
          />
        </div>
        
        {/* Content */}
        <div style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            <h4 style={{
              fontSize: BASE_TOKENS.typography.fontSize.md,
              fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
              color: BASE_TOKENS.colors.gray[900],
              margin: 0,
              lineHeight: BASE_TOKENS.typography.lineHeight.sm,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1
            }}>
              {call.type}
              {call.fraudRisk && (
                <span style={{
                  marginLeft: BASE_TOKENS.spacing.sm,
                  color: BASE_TOKENS.colors.red[500],
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold
                }}>
                  (Fraud Risk)
                </span>
              )}
            </h4>
            <span style={{
              color: BASE_TOKENS.colors.gray[500],
              fontSize: BASE_TOKENS.typography.fontSize.xs,
              fontWeight: BASE_TOKENS.typography.fontWeight.medium,
              backgroundColor: BASE_TOKENS.colors.gray[100],
              padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
              borderRadius: BASE_TOKENS.borderRadius.full,
              marginLeft: BASE_TOKENS.spacing.sm,
              flexShrink: 0
            }}>
              {call.dateTime.split(' - ')[1]}
            </span>
          </div>
        </div>
      </div>
      <p style={{
        color: BASE_TOKENS.colors.gray[600],
        fontWeight: BASE_TOKENS.typography.fontWeight.normal,
        margin: 0,
        fontSize: BASE_TOKENS.typography.fontSize.xs,
        marginBottom: BASE_TOKENS.spacing.md,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {formatDate(call.dateTime.split(' - ')[0])} • {call.duration} • by {call.agent.split(' ')[1]}
      </p>
    </div>
  );
};

export default CallItem;
