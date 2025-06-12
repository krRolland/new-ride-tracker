import React, { useState } from 'react';
import { BASE_TOKENS } from '../../tokens';

// DevicesSecurity Component
const DevicesSecurity = () => {
  const [activeTab, setActiveTab] = useState('devices');

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
      id: 2,
      device: 'MacBook Pro',
      os: 'macOS Ventura',
      location: 'San Francisco, CA',
      time: '1 day ago',
      status: 'recent',
      mockup: null
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
    <div style={{
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      boxShadow: BASE_TOKENS.shadows.md,
      padding: BASE_TOKENS.spacing['2xl'],
      height: '100%',
      maxHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      
      {/* Fixed Header Section */}
      <div style={{
        flexShrink: 0,
        marginBottom: BASE_TOKENS.spacing.lg,
        position: 'relative'
      }}>
        {/* Status Pill - Top Right */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
          backgroundColor: BASE_TOKENS.colors.green[100],
          color: BASE_TOKENS.colors.green[800],
          fontSize: BASE_TOKENS.typography.fontSize.xs,
          fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
          borderRadius: BASE_TOKENS.borderRadius.full,
          display: 'flex',
          alignItems: 'center',
          gap: BASE_TOKENS.spacing.xs
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          No Issues
        </div>

        <h3 style={{
          fontSize: BASE_TOKENS.typography.fontSize.lg,
          fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
          color: BASE_TOKENS.colors.gray[800],
          margin: 0,
          marginBottom: BASE_TOKENS.spacing.xs,
          paddingRight: BASE_TOKENS.spacing['4xl'] // Add padding to avoid overlap with pill
        }}>
          Devices & Security
        </h3>
        <p style={{
          color: BASE_TOKENS.colors.gray[600],
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          fontWeight: BASE_TOKENS.typography.fontWeight.normal,
          margin: 0
        }}>
          Device usage history and security information
        </p>
      </div>

      {/* Fixed Tabs Section */}
      <div style={{
        flexShrink: 0,
        borderBottom: `2px solid ${BASE_TOKENS.colors.gray[200]}`,
        marginBottom: BASE_TOKENS.spacing.lg,
        display: 'flex',
        gap: BASE_TOKENS.spacing.md
      }}>
        <button 
          style={{
            padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'devices' ? `2px solid ${BASE_TOKENS.colors.blue[500]}` : '2px solid transparent',
            color: activeTab === 'devices' ? BASE_TOKENS.colors.blue[600] : BASE_TOKENS.colors.gray[600],
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onClick={() => setActiveTab('devices')}
        >
          Devices
        </button>
        <button 
          style={{
            padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'loginHistory' ? `2px solid ${BASE_TOKENS.colors.blue[500]}` : '2px solid transparent',
            color: activeTab === 'loginHistory' ? BASE_TOKENS.colors.blue[600] : BASE_TOKENS.colors.gray[600],
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onClick={() => setActiveTab('loginHistory')}
        >
          Login History
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {activeTab === 'devices' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: BASE_TOKENS.spacing.sm
          }}>
            {devicesData.map((device) => {
              const colors = getStatusColor(device.status);
              return (
                <div
                  key={device.id}
                  style={{
                    padding: BASE_TOKENS.spacing.md,
                    borderRadius: BASE_TOKENS.borderRadius.md,
                    border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
                    backgroundColor: BASE_TOKENS.colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '60px',
                    gap: BASE_TOKENS.spacing.md
                  }}
                >
                  {/* Left Column - Device Icon */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.bg,
                    borderRadius: BASE_TOKENS.borderRadius.md,
                    border: `1px solid ${colors.border}`
                  }}>
                    {device.device.includes('iPhone') ? (
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
                    display: 'flex',
                    flexDirection: 'column',
                    gap: BASE_TOKENS.spacing.xs
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: BASE_TOKENS.spacing.sm
                    }}>
                      <span style={{
                        fontSize: BASE_TOKENS.typography.fontSize.sm,
                        fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                        color: BASE_TOKENS.colors.gray[800]
                      }}>
                        {device.device}
                      </span>
                      <div style={{
                        padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
                        backgroundColor: colors.badge,
                        color: colors.badgeText,
                        fontSize: BASE_TOKENS.typography.fontSize.xs,
                        fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                        borderRadius: BASE_TOKENS.borderRadius.full
                      }}>
                        {getStatusLabel(device.status)}
                      </div>
                    </div>
                    <div style={{
                      fontSize: BASE_TOKENS.typography.fontSize.xs,
                      color: BASE_TOKENS.colors.gray[600],
                      display: 'flex',
                      alignItems: 'center',
                      gap: BASE_TOKENS.spacing.xs
                    }}>
                      <span>{device.os}</span>
                      <span style={{ color: BASE_TOKENS.colors.gray[400] }}>•</span>
                      <span>{device.location}</span>
                    </div>
                  </div>

                  {/* Right Column - Timestamp */}
                  <div style={{
                    flexShrink: 0,
                    textAlign: 'right'
                  }}>
                    <div style={{
                      fontSize: BASE_TOKENS.typography.fontSize.xs,
                      color: BASE_TOKENS.colors.gray[500],
                      fontWeight: BASE_TOKENS.typography.fontWeight.medium
                    }}>
                      {device.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
          
        {activeTab === 'loginHistory' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: BASE_TOKENS.spacing.sm
          }}>
            {loginHistoryData.map((login) => (
              <div
                key={login.id}
                style={{
                  padding: BASE_TOKENS.spacing.md,
                  borderRadius: BASE_TOKENS.borderRadius.md,
                  border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
                  backgroundColor: BASE_TOKENS.colors.white,
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '60px',
                  gap: BASE_TOKENS.spacing.md
                }}
              >
                {/* Left Column - Status Icon */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: BASE_TOKENS.colors.green[50],
                  borderRadius: BASE_TOKENS.borderRadius.md,
                  border: `1px solid ${BASE_TOKENS.colors.green[200]}`
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BASE_TOKENS.colors.green[700]} strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>

                {/* Middle Column - Login Information */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: BASE_TOKENS.spacing.xs
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: BASE_TOKENS.spacing.sm
                  }}>
                    <span style={{
                      fontSize: BASE_TOKENS.typography.fontSize.sm,
                      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                      color: BASE_TOKENS.colors.gray[800]
                    }}>
                      {login.device}
                    </span>
                    <div style={{
                      padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
                      backgroundColor: BASE_TOKENS.colors.green[100],
                      color: BASE_TOKENS.colors.green[800],
                      fontSize: BASE_TOKENS.typography.fontSize.xs,
                      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                      borderRadius: BASE_TOKENS.borderRadius.full
                    }}>
                      Success
                    </div>
                  </div>
                  <div style={{
                    fontSize: BASE_TOKENS.typography.fontSize.xs,
                    color: BASE_TOKENS.colors.gray[600],
                    display: 'flex',
                    alignItems: 'center',
                    gap: BASE_TOKENS.spacing.xs
                  }}>
                    <span>{login.location}</span>
                    <span style={{ color: BASE_TOKENS.colors.gray[400] }}>•</span>
                    <span>{login.ipAddress}</span>
                  </div>
                </div>

                {/* Right Column - Timestamp */}
                <div style={{
                  flexShrink: 0,
                  textAlign: 'right'
                }}>
                  <div style={{
                    fontSize: BASE_TOKENS.typography.fontSize.xs,
                    color: BASE_TOKENS.colors.gray[500],
                    fontWeight: BASE_TOKENS.typography.fontWeight.medium
                  }}>
                    {formatDate(login.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicesSecurity;
