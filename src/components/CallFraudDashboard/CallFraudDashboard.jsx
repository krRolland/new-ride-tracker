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
      agent: 'Agent Smith',
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
      agent: 'Agent Johnson',
      customer: {
        name: 'Emma Rodriguez',
        avatar: '/headshot-4.png'
      },
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
      agent: 'Agent Smith',
      customer: {
        name: 'Lisa Thompson',
        avatar: '/headshot-2.png'
      },
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
      customer: {
        name: 'Robert Wilson',
        avatar: '/headshot-6.png'
      },
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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      padding: `20px ${BASE_TOKENS.spacing['2xl']} ${BASE_TOKENS.spacing['2xl']}`
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
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)'
        }}
      >
        {/* Tab Navigation */}
        <motion.div 
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingTop: BASE_TOKENS.spacing.md,
            paddingBottom: BASE_TOKENS.spacing.md,
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
              fontSize: '16px',
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
              fontSize: '16px',
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
              fontSize: '16px',
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
                 activeTab === 'calls' ? 131 : 
                 activeTab === 'security' ? 211 : 16,
              width: activeTab === 'overview' ? 74 : 
                     activeTab === 'calls' ? 44 : 
                     activeTab === 'security' ? 144 : 74
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
      <div style={styles.content}>
        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div>
              {/* User Title */}
              <div 
                style={{
                  padding: '16px',
                  marginTop: '0px',
                  marginBottom: '15px'
                }}
              >
                <h2 style={{
                  fontSize: BASE_TOKENS.typography.fontSize.lg,
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[800],
                  margin: 0
                }}>
                  User
                </h2>
              </div>

              {/* Customer Info Card - Full Width */}
              <div 
                style={{
                  marginBottom: '30px'
                }}
              >
                <CustomerInfoCard />
              </div>

              {/* Fraud Signals Title */}
              <div 
                style={{
                  padding: '16px',
                  marginBottom: '15px'
                }}
              >
                <h2 style={{
                  fontSize: BASE_TOKENS.typography.fontSize.lg,
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[800],
                  margin: 0
                }}>
                  Fraud Signals
                </h2>
              </div>

              {/* Three UberCard Components */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: BASE_TOKENS.spacing['2xl'],
                  marginBottom: BASE_TOKENS.spacing['2xl'],
                  alignItems: 'stretch',
                  justifyItems: 'stretch'
                }}
              >
                <div style={{ width: '100%', boxSizing: 'border-box' }}>
                  <UberCard 
                    title="50%"
                    subtitle="Billing Disputes"
                    description="x 10 higher"
                    imageUrl="/billing.png"
                    backgroundColor="#FFF6F6"
                    titleColor="#DE1135"
                  />
                </div>
                <div style={{ width: '100%', boxSizing: 'border-box' }}>
                  <UberCard 
                    title="$74"
                    subtitle="Monthly Refunds"
                    description="x 5 higher"
                    imageUrl="/refunds.png"
                    backgroundColor="#FFF6F6"
                    titleColor="#DE1135"
                  />
                </div>
                <div style={{ width: '100%', boxSizing: 'border-box' }}>
                  <UberCard 
                    title="2.5 yrs"
                    subtitle="Account Age"
                    description="Established"
                    imageUrl="/time.png"
                    backgroundColor="#F1F9F4"
                    titleColor="#0D8345"
                  />
                </div>
              </div>

              {/* Activity Timeline and Recent Refunds */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: BASE_TOKENS.spacing['2xl'],
                  marginBottom: BASE_TOKENS.spacing['2xl'],
                  marginTop: '35px',
                  alignItems: 'stretch',
                  justifyItems: 'stretch'
                }}
              >
                <div style={{ width: '100%', boxSizing: 'border-box' }}>
                  <ActivityTimeline />
                </div>
                <div style={{ width: '100%', boxSizing: 'border-box' }}>
                  <RecentRefunds />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calls' && (
            <div>
              <CallLog callsData={callsData} />
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <DevicesSecurity />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CallFraudDashboard;
