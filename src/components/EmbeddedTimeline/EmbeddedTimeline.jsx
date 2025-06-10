import React, { useState, useEffect } from 'react';
import { BASE_TOKENS } from '../../tokens';

const EmbeddedTimeline = ({ items = [], maxWidth = 'none', complete = false }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Animation effect on component mount
  useEffect(() => {
    const animationDuration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Start animation after a short delay
    const timeout = setTimeout(() => {
      animate();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const styles = {
    container: {
      maxWidth: maxWidth,
      width: '100%'
    },
    timelineList: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      position: 'relative'
    },
    timelineItem: {
      position: 'relative',
      paddingLeft: BASE_TOKENS.spacing['3xl'],
      paddingBottom: BASE_TOKENS.spacing.md,
      paddingRight: BASE_TOKENS.spacing.sm,
      paddingTop: BASE_TOKENS.spacing.sm,
      minHeight: '40px',
      borderRadius: BASE_TOKENS.borderRadius.md,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    timelineItemHover: {
      backgroundColor: BASE_TOKENS.colors.gray[50]
    },
    timelineIcon: {
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '8px',
      height: '8px',
      borderRadius: BASE_TOKENS.borderRadius.full,
      zIndex: 10 // Higher z-index so dots appear above lines
    },
    completedDot: {
      backgroundColor: BASE_TOKENS.colors.gray[900]
    },
    pendingDot: {
      backgroundColor: BASE_TOKENS.colors.gray[300]
    },
    timelineLine: {
      position: 'absolute',
      left: '3px', // Adjusted for smaller dot (8px/2 - 1px = 3px)
      top: '18px',
      width: '2px',
      height: '24px'
    },
    completedLine: {
      backgroundColor: BASE_TOKENS.colors.gray[900] // Black line for completed sections
    },
    pendingLine: {
      backgroundColor: BASE_TOKENS.colors.gray[200] // Gray line for pending sections
    },
    itemHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    itemTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.sm,
      margin: 0
    },
    itemTime: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      fontWeight: BASE_TOKENS.typography.fontWeight.medium
    },
    itemSubtitle: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      marginTop: BASE_TOKENS.spacing.xs,
      lineHeight: BASE_TOKENS.typography.lineHeight.xs,
      margin: `${BASE_TOKENS.spacing.xs} 0 0 0`
    }
  };

  return (
    <div style={styles.container}>
      <ul style={styles.timelineList}>
        {/* Background line for all items - only show if not complete */}
        {items.length > 0 && !complete && (
          <div
            style={{
              position: 'absolute',
              left: '3px',
              top: '18px',
              width: '2px',
              bottom: '22px',
              backgroundColor: BASE_TOKENS.colors.gray[300],
              zIndex: 5
            }}
          />
        )}
        
        {/* Progress line - full length if complete, animated if not */}
        {items.length > 0 && (
          <div
            style={{
              position: 'absolute',
              left: '3px',
              top: complete ? '22px' : '18px',
              width: '2px',
              height: complete 
                ? `${(items.length - 1) * 56 - 8}px`
                : `${(items.length - 1) * 56 * animationProgress}px`,
              backgroundColor: BASE_TOKENS.colors.gray[900],
              zIndex: 20,
              transition: 'none'
            }}
          />
        )}
        
        {items.map((item, index) => {
          const isCompleted = item.status === 'completed' || item.status === 'current';
          const isHovered = hoveredItem === item.id;
          
          return (
            <li 
              key={item.id} 
              style={{
                ...styles.timelineItem,
                ...(isHovered ? styles.timelineItemHover : {})
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div style={{
                ...styles.timelineIcon,
                ...(isCompleted ? styles.completedDot : styles.pendingDot)
              }}></div>
              
              <div>
                <div style={styles.itemHeader}>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <span style={styles.itemTime}>{item.time}</span>
                </div>
                {item.subtitle && (
                  <p style={styles.itemSubtitle}>{item.subtitle}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmbeddedTimeline;
