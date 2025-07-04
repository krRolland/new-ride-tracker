import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_TOKENS } from '../../tokens';
import RecentRefunds from '../RecentRefunds';
import CallLog from '../CallLog';
import CustomerInfoCard from '../CustomerInfoCard';
import FraudSignals from '../FraudSignals';
import DevicesSecurity from '../DevicesSecurity';
import UberCard from '../UberCard';
import ActivityTimeline from '../ActivityTimeline';

// Main App component
const CallFraudDashboard = () => {
  const [selectedCall, setSelectedCall] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data for the dashboard
  const callsData = [
    {
      id: 'call-1',
      type: 'Support for Lost Phone',
      fraudRisk: false,
      duration: '15min',
      dateTime: '2024-06-08 - 14:30',
      agent: 'Agent Alex',
      customer: {
        name: 'Sarah Johnson',
        avatar: '/headshot-8.png'
      },
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
      customer: {
        name: 'Michael Chen',
        avatar: '/headshot-3.png'
      },
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
      agent: 'Agent Davis',
      customer: {
        name: 'Emma Rodriguez',
        avatar: '/headshot-4.png'
      },
      details: {
        reason: 'Billing Error',
        sentiment: 9.1,
        resolution: 'Refund Processed',
        notes: "Customer noticed duplicate charge on her credit card statement. Very polite and understanding throughout the call. Quickly verified the duplicate transaction and processed immediate refund. Customer expressed gratitude for the quick resolution.",
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
      agent: 'Agent Alex',
      customer: {
        name: 'David Kim',
        avatar: '/headshot-7.png'
      },
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
      agent: 'Agent Alex',
      customer: {
        name: 'Lisa Thompson',
        avatar: '/headshot-2.png'
      },
      details: {
        reason: 'Billing Error',
        sentiment: 6.5,
        resolution: 'Partial Refund',
        notes: "Customer was confused about surge pricing during peak hours and felt the fare was too high. Took time to explain our dynamic pricing model and how it works during high-demand periods. Offered a partial refund as a goodwill gesture. Customer appreciated the explanation and accepted the resolution.",
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
      agent: 'Agent Davis',
      customer: {
        name: 'Robert Wilson',
        avatar: '/headshot-6.png'
      },
      details: {
        reason: 'Billing Error',
        sentiment: 3.0,
        resolution: 'Driver Warning Issued',
        notes: "Customer was very upset about driver's unprofessional behavior and inappropriate comments during the trip. Took detailed notes of the incident and reviewed driver's history. Found similar complaints from other passengers. Issued formal warning to driver and provided service credit to customer. Escalated to driver management team for additional training.",
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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants - toned down for subtlety
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -5 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const componentVariants = {
    hidden: { 
      opacity: 0, 
      y: 5
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const styles = {
    container: {
      backgroundColor: BASE_TOKENS.colors.white,
      minHeight: '100vh',
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      position: 'relative'
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
      padding: '0'
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
      {/* Full-width black background for tabs */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#000000',
          borderBottom: `0.5px solid ${BASE_TOKENS.colors.gray[700]}`,
          zIndex: 1000,
          width: '100%',
          marginLeft: 0,
          marginRight: 0
        }}
      >
        {/* Tab Navigation */}
        <motion.div 
          style={{
            paddingTop: '9px', // Reduced by 2px more from 11px
            paddingBottom: '7px', // Reduced by 2px more from 9px
            paddingLeft: BASE_TOKENS.spacing['2xl'],
            paddingRight: BASE_TOKENS.spacing['2xl'],
            display: 'flex',
            gap: BASE_TOKENS.spacing.md,
            position: 'relative'
          }}
          variants={componentVariants}
        >
          <button 
            style={{
              padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '2px solid transparent',
              color: activeTab === 'overview' ? '#ffffff' : BASE_TOKENS.colors.gray[400],
              fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
              fontSize: '13px', // Increased by 2px from 11px
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              outline: 'none',
              position: 'relative',
              zIndex: 1
            }}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            style={{
              padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '2px solid transparent',
              color: activeTab === 'calls' ? '#ffffff' : BASE_TOKENS.colors.gray[400],
              fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
              fontSize: '13px', // Increased by 2px from 11px
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              outline: 'none',
              position: 'relative',
              zIndex: 1
            }}
            onClick={() => setActiveTab('calls')}
          >
            Calls
          </button>
          <button 
            style={{
              padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '2px solid transparent',
              color: activeTab === 'security' ? '#ffffff' : BASE_TOKENS.colors.gray[400],
              fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
              fontSize: '13px', // Increased by 2px from 11px
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              outline: 'none',
              position: 'relative',
              zIndex: 1
            }}
            onClick={() => setActiveTab('security')}
          >
            Security & Devices
          </button>
          
          {/* Animated Tab Highlight */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              height: '2px',
              backgroundColor: '#ffffff',
              zIndex: 0
            }}
            animate={{
              x: activeTab === 'overview' ? 16 : 
                 activeTab === 'calls' ? 117 : 
                 activeTab === 'security' ? 193 : 16,
              width: activeTab === 'overview' ? 62 : 
                     activeTab === 'calls' ? 36 : 
                     activeTab === 'security' ? 122 : 62
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3
            }}
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div>
        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div style={{...styles.content, padding: BASE_TOKENS.spacing['2xl']}}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                    delayChildren: 0.01
                  }
                }
              }}
            >
              {/* User Title */}
              <motion.div 
                style={{
                  paddingTop: '6px',
                  paddingBottom: '16px',
                  marginTop: '0px',
                  marginBottom: '15px'
                }}
                variants={{
                  hidden: { opacity: 0, y: -2 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }
                }}
              >
                <h2 style={{
                  fontSize: '19px',
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[900],
                  margin: 0
                }}>
                  User
                </h2>
              </motion.div>

              {/* Customer Info Card - Full Width */}
              <motion.div 
                style={{
                  marginBottom: '30px'
                }}
                variants={{
                  hidden: { opacity: 0, y: 3 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }
                }}
              >
                <CustomerInfoCard />
              </motion.div>

              {/* Fraud Signals Title */}
              <motion.div 
                style={{
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  marginBottom: '15px'
                }}
                variants={{
                  hidden: { opacity: 0, y: -2 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }
                }}
              >
                <h2 style={{
                  fontSize: '19px',
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[900],
                  margin: 0
                }}>
                  Fraud Signals
                </h2>
              </motion.div>

              {/* Three UberCard Components */}
              <motion.div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: BASE_TOKENS.spacing['2xl'],
                  marginBottom: BASE_TOKENS.spacing['2xl'],
                  alignItems: 'stretch',
                  justifyItems: 'stretch'
                }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.02,
                      delayChildren: 0.05
                    }
                  }
                }}
              >
                <motion.div 
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  variants={{
                    hidden: { opacity: 0, y: 3 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }
                  }}
                >
                  <UberCard 
                    title="50%"
                    subtitle="Billing Disputes"
                    description="x 10 higher"
                    imageUrl="/billing.png"
                    backgroundColor="#FFFFFF"
                    titleColor="#DE1135"
                  />
                </motion.div>
                <motion.div 
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  variants={{
                    hidden: { opacity: 0, y: 3 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }
                  }}
                >
                  <UberCard 
                    title="$74"
                    subtitle="Monthly Refunds"
                    description="x 5 higher"
                    imageUrl="/refunds.png"
                    backgroundColor="#FFFFFF"
                    titleColor="#DE1135"
                  />
                </motion.div>
                <motion.div 
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  variants={{
                    hidden: { opacity: 0, y: 3 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }
                  }}
                >
                  <UberCard 
                    title="2.5 yrs"
                    subtitle="Account Age"
                    description="Established"
                    imageUrl="/time.png"
                    backgroundColor="#FFFFFF"
                    titleColor="#0D8345"
                  />
                </motion.div>
              </motion.div>

              {/* Activity Timeline and Recent Refunds */}
              <motion.div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '80px', // Increased even more from 59px
                  marginBottom: BASE_TOKENS.spacing['2xl'],
                  marginTop: '35px',
                  alignItems: 'stretch',
                  justifyItems: 'stretch',
                  paddingLeft: '15px',
                  paddingRight: '15px'
                }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.02,
                      delayChildren: 0.05
                    }
                  }
                }}
              >
                <motion.div 
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  variants={{
                    hidden: { opacity: 0, y: 3 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }
                  }}
                >
                  <ActivityTimeline />
                </motion.div>
                <motion.div 
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  variants={{
                    hidden: { opacity: 0, y: 3 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }
                  }}
                >
                  <RecentRefunds />
                </motion.div>
              </motion.div>
            </motion.div>
            </div>
          )}

          {activeTab === 'calls' && (
            <div style={styles.content}>
              <CallLog callsData={callsData} />
            </div>
          )}

          {activeTab === 'security' && (
            <div style={styles.content}>
              <DevicesSecurity />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CallFraudDashboard;
