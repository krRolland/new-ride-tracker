import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandableChatBox from '../ChatBox/ExpandableChatBox';
import RideTrackingDashboard from '../RideTrackingDashboard/RideTrackingDashboard';
import { BASE_TOKENS } from '../../tokens';
import { mockRideData } from '../../data/mockData';

const ChatDemo = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [hasEverExpanded, setHasEverExpanded] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleExpansionChange = (expanded) => {
    setIsChatExpanded(expanded);
    if (expanded && !hasEverExpanded) {
      setHasEverExpanded(true);
      setIsLoadingDashboard(true);
      
      // Show loading for 4 seconds, then show dashboard
      setTimeout(() => {
        setIsLoadingDashboard(false);
        setShowDashboard(true);
      }, 4000);
    }
  };

  const handleMinimizedChange = (minimized) => {
    setIsChatMinimized(minimized);
  };

  // Calculate flex basis based on chat state
  const getLeftColumnFlex = () => {
    if (isChatMinimized) return '0 0 124px';  // 60px chat + 64px padding (32px each side)
    if (hasEverExpanded) return '0 0 550px';  // Once expanded, always use expanded width
    return '1';  // Full width for initial centered state
  };
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: BASE_TOKENS.colors.gray[50],
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      margin: 0,
      padding: 0
    }}>
      {/* 2-Column Flex Grid */}
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        padding: `${BASE_TOKENS.spacing.xl} 0`,
        boxSizing: 'border-box',
        transition: 'all 0.4s ease-in-out'
      }}>
        {/* Left Column - Chat */}
        <div style={{
          flex: getLeftColumnFlex(),
          padding: BASE_TOKENS.spacing.xl,
          paddingLeft: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: hasEverExpanded ? 'flex-start' : 'center',
          transition: 'flex 0.4s ease-in-out',
          backgroundColor: BASE_TOKENS.colors.gray[50]
        }}>
          <AnimatePresence>
            {!hasEverExpanded && (
              <motion.div 
                style={{
                  textAlign: 'center',
                  marginBottom: BASE_TOKENS.spacing.xl
                }}
                initial={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <motion.h1 
                  style={{
                    fontSize: BASE_TOKENS.typography.fontSize['2xl'],
                    fontWeight: BASE_TOKENS.typography.fontWeight.bold,
                    color: BASE_TOKENS.colors.gray[900],
                    margin: 0,
                    marginBottom: BASE_TOKENS.spacing.sm
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -20,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  Welcome to Operative!
                </motion.h1>
                <motion.p 
                  style={{
                    fontSize: BASE_TOKENS.typography.fontSize.md,
                    color: BASE_TOKENS.colors.gray[600],
                    margin: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -10,
                    transition: { duration: 0.3, delay: 0.1, ease: "easeOut" }
                  }}
                >
                  What should we get started building?
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{ 
              x: 0,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
          >
            <ExpandableChatBox 
              width="450px"
              height="550px"
              position="relative"
              onExpansionChange={handleExpansionChange}
              onMinimizedChange={handleMinimizedChange}
            />
          </motion.div>
        </div>

        {/* Right Column - Ride Tracking Dashboard */}
        <div style={{
          flex: hasEverExpanded ? 1 : 0,
          width: hasEverExpanded ? 'auto' : '0px',
          overflow: 'hidden',
          padding: hasEverExpanded ? BASE_TOKENS.spacing.md : 0,
          paddingRight: hasEverExpanded ? BASE_TOKENS.spacing.xl : 0,
          transition: 'all 0.4s ease-in-out'
        }}>
          <div style={{
            border: `2px solid ${BASE_TOKENS.colors.gray[300]}`,
            borderRadius: BASE_TOKENS.borderRadius.lg,
            overflow: 'hidden',
            boxShadow: BASE_TOKENS.shadows.lg,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isLoadingDashboard ? BASE_TOKENS.colors.gray[900] : BASE_TOKENS.colors.white
          }}>
            <AnimatePresence mode="wait">
              {isLoadingDashboard ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: BASE_TOKENS.spacing.lg
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: `3px solid ${BASE_TOKENS.colors.gray[200]}`,
                      borderTop: `3px solid ${BASE_TOKENS.colors.gray[900]}`,
                      borderRadius: '50%'
                    }}
                  />
                  <p style={{
                    fontSize: BASE_TOKENS.typography.fontSize.md,
                    color: BASE_TOKENS.colors.white,
                    margin: 0,
                    fontWeight: BASE_TOKENS.typography.fontWeight.medium
                  }}>
                    Loading Live Ride Tracking...
                  </p>
                </motion.div>
              ) : showDashboard ? (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    overflow: 'scroll'
                  }}
                >
                  <RideTrackingDashboard 
                    tripInfo={mockRideData.tripInfo}
                    timelineData={mockRideData.timelineData}
                    callLogs={mockRideData.callLogs}
                    messages={mockRideData.messages}
                    driver={mockRideData.driver}
                    rider={mockRideData.rider}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
