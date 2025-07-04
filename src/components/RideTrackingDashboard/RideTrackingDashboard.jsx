import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  rider,
  showCommunicationLog = false,
  includeComponentSwapAnimations = true
}) => {
  const [isLoadingCommunicationLog, setIsLoadingCommunicationLog] = useState(false);
  const [showActualCommunicationLog, setShowActualCommunicationLog] = useState(false);
  const communicationLogRef = useRef(null);
  const containerRef = useRef(null);

  // Handle communication log loading when showCommunicationLog becomes true
  useEffect(() => {
    if (showCommunicationLog && !showActualCommunicationLog) {
      if (includeComponentSwapAnimations) {
        // Start loading process immediately
        setIsLoadingCommunicationLog(true);
        
        // Show skeleton for 1.5 seconds, then show actual component
        setTimeout(() => {
          setIsLoadingCommunicationLog(false);
          setShowActualCommunicationLog(true);
        }, 1500);
      } else {
        // Skip loading animation and show communication log immediately
        setShowActualCommunicationLog(true);
      }
    }
  }, [showCommunicationLog, showActualCommunicationLog, includeComponentSwapAnimations]);
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

  // Skeleton component for CommunicationLog loading
  const CommunicationLogSkeleton = () => (
    <div style={{
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      padding: BASE_TOKENS.spacing['2xl'],
      boxShadow: BASE_TOKENS.shadows.md,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header skeleton */}
      <div style={{
        height: '24px',
        width: '60%',
        backgroundColor: BASE_TOKENS.colors.gray[200],
        borderRadius: BASE_TOKENS.borderRadius.md,
        marginBottom: BASE_TOKENS.spacing.lg,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent 0%, ${BASE_TOKENS.colors.gray[100]} 50%, transparent 100%)`,
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      {/* Messages skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: BASE_TOKENS.spacing.md }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            height: '60px',
            backgroundColor: BASE_TOKENS.colors.gray[100],
            borderRadius: BASE_TOKENS.borderRadius.md,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <motion.div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(90deg, transparent 0%, ${BASE_TOKENS.colors.gray[50]} 50%, transparent 100%)`,
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
            />
          </div>
        ))}
      </div>
      
      {/* Generating indicator */}
      <motion.div
        style={{
          position: 'absolute',
          top: BASE_TOKENS.spacing.md,
          right: BASE_TOKENS.spacing.md,
          display: 'flex',
          alignItems: 'center',
          gap: BASE_TOKENS.spacing.xs,
          backgroundColor: BASE_TOKENS.colors.blue[50],
          padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
          borderRadius: BASE_TOKENS.borderRadius.md,
          border: `1px solid ${BASE_TOKENS.colors.blue[200]}`
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{
          width: '8px',
          height: '8px',
          backgroundColor: BASE_TOKENS.colors.blue[500],
          borderRadius: '50%'
        }} />
        <span style={{
          fontSize: BASE_TOKENS.typography.fontSize.xs,
          color: BASE_TOKENS.colors.blue[700],
          fontWeight: BASE_TOKENS.typography.fontWeight.medium
        }}>
          Generating...
        </span>
      </motion.div>
    </div>
  );

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
      ref={containerRef}
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
            {includeComponentSwapAnimations ? (
              <AnimatePresence mode="wait">
                {isLoadingCommunicationLog ? (
                  <motion.div
                    key="communication-skeleton"
                    ref={communicationLogRef}
                    variants={componentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <CommunicationLogSkeleton />
                  </motion.div>
                ) : showActualCommunicationLog ? (
                  <motion.div
                    key="communication-log"
                    variants={componentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <CommunicationLog 
                      callLogs={callLogs} 
                      messages={messages} 
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="people-section-left"
                    layoutId="people-section"
                    ref={communicationLogRef}
                    variants={componentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        mass: 1
                      }
                    }}
                    style={{
                      position: 'relative',
                      zIndex: 10
                    }}
                  >
                    <PeopleSection 
                      driver={driver}
                      rider={rider}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <div ref={communicationLogRef}>
                {showActualCommunicationLog ? (
                  <CommunicationLog 
                    callLogs={callLogs} 
                    messages={messages} 
                  />
                ) : (
                  <PeopleSection 
                    driver={driver}
                    rider={rider}
                  />
                )}
              </div>
            )}
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
            {includeComponentSwapAnimations ? (
              <AnimatePresence mode="wait">
                {showCommunicationLog ? (
                  <motion.div
                    key="people-section-right"
                    layoutId="people-section"
                    variants={componentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        mass: 1
                      }
                    }}
                    style={{
                      position: 'relative',
                      zIndex: 10
                    }}
                  >
                    <PeopleSection 
                      driver={driver}
                      rider={rider}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            ) : (
              showCommunicationLog ? (
                <PeopleSection 
                  driver={driver}
                  rider={rider}
                />
              ) : null
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RideTrackingDashboard;
