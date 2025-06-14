import React, { useState, useEffect } from 'react';
import { BASE_TOKENS } from '../../tokens';

const ActivityTimeline = ({ items = [] }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Default activity data if no items provided
  const defaultItems = [
    {
      id: 'activity-1',
      title: 'Account Login',
      time: '2 hours ago',
      subtitle: 'Logged in from iPhone 13 in San Francisco, CA',
      status: 'completed',
      type: 'login'
    },
    {
      id: 'activity-2',
      title: 'Ride Completed',
      time: '1 day ago',
      subtitle: 'Trip from Downtown to Airport - $47.50',
      status: 'completed',
      type: 'ride'
    },
    {
      id: 'activity-3',
      title: 'Payment Method Updated',
      time: '3 days ago',
      subtitle: 'Added new credit card ending in 4567',
      status: 'completed',
      type: 'payment'
    },
    {
      id: 'activity-4',
      title: 'Support Ticket',
      time: '1 week ago',
      subtitle: 'Lost item inquiry - Resolved',
      status: 'completed',
      type: 'support'
    },
    {
      id: 'activity-5',
      title: 'Account Created',
      time: 'March 2023',
      subtitle: 'Joined Uber with referral code',
      status: 'completed',
      type: 'account'
    }
  ];

  const activityItems = items.length > 0 ? items : defaultItems;

  // Animation effect on component mount
  useEffect(() => {
    const animationDuration = 1500; // 1.5 seconds
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
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'login':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case 'ride':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
        );
      case 'payment':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
          </svg>
        );
      case 'support':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
        );
      case 'account':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      default:
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
    }
  };

  const styles = {
    container: {
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      padding: BASE_TOKENS.spacing['2xl'],
      boxShadow: BASE_TOKENS.shadows.md,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: BASE_TOKENS.spacing.lg,
      flexShrink: 0
    },
    headerTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.lg,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[800],
      lineHeight: BASE_TOKENS.typography.lineHeight.lg,
      margin: 0
    },
    timelineContainer: {
      flex: 1,
      overflow: 'auto'
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
      paddingBottom: BASE_TOKENS.spacing.lg,
      paddingRight: BASE_TOKENS.spacing.sm,
      paddingTop: BASE_TOKENS.spacing.sm,
      minHeight: '50px',
      borderRadius: BASE_TOKENS.borderRadius.md,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    timelineItemHover: {
      backgroundColor: BASE_TOKENS.colors.gray[50]
    },
    timelineIcon: {
      position: 'absolute',
      left: '8px',
      top: '16px',
      width: '24px',
      height: '24px',
      borderRadius: BASE_TOKENS.borderRadius.full,
      backgroundColor: BASE_TOKENS.colors.gray[900],
      color: BASE_TOKENS.colors.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      fontSize: '12px'
    },
    timelineLine: {
      position: 'absolute',
      left: '19px',
      top: '40px',
      width: '2px',
      height: 'calc(100% - 16px)',
      backgroundColor: BASE_TOKENS.colors.gray[200],
      zIndex: 5
    },
    animatedLine: {
      position: 'absolute',
      left: '19px',
      top: '40px',
      width: '2px',
      backgroundColor: BASE_TOKENS.colors.gray[900],
      zIndex: 6,
      transition: 'none'
    },
    itemHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: BASE_TOKENS.spacing.xs
    },
    itemTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
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
      color: BASE_TOKENS.colors.gray[600],
      lineHeight: BASE_TOKENS.typography.lineHeight.xs,
      margin: 0
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.headerTitle}>Recent Activity</h3>
      </div>
      
      <div style={styles.timelineContainer}>
        <ul style={styles.timelineList}>
          {/* Animated line */}
          <div
            style={{
              ...styles.animatedLine,
              height: `${(activityItems.length - 1) * 66 * animationProgress}px`
            }}
          />
          
          {activityItems.map((item, index) => {
            const isHovered = hoveredItem === item.id;
            const isLast = index === activityItems.length - 1;
            
            return (
              <li 
                key={item.id} 
                style={{
                  ...styles.timelineItem,
                  ...(isHovered ? styles.timelineItemHover : {}),
                  paddingBottom: isLast ? BASE_TOKENS.spacing.sm : BASE_TOKENS.spacing.lg
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Timeline line for each item except the last */}
                {!isLast && (
                  <div style={styles.timelineLine}></div>
                )}
                
                {/* Timeline icon */}
                <div style={styles.timelineIcon}>
                  {getActivityIcon(item.type)}
                </div>
                
                <div>
                  <div style={styles.itemHeader}>
                    <h4 style={styles.itemTitle}>{item.title}</h4>
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
    </div>
  );
};

export default ActivityTimeline;
