import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_TOKENS } from '../../tokens';

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
          { time: '14:30', description: 'Call Started', icon: '📞' },
          { time: '14:32', description: 'Customer initiated inbound call.', icon: '👤' },
          { time: '14:35', description: 'Agent provided tracking next steps.', icon: '📝' },
          { time: '14:40', description: 'Call Ended', icon: '🔚' },
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
          { time: '03:15', description: 'Call Started', icon: '📞' },
          { time: '03:17', description: 'System flagged account for suspicious activity.', icon: '🚨' },
          { time: '03:25', description: 'Agent escalated case to fraud department.', icon: '⬆️' },
          { time: '03:33', description: 'Call Ended', icon: '🔚' },
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
          { time: '09:05', description: 'Call Started', icon: '📞' },
          { time: '09:07', description: 'Customer reported incorrect charge.', icon: '💸' },
          { time: '09:12', description: 'Agent processed refund.', icon: '✅' },
          { time: '09:15', description: 'Call Ended', icon: '🔚' },
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
          { time: '18:25', description: 'Call Started', icon: '📞' },
          { time: '18:27', description: 'Customer complained about longer route.', icon: '🗺️' },
          { time: '18:35', description: 'Agent reviewed trip data and issued credit.', icon: '⭐' },
          { time: '18:45', description: 'Call Ended', icon: '🔚' },
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
        reason: 'Fare Discrepancy',
        sentiment: 6.5,
        resolution: 'Partial Refund',
        events: [
          { time: '10:00', description: 'Call Started', icon: '📞' },
          { time: '10:02', description: 'Customer questioned fare calculation.', icon: '🤔' },
          { time: '10:08', description: 'Agent explained dynamic pricing.', icon: '💡' },
          { time: '10:12', description: 'Call Ended', icon: '🔚' },
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
        reason: 'Unprofessional Conduct',
        sentiment: 3.0,
        resolution: 'Driver Warning Issued',
        events: [
          { time: '16:45', description: 'Call Started', icon: '📞' },
          { time: '16:48', description: 'Customer reported driver incident.', icon: '⚠️' },
          { time: '17:00', description: 'Agent reviewed trip details and driver history.', icon: '🔍' },
          { time: '17:10', description: 'Call Ended', icon: '🔚' },
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
            Call Fraud Dashboard
          </motion.h1>
          <motion.p 
            style={styles.customerId}
            variants={componentVariants}
          >
            Customer ID: CUST_789456
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* User Profile Section */}
        <motion.div variants={componentVariants}>
          <UserProfile />
        </motion.div>

        {/* Main Dashboard Grid */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: BASE_TOKENS.spacing['2xl'],
            marginTop: BASE_TOKENS.spacing['2xl']
          }}
          variants={containerVariants}
        >
          <motion.div variants={componentVariants}>
            <DeviceUsage />
          </motion.div>
          <motion.div variants={componentVariants}>
            <RecentRefunds />
          </motion.div>
          <motion.div variants={componentVariants}>
            <CustomerSegment
              totalCalls={totalCalls}
              avgSentimentScore={avgSentimentScore}
              totalCallEvents={totalCallEvents}
              uniqueCallReasons={uniqueCallReasons}
              callReasonsDistribution={callReasonsDistributionData}
            />
          </motion.div>
        </motion.div>

        {/* Calls Component (merged AllCalls and CallDetails) */}
        <motion.div 
          style={{
            backgroundColor: BASE_TOKENS.colors.white,
            borderRadius: BASE_TOKENS.borderRadius.lg,
            border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
            padding: BASE_TOKENS.spacing['2xl'],
            boxShadow: BASE_TOKENS.shadows.md,
            display: 'flex',
            flexDirection: 'column',
            gap: BASE_TOKENS.spacing['2xl'],
            marginTop: BASE_TOKENS.spacing['2xl']
          }}
          variants={componentVariants}
        >
          {/* Header for the entire Calls section */}
          <h2 style={{
            fontSize: BASE_TOKENS.typography.fontSize.xl,
            fontWeight: BASE_TOKENS.typography.fontWeight.bold,
            color: BASE_TOKENS.colors.gray[800],
            margin: 0,
            marginBottom: BASE_TOKENS.spacing.lg,
            paddingLeft: BASE_TOKENS.spacing.sm
          }}>
            Calls
          </h2>
          
          {/* Content of the Calls component (List and Call Details) */}
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 1024 ? 'column' : 'row',
            gap: BASE_TOKENS.spacing['2xl']
          }}>
            <AllCalls
              calls={callsData}
              onSelectCall={setSelectedCall}
              selectedCallId={selectedCall?.id}
            />
            {selectedCall && <CallDetails call={selectedCall} />}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// UserProfile Component
const UserProfile = () => (
  <div style={{
    backgroundColor: BASE_TOKENS.colors.white,
    borderRadius: BASE_TOKENS.borderRadius.lg,
    border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
    padding: BASE_TOKENS.spacing['2xl'],
    boxShadow: BASE_TOKENS.shadows.md,
    display: 'flex',
    alignItems: 'center',
    gap: BASE_TOKENS.spacing.lg
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
        src="/headshot-2.png" 
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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: BASE_TOKENS.spacing.sm }}>
        <h2 style={{
          fontSize: BASE_TOKENS.typography.fontSize['2xl'],
          fontWeight: BASE_TOKENS.typography.fontWeight.bold,
          color: BASE_TOKENS.colors.gray[800],
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
      <p style={{
        color: BASE_TOKENS.colors.gray[600],
        fontSize: BASE_TOKENS.typography.fontSize.sm,
        marginBottom: BASE_TOKENS.spacing.sm,
        margin: 0
      }}>
        sarah.j@email.com • CUST_789456
      </p>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        color: BASE_TOKENS.colors.gray[700],
        fontSize: BASE_TOKENS.typography.fontSize.sm,
        gap: BASE_TOKENS.spacing.lg
      }}>
        <span>Member since March 2023</span>
        <span>• 247 rides</span>
        <span>• $3,847 lifetime value</span>
        <span>• 4.8 rating</span>
      </div>
    </div>
  </div>
);

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

// RecentRefunds Component
const RecentRefunds = () => {
  const refunds = [
    { id: 'R-7891', amount: 24.5, reason: 'Driver arrived late', date: '2025-06-08', status: 'Approved' },
    { id: 'R-7823', amount: 18.75, reason: 'Wrong route taken', date: '2025-06-02', status: 'Approved' },
    { id: 'R-7756', amount: 31.2, reason: 'Vehicle not as described', date: '2025-05-28', status: 'Under Review' },
    { id: 'R-7689', amount: 15.8, reason: 'App malfunction', date: '2025-05-16', status: 'Approved' },
  ];

  return (
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
        marginBottom: BASE_TOKENS.spacing.lg,
        margin: 0
      }}>
        Recent Refunds
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: BASE_TOKENS.spacing.lg }}>
        {refunds.map((refund) => (
          <div key={refund.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <p style={{
                color: BASE_TOKENS.colors.gray[800],
                fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                margin: 0,
                marginBottom: BASE_TOKENS.spacing.xs
              }}>
                ${refund.amount.toFixed(2)}
              </p>
              <p style={{
                color: BASE_TOKENS.colors.gray[600],
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                margin: 0,
                marginBottom: BASE_TOKENS.spacing.xs
              }}>
                {refund.reason}
              </p>
              <p style={{
                color: BASE_TOKENS.colors.gray[500],
                fontSize: BASE_TOKENS.typography.fontSize.xs,
                margin: 0
              }}>
                {refund.date}-R-{refund.id.split('-')[1]}
              </p>
            </div>
            <span style={{
              padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
              fontSize: BASE_TOKENS.typography.fontSize.xs,
              fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
              borderRadius: BASE_TOKENS.borderRadius.full,
              backgroundColor: refund.status === 'Approved' ? BASE_TOKENS.colors.green[100] : BASE_TOKENS.colors.yellow[100],
              color: refund.status === 'Approved' ? BASE_TOKENS.colors.green[800] : BASE_TOKENS.colors.yellow[800]
            }}>
              {refund.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// CustomerSegment Component (Updated with Call Statistics and Reasons Pie Chart)
const CustomerSegment = ({ totalCalls, avgSentimentScore, totalCallEvents, uniqueCallReasons, callReasonsDistribution }) => {
  // Define colors for the pie chart slices
  const PIE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Calculate angles for the conic-gradient based on data
  const calculateConicGradient = (data) => {
    let currentAngle = 0;
    const slices = data.map((item, index) => {
      const percentage = item.value / totalCalls; // Assuming totalCalls is passed and represents sum of values
      const angle = percentage * 360;
      const color = PIE_COLORS[index % PIE_COLORS.length];
      const sliceString = `${color} ${currentAngle}deg ${currentAngle + angle}deg`;
      currentAngle += angle;
      return sliceString;
    });
    return `conic-gradient(${slices.join(', ')})`;
  };

  return (
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
        marginBottom: BASE_TOKENS.spacing.lg,
        margin: 0
      }}>
        Call Statistics & Reasons Breakdown
      </h3>

      {/* High-level call statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: BASE_TOKENS.spacing.lg,
        marginBottom: BASE_TOKENS.spacing['2xl'],
        textAlign: 'center'
      }}>
        <div style={{
          padding: BASE_TOKENS.spacing.md,
          backgroundColor: BASE_TOKENS.colors.blue[50],
          borderRadius: BASE_TOKENS.borderRadius.lg
        }}>
          <p style={{
            fontSize: BASE_TOKENS.typography.fontSize['2xl'],
            fontWeight: BASE_TOKENS.typography.fontWeight.bold,
            color: BASE_TOKENS.colors.blue[700],
            margin: 0,
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            {totalCalls}
          </p>
          <p style={{
            fontSize: BASE_TOKENS.typography.fontSize.xs,
            color: BASE_TOKENS.colors.gray[600],
            margin: 0
          }}>
            Total Calls
          </p>
        </div>
        <div style={{
          padding: BASE_TOKENS.spacing.md,
          backgroundColor: BASE_TOKENS.colors.green[50],
          borderRadius: BASE_TOKENS.borderRadius.lg
        }}>
          <p style={{
            fontSize: BASE_TOKENS.typography.fontSize['2xl'],
            fontWeight: BASE_TOKENS.typography.fontWeight.bold,
            color: BASE_TOKENS.colors.green[700],
            margin: 0,
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            {avgSentimentScore}
          </p>
          <p style={{
            fontSize: BASE_TOKENS.typography.fontSize.xs,
            color: BASE_TOKENS.colors.gray[600],
            margin: 0
          }}>
            Avg Sentiment Score
          </p>
        </div>
        <div style={{
          padding: BASE_TOKENS.spacing.md,
          backgroundColor: BASE_TOKENS.colors.blue[50],
          borderRadius: BASE_TOKENS.borderRadius.lg
        }}>
          <p style={{
            fontSize: BASE_TOKENS.typography.fontSize['2xl'],
            fontWeight: BASE_TOKENS.typography.fontWeight.bold,
            color: BASE_TOKENS.colors.blue[700],
            margin: 0,
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            {totalCallEvents}
          </p>
          <p style={{
            fontSize: BASE_TOKENS.typography.fontSize.xs,
            color: BASE_TOKENS.colors.gray[600],
            margin: 0
          }}>
            Total Call Events
          </p>
        </div>
        <div style={{
          padding: BASE_TOKENS.spacing.md,
          backgroundColor: BASE_TOKENS.colors.yellow[50],
          borderRadius: BASE_TOKENS.borderRadius.lg
        }}>
          <p style={{
            fontSize: BASE_TOKENS.typography.fontSize['2xl'],
            fontWeight: BASE_TOKENS.typography.fontWeight.bold,
            color: BASE_TOKENS.colors.yellow[700],
            margin: 0,
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            {uniqueCallReasons}
          </p>
          <p style={{
            fontSize: BASE_TOKENS.typography.fontSize.xs,
            color: BASE_TOKENS.colors.gray[600],
            margin: 0
          }}>
            Unique Call Reasons
          </p>
        </div>
      </div>

      {/* Call Reasons Pie Chart */}
      <h4 style={{
        fontSize: BASE_TOKENS.typography.fontSize.md,
        fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
        color: BASE_TOKENS.colors.gray[800],
        marginBottom: BASE_TOKENS.spacing.sm,
        margin: 0
      }}>
        Call Reasons Distribution
      </h4>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '160px'
      }}>
        <div
          style={{
            position: 'relative',
            width: '128px',
            height: '128px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: callReasonsDistribution.length > 0 ? calculateConicGradient(callReasonsDistribution) : 'none'
          }}
        >
          {/* No child divs needed for slices when using conic-gradient */}
        </div>
        <div style={{
          marginLeft: BASE_TOKENS.spacing['2xl'],
          display: 'flex',
          flexDirection: 'column',
          gap: BASE_TOKENS.spacing.sm,
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          color: BASE_TOKENS.colors.gray[700]
        }}>
          {callReasonsDistribution.map((item, index) => (
            <div key={item.name} style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                marginRight: BASE_TOKENS.spacing.sm,
                backgroundColor: PIE_COLORS[index % PIE_COLORS.length]
              }}></span>
              {item.name} ({((item.value / totalCalls) * 100).toFixed(0)}%)
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// AllCalls Component
const AllCalls = ({ calls, onSelectCall, selectedCallId }) => {
  const [sortBy, setSortBy] = useState('Newest First');
  const [colorBy, setColorBy] = useState('Fraud Risk');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort calls (incorporating search term)
  const filteredCalls = calls
    .filter(call => {
      const searchMatch = call.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          call.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          call.details.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          call.details.notes?.toLowerCase().includes(searchTerm.toLowerCase());

      return searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'Newest First') {
        const dateA = new Date(a.dateTime.split(' - ')[0] + ' ' + a.dateTime.split(' - ')[1]);
        const dateB = new Date(b.dateTime.split(' - ')[0] + ' ' + b.dateTime.split(' - ')[1]);
        return dateB.getTime() - dateA.getTime();
      } else if (sortBy === 'Oldest First') {
         const dateA = new Date(a.dateTime.split(' - ')[0] + ' ' + a.dateTime.split(' - ')[1]);
        const dateB = new Date(b.dateTime.split(' - ')[0] + ' ' + b.dateTime.split(' - ')[1]);
        return dateA.getTime() - dateB.getTime();
      } else if (sortBy === 'Duration (Shortest)') {
        return parseInt(a.duration) - parseInt(b.duration);
      } else if (sortBy === 'Duration (Longest)') {
        return parseInt(b.duration) - parseInt(a.duration);
      }
      return 0;
    });

  const getCallBackgroundColor = (call, isSelected) => {
    if (isSelected) {
      return BASE_TOKENS.colors.blue[100];
    }
    if (colorBy === 'Fraud Risk' && call.fraudRisk) {
      return BASE_TOKENS.colors.red[100];
    }
    if (colorBy === 'Sentiment') {
      if (call.details.sentiment < 6) return BASE_TOKENS.colors.yellow[100];
      if (call.details.sentiment >= 8) return BASE_TOKENS.colors.green[100];
    }
    return BASE_TOKENS.colors.gray[50];
  };

  const getCallBorder = (call, isSelected) => {
    if (isSelected) {
      return `1px solid ${BASE_TOKENS.colors.blue[500]}`;
    }
    return `1px solid transparent`;
  };

  return (
    <div style={{
      flex: 1,
      padding: BASE_TOKENS.spacing.lg,
      borderRight: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      maxWidth: '320px'
    }}>
      <h3 style={{
        fontSize: BASE_TOKENS.typography.fontSize.lg,
        fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
        color: BASE_TOKENS.colors.gray[800],
        marginBottom: BASE_TOKENS.spacing.lg,
        margin: 0,
        position: 'absolute',
        left: '-9999px'
      }}>
        List
      </h3>

      <div style={{ marginBottom: BASE_TOKENS.spacing.lg }}>
        <input
          type="text"
          placeholder="Search calls..."
          style={{
            width: '100%',
            padding: BASE_TOKENS.spacing.sm,
            border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
            borderRadius: BASE_TOKENS.borderRadius.md,
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            outline: 'none'
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: BASE_TOKENS.spacing.lg,
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        <select
          style={{
            padding: BASE_TOKENS.spacing.sm,
            border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
            borderRadius: BASE_TOKENS.borderRadius.md,
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            flexGrow: 1,
            outline: 'none'
          }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
          <option value="Duration (Shortest)">Duration (Shortest)</option>
          <option value="Duration (Longest)">Duration (Longest)</option>
        </select>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto'
        }}>
          <span style={{
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            color: BASE_TOKENS.colors.gray[700],
            marginRight: BASE_TOKENS.spacing.sm
          }}>
            Color by:
          </span>
          <label style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginRight: BASE_TOKENS.spacing.lg,
            cursor: 'pointer'
          }}>
            <input
              type="radio"
              name="colorBy"
              style={{
                width: '16px',
                height: '16px',
                accentColor: BASE_TOKENS.colors.blue[600],
                marginRight: BASE_TOKENS.spacing.sm
              }}
              value="Fraud Risk"
              checked={colorBy === 'Fraud Risk'}
              onChange={() => setColorBy('Fraud Risk')}
            />
            <span style={{
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              color: BASE_TOKENS.colors.gray[700]
            }}>
              Fraud Risk
            </span>
          </label>
          <label style={{
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <input
              type="radio"
              name="colorBy"
              style={{
                width: '16px',
                height: '16px',
                accentColor: BASE_TOKENS.colors.blue[600],
                marginRight: BASE_TOKENS.spacing.sm
              }}
              value="Sentiment"
              checked={colorBy === 'Sentiment'}
              onChange={() => setColorBy('Sentiment')}
            />
            <span style={{
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              color: BASE_TOKENS.colors.gray[700]
            }}>
              Sentiment
            </span>
          </label>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: BASE_TOKENS.spacing.md,
        maxHeight: '384px',
        overflowY: 'auto',
        paddingRight: BASE_TOKENS.spacing.sm
      }}>
        {filteredCalls.map((call) => {
          const isSelected = selectedCallId === call.id;
          return (
            <div
              key={call.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: BASE_TOKENS.spacing.md,
                borderRadius: BASE_TOKENS.borderRadius.lg,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: getCallBackgroundColor(call, isSelected),
                border: getCallBorder(call, isSelected)
              }}
              onClick={() => onSelectCall(call)}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.target.style.backgroundColor = colorBy === 'Fraud Risk' && call.fraudRisk 
                    ? BASE_TOKENS.colors.red[200]
                    : colorBy === 'Sentiment' && call.details.sentiment < 6 
                    ? BASE_TOKENS.colors.orange[200]
                    : colorBy === 'Sentiment' && call.details.sentiment >= 8 
                    ? BASE_TOKENS.colors.green[200]
                    : BASE_TOKENS.colors.gray[100];
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.target.style.backgroundColor = getCallBackgroundColor(call, false);
                }
              }}
            >
              <div>
                <p style={{
                  fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                  color: BASE_TOKENS.colors.gray[800],
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.xs
                }}>
                  {call.type}
                  {call.fraudRisk && (
                    <span style={{
                      marginLeft: BASE_TOKENS.spacing.sm,
                      color: BASE_TOKENS.colors.red[500],
                      fontSize: BASE_TOKENS.typography.fontSize.xs,
                      fontWeight: BASE_TOKENS.typography.fontWeight.semibold
                    }}>
                      (Fraud Risk)
                    </span>
                  )}
                </p>
                <p style={{
                  color: BASE_TOKENS.colors.gray[500],
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  margin: 0
                }}>
                  {call.dateTime}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  color: BASE_TOKENS.colors.gray[700],
                  fontSize: BASE_TOKENS.typography.fontSize.sm,
                  margin: 0,
                  marginBottom: BASE_TOKENS.spacing.xs
                }}>
                  {call.duration}
                </p>
                <p style={{
                  color: BASE_TOKENS.colors.gray[600],
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  margin: 0
                }}>
                  by {call.agent.split(' ')[1]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// CallDetails Component
const CallDetails = ({ call }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100 for percentage
  const intervalRef = useRef(null);

  // Reset progress and stop playback when call changes
  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [call]);

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      // Start playback from current progress or reset if at end
      const startProgress = progress === 100 ? 0 : progress;
      setProgress(startProgress);
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1; // Increment by 1 for demonstration
          if (newProgress > 100) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 100; // Cap at 100%
          }
          return newProgress;
        });
      }, 150); // Adjust speed of playhead movement
    }
    setIsPlaying(!isPlaying);
  };

  const getSentimentBackgroundColor = (sentiment) => {
    if (sentiment >= 8) return BASE_TOKENS.colors.green[500];
    if (sentiment >= 6) return BASE_TOKENS.colors.yellow[500];
    return BASE_TOKENS.colors.red[500];
  };

  // Generate a dummy waveform data (array of heights)
  const generateWaveform = (numBars = 50) => {
    const waveform = [];
    for (let i = 0; i < numBars; i++) {
      // Create some variation for a more realistic look
      waveform.push(Math.random() * 0.8 + 0.2); // Heights between 20% and 100%
    }
    return waveform;
  };

  const waveformData = generateWaveform();

  return (
    <div style={{
      flex: 1,
      padding: BASE_TOKENS.spacing.lg
    }}>
      <h3 style={{
        fontSize: BASE_TOKENS.typography.fontSize.lg,
        fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
        color: BASE_TOKENS.colors.gray[800],
        marginBottom: BASE_TOKENS.spacing.lg,
        margin: 0,
        position: 'absolute',
        left: '-9999px'
      }}>
        Call Details
      </h3>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        <div style={{ flex: 1 }}>
          <p style={{
            color: BASE_TOKENS.colors.gray[800],
            fontWeight: BASE_TOKENS.typography.fontWeight.medium,
            fontSize: BASE_TOKENS.typography.fontSize.lg,
            margin: 0,
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            {call.type}
          </p>
          <p style={{
            color: BASE_TOKENS.colors.gray[600],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            margin: 0
          }}>
            Customer called about {call.details.reason.toLowerCase()} from recent trip. Agent initiated driver contact and provided tracking next steps.
          </p>
        </div>
        <div style={{ textAlign: 'right', marginLeft: BASE_TOKENS.spacing.lg }}>
          <p style={{
            color: BASE_TOKENS.colors.gray[700],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            margin: 0,
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            Agent: <span style={{ fontWeight: BASE_TOKENS.typography.fontWeight.medium }}>{call.agent}</span>
          </p>
          <p style={{
            color: BASE_TOKENS.colors.gray[700],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            margin: 0
          }}>
            Duration: <span style={{ fontWeight: BASE_TOKENS.typography.fontWeight.medium }}>{call.duration}</span>
          </p>
        </div>
      </div>

      {/* Audio Waveform and Controls */}
      <div style={{ marginBottom: BASE_TOKENS.spacing['2xl'] }}>
        <p style={{
          color: BASE_TOKENS.colors.gray[700],
          fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
          marginBottom: BASE_TOKENS.spacing.sm,
          margin: 0
        }}>
          Call Audio Preview
        </p>
        <div style={{
          backgroundColor: BASE_TOKENS.colors.gray[100],
          borderRadius: BASE_TOKENS.borderRadius.lg,
          padding: BASE_TOKENS.spacing.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={togglePlay}
            style={{
              padding: BASE_TOKENS.spacing.sm,
              borderRadius: BASE_TOKENS.borderRadius.full,
              backgroundColor: BASE_TOKENS.colors.blue[500],
              color: BASE_TOKENS.colors.white,
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              outline: 'none'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = BASE_TOKENS.colors.blue[600]}
            onMouseOut={(e) => e.target.style.backgroundColor = BASE_TOKENS.colors.blue[500]}
          >
            {isPlaying ? (
              <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.5 7H8a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h1.5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5zm4 0H12a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h1.5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5z"></path>
              </svg>
            ) : (
              <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.5 7.5L14 10l-4.5 2.5V7.5z"></path>
              </svg>
            )}
          </button>
          <div style={{
            position: 'relative',
            flex: 1,
            height: '48px',
            backgroundColor: BASE_TOKENS.colors.gray[200],
            borderRadius: BASE_TOKENS.borderRadius.md,
            margin: `0 ${BASE_TOKENS.spacing.lg}`,
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: `0 ${BASE_TOKENS.spacing.xs}`
            }}>
              {waveformData.map((height, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: BASE_TOKENS.colors.blue[400],
                    borderRadius: BASE_TOKENS.borderRadius.sm,
                    height: `${height * 100}%`,
                    width: `${100 / waveformData.length - 1}%`
                  }}
                ></div>
              ))}
            </div>
            {/* Playhead */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '4px',
                backgroundColor: BASE_TOKENS.colors.red[500],
                borderRadius: BASE_TOKENS.borderRadius.full,
                left: `${progress}%`,
                transform: 'translateX(-50%)'
              }}
            ></div>
          </div>
          <span style={{
            color: BASE_TOKENS.colors.gray[600],
            fontSize: BASE_TOKENS.typography.fontSize.sm
          }}>
            {call.duration}
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: BASE_TOKENS.spacing.lg,
        marginBottom: BASE_TOKENS.spacing['2xl']
      }}>
        <div>
          <p style={{
            color: BASE_TOKENS.colors.gray[700],
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            marginBottom: BASE_TOKENS.spacing.sm,
            margin: 0
          }}>
            Call Details
          </p>
          <p style={{
            color: BASE_TOKENS.colors.gray[600],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            margin: 0,
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            Date: {call.dateTime.split(' - ')[0]}
          </p>
          <p style={{
            color: BASE_TOKENS.colors.gray[600],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            margin: 0,
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            Time: {call.dateTime.split(' - ')[1]}
          </p>
          <p style={{
            color: BASE_TOKENS.colors.gray[600],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            margin: 0
          }}>
            Reason: {call.details.reason}
          </p>
        </div>
        <div>
          <p style={{
            color: BASE_TOKENS.colors.gray[700],
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            marginBottom: BASE_TOKENS.spacing.sm,
            margin: 0
          }}>
            Outcome & Sentiment
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            <p style={{
              color: BASE_TOKENS.colors.gray[600],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              marginRight: BASE_TOKENS.spacing.sm,
              margin: 0
            }}>
              Sentiment:
            </p>
            <span style={{
              padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
              borderRadius: BASE_TOKENS.borderRadius.full,
              color: BASE_TOKENS.colors.white,
              fontSize: BASE_TOKENS.typography.fontSize.xs,
              fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
              backgroundColor: getSentimentBackgroundColor(call.details.sentiment)
            }}>
              {call.details.sentiment}/10
            </span>
          </div>
          <p style={{
            color: BASE_TOKENS.colors.gray[600],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            margin: 0
          }}>
            Resolution: <span style={{
              fontWeight: BASE_TOKENS.typography.fontWeight.medium,
              color: BASE_TOKENS.colors.green[700]
            }}>
              {call.details.resolution}
            </span>
          </p>
        </div>
      </div>

      {call.details.notes && (
        <div style={{ marginBottom: BASE_TOKENS.spacing['2xl'] }}>
          <p style={{
            color: BASE_TOKENS.colors.gray[700],
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            marginBottom: BASE_TOKENS.spacing.sm,
            margin: 0
          }}>
            Agent Notes
          </p>
          <p style={{
            color: BASE_TOKENS.colors.gray[600],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            backgroundColor: BASE_TOKENS.colors.gray[50],
            padding: BASE_TOKENS.spacing.md,
            borderRadius: BASE_TOKENS.borderRadius.md,
            border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
            margin: 0
          }}>
            {call.details.notes}
          </p>
        </div>
      )}

      <div>
        <p style={{
          color: BASE_TOKENS.colors.gray[700],
          fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
          marginBottom: BASE_TOKENS.spacing.md,
          margin: 0
        }}>
          Call Events Timeline
        </p>
        <div style={{
          position: 'relative',
          borderLeft: `2px solid ${BASE_TOKENS.colors.gray[200]}`,
          paddingLeft: BASE_TOKENS.spacing.lg
        }}>
          {call.details.events.map((event, index) => (
            <div key={index} style={{
              marginBottom: BASE_TOKENS.spacing.lg,
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <div style={{
                position: 'absolute',
                width: '12px',
                height: '12px',
                backgroundColor: BASE_TOKENS.colors.blue[500],
                borderRadius: '50%',
                left: '-6px',
                marginTop: '6px',
                border: `2px solid ${BASE_TOKENS.colors.white}`
              }}></div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <p style={{
                    fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                    color: BASE_TOKENS.colors.gray[800],
                    fontSize: BASE_TOKENS.typography.fontSize.sm,
                    margin: 0
                  }}>
                    {event.icon} {event.description}
                  </p>
                  <span style={{
                    color: BASE_TOKENS.colors.gray[500],
                    fontSize: BASE_TOKENS.typography.fontSize.xs
                  }}>
                    {event.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallFraudDashboard;
