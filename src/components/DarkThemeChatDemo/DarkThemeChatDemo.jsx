import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandableChatBox from '../ChatBox/ExpandableChatBox';
import RideTrackingDashboard from '../RideTrackingDashboard/RideTrackingDashboard';
import { mockRideData } from '../../data/mockData';

// --- Dark Theme Tokens ---
const DARK_THEME_TOKENS = {
  colors: {
    background: '#0a0a0a',
    textPrimary: 'rgba(255, 255, 255, 0.9)',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(255, 255, 255, 0.2)',
    borderHover: 'rgba(255, 255, 255, 0.8)',
    gradientStart: '#ff6b6b',
    gradientEnd: '#4ecdc4',
    skeletonBase: '#1a1a1a',
    skeletonShimmer: '#2a2a2a',
    panelBackground: '#111111',
  },
  borderRadius: {
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

// --- Themed Components ---
const GridBackground = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      opacity: 0.05,
      backgroundImage: `
      linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
      backgroundSize: '50px 50px',
      animation: 'gridMove 20s linear infinite',
    }}
  >
    <style>{`
      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
      }
    `}</style>
  </div>
);

const InteractiveLogo = ({ size = 80 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    logo: {
      width: size,
      height: size,
      border: `1px solid ${
        isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'
      }`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      boxShadow: isHovered ? '0 0 50px rgba(255,255,255,0.1)' : 'none',
      cursor: 'pointer',
    },
    expandingCircle: {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: isHovered ? '50px' : '2px',
      height: isHovered ? '50px' : '2px',
      background: isHovered ? 'transparent' : 'white',
      border: isHovered ? '1px solid rgba(255,255,255,0.15)' : 'none',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.4s ease',
      pointerEvents: 'none',
      zIndex: 1,
    },
    logoInner: {
      width: size * 0.7,
      height: size * 0.7,
      position: 'relative',
      transition: 'all 0.4s ease',
      transform: isHovered ? 'rotate(20deg) scale(1.1)' : 'rotate(0deg) scale(1)',
      zIndex: 2,
    },
    logoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      transition: 'all 0.4s ease',
      opacity: isHovered ? 0.9 : 1,
    },
  };

  return (
    <div
      style={styles.logo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.expandingCircle}></div>
      <div style={styles.logoInner}>
        <img src="/op-logo-white.png" alt="Operative Logo" style={styles.logoImage} />
      </div>
    </div>
  );
};

const DashboardSkeleton = ({ tokens }) => {
  const skeletonBox = (height, width = '100%') => (
    <div
      style={{
        backgroundColor: tokens.colors.skeletonBase,
        borderRadius: tokens.borderRadius.md,
        height,
        width,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent 0%, ${tokens.colors.skeletonShimmer} 50%, transparent 100%)`,
          opacity: 0.8,
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
        padding: tokens.spacing.lg,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.lg,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {skeletonBox('28px', '45%')}
        {skeletonBox('18px', '35%')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '40% 1fr', gap: tokens.spacing.lg, flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
          {skeletonBox('280px')}
          {skeletonBox('220px')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
          {skeletonBox('320px')}
          {skeletonBox('180px')}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const DarkThemeChatDemo = () => {
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

      const thinkingPhases = [
        { message: 'Parsing your request...', duration: 1500 },
        { message: 'Structuring the UI layout...', duration: 2000 },
        { message: 'Populating with live data...', duration: 1500 },
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

  const thinkingPhases = [
    'Parsing your request...',
    'Structuring the UI layout...',
    'Populating with live data...',
  ];

  const gradientTextStyle = {
    background: `linear-gradient(45deg, ${DARK_THEME_TOKENS.colors.gradientStart}, ${DARK_THEME_TOKENS.colors.gradientEnd})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  // Smoother transition easing
  const smoothTransition = 'all 0.6s cubic-bezier(0.65, 0, 0.35, 1)';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: DARK_THEME_TOKENS.colors.background,
        color: DARK_THEME_TOKENS.colors.textPrimary,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        margin: 0,
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridBackground />

      <AnimatePresence>
        {!hasEverExpanded && (
          <motion.div
            style={{
              position: 'fixed', top: '30%', left: '50%',
              transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 10,
              pointerEvents: 'none', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: DARK_THEME_TOKENS.spacing.lg,
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }, }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeOut' } }}
              style={{ marginBottom: '-20px', pointerEvents: 'auto' }}
            >
              <InteractiveLogo />
            </motion.div>
            <div style={{ textAlign: 'center' }}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.4 }, }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeOut' } }}
                style={{
                  fontSize: '3rem', fontWeight: 300, letterSpacing: '-2px',
                  color: DARK_THEME_TOKENS.colors.textPrimary,
                  margin: `0 0 ${DARK_THEME_TOKENS.spacing.md} 0`,
                }}
              >
                Welcome to <span style={{ ...gradientTextStyle, fontWeight: 700 }}>Operative</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.5 }, }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3, delay: 0.1, ease: 'easeOut' }, }}
                style={{
                  fontSize: '1.1rem', color: DARK_THEME_TOKENS.colors.textSecondary, margin: 0,
                }}
              >
                What should we get started building?
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          display: 'flex', height: '100vh', width: '100vw',
          padding: hasEverExpanded ? DARK_THEME_TOKENS.spacing.xl : 0,
          gap: hasEverExpanded ? DARK_THEME_TOKENS.spacing.xl : 0,
          boxSizing: 'border-box',
          alignItems: 'center', justifyContent: 'center',
          transition: `padding ${smoothTransition}, gap ${smoothTransition}`,
          position: 'relative', zIndex: 1,
        }}
      >
        {/* Left Column - Chat */}
        <div
          style={{
            // KEY CHANGE: Animate flex-basis, width, and height for smooth growth
            flex: hasEverExpanded ? (isChatMinimized ? '0 0 124px' : '0 0 550px') : 'none',
            width: hasEverExpanded ? (isChatMinimized ? '124px' : '550px') : '450px',
            height: hasEverExpanded ? '100%' : 'auto', // KEY: Start small, grow to full height
            display: 'flex',
            transition: smoothTransition,
          }}
        >
          <ExpandableChatBox
            width="100%"
            height="100%" // Fills its parent container
            size={hasEverExpanded ? 'lg' : 'default'} // KEY: Switch to large mode on expansion
            position="relative"
            showCollapseButton={false}
            darkMode={true}
            onExpansionChange={handleExpansionChange}
            onMinimizedChange={handleMinimizedChange}
            style={{
              background: 'rgba(20, 20, 20, 0.3)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid ${DARK_THEME_TOKENS.colors.border}`,
              borderRadius: DARK_THEME_TOKENS.borderRadius.xl,
              transition: smoothTransition,
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          />
        </div>

        {/* Right Column - Dashboard */}
        <div
          style={{
            flex: hasEverExpanded ? 1 : 0,
            width: hasEverExpanded ? 'auto' : '0px',
            height: hasEverExpanded ? '100%' : '0px', // Match height transition
            overflow: 'hidden',
            transition: smoothTransition,
            minWidth: 0,
          }}
        >
          <div
            style={{
              border: `2px solid ${DARK_THEME_TOKENS.colors.border}`,
              borderRadius: DARK_THEME_TOKENS.borderRadius.xl,
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              height: '100%', // Fills its parent container
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: DARK_THEME_TOKENS.colors.panelBackground,
              position: 'relative',
            }}
          >
            <AnimatePresence mode="wait">
              {isLoadingDashboard ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                >
                  <DashboardSkeleton tokens={DARK_THEME_TOKENS} />
                  <motion.div
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', gap: DARK_THEME_TOKENS.spacing.lg,
                      backgroundColor: 'rgba(10, 10, 10, 0.7)',
                      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  >
                    <InteractiveLogo size={60} />
                    <motion.p
                      key={thinkingMessage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      style={{
                        fontSize: '1.1rem',
                        color: DARK_THEME_TOKENS.colors.textPrimary,
                        fontWeight: 500,
                      }}
                    >
                      {thinkingMessage}
                    </motion.p>
                    <div
                      style={{
                        width: '240px', height: '4px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '2px', overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${((thinkingPhase + 1) / thinkingPhases.length) * 100}%`, }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: `linear-gradient(90deg, ${DARK_THEME_TOKENS.colors.gradientStart}, ${DARK_THEME_TOKENS.colors.gradientEnd})`,
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ) : showDashboard ? (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' }, }}
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

export default DarkThemeChatDemo;