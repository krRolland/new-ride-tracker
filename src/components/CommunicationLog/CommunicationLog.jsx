import React from 'react';
import { BASE_TOKENS } from '../../tokens';

const CommunicationLog = ({ callLogs = [], messages = [] }) => {
  const styles = {
    container: {
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      padding: BASE_TOKENS.spacing['2xl'],
      boxShadow: BASE_TOKENS.shadows.md
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: BASE_TOKENS.spacing.lg
    },
    headerIcon: {
      width: '20px',
      height: '20px',
      marginRight: BASE_TOKENS.spacing.sm,
      color: BASE_TOKENS.colors.gray[500]
    },
    headerTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.xl,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.lg,
      margin: 0
    },
    section: {
      marginBottom: BASE_TOKENS.spacing.lg
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: BASE_TOKENS.spacing.md
    },
    sectionIcon: {
      width: '16px',
      height: '16px',
      marginRight: BASE_TOKENS.spacing.sm,
      color: BASE_TOKENS.colors.gray[500]
    },
    sectionTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.base,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[700],
      lineHeight: BASE_TOKENS.typography.lineHeight.base,
      margin: 0
    },
    // Call Log Styles
    callItem: {
      padding: BASE_TOKENS.spacing.md,
      backgroundColor: BASE_TOKENS.colors.gray[50],
      borderRadius: BASE_TOKENS.borderRadius.md,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`
    },
    callHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: BASE_TOKENS.spacing.xs
    },
    participantLabel: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      textTransform: 'capitalize'
    },
    arrow: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      color: BASE_TOKENS.colors.gray[500],
      marginLeft: BASE_TOKENS.spacing.xs
    },
    timestamp: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      fontWeight: BASE_TOKENS.typography.fontWeight.medium
    },
    callDetails: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[600],
      lineHeight: BASE_TOKENS.typography.lineHeight.xs
    },
    // Message Styles
    messagesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: BASE_TOKENS.spacing.md
    },
    messageItem: {
      maxWidth: '85%'
    },
    riderMessage: {
      alignSelf: 'flex-end'
    },
    driverMessage: {
      alignSelf: 'flex-start'
    },
    messageBubble: {
      padding: BASE_TOKENS.spacing.md,
      borderRadius: BASE_TOKENS.borderRadius.xl,
      position: 'relative'
    },
    riderBubble: {
      backgroundColor: BASE_TOKENS.colors.blue[500],
      color: BASE_TOKENS.colors.white,
      borderBottomRightRadius: BASE_TOKENS.spacing.xs
    },
    driverBubble: {
      backgroundColor: BASE_TOKENS.colors.gray[100],
      color: BASE_TOKENS.colors.gray[900],
      borderBottomLeftRadius: BASE_TOKENS.spacing.xs
    },
    messageText: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      lineHeight: BASE_TOKENS.typography.lineHeight.sm,
      margin: 0
    },
    messageHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: BASE_TOKENS.spacing.xs
    },
    messageParticipant: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      textTransform: 'capitalize',
      opacity: 0.8
    },
    messageTime: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      opacity: 0.7,
      marginTop: BASE_TOKENS.spacing.xs
    },
    // Clean, modern button styles
    callButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: BASE_TOKENS.components.button.height.md,
      padding: BASE_TOKENS.components.button.padding.md,
      backgroundColor: BASE_TOKENS.colors.gray[900],
      color: BASE_TOKENS.colors.white,
      border: 'none',
      borderRadius: BASE_TOKENS.borderRadius.lg,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeInOut}`,
      boxShadow: 'none'
    },
    messageButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: BASE_TOKENS.components.button.height.md,
      padding: BASE_TOKENS.components.button.padding.md,
      backgroundColor: BASE_TOKENS.colors.white,
      color: BASE_TOKENS.colors.gray[700],
      border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeInOut}`,
      boxShadow: 'none'
    }
  };

  // Icons as SVG components
  const MessageIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );

  const CommunicationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-5c-.8 0-1.5.7-1.5 1.5v6c0 .8.7 1.5 1.5 1.5H16v6h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z"/>
    </svg>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Communication Log</h2>
      </div>

      {/* Calls Section */}
      {callLogs.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            {/* <div style={styles.sectionIcon}>
              <PhoneIcon />
            </div> */}
            <h3 style={styles.sectionTitle}>Calls</h3>
          </div>

          {callLogs.map((call) => (
            <div key={call.id} style={styles.callItem}>
              <div style={styles.callHeader}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={styles.participantLabel}>{call.participant}</span>
                  <span style={styles.arrow}>→</span>
                </div>
                <span style={styles.timestamp}>{call.timestamp}</span>
              </div>
              <div style={styles.callDetails}>
                Duration: {call.duration} • Status: {call.status}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Messages Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Messages</h3>
        </div>

        {messages.length > 0 ? (
          <div style={styles.messagesList}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.messageItem,
                  ...(message.participant === 'rider' 
                    ? styles.riderMessage 
                    : styles.driverMessage
                  )
                }}
              >
                <div style={styles.messageHeader}>
                  <span 
                    style={{
                      ...styles.messageParticipant,
                      color: message.participant === 'rider' 
                        ? BASE_TOKENS.colors.blue[600] 
                        : BASE_TOKENS.colors.green[600]
                    }}
                  >
                    {message.participant}
                  </span>
                  <span style={styles.timestamp}>{message.timestamp}</span>
                </div>
                
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(message.participant === 'rider' 
                      ? styles.riderBubble 
                      : styles.driverBubble
                    )
                  }}
                >
                  <p style={styles.messageText}>{message.message}</p>
                  <div 
                    style={{
                      ...styles.messageTime,
                      color: message.participant === 'rider' 
                        ? 'rgba(255, 255, 255, 0.7)' 
                        : BASE_TOKENS.colors.gray[500]
                    }}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: BASE_TOKENS.spacing.lg,
            textAlign: 'center',
            backgroundColor: BASE_TOKENS.colors.gray[50],
            borderRadius: BASE_TOKENS.borderRadius.md,
            border: `1px solid ${BASE_TOKENS.colors.gray[200]}`
          }}>
            <p style={{
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              color: BASE_TOKENS.colors.gray[600],
              margin: 0,
              fontStyle: 'italic'
            }}>
              No messages between driver and passenger thus far
            </p>
          </div>
        )}
      </div>

      {/* Updated Action Buttons */}
      <div style={{
        display: 'flex',
        gap: BASE_TOKENS.spacing.sm,
        paddingTop: BASE_TOKENS.spacing.lg,
        borderTop: `1px solid ${BASE_TOKENS.colors.gray[100]}`
      }}>
        <button 
          style={styles.callButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = BASE_TOKENS.colors.gray[800];
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = BASE_TOKENS.colors.gray[900];
          }}
        >
          <div style={{ marginRight: BASE_TOKENS.spacing.xs }}>
            <PhoneIcon />
          </div>
          Call
        </button>
        
        <button 
          style={styles.messageButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = BASE_TOKENS.colors.gray[50];
            e.target.style.borderColor = BASE_TOKENS.colors.gray[400];
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = BASE_TOKENS.colors.white;
            e.target.style.borderColor = BASE_TOKENS.colors.gray[300];
          }}
        >
          <div style={{ marginRight: BASE_TOKENS.spacing.xs }}>
            <MessageIcon />
          </div>
          Message
        </button>
      </div>
    </div>
  );
};

export default CommunicationLog;
