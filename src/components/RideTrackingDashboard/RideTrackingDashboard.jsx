import React from 'react';
import { BASE_TOKENS } from '../../tokens';
import Timeline from '../Timeline';
import CommunicationLog from '../CommunicationLog';
import MapWithTripDetails from '../MapWithTripDetails';
import PeopleSection from '../PeopleSection';

const RideTrackingDashboard = ({ 
  tripInfo,
  timelineData, 
  callLogs, 
  messages, 
  driver, 
  rider 
}) => {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: BASE_TOKENS.spacing['2xl'],
      backgroundColor: BASE_TOKENS.colors.gray[50],
      minHeight: '100vh',
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    },
    header: {
      marginBottom: BASE_TOKENS.spacing['2xl']
    },
    pageTitle: {
      fontSize: BASE_TOKENS.typography.fontSize['2xl'],
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.xl,
      margin: 0,
      marginBottom: BASE_TOKENS.spacing.xs
    },
    tripId: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      color: BASE_TOKENS.colors.gray[500],
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      margin: 0,
      marginBottom: '2px'
    },
    uuid: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[400],
      fontWeight: BASE_TOKENS.typography.fontWeight.normal,
      margin: 0
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '360px 1fr',
      gap: BASE_TOKENS.spacing['2xl'],
      alignItems: 'start'
    },
    leftColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: BASE_TOKENS.spacing.lg
    },
    rightColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: BASE_TOKENS.spacing['2xl']
    },
    // Responsive breakpoint
    '@media (max-width: 768px)': {
      layout: {
        gridTemplateColumns: '1fr',
        gap: BASE_TOKENS.spacing.lg
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Live Ride Tracking</h1>
        <p style={styles.tripId}>Trip ID: {tripInfo.id}</p>
        <p style={styles.uuid}>UUID: {tripInfo.uuid}</p>
      </div>

      {/* Main Layout */}
      <div style={styles.layout}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          <Timeline items={timelineData} />
          <CommunicationLog 
            callLogs={callLogs} 
            messages={messages} 
          />
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          <MapWithTripDetails 
            distance={tripInfo.distance}
            duration={tripInfo.duration}
            fare={tripInfo.fare}
            surge={tripInfo.surge}
            pickupLocation={tripInfo.pickupLocation}
            dropoffLocation={tripInfo.dropoffLocation}
          />
          <PeopleSection 
            driver={driver}
            rider={rider}
          />
        </div>
      </div>
    </div>
  );
};

export default RideTrackingDashboard;