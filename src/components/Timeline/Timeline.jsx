import React, { useState, useEffect } from 'react';
import { BASE_TOKENS } from '../../tokens';

const Timeline = ({ items = [] }) => {
  const [animationProgress, setAnimationProgress] = useState(0);

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

  // Find the indices for different timeline items
  const rideRequestedIndex = items.findIndex(item => item.title === 'Ride Requested');
  const driverEnRouteIndex = items.findIndex(item => item.title === 'Driver En Route');
  const pickupIndex = items.findIndex(item => item.title === 'Pickup');
  const dropoffIndex = items.findIndex(item => item.title === 'Drop-off');

  const styles = {
    container: {
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      padding: BASE_TOKENS.spacing['2xl'],
      boxShadow: BASE_TOKENS.shadows.md
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: BASE_TOKENS.spacing.lg
    },
    headerIcon: {
      width: '20px',
      height: '20px',
      marginRight: BASE_TOKENS.spacing.sm,
      color: BASE_TOKENS.colors.gray[500]
    },
    headerTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.xl,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.lg,
      margin: 0
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
      minHeight: '40px'
    },
    timelineIcon: {
      position: 'absolute',
      left: '0',
      top: '6px', // Adjusted for smaller dot
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

  // Timeline Icon component
  const TimelineIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Trip Timeline</h2>
      </div>
      
      <ul style={styles.timelineList}>
        {/* Animated black line from Ride Requested to Driver En Route */}
        {rideRequestedIndex !== -1 && driverEnRouteIndex !== -1 && (
          <div
            style={{
              position: 'absolute',
              left: '3px',
              top: `${rideRequestedIndex * 56 + 14}px`, // Start from first dot center
              width: '2px',
              height: `${(driverEnRouteIndex - rideRequestedIndex) * 56 * animationProgress}px`,
              backgroundColor: '#000000',
              zIndex: 1, // Lower z-index so it doesn't cover dots
              transition: 'none'
            }}
          />
        )}
        
        {rideRequestedIndex !== -1 && dropoffIndex !== -1 && (
  <div
    style={{
      position: 'absolute',
      left: '3px',
      top: '14px', // Start from first dot
      width: '2px',
      bottom: `${(items.length - 1 - dropoffIndex) * 56 + 26}px`, // Increase the bottom offset slightly
      backgroundColor: BASE_TOKENS.colors.gray[300],
      zIndex: 0,
      transition: 'none'
    }}
  />
)}
        
        {items.map((item, index) => {
          const isCompleted = item.status === 'completed' || item.status === 'current';
          
          return (
            <li key={item.id} style={styles.timelineItem}>
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

export default Timeline;
