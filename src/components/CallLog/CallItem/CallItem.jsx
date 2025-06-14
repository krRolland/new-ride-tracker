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
        minHeight: '50px', // Match ActivityTimeline minHeight
        padding: `calc(${BASE_TOKENS.spacing.sm} + 5px) ${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg} ${BASE_TOKENS.spacing.xs}`, // Added 5px more top padding
        borderRadius: BASE_TOKENS.borderRadius.md,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: 'transparent', // Background now handled by wrapper
        border: '1px solid transparent', // Border now handled by wrapper
        display: 'flex',
        alignItems: 'center',
        gap: `calc(${BASE_TOKENS.spacing.sm} + 4px)` // Added 4px more spacing between avatars and text
      }}
      onClick={() => onSelectCall(call)}
      // Removed hover effects to prevent white overlay over blue highlight
    >
      {/* Overlapping Avatars Container */}
      <div style={{
        position: 'relative',
        width: '73px', // Increased by 5px to accommodate larger avatars
        height: '47px', // Increased by 5px to match avatar size
        flexShrink: 0,
        alignSelf: 'center' // Center vertically within the item
      }}>
        {/* Customer Avatar (Foreground - In front of agent) */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '47px', // Increased by 5px from 42px to 47px
          height: '47px', // Increased by 5px from 42px to 47px
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
          width: '47px', // Increased by 5px from 42px to 47px
          height: '47px', // Increased by 5px from 42px to 47px
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
            src={call.agent === 'Agent Alex' ? '/alex-headshot.png' : 
                 call.agent === 'Agent Davis' ? '/davis-headshot.png' : 
                 call.agent === 'Agent Johnson' ? '/johnson-headshot.png' : 
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
        justifyContent: 'center',
        alignSelf: 'center' // Center vertically within the item
      }}>
        {/* Title */}
        <h4 style={{
          fontSize: '15px', // Match ActivityTimeline title size
          fontWeight: BASE_TOKENS.typography.fontWeight.semibold, // Match ActivityTimeline weight
          color: BASE_TOKENS.colors.gray[900],
          margin: 0,
          marginBottom: BASE_TOKENS.spacing.xs, // Match ActivityTimeline title spacing
          lineHeight: BASE_TOKENS.typography.lineHeight.sm, // Match ActivityTimeline line height
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {call.type}
        </h4>
        
        {/* Subtitle - Date and Duration */}
        <p style={{
          color: BASE_TOKENS.colors.gray[600], // Match ActivityTimeline subtitle color
          fontWeight: BASE_TOKENS.typography.fontWeight.normal, // Match ActivityTimeline weight
          margin: 0,
          fontSize: '13px', // Match ActivityTimeline subtitle size
          lineHeight: BASE_TOKENS.typography.lineHeight.xs, // Match ActivityTimeline line height
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {formatDate(call.dateTime.split(' - ')[0])} • {call.duration}
        </p>
      </div>
      
      {/* Right Side - Timestamp */}
      <div style={{
        flexShrink: 0,
        alignSelf: 'center'
      }}>
        <span style={{
          color: '#969696',
          fontSize: BASE_TOKENS.typography.fontSize.xs,
          fontWeight: BASE_TOKENS.typography.fontWeight.light,
          backgroundColor: '#F6F6F6',
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
