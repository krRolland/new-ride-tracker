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
    <motion.div 
      style={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div 
        style={styles.header}
        variants={headerVariants}
      >
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
      </motion.div>

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
    </motion.div>
  );
};

export default RideTrackingDashboard;
