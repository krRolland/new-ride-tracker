import React, { useState, useEffect, useRef } from 'react';
import { BASE_TOKENS } from '../../tokens';

const PeopleSection = ({ driver, rider }) => {
  const [isNarrow, setIsNarrow] = useState(false);
  const containerRef = useRef(null);

  // Check container width and update layout
  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Stack vertically if container width is less than 400px
        setIsNarrow(width < 400);
      }
    };

    // Check on mount
    checkWidth();

    // Check on resize
    const resizeObserver = new ResizeObserver(checkWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const profiles = [
    {
      type: 'Driver',
      ...driver,
      avatar: '/headshot-1.png'
    },
    {
      type: 'Rider', 
      ...rider,
      avatar: '/headshot-2.png'
    }
  ];

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
    profilesGrid: {
      display: 'grid',
      gridTemplateColumns: isNarrow ? '1fr' : 'repeat(2, 1fr)',
      gap: BASE_TOKENS.spacing.lg
    },
    profileCard: {
      backgroundColor: BASE_TOKENS.colors.gray[50],
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      padding: BASE_TOKENS.spacing.lg
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: BASE_TOKENS.spacing.md
    },
    profileType: {
      fontSize: BASE_TOKENS.typography.fontSize.base,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.base,
      margin: 0
    },
    profileContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: BASE_TOKENS.spacing.md
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: BASE_TOKENS.borderRadius.full,
      backgroundColor: BASE_TOKENS.colors.gray[200],
      border: `2px solid ${BASE_TOKENS.colors.white}`,
      boxShadow: BASE_TOKENS.shadows.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      flexShrink: 0
    },
    profileInfo: {
      flex: 1,
      minWidth: 0
    },
    nameRating: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: BASE_TOKENS.spacing.xs
    },
    name: {
      fontSize: BASE_TOKENS.typography.fontSize.base,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.base,
      margin: 0
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: BASE_TOKENS.spacing.xs,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      color: BASE_TOKENS.colors.gray[700]
    },
    starIcon: {
      color: BASE_TOKENS.colors.yellow[500]
    },
    phone: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      marginBottom: BASE_TOKENS.spacing.xs,
      lineHeight: BASE_TOKENS.typography.lineHeight.xs
    },
    vehicle: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      lineHeight: BASE_TOKENS.typography.lineHeight.xs,
      marginBottom: '2px'
    },
    license: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[400],
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      lineHeight: BASE_TOKENS.typography.lineHeight.xs
    }
  };

  // People Icon component
  const PeopleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-5c-.8 0-1.5.7-1.5 1.5v6c0 .8.7 1.5 1.5 1.5H16v6h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z"/>
    </svg>
  );

  // Star Icon component
  const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );

  return (
    <div ref={containerRef} style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>People</h2>
      </div>
      
      <div style={styles.profilesGrid}>
        {profiles.map((profile, index) => (
          <div key={index} style={styles.profileCard}>
            <div style={styles.profileHeader}>
              <h3 style={styles.profileType}>{profile.type}</h3>
            </div>

            <div style={styles.profileContent}>
              <div style={styles.avatar}>
                <img 
                  src={profile.avatar} 
                  alt={`${profile.type} avatar`}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: BASE_TOKENS.borderRadius.full,
                    objectFit: 'cover'
                  }}
                />
              </div>

              <div style={styles.profileInfo}>
                <div style={styles.nameRating}>
                  <h4 style={styles.name}>{profile.name}</h4>
                  <div style={styles.rating}>
                    <div style={styles.starIcon}>
                      <StarIcon />
                    </div>
                    {profile.rating}
                  </div>
                </div>

                <div style={styles.phone}>{profile.phone}</div>

                {profile.vehicle && (
                  <>
                    <div style={styles.vehicle}>{profile.vehicle}</div>
                    <div style={styles.license}>License: {profile.license}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleSection;
