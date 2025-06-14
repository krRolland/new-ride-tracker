import React from 'react';
import { motion } from 'framer-motion';
import { BASE_TOKENS } from '../../tokens';

// DevicesSecurity Component
const DevicesSecurity = () => {
  // Animation variants - matching Overview tab style
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.01
      }
    }
  }

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -2 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const componentVariants = {
    hidden: { 
      opacity: 0, 
      y: 3
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 2
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    }
  };

  const devicesData = [
    {
      id: 1,
      device: 'iPhone 13',
      os: 'iOS 16.3',
      location: 'San Francisco, CA',
      time: '2 hours ago',
      status: 'current',
      mockup: '/iphone-13-mockup.png'
    },
    
    {
      id: 3,
      device: 'iPhone 11',
      os: 'iOS 15.6',
      location: 'San Francisco, CA',
      time: 'March 2023',
      status: 'signup',
      mockup: '/iphone-11-mockup.png'
    }
  ];

  const loginHistoryData = [
    {
      id: 1,
      timestamp: '2024-06-12 14:30',
      device: 'iPhone 13',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-06-11 09:15',
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.101',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-06-10 18:45',
      device: 'iPhone 13',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2024-06-09 12:20',
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.101',
      status: 'success'
    },
    {
      id: 5,
      timestamp: '2024-06-08 16:10',
      device: 'iPhone 13',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.100',
      status: 'success'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return {
          bg: BASE_TOKENS.colors.green[50],
          text: BASE_TOKENS.colors.green[700],
          border: BASE_TOKENS.colors.green[200],
          badge: BASE_TOKENS.colors.green[100],
          badgeText: BASE_TOKENS.colors.green[800]
        };
      case 'recent':
        return {
          bg: BASE_TOKENS.colors.blue[50],
          text: BASE_TOKENS.colors.blue[700],
          border: BASE_TOKENS.colors.blue[200],
          badge: BASE_TOKENS.colors.blue[100],
          badgeText: BASE_TOKENS.colors.blue[800]
        };
      case 'signup':
        return {
          bg: BASE_TOKENS.colors.gray[50],
          text: BASE_TOKENS.colors.gray[700],
          border: BASE_TOKENS.colors.gray[200],
          badge: BASE_TOKENS.colors.gray[100],
          badgeText: BASE_TOKENS.colors.gray[800]
        };
      default:
        return {
          bg: BASE_TOKENS.colors.gray[50],
          text: BASE_TOKENS.colors.gray[700],
          border: BASE_TOKENS.colors.gray[200],
          badge: BASE_TOKENS.colors.gray[100],
          badgeText: BASE_TOKENS.colors.gray[800]
        };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'current':
        return 'Current Device';
      case 'recent':
        return 'Recent Login';
      case 'signup':
        return 'Signup Device';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <motion.div 
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        height: '100%',
        padding: BASE_TOKENS.spacing['2xl'],
        boxSizing: 'border-box'
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Devices Column */}
      <motion.div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        variants={componentVariants}
      >
        {/* Devices Title */}
        <motion.div 
          style={{
            paddingTop: '6px',
            paddingBottom: '16px',
            marginBottom: '15px'
          }}
          variants={headerVariants}
        >
          <h2 style={{
            fontSize: '19px',
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            color: BASE_TOKENS.colors.gray[900],
            margin: 0
          }}>
            Devices
          </h2>
        </motion.div>

        {/* Devices List */}
        <motion.div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            flex: 1,
            overflow: 'auto'
          }}
          variants={listVariants}
        >
          {devicesData.map((device) => {
            const colors = getStatusColor(device.status);
            return (
              <motion.div
                key={device.id}
                style={{
                  minHeight: '56px',
                  padding: `11px 0 11px ${BASE_TOKENS.spacing.xs}`,
                  borderRadius: BASE_TOKENS.borderRadius.md,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'transparent',
                  border: '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: BASE_TOKENS.spacing.sm
                }}
                variants={itemVariants}
              >
                {/* Left Column - Device Image/Icon */}
                <div style={{
                  width: device.mockup ? '60px' : '42px',
                  height: device.mockup ? '60px' : '42px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: device.mockup ? 'transparent' : colors.bg,
                  borderRadius: device.mockup ? BASE_TOKENS.borderRadius.md : BASE_TOKENS.borderRadius.full,
                  border: device.mockup ? 'none' : `2px solid ${BASE_TOKENS.colors.white}`,
                  boxShadow: device.mockup ? 'none' : BASE_TOKENS.shadows.md
                }}>
                  {device.mockup ? (
                    <img 
                      src={device.mockup}
                      alt={`${device.device} mockup`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  ) : device.device.includes('iPhone') ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  )}
                </div>

                {/* Middle Column - Device Information */}
                <div style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  {/* Title */}
                  <h4 style={{
                    fontSize: BASE_TOKENS.typography.fontSize.md,
                    fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                    color: BASE_TOKENS.colors.gray[900],
                    margin: 0,
                    marginBottom: '4px',
                    lineHeight: BASE_TOKENS.typography.lineHeight.tight,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {device.device}
                  </h4>
                  
                  {/* Subtitle - OS and Location */}
                  <p style={{
                    color: BASE_TOKENS.colors.gray[500],
                    fontWeight: BASE_TOKENS.typography.fontWeight.light,
                    margin: 0,
                    marginBottom: '3px',
                    fontSize: BASE_TOKENS.typography.fontSize.xs,
                    lineHeight: BASE_TOKENS.typography.lineHeight.tight,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {device.os} • {device.location}
                  </p>
                  
                  {/* Status Label - Separate Line */}
                  <div style={{
                    color: BASE_TOKENS.colors.gray[500],
                    fontWeight: BASE_TOKENS.typography.fontWeight.light,
                    margin: 0,
                    fontSize: BASE_TOKENS.typography.fontSize.xs,
                    lineHeight: BASE_TOKENS.typography.lineHeight.tight,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    Status: {getStatusLabel(device.status)}
                  </div>
                </div>

                {/* Right Column - Timestamp */}
                <div style={{
                  flexShrink: 0,
                  alignSelf: 'center'
                }}>
                  <span style={{
                    color: BASE_TOKENS.colors.gray[600],
                    fontSize: BASE_TOKENS.typography.fontSize.xs,
                    fontWeight: BASE_TOKENS.typography.fontWeight.light,
                    backgroundColor: BASE_TOKENS.colors.gray[100],
                    padding: `6px 10px`,
                    borderRadius: BASE_TOKENS.borderRadius.full,
                    display: 'inline-block'
                  }}>
                    {device.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Login History Column */}
      <motion.div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingRight: '15px'
        }}
        variants={componentVariants}
      >
        {/* Login History Title */}
        <motion.div 
          style={{
            paddingTop: '6px',
            paddingBottom: '16px',
            marginBottom: '15px'
          }}
          variants={headerVariants}
        >
          <h2 style={{
            fontSize: '19px',
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            color: BASE_TOKENS.colors.gray[900],
            margin: 0
          }}>
            Login History
          </h2>
        </motion.div>

        {/* Login History List */}
        <motion.div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            flex: 1,
            overflow: 'auto'
          }}
          variants={listVariants}
        >
          {loginHistoryData.map((login) => (
            <motion.div
              key={login.id}
              style={{
                minHeight: '56px',
                padding: `11px 0 11px ${BASE_TOKENS.spacing.xs}`,
                borderRadius: BASE_TOKENS.borderRadius.md,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent',
                border: '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: BASE_TOKENS.spacing.sm
              }}
              variants={itemVariants}
            >
              {/* Left Column - Status Icon (styled like avatar) */}
              <div style={{
                width: '42px',
                height: '42px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: BASE_TOKENS.colors.green[50],
                borderRadius: BASE_TOKENS.borderRadius.full,
                border: `2px solid ${BASE_TOKENS.colors.white}`,
                boxShadow: BASE_TOKENS.shadows.md
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BASE_TOKENS.colors.green[700]} strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>

              {/* Middle Column - Login Information */}
              <div style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                {/* Title */}
                <h4 style={{
                  fontSize: BASE_TOKENS.typography.fontSize.md,
                  fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                  color: BASE_TOKENS.colors.gray[900],
                  margin: 0,
                  marginBottom: '4px',
                  lineHeight: BASE_TOKENS.typography.lineHeight.tight,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {login.device}
                </h4>
                
                {/* Subtitle - Location and IP */}
                <p style={{
                  color: BASE_TOKENS.colors.gray[500],
                  fontWeight: BASE_TOKENS.typography.fontWeight.light,
                  margin: 0,
                  marginBottom: '3px',
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  lineHeight: BASE_TOKENS.typography.lineHeight.tight,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {login.location} • {login.ipAddress}
                </p>
                
                {/* Status Label - Separate Line */}
                <div style={{
                  color: BASE_TOKENS.colors.gray[500],
                  fontWeight: BASE_TOKENS.typography.fontWeight.light,
                  margin: 0,
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  lineHeight: BASE_TOKENS.typography.lineHeight.tight,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  Status: Success
                </div>
              </div>

              {/* Right Column - Timestamp */}
              <div style={{
                flexShrink: 0,
                alignSelf: 'center'
              }}>
                <span style={{
                  color: BASE_TOKENS.colors.gray[600],
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  fontWeight: BASE_TOKENS.typography.fontWeight.light,
                  backgroundColor: BASE_TOKENS.colors.gray[100],
                  padding: `6px 10px`,
                  borderRadius: BASE_TOKENS.borderRadius.full,
                  display: 'inline-block'
                }}>
                  {formatDate(login.timestamp)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DevicesSecurity;
