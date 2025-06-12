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
        minHeight: '56px', // Reduced from 64px to make items more compact
        padding: `${BASE_TOKENS.spacing.xs} 0 ${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.xs}`, // Remove left padding to align with other elements
        borderRadius: BASE_TOKENS.borderRadius.md,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: 'transparent', // Background now handled by wrapper
        border: '1px solid transparent', // Border now handled by wrapper
        display: 'flex',
        alignItems: 'center',
        gap: BASE_TOKENS.spacing.sm
      }}
      onClick={() => onSelectCall(call)}
      // Removed hover effects to prevent white overlay over blue highlight
    >
      {/* Overlapping Avatars Container */}
      <div style={{
        position: 'relative',
        width: '68px', // Increased by 5px more to accommodate additional offset
        height: '42px', // Reduced from 47px to 42px
        flexShrink: 0
      }}>
        {/* Customer Avatar (Foreground - In front of agent) */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '42px', // Reduced by 5px from 47px to 42px
          height: '42px', // Reduced by 5px from 47px to 42px
          borderRadius: BASE_TOKENS.borderRadius.full,
          backgroundColor: BASE_TOKENS.colors.gray[200],
          border: `2px solid ${BASE_TOKENS.colors.white}`,
          boxShadow: BASE_TOKENS.shadows.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 2
        }}>
          <img 
            src="/headshot-8.png"
            alt="Customer avatar"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: BASE_TOKENS.borderRadius.full,
              objectFit: 'cover'
            }}
          />
        </div>
        
        {/* Agent Avatar (Background - Behind customer) */}
        <div style={{
          position: 'absolute',
          left: '0px', // Align leftmost avatar to the very left edge
          top: 0,
          width: '42px', // Reduced by 5px from 47px to 42px
          height: '42px', // Reduced by 5px from 47px to 42px
          borderRadius: BASE_TOKENS.borderRadius.full,
          backgroundColor: BASE_TOKENS.colors.gray[200],
          border: `2px solid ${BASE_TOKENS.colors.white}`,
          boxShadow: BASE_TOKENS.shadows.sm,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 1
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
      </div>
      
      {/* Center Content - Title and Subtitle */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Title */}
        <h4 style={{
          fontSize: BASE_TOKENS.typography.fontSize.md,
          fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
          color: BASE_TOKENS.colors.gray[900],
          margin: 0,
          marginBottom: '4px', // Increased from 2px to 4px for more spacing
          lineHeight: BASE_TOKENS.typography.lineHeight.tight,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {call.type}
        </h4>
        
        {/* Subtitle - Single Line */}
        <p style={{
          color: BASE_TOKENS.colors.gray[500],
          fontWeight: BASE_TOKENS.typography.fontWeight.light,
          margin: 0,
          fontSize: BASE_TOKENS.typography.fontSize.xs,
          lineHeight: BASE_TOKENS.typography.lineHeight.tight,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {formatDate(call.dateTime.split(' - ')[0])} • {call.duration} • {call.agent.split(' ')[1]}
        </p>
      </div>
      
      {/* Right Side - Timestamp */}
      <div style={{
        flexShrink: 0,
        alignSelf: 'center'
      }}>
        <span style={{
          color: BASE_TOKENS.colors.gray[600],
          fontSize: BASE_TOKENS.typography.fontSize.xs,
          fontWeight: BASE_TOKENS.typography.fontWeight.light,
          backgroundColor: BASE_TOKENS.colors.gray[100],
          padding: `6px 10px`, // Increased from 4px 8px (xs/sm) to 6px 10px for more padding
          borderRadius: BASE_TOKENS.borderRadius.full,
          display: 'inline-block'
        }}>
          {call.dateTime.split(' - ')[1]}
        </span>
      </div>
    </div>
  );
};

export default CallItem;
