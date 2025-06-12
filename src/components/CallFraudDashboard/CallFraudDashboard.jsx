import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_TOKENS } from '../../tokens';
import RecentRefunds from '../RecentRefunds';
import CallAnalytics from '../CallAnalytics';
import CallLog from '../CallLog';

// Main App component
const CallFraudDashboard = () => {
  const [selectedCall, setSelectedCall] = useState(null);

  // Dummy data for the dashboard
  const callsData = [
    {
      id: 'call-1',
      type: 'Support for Lost Phone',
      fraudRisk: false,
      duration: '15min',
      dateTime: '2024-06-08 - 14:30',
      agent: 'Agent Smith',
      details: {
        reason: 'Lost Item',
        sentiment: 8.5,
        resolution: 'Resolved',
        notes: "Customer was very worried about their lost phone. Provided immediate tracking steps and reassured them. Driver confirmed finding the phone.",
        events: [
          { time: '14:30', description: 'Call Started', subtitle: 'Customer called regarding lost phone after recent trip.' },
          { time: '14:32', description: 'Issue Identified', subtitle: 'Customer left phone in vehicle during ride completion.' },
          { time: '14:35', description: 'Solution Provided', subtitle: 'Agent contacted driver and confirmed phone location in vehicle.' },
          { time: '14:40', description: 'Call Ended', subtitle: 'Driver arranged to return phone at customer\'s convenience.' },
        ],
      },
    },
    {
      id: 'call-2',
      type: 'Account Lock Inquiry',
      fraudRisk: true,
      duration: '18min',
      dateTime: '2024-05-28 - 03:15',
      agent: 'Agent Davis',
      details: {
        reason: 'Potential Fraud',
        sentiment: 5.2,
        resolution: 'Escalated to Security',
        notes: "Account showed unusual login activity from a new device in a different country. Escalated to the fraud team for further investigation. Customer was frustrated but understood the security measures.",
        events: [
          { time: '03:15', description: 'Call Started', subtitle: 'Customer called about locked account and payment issues.' },
          { time: '03:17', description: 'Issue Identified', subtitle: 'System flagged unusual login activity from foreign IP address.' },
          { time: '03:25', description: 'Security Escalation', subtitle: 'Agent escalated case to fraud team for investigation.' },
          { time: '03:33', description: 'Call Ended', subtitle: 'Customer advised of security measures and next steps.' },
        ],
      },
    },
    {
      id: 'call-3',
      type: 'Payment Issue Resolution',
      fraudRisk: false,
      duration: '10min',
      dateTime: '2024-05-15 - 09:05',
      agent: 'Agent Johnson',
      details: {
        reason: 'Billing Error',
        sentiment: 9.1,
        resolution: 'Refund Processed',
        events: [
          { time: '09:05', description: 'Call Started', subtitle: 'Customer called regarding incorrect billing charge.' },
          { time: '09:07', description: 'Issue Identified', subtitle: 'Customer\'s credit card was charged twice for same trip.' },
          { time: '09:12', description: 'Solution Provided', subtitle: 'Agent processed immediate refund for duplicate charge.' },
          { time: '09:15', description: 'Call Ended', subtitle: 'Customer confirmed refund receipt and trip satisfaction.' },
        ],
      },
    },
    {
      id: 'call-4',
      type: 'Route Discrepancy Inquiry',
      fraudRisk: false,
      duration: '20min',
      dateTime: '2024-04-20 - 18:25',
      agent: 'Agent Lee',
      details: {
        reason: 'Route Error',
        sentiment: 7.8,
        resolution: 'Credit Issued',
        notes: "Customer felt the driver took a longer route than necessary. Reviewed GPS data and issued a partial credit for the inconvenience. Advised customer to report such issues during the trip for faster resolution.",
        events: [
          { time: '18:25', description: 'Call Started', subtitle: 'Customer called about route discrepancy and fare concerns.' },
          { time: '18:27', description: 'Issue Identified', subtitle: 'Driver took longer route than necessary, increasing fare.' },
          { time: '18:35', description: 'Solution Provided', subtitle: 'Agent reviewed GPS data and issued partial credit.' },
          { time: '18:45', description: 'Call Ended', subtitle: 'Customer satisfied with resolution and credit applied.' },
        ],
      },
    },
     {
      id: 'call-5',
      type: 'Pricing Dispute',
      fraudRisk: false,
      duration: '12min',
      dateTime: '2024-06-01 - 10:00',
      agent: 'Agent Smith',
      details: {
        reason: 'Billing Error',
        sentiment: 6.5,
        resolution: 'Partial Refund',
        events: [
          { time: '10:00', description: 'Call Started', subtitle: 'Customer called questioning surge pricing on recent trip.' },
          { time: '10:02', description: 'Issue Identified', subtitle: 'Customer confused about dynamic pricing during peak hours.' },
          { time: '10:08', description: 'Solution Provided', subtitle: 'Agent explained pricing model and offered partial refund.' },
          { time: '10:12', description: 'Call Ended', subtitle: 'Customer understood pricing and accepted resolution.' },
        ],
      },
    },
    {
      id: 'call-6',
      type: 'Driver Behavior Complaint',
      fraudRisk: false,
      duration: '25min',
      dateTime: '2024-05-25 - 16:45',
      agent: 'Agent Johnson',
      details: {
        reason: 'Billing Error',
        sentiment: 3.0,
        resolution: 'Driver Warning Issued',
        events: [
          { time: '16:45', description: 'Call Started', subtitle: 'Customer called to report unprofessional driver behavior.' },
          { time: '16:48', description: 'Issue Identified', subtitle: 'Driver was rude and made inappropriate comments during trip.' },
          { time: '17:00', description: 'Investigation Initiated', subtitle: 'Agent reviewed trip details and driver history for patterns.' },
          { time: '17:10', description: 'Call Ended', subtitle: 'Driver warning issued and customer received service credit.' },
        ],
      },
    },
  ];

  // Calculate header data for the Calls component (now passed to CustomerSegment)
  const totalCalls = callsData.length;
  const totalSentiment = callsData.reduce((sum, call) => sum + call.details.sentiment, 0);
  const avgSentimentScore = (totalSentiment / totalCalls).toFixed(1);
  const totalCallEvents = callsData.reduce((sum, call) => sum + call.details.events.length, 0);
  const uniqueCallReasons = new Set(callsData.map(call => call.details.reason)).size;

  // Calculate call reasons distribution for the pie chart
  const callReasonsMap = callsData.reduce((acc, call) => {
    acc[call.details.reason] = (acc[call.details.reason] || 0) + 1;
    return acc;
  }, {});
  const callReasonsDistributionData = Object.keys(callReasonsMap).map(reason => ({
    name: reason,
    value: callReasonsMap[reason],
  }));

  // Set the first call as selected by default for initial display
  useEffect(() => {
    if (callsData.length > 0 && !selectedCall) { // Only set if no call is already selected
      setSelectedCall(callsData[0]);
    }
  }, [callsData, selectedCall]); // Depend on callsData and selectedCall

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
    customerId: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      color: '#cccccc',
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      margin: 0,
      marginBottom: '2px'
    },
    memberInfo: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: '#999999',
      fontWeight: BASE_TOKENS.typography.fontWeight.normal,
      margin: 0
    }
  };

  return (
    <motion.div 
      style={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sticky Header with User Profile */}
      <motion.div 
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: BASE_TOKENS.colors.white,
          color: BASE_TOKENS.colors.gray[800],
          padding: `${BASE_TOKENS.spacing.lg} ${BASE_TOKENS.spacing['2xl']}`,
          marginBottom: BASE_TOKENS.spacing['2xl'],
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${BASE_TOKENS.colors.gray[200]}`
        }}
        variants={headerVariants}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: BASE_TOKENS.spacing.lg
          }}>
            {/* Left side - Dashboard title and customer ID */}
            <div>
              <motion.h1 
                style={{
                  fontSize: BASE_TOKENS.typography.fontSize['2xl'],
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[800],
                  lineHeight: BASE_TOKENS.typography.lineHeight.xl,
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.xs
                }}
                variants={componentVariants}
              >
                Call Fraud Dashboard
              </motion.h1>
              <motion.p 
                style={{
                  fontSize: BASE_TOKENS.typography.fontSize.sm,
                  color: BASE_TOKENS.colors.gray[600],
                  fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                  margin: 0
                }}
                variants={componentVariants}
              >
                Customer ID: CUST_789456
              </motion.p>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={styles.content}>

        {/* Main Dashboard Grid - Two Components */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 2fr',
            gap: BASE_TOKENS.spacing['2xl'],
            marginTop: BASE_TOKENS.spacing['2xl']
          }}
          variants={containerVariants}
        >
          <motion.div variants={componentVariants}>
            <RecentRefunds userProfile={<UserProfile />} />
          </motion.div>
          <motion.div variants={componentVariants}>
            <CallAnalytics
              totalCalls={totalCalls}
              avgSentimentScore={avgSentimentScore}
              totalCallEvents={totalCallEvents}
              uniqueCallReasons={uniqueCallReasons}
              callReasonsDistribution={callReasonsDistributionData}
            />
          </motion.div>
        </motion.div>

        {/* CallLog Component */}
        <motion.div 
          style={{
            marginTop: BASE_TOKENS.spacing['2xl']
          }}
          variants={componentVariants}
        >
          <CallLog callsData={callsData} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// UserProfile Component
const UserProfile = () => {
  const [showDeviceTooltip, setShowDeviceTooltip] = useState(false);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: BASE_TOKENS.spacing.lg,
      position: 'relative'
    }}>
      {/* Avatar */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: BASE_TOKENS.borderRadius.full,
        backgroundColor: BASE_TOKENS.colors.gray[200],
        border: `2px solid ${BASE_TOKENS.colors.white}`,
        boxShadow: BASE_TOKENS.shadows.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <img 
          src="/headshot-8.png" 
          alt="Customer avatar"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: BASE_TOKENS.borderRadius.full,
            objectFit: 'cover'
          }}
        />
      </div>
      
      {/* Customer Info */}
      <div style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: BASE_TOKENS.spacing.xs }}>
          <h2 style={{
            fontSize: BASE_TOKENS.typography.fontSize.base,
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            color: BASE_TOKENS.colors.gray[900],
            lineHeight: BASE_TOKENS.typography.lineHeight.base,
            margin: 0
          }}>
            Sarah Johnson
          </h2>
          <span style={{
            marginLeft: BASE_TOKENS.spacing.lg,
            padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
            backgroundColor: BASE_TOKENS.colors.yellow[400],
            color: BASE_TOKENS.colors.yellow[900],
            fontSize: BASE_TOKENS.typography.fontSize.xs,
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            borderRadius: BASE_TOKENS.borderRadius.full
          }}>
            Gold Member
          </span>
        </div>
        <div style={{
          fontSize: BASE_TOKENS.typography.fontSize.xs,
          color: BASE_TOKENS.colors.gray[500],
          fontWeight: BASE_TOKENS.typography.fontWeight.medium,
          marginBottom: BASE_TOKENS.spacing.xs,
          lineHeight: BASE_TOKENS.typography.lineHeight.xs
        }}>
          sarah.j@email.com
        </div>
        <div style={{
          fontSize: BASE_TOKENS.typography.fontSize.xs,
          color: BASE_TOKENS.colors.gray[500],
          lineHeight: BASE_TOKENS.typography.lineHeight.xs,
          marginBottom: '2px'
        }}>
          Member since March 2023 • 247 rides
        </div>
        <div style={{
          fontSize: BASE_TOKENS.typography.fontSize.xs,
          color: BASE_TOKENS.colors.gray[400],
          fontWeight: BASE_TOKENS.typography.fontWeight.medium,
          lineHeight: BASE_TOKENS.typography.lineHeight.xs,
          display: 'flex',
          alignItems: 'center',
          gap: BASE_TOKENS.spacing.xs
        }}>
          <span>$3,847 lifetime value</span>
          <span>•</span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: BASE_TOKENS.spacing.xs
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: BASE_TOKENS.colors.yellow[500] }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>4.8</span>
          </div>
        </div>
      </div>

      {/* Device Mockup */}
      <div 
        style={{
          position: 'relative',
          flexShrink: 0,
          cursor: 'pointer'
        }}
        onMouseEnter={() => setShowDeviceTooltip(true)}
        onMouseLeave={() => setShowDeviceTooltip(false)}
      >
        {/* Device Icon/Mockup */}
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: BASE_TOKENS.colors.gray[100],
          borderRadius: BASE_TOKENS.borderRadius.lg,
          border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}>
          {/* Phone Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BASE_TOKENS.colors.gray[600]} strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
          </svg>
        </div>

        {/* Animated Tooltip */}
        <AnimatePresence>
          {showDeviceTooltip && (
            <motion.div 
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                y: 10
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                y: 10
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut"
              }}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '60px',
                backgroundColor: BASE_TOKENS.colors.gray[900],
                color: BASE_TOKENS.colors.white,
                padding: BASE_TOKENS.spacing.lg,
                borderRadius: BASE_TOKENS.borderRadius.lg,
                boxShadow: BASE_TOKENS.shadows.xl,
                zIndex: 1000,
                width: '160px',
                fontSize: BASE_TOKENS.typography.fontSize.xs,
                lineHeight: BASE_TOKENS.typography.lineHeight.xs,
                display: 'flex',
                flexDirection: 'column',
                gap: BASE_TOKENS.spacing.sm
              }}
            >
              {/* Tooltip Arrow */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '-6px',
                width: 0,
                height: 0,
                borderLeft: `6px solid ${BASE_TOKENS.colors.gray[900]}`,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent'
              }}></div>

              {/* Title */}
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                style={{
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.white,
                  textAlign: 'center',
                  fontSize: BASE_TOKENS.typography.fontSize.sm
                }}
              >
                Device Details
              </motion.div>

              {/* Device Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img 
                  src="/iphone-13-mockup.png" 
                  alt="iPhone 13 mockup"
                  style={{
                    width: '110px',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </motion.div>

              {/* Device Information - Vertical Layout */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: BASE_TOKENS.spacing.md
                }}
              >
                <div>
                  <div style={{
                    fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                    color: BASE_TOKENS.colors.white,
                    marginBottom: '2px',
                    fontSize: BASE_TOKENS.typography.fontSize.xs
                  }}>
                    Current:
                  </div>
                  <div style={{
                    color: BASE_TOKENS.colors.gray[300],
                    fontSize: BASE_TOKENS.typography.fontSize.xs
                  }}>
                    iPhone 13 (iOS 16.3)<br/>
                    MacBook Pro (Web)
                  </div>
                </div>

                <div>
                  <div style={{
                    fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                    color: BASE_TOKENS.colors.white,
                    marginBottom: '2px',
                    fontSize: BASE_TOKENS.typography.fontSize.xs
                  }}>
                    Signup:
                  </div>
                  <div style={{
                    color: BASE_TOKENS.colors.gray[300],
                    fontSize: BASE_TOKENS.typography.fontSize.xs
                  }}>
                    iPhone 11 (iOS 15.6)
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// DeviceUsage Component
const DeviceUsage = () => (
  <div style={{
    backgroundColor: BASE_TOKENS.colors.white,
    borderRadius: BASE_TOKENS.borderRadius.lg,
    border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
    padding: BASE_TOKENS.spacing['2xl'],
    boxShadow: BASE_TOKENS.shadows.md
  }}>
    <h3 style={{
      fontSize: BASE_TOKENS.typography.fontSize.lg,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[800],
      marginBottom: BASE_TOKENS.spacing.sm,
      margin: 0
    }}>
      Device Usage Details
    </h3>
    <p style={{
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      color: BASE_TOKENS.colors.gray[600],
      marginBottom: BASE_TOKENS.spacing.lg,
      margin: 0
    }}>
      Specific device information for Sarah Johnson.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: BASE_TOKENS.spacing.md }}>
      <div>
        <p style={{
          fontWeight: BASE_TOKENS.typography.fontWeight.medium,
          color: BASE_TOKENS.colors.gray[800],
          margin: 0,
          marginBottom: BASE_TOKENS.spacing.xs
        }}>
          Device used for Signup:
        </p>
        <p style={{
          color: BASE_TOKENS.colors.gray[600],
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          marginLeft: BASE_TOKENS.spacing.sm,
          margin: 0
        }}>
          iPhone 11 (iOS 15.6)
        </p>
      </div>
      <div>
        <p style={{
          fontWeight: BASE_TOKENS.typography.fontWeight.medium,
          color: BASE_TOKENS.colors.gray[800],
          margin: 0,
          marginBottom: BASE_TOKENS.spacing.xs
        }}>
          Current Devices Used:
        </p>
        <ul style={{
          color: BASE_TOKENS.colors.gray[600],
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          marginLeft: BASE_TOKENS.spacing.sm,
          margin: 0,
          paddingLeft: BASE_TOKENS.spacing.lg,
          listStyle: 'disc'
        }}>
          <li>iPhone 13 (iOS 16.3)</li>
          <li>MacBook Pro (Web)</li>
        </ul>
      </div>
    </div>
  </div>
);





export default CallFraudDashboard;
