import React, { useState } from 'react';
import ExpandableChatBox from '../ChatBox/ExpandableChatBox';
import RideTrackingDashboard from '../RideTrackingDashboard/RideTrackingDashboard';
import { BASE_TOKENS } from '../../tokens';
import { mockRideData } from '../../data/mockData';

const ChatDemo = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
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
          flex: isChatExpanded ? '0 0 calc(600px + 64px)' : '0 0 calc(400px + 64px)',
          padding: BASE_TOKENS.spacing.xl,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'flex 0.4s ease-in-out',
          backgroundColor: BASE_TOKENS.colors.gray[50]
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: BASE_TOKENS.spacing.xl
          }}>
            <h1 style={{
              fontSize: BASE_TOKENS.typography.fontSize['2xl'],
              fontWeight: BASE_TOKENS.typography.fontWeight.bold,
              color: BASE_TOKENS.colors.gray[900],
              margin: 0,
              marginBottom: BASE_TOKENS.spacing.sm
            }}>
              Welcome to Operative!
            </h1>
            <p style={{
              fontSize: BASE_TOKENS.typography.fontSize.md,
              color: BASE_TOKENS.colors.gray[600],
              margin: 0
            }}>
              What should we get started building?
            </p>
          </div>

          <ExpandableChatBox 
            width="450px"
            height="550px"
            position="relative"
            onExpansionChange={setIsChatExpanded}
          />
        </div>

        {/* Right Column - Ride Tracking Dashboard */}
        <div style={{
          flex: 1,
          padding: BASE_TOKENS.spacing.md,
          paddingRight: BASE_TOKENS.spacing.xl
        }}>
          <div style={{
            border: `2px solid ${BASE_TOKENS.colors.gray[300]}`,
            borderRadius: BASE_TOKENS.borderRadius.lg,
            overflow: 'scroll',
            boxShadow: BASE_TOKENS.shadows.lg,
            height: '100%'
          }}>
            <RideTrackingDashboard 
              tripInfo={mockRideData.tripInfo}
              timelineData={mockRideData.timelineData}
              callLogs={mockRideData.callLogs}
              messages={mockRideData.messages}
              driver={mockRideData.driver}
              rider={mockRideData.rider}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
