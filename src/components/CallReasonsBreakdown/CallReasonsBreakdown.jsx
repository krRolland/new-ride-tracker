import React, { useState } from 'react';
import { BASE_TOKENS } from '../../tokens';

// CallReasonsBreakdown Component
const CallReasonsBreakdown = ({ callReasonsDistribution, totalCalls }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  
  // Define colors for the pie chart slices
  const PIE_COLORS = ['#4d90fe', '#42d4d4', '#f9cb54', '#f27c5b', '#8fb4fc'];

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
        margin: 0
      }}>
        Call Reasons Breakdown
      </h3>

      {/* Call Reasons Pie Chart */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '160px',
        position: 'relative'
      }}>
        <svg width="128" height="128" viewBox="0 0 128 128">
          {/* Pie chart slices */}
          {callReasonsDistribution.length > 0 && (() => {
            let currentAngle = 0;
            const centerX = 64;
            const centerY = 64;
            const radius = 62; // Slightly smaller to accommodate stroke
            
            return callReasonsDistribution.map((item, index) => {
              const percentage = item.value / totalCalls;
              const angle = percentage * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              // Convert angles to radians
              const startRad = (startAngle - 90) * (Math.PI / 180);
              const endRad = (endAngle - 90) * (Math.PI / 180);
              
              // Calculate arc coordinates
              const x1 = centerX + radius * Math.cos(startRad);
              const y1 = centerY + radius * Math.sin(startRad);
              const x2 = centerX + radius * Math.cos(endRad);
              const y2 = centerY + radius * Math.sin(endRad);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                  stroke="white"
                  strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              );
            });
          })()}
          
          {/* Outer circle border */}
          <circle
            cx="64"
            cy="64"
            r="62"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        
        {/* Tooltip */}
        {hoveredSlice !== null && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: BASE_TOKENS.colors.gray[900],
            color: BASE_TOKENS.colors.white,
            padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
            borderRadius: BASE_TOKENS.borderRadius.md,
            fontSize: BASE_TOKENS.typography.fontSize.xs,
            fontWeight: BASE_TOKENS.typography.fontWeight.medium,
            whiteSpace: 'nowrap',
            zIndex: 1000,
            pointerEvents: 'none'
          }}>
            {callReasonsDistribution[hoveredSlice]?.name}
          </div>
        )}
        
        {/* Legend */}
        <div style={{
          marginLeft: BASE_TOKENS.spacing['2xl'],
          display: 'flex',
          flexDirection: 'column',
          gap: BASE_TOKENS.spacing.sm,
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          color: BASE_TOKENS.colors.gray[700]
        }}>
          {callReasonsDistribution.map((item, index) => (
            <div key={item.name} style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                marginRight: BASE_TOKENS.spacing.sm,
                backgroundColor: PIE_COLORS[index % PIE_COLORS.length]
              }}></span>
              <span style={{ fontSize: BASE_TOKENS.typography.fontSize.xs }}>
                {item.name} ({((item.value / totalCalls) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallReasonsBreakdown;
