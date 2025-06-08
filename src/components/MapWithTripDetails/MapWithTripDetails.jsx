import React, { useState } from 'react';
import { BASE_TOKENS } from '../../tokens';

const MapWithTripDetails = ({ 
  distance, 
  duration, 
  fare, 
  surge,
  pickupLocation,
  dropoffLocation 
}) => {
  const [mapActivated, setMapActivated] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);

  const styles = {
    container: {
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      overflow: 'hidden',
      boxShadow: BASE_TOKENS.shadows.md
    },
    header: {
      padding: BASE_TOKENS.spacing['2xl'],
      borderBottom: `1px solid ${BASE_TOKENS.colors.gray[100]}`
    },
    headerTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.xl,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.lg,
      margin: 0
    },
    mapContainer: {
      position: 'relative',
      height: '240px'
    },
    // Base UI placeholder state
    mapPlaceholder: {
      height: '240px',
      backgroundColor: BASE_TOKENS.colors.gray[50],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: BASE_TOKENS.colors.gray[500]
    },
    placeholderIcon: {
      width: '48px',
      height: '48px',
      marginBottom: BASE_TOKENS.spacing.md,
      color: BASE_TOKENS.colors.gray[400]
    },
    placeholderText: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      color: BASE_TOKENS.colors.gray[600],
      marginBottom: BASE_TOKENS.spacing.sm
    },
    placeholderSubtext: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      marginBottom: BASE_TOKENS.spacing.lg
    },
    // Base UI primary button
    activateButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${BASE_TOKENS.spacing.md} ${BASE_TOKENS.spacing.lg}`,
      backgroundColor: BASE_TOKENS.colors.gray[900],
      color: BASE_TOKENS.colors.white,
      border: 'none',
      borderRadius: BASE_TOKENS.borderRadius.md,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit'
    },
    activateButtonHover: {
      backgroundColor: BASE_TOKENS.colors.gray[700]
    },
    // Active map state
    activeMap: {
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #E8F5E8 0%, #E3F2FD 100%)',
      overflow: 'hidden'
    },
    // Loading state
    loadingContainer: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(249, 250, 251, 0.9)',
      backdropFilter: 'blur(2px)'
    },
    loadingSpinner: {
      width: '24px',
      height: '24px',
      border: `2px solid ${BASE_TOKENS.colors.gray[200]}`,
      borderTop: `2px solid ${BASE_TOKENS.colors.gray[900]}`,
      borderRadius: BASE_TOKENS.borderRadius.full,
      animation: 'spin 1s linear infinite'
    },
    // Base UI Map Markers
    mapMarker: {
      position: 'absolute',
      transform: 'translate(-50%, -100%)',
      zIndex: 10
    },
    markerPin: {
      width: '24px',
      height: '24px',
      borderRadius: '12px 12px 12px 2px',
      border: `2px solid ${BASE_TOKENS.colors.white}`,
      boxShadow: BASE_TOKENS.shadows.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: BASE_TOKENS.typography.fontWeight.bold,
      color: BASE_TOKENS.colors.white
    },
    pickupPin: {
      backgroundColor: BASE_TOKENS.colors.green[500]
    },
    dropoffPin: {
      backgroundColor: BASE_TOKENS.colors.red[500]
    },
    driverPin: {
      width: '32px',
      height: '32px',
      borderRadius: BASE_TOKENS.borderRadius.full,
      backgroundColor: BASE_TOKENS.colors.blue[500],
      animation: 'pulse 2s infinite'
    },
    markerLabel: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: BASE_TOKENS.spacing.xs,
      backgroundColor: BASE_TOKENS.colors.white,
      padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
      borderRadius: BASE_TOKENS.borderRadius.sm,
      boxShadow: BASE_TOKENS.shadows.sm,
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      color: BASE_TOKENS.colors.gray[700],
      whiteSpace: 'nowrap'
    },
    // Route line
    routeLine: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },
    tripDetails: {
      padding: BASE_TOKENS.spacing['2xl']
    },
    sectionTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.base,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.base,
      marginBottom: BASE_TOKENS.spacing.md,
      margin: 0
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: BASE_TOKENS.spacing.lg,
      marginBottom: BASE_TOKENS.spacing.lg
    },
    detailItem: {
      textAlign: 'center'
    },
    detailLabel: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: BASE_TOKENS.spacing.xs
    },
    detailValue: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.sm
    },
    surgeTag: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
      backgroundColor: BASE_TOKENS.colors.red[100],
      color: BASE_TOKENS.colors.red[600],
      borderRadius: BASE_TOKENS.borderRadius.full,
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold
    },
    routeSection: {
      paddingTop: BASE_TOKENS.spacing.lg,
      borderTop: `1px solid ${BASE_TOKENS.colors.gray[100]}`
    },
    routeItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: BASE_TOKENS.spacing.md
    },
    routeDot: {
      width: '8px',
      height: '8px',
      borderRadius: BASE_TOKENS.borderRadius.full,
      marginTop: BASE_TOKENS.spacing.sm,
      marginRight: BASE_TOKENS.spacing.md,
      flexShrink: 0
    },
    pickupDot: {
      backgroundColor: BASE_TOKENS.colors.green[500]
    },
    dropoffDot: {
      backgroundColor: BASE_TOKENS.colors.red[500]
    },
    routeLocation: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.sm,
      marginBottom: '2px'
    },
    routeLabel: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      lineHeight: BASE_TOKENS.typography.lineHeight.xs
    }
  };

  const handleActivateMap = () => {
    setMapLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setMapLoading(false);
      setMapActivated(true);
    }, 1500);
  };

  const MapIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
    </svg>
  );

  const CarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  );

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>

      <div style={styles.container}>
        {/* Map Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Live Map</h2>
        </div>

        {/* Map Container */}
        <div style={styles.mapContainer}>
          {!mapActivated ? (
            // Placeholder State (Base UI pattern)
            <div style={styles.mapPlaceholder}>
              <div style={styles.placeholderIcon}>
                <MapIcon />
              </div>
              <div style={styles.placeholderText}>
                Interactive Map
              </div>
              <div style={styles.placeholderSubtext}>
                Click to load live tracking
              </div>
              <button 
                style={styles.activateButton}
                onClick={handleActivateMap}
                disabled={mapLoading}
                onMouseEnter={(e) => !mapLoading && Object.assign(e.target.style, styles.activateButtonHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.activateButton)}
              >
                {mapLoading ? 'Loading...' : 'Activate Map'}
              </button>
            </div>
          ) : (
            // Active Map State
            <div style={styles.activeMap}>
              {/* Route Line */}
              <svg style={styles.routeLine}>
                <path
                  d="M 60 80 Q 120 60 160 80 Q 200 100 240 120"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6,3"
                  opacity="0.8"
                />
              </svg>

              {/* Pickup Marker */}
              <div style={{...styles.mapMarker, top: '80px', left: '60px'}}>
                <div style={{...styles.markerPin, ...styles.pickupPin}}>P</div>
                <div style={styles.markerLabel}>Pickup</div>
              </div>

              {/* Driver Marker */}
              <div style={{...styles.mapMarker, top: '100px', left: '160px'}}>
                <div style={{...styles.markerPin, ...styles.driverPin}}>
                  <CarIcon />
                </div>
                <div style={styles.markerLabel}>Driver</div>
              </div>

              {/* Dropoff Marker */}
              <div style={{...styles.mapMarker, top: '120px', left: '240px'}}>
                <div style={{...styles.markerPin, ...styles.dropoffPin}}>D</div>
                <div style={styles.markerLabel}>Drop-off</div>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {mapLoading && (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
            </div>
          )}
        </div>

        {/* Trip Details Below Map (Your Original Section) */}
        <div style={styles.tripDetails}>
          <h3 style={styles.sectionTitle}>Trip</h3>
          
          {/* Trip Stats Grid */}
          <div style={styles.detailsGrid}>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Distance</div>
              <div style={styles.detailValue}>{distance}</div>
            </div>
            
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Duration</div>
              <div style={styles.detailValue}>{duration}</div>
            </div>
            
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Fare</div>
              <div style={styles.detailValue}>{fare}</div>
            </div>
            
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Surge</div>
              <div style={styles.surgeTag}>{surge}</div>
            </div>
          </div>

          {/* Route Information */}
          <div style={styles.routeSection}>
            <div style={styles.routeItem}>
              <div style={{...styles.routeDot, ...styles.pickupDot}}></div>
              <div>
                <div style={styles.routeLocation}>{pickupLocation}</div>
                <div style={styles.routeLabel}>Pickup location</div>
              </div>
            </div>
            
            <div style={styles.routeItem}>
              <div style={{...styles.routeDot, ...styles.dropoffDot}}></div>
              <div>
                <div style={styles.routeLocation}>{dropoffLocation}</div>
                <div style={styles.routeLabel}>Drop-off location</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapWithTripDetails;