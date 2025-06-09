import React from 'react';
import { motion } from 'framer-motion';
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
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const columnVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const componentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const styles = {
    container: {
      backgroundColor: BASE_TOKENS.colors.gray[50],
      minHeight: '100vh',
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    },
    header: {
      position: 'sticky',
      top: 0,
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: `${BASE_TOKENS.spacing.lg} ${BASE_TOKENS.spacing['2xl']}`,
      marginBottom: BASE_TOKENS.spacing['2xl'],
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: `0 ${BASE_TOKENS.spacing['2xl']} ${BASE_TOKENS.spacing['2xl']}`
    },
    pageTitle: {
      fontSize: BASE_TOKENS.typography.fontSize['2xl'],
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: '#ffffff',
      lineHeight: BASE_TOKENS.typography.lineHeight.xl,
      margin: 0,
      marginBottom: BASE_TOKENS.spacing.xs
    },
    tripId: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      color: '#cccccc',
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      margin: 0,
      marginBottom: '2px'
    },
    uuid: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: '#999999',
      fontWeight: BASE_TOKENS.typography.fontWeight.normal,
      margin: 0
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '340px 1fr',
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
    <motion.div 
      style={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sticky Header */}
      <motion.div 
        style={styles.header}
        variants={headerVariants}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h1 
            style={styles.pageTitle}
            variants={componentVariants}
          >
            Live Ride Tracking
          </motion.h1>
          <motion.p 
            style={styles.tripId}
            variants={componentVariants}
          >
            Trip ID: {tripInfo.id}
          </motion.p>
          <motion.p 
            style={styles.uuid}
            variants={componentVariants}
          >
            UUID: {tripInfo.uuid}
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Main Layout */}
        <motion.div 
          style={styles.layout}
          variants={containerVariants}
        >
          {/* Left Column */}
          <motion.div 
            style={styles.leftColumn}
            variants={columnVariants}
          >
            <motion.div variants={componentVariants}>
              <Timeline items={timelineData} />
            </motion.div>
            <motion.div variants={componentVariants}>
              <CommunicationLog 
                callLogs={callLogs} 
                messages={messages} 
              />
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            style={styles.rightColumn}
            variants={columnVariants}
          >
            <motion.div variants={componentVariants}>
              <MapWithTripDetails 
                distance={tripInfo.distance}
                duration={tripInfo.duration}
                fare={tripInfo.fare}
                surge={tripInfo.surge}
                pickupLocation={tripInfo.pickupLocation}
                dropoffLocation={tripInfo.dropoffLocation}
                rider={rider}
              />
            </motion.div>
            <motion.div variants={componentVariants}>
              <PeopleSection 
                driver={driver}
                rider={rider}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RideTrackingDashboard;
