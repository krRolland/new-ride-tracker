import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandableChatBox from '../ChatBox/ExpandableChatBox';
import RideTrackingDashboard from '../RideTrackingDashboard/RideTrackingDashboard';
import { BASE_TOKENS } from '../../tokens';
import { mockRideData } from '../../data/mockData';

/**
 * A skeleton loader that mimics the structure of the dashboard.
 * It provides a better user experience by showing a preview of the upcoming content.
 */
const DashboardSkeleton = ({ tokens }) => {
  const skeletonBox = (height, width = '100%') => (
    <div style={{
      backgroundColor: tokens.colors.gray[200],
      borderRadius: tokens.borderRadius.md,
      height,
      width,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Shimmer effect */}
      <motion.div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent 0%, ${tokens.colors.gray[100]} 50%, transparent 100%)`,
          opacity: 0.6,
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        width: '100%', 
        height: '100%', 
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {skeletonBox('28px', '45%')}
        {skeletonBox('18px', '35%')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '40% 1fr', gap: '24px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {skeletonBox('280px')}
          {skeletonBox('220px')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {skeletonBox('320px')}
          {skeletonBox('180px')}
        </div>
      </div>
    </motion.div>
  );
};

const ChatDemo = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [hasEverExpanded, setHasEverExpanded] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState(0);
  const [thinkingMessage, setThinkingMessage] = useState('');

  const handleExpansionChange = (expanded) => {
    setIsChatExpanded(expanded);
    if (expanded && !hasEverExpanded) {
      setHasEverExpanded(true);
      setIsLoadingDashboard(true);
      
      // Enhanced thinking phases for a better narrative
      const thinkingPhases = [
        { message: "Parsing your request...", duration: 1500 },
        { message: "Structuring the UI layout...", duration: 2000 },
        { message: "Populating with live data...", duration: 1500 }
      ];
      
      let currentPhase = 0;
      setThinkingPhase(0);
      setThinkingMessage(thinkingPhases[0].message);
      
      const progressThroughPhases = () => {
        if (currentPhase < thinkingPhases.length - 1) {
          setTimeout(() => {
            currentPhase++;
            setThinkingPhase(currentPhase);
            setThinkingMessage(thinkingPhases[currentPhase].message);
            progressThroughPhases();
          }, thinkingPhases[currentPhase].duration);
        } else {
          // Final phase - show dashboard
          setTimeout(() => {
            setIsLoadingDashboard(false);
            setShowDashboard(true);
          }, thinkingPhases[currentPhase].duration);
        }
      };
      
      progressThroughPhases();
    }
  };

  const handleMinimizedChange = (minimized) => {
    setIsChatMinimized(minimized);
  };

  const getLeftColumnFlex = () => {
    if (isChatMinimized) return '0 0 124px';
    if (hasEverExpanded) return '0 0 510px';
    return '1';
  };

  // Define thinking phases here to get length for progress bar
  const thinkingPhases = [
    "Parsing your request...",
    "Structuring the UI layout...",
    "Populating with live data..."
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: BASE_TOKENS.colors.gray[50],
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      margin: 0,
      padding: 0,
      position: 'relative'
    }}>
      {/* Fixed Logo and Welcome Text - Outside Grid */}
      <AnimatePresence>
        {!hasEverExpanded && (
          <motion.div 
            style={{
              position: 'fixed',
              top: 'calc(50% - 190px)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 10,
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: BASE_TOKENS.spacing.lg
            }}
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            {/* OP Logo */}
            <motion.div
              style={{
                position: 'relative',
                left: 'calc(50% - 140px)',
                top: '10px',
                width: '200px',
                height: '200px',
                backgroundImage: 'url(/op-logo.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: 0.1,
                marginBottom: '-50px' // Pull logo closer to text
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              exit={{ 
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            {/* Welcome Text */}
            <div style={{ textAlign: 'center' }}>
              <motion.h1 
                style={{
                  fontSize: BASE_TOKENS.typography.fontSize['2xl'],
                  fontWeight: BASE_TOKENS.typography.fontWeight.bold,
                  color: BASE_TOKENS.colors.gray[900],
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.md
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Layout */}
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
          padding: hasEverExpanded ? BASE_TOKENS.spacing.xl : BASE_TOKENS.spacing.xl,
          paddingLeft: hasEverExpanded ? 0 : 0,
          paddingRight: hasEverExpanded ? 0 : BASE_TOKENS.spacing.xl,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.4s ease-in-out',
          backgroundColor: BASE_TOKENS.colors.gray[50]
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            gap: BASE_TOKENS.spacing.xl
          }}>

            {/* Chat Box */}
            <ExpandableChatBox 
              width="450px"
              height={hasEverExpanded ? `calc(100vh - ${BASE_TOKENS.spacing.xl} * 2)` : "550px"}
              position="relative"
              showCollapseButton={false}
              onExpansionChange={handleExpansionChange}
              onMinimizedChange={handleMinimizedChange}
            />
          </div>
        </div>

        {/* Right Column - Ride Tracking Dashboard */}
        <div style={{
          flex: hasEverExpanded ? 1 : 0,
          width: hasEverExpanded ? 'auto' : '0px',
          overflow: 'hidden',
          padding: hasEverExpanded ? BASE_TOKENS.spacing.xl : 0,
          paddingLeft: hasEverExpanded ? 0 : 0,
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
            backgroundColor: BASE_TOKENS.colors.white, // Always white for smoother transition
            position: 'relative'
          }}>
            <AnimatePresence mode="wait">
              {isLoadingDashboard ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                >
                  <DashboardSkeleton tokens={BASE_TOKENS} />
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: BASE_TOKENS.spacing.lg,
                      backgroundColor: 'rgba(249, 250, 251, 0.7)', // gray[50] with transparency
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundImage: 'url(/op-logo.png)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}
                    />
                    <motion.p 
                      key={thinkingMessage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        fontSize: BASE_TOKENS.typography.fontSize.lg,
                        color: BASE_TOKENS.colors.gray[800],
                        fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                      }}
                    >
                      {thinkingMessage}
                    </motion.p>
                    <div style={{
                      width: '240px',
                      height: '6px',
                      backgroundColor: BASE_TOKENS.colors.gray[300],
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${((thinkingPhase + 1) / thinkingPhases.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                          height: '100%',
                          backgroundColor: BASE_TOKENS.colors.gray[800],
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ) : showDashboard ? (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }}
                  style={{ width: '100%', height: '100%', overflowY: 'auto' }}
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
