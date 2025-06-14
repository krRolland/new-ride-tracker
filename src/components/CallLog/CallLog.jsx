import React, { useState, useEffect, useRef } from 'react';
import { BASE_TOKENS } from '../../tokens';
import EmbeddedTimeline from '../EmbeddedTimeline';
import CallItem from './CallItem';
import AudioPreview from '../AudioPreview';

// CallLog Component
const CallLog = ({ callsData }) => {
  const [selectedCall, setSelectedCall] = useState(null);

  // Set the first call as selected by default for initial display
  useEffect(() => {
    if (callsData.length > 0 && !selectedCall) {
      setSelectedCall(callsData[0]);
    }
  }, [callsData, selectedCall]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row', // Changed to row to handle columns directly
      position: 'relative',
      height: '500px',
      overflow: 'hidden'
    }}>
      {/* The component now directly lays out its two main children */}
      <AllCalls
        calls={callsData}
        onSelectCall={setSelectedCall}
        selectedCallId={selectedCall?.id}
      />
      {selectedCall && (
        <CallDetails call={selectedCall} />
      )}
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
    // Remove special background colors for consistent appearance
    return 'transparent';
  };

  const getCallBorder = (call, isSelected) => {
    if (isSelected) {
      return `1px solid ${BASE_TOKENS.colors.blue[500]}`;
    }
    return `1px solid transparent`;
  };

  return (
    <div style={{
      flex: '0 0 380px', // Increased by 30px from 350px
      padding: BASE_TOKENS.spacing['2xl'], // Changed from lg to 2xl for proper alignment
      borderRight: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }}>
      

      <div style={{
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        {/* Search bar with icon */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <svg 
            style={{
              position: 'absolute',
              left: BASE_TOKENS.spacing.sm,
              width: '16px',
              height: '16px',
              color: BASE_TOKENS.colors.gray[400],
              pointerEvents: 'none',
              zIndex: 1
            }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: '100%',
              padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing['2xl']}`,
              border: '1px solid #E1E1E1',
              backgroundColor: '#F9FAFB',
              borderRadius: BASE_TOKENS.borderRadius.md,
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              outline: 'none'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div style={{
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        <span style={{
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          color: BASE_TOKENS.colors.gray[700],
          fontWeight: BASE_TOKENS.typography.fontWeight.medium,
          display: 'block',
          marginBottom: BASE_TOKENS.spacing.sm
        }}>
          Label:
        </span>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: BASE_TOKENS.spacing.md
        }}>
          {/* Fraud Risk Pill */}
          <button
          style={{
            padding: `calc(${BASE_TOKENS.spacing.xs} + 4px) calc(${BASE_TOKENS.spacing.sm} + 4px)`,
            border: `0.5px solid ${colorBy === 'Fraud Risk' ? BASE_TOKENS.colors.red[500] : '#E1E1E1'}`,
            borderRadius: BASE_TOKENS.borderRadius.full,
            backgroundColor: colorBy === 'Fraud Risk' ? BASE_TOKENS.colors.red[100] : '#F9FAFB',
            color: colorBy === 'Fraud Risk' ? BASE_TOKENS.colors.red[700] : BASE_TOKENS.colors.gray[700],
            fontSize: BASE_TOKENS.typography.fontSize.xs,
            fontWeight: BASE_TOKENS.typography.fontWeight.medium,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onClick={() => setColorBy(colorBy === 'Fraud Risk' ? null : 'Fraud Risk')}
          onMouseEnter={(e) => {
            if (colorBy !== 'Fraud Risk') {
              e.target.style.backgroundColor = BASE_TOKENS.colors.gray[50];
            }
          }}
          onMouseLeave={(e) => {
            if (colorBy !== 'Fraud Risk') {
              e.target.style.backgroundColor = '#F9FAFB';
            }
          }}
        >
          Fraud Risk
        </button>
        
        {/* Sentiment Pill */}
        <button
          style={{
            padding: `calc(${BASE_TOKENS.spacing.xs} + 4px) calc(${BASE_TOKENS.spacing.sm} + 4px)`,
            border: `0.5px solid ${colorBy === 'Sentiment' ? BASE_TOKENS.colors.blue[500] : '#E1E1E1'}`,
            borderRadius: BASE_TOKENS.borderRadius.full,
            backgroundColor: colorBy === 'Sentiment' ? BASE_TOKENS.colors.blue[100] : '#F9FAFB',
            color: colorBy === 'Sentiment' ? BASE_TOKENS.colors.blue[700] : BASE_TOKENS.colors.gray[700],
            fontSize: BASE_TOKENS.typography.fontSize.xs,
            fontWeight: BASE_TOKENS.typography.fontWeight.medium,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onClick={() => setColorBy(colorBy === 'Sentiment' ? null : 'Sentiment')}
          onMouseEnter={(e) => {
            if (colorBy !== 'Sentiment') {
              e.target.style.backgroundColor = BASE_TOKENS.colors.gray[50];
            }
          }}
          onMouseLeave={(e) => {
            if (colorBy !== 'Sentiment') {
              e.target.style.backgroundColor = '#F9FAFB';
            }
          }}
        >
          Sentiment
        </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflowY: 'auto',
        paddingRight: BASE_TOKENS.spacing.xs,
        position: 'relative'
      }}>
        {filteredCalls.map((call, index) => {
          const isSelected = selectedCallId === call.id;
          const isLastItem = index === filteredCalls.length - 1;
          return (
            <div key={call.id} style={{ position: 'relative' }}>
              <CallItem
                call={call}
                isSelected={false} // Never pass selected state to CallItem
                onSelectCall={onSelectCall}
                colorBy={colorBy}
                getCallBackgroundColor={getCallBackgroundColor}
                getCallBorder={getCallBorder}
              />
              
              {/* Single separator line between items */}
              {!isLastItem && (
                <div style={{
                  height: '1px',
                  backgroundColor: BASE_TOKENS.colors.gray[200],
                  marginLeft: BASE_TOKENS.spacing.md,
                  marginRight: BASE_TOKENS.spacing.md
                }} />
              )}
              
              {/* Highlight overlay that appears over selected items */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: `-${BASE_TOKENS.spacing.md}`,
                  right: `-${BASE_TOKENS.spacing.md}`,
                  bottom: isLastItem ? 0 : '1px', // Don't cover the separator line
                  border: `1px solid ${BASE_TOKENS.colors.black}`,
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: BASE_TOKENS.borderRadius.md,
                  pointerEvents: 'none', // Allow clicks to pass through to the CallItem
                  zIndex: 1
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// CallDetails Component
const CallDetails = ({ call }) => {
  const [activeTab, setActiveTab] = useState('agent');
  
  const getSentimentBackgroundColor = (sentiment) => {
    if (sentiment >= 8) return BASE_TOKENS.colors.green[500];
    if (sentiment >= 6) return BASE_TOKENS.colors.yellow[500];
    return BASE_TOKENS.colors.red[500];
  };

  // Function to format date to "July 3rd, 2025" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options).replace(/(\d+),/, (match, day) => {
      const dayNum = parseInt(day);
      let suffix = 'th';
      if (dayNum % 10 === 1 && dayNum !== 11) suffix = 'st';
      else if (dayNum % 10 === 2 && dayNum !== 12) suffix = 'nd';
      else if (dayNum % 10 === 3 && dayNum !== 13) suffix = 'rd';
      return dayNum + suffix + ',';
    });
  };

  return (
    <div style={{
      flex: 1,
      minWidth: 0, // Added for robust flex behavior
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: '#FAFAFA'
    }}>
      
      {/* Fixed Header Section with Grey Background */}
      <div style={{
        flexShrink: 0,
        backgroundColor: BASE_TOKENS.colors.gray[50],
        padding: `${BASE_TOKENS.spacing.lg} ${BASE_TOKENS.spacing['2xl']}`,
        borderBottom: `1px solid ${BASE_TOKENS.colors.gray[200]}`
      }}>
        {/* Single Row - Title and Metrics */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Left Side - Title and Description */}
          <div>
            <h2 style={{
              fontSize: BASE_TOKENS.typography.fontSize['2xl'],
              fontWeight: BASE_TOKENS.typography.fontWeight.bold,
              color: BASE_TOKENS.colors.gray[800],
              margin: 0,
              marginBottom: BASE_TOKENS.spacing.xs
            }}>
              Support for Lost Phone
            </h2>
            <p style={{
              color: BASE_TOKENS.colors.gray[500],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              fontWeight: BASE_TOKENS.typography.fontWeight.normal,
              margin: 0,
              marginTop: '10px'
            }}>
              {formatDate(call.dateTime.split(' - ')[0])} • {call.duration} • {call.agent.split(' ')[1]} • Case #8742
            </p>
          </div>

          {/* Right Side - Metrics */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: BASE_TOKENS.spacing.lg
          }}>
            {/* Customer Satisfaction */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: BASE_TOKENS.spacing.xs
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700"/>
              </svg>
              <span style={{
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                color: BASE_TOKENS.colors.gray[800]
              }}>
                8.5
              </span>
              <span style={{
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                color: BASE_TOKENS.colors.gray[500]
              }}>
                /10
              </span>
            </div>

            {/* Fraud Risk */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: BASE_TOKENS.spacing.xs
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L22 8.5V15.5C22 16.61 21.35 17.61 20.35 18.04L12 22L3.65 18.04C2.65 17.61 2 16.61 2 15.5V8.5L12 2ZM12 7C10.9 7 10 7.9 10 9S10.9 11 12 11 14 10.1 14 9 13.1 7 12 7ZM12 13C10.9 13 10 13.9 10 15S10.9 17 12 17 14 16.1 14 15 13.1 13 12 13Z" fill="#EF4444"/>
              </svg>
              <span style={{
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                color: BASE_TOKENS.colors.gray[800]
              }}>
                7
              </span>
              <span style={{
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                color: BASE_TOKENS.colors.gray[500]
              }}>
                /10
              </span>
            </div>

            {/* Status Badge */}
            <div style={{
              padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.md}`,
              backgroundColor: BASE_TOKENS.colors.green[500],
              color: BASE_TOKENS.colors.white,
              borderRadius: BASE_TOKENS.borderRadius.full,
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              fontWeight: BASE_TOKENS.typography.fontWeight.medium
            }}>
              Resolved
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: BASE_TOKENS.spacing.lg,
        padding: `0 ${BASE_TOKENS.spacing['2xl']} ${BASE_TOKENS.spacing.lg} ${BASE_TOKENS.spacing['2xl']}`,
        marginTop:'20px',
      }}>
        

        {/* Audio Preview - Full Width Row */}
        <div style={{
          width: '100%'
        }}>
          <AudioPreview duration={call.duration} />
        </div>

        {/* Tabbed Content Section - Full Width */}
        <div style={{
          width: '100%'
        }}>
          <div style={{
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
                borderBottom: activeTab === 'agent' ? `2px solid ${BASE_TOKENS.colors.blue[500]}` : '2px solid transparent',
                color: activeTab === 'agent' ? BASE_TOKENS.colors.blue[600] : BASE_TOKENS.colors.gray[600],
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onClick={() => setActiveTab('agent')}
            >
              Agent Information
            </button>
            <button 
              style={{
                padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'timeline' ? `2px solid ${BASE_TOKENS.colors.blue[500]}` : '2px solid transparent',
                color: activeTab === 'timeline' ? BASE_TOKENS.colors.blue[600] : BASE_TOKENS.colors.gray[600],
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onClick={() => setActiveTab('timeline')}
            >
              Call Timeline
            </button>
            <button 
              style={{
                padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'transcript' ? `2px solid ${BASE_TOKENS.colors.blue[500]}` : '2px solid transparent',
                color: activeTab === 'transcript' ? BASE_TOKENS.colors.blue[600] : BASE_TOKENS.colors.gray[600],
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onClick={() => setActiveTab('transcript')}
            >
              Transcript
            </button>
          </div>
          
          {activeTab === 'agent' && (
            <div style={{
              backgroundColor: BASE_TOKENS.colors.gray[50],
              border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
              borderRadius: BASE_TOKENS.borderRadius.lg,
              padding: BASE_TOKENS.spacing.lg,
              boxShadow: BASE_TOKENS.shadows.sm
            }}>
              {/* Agent Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: BASE_TOKENS.spacing.md,
                marginBottom: BASE_TOKENS.spacing.lg
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: BASE_TOKENS.borderRadius.full,
                  backgroundColor: BASE_TOKENS.colors.gray[200],
                  border: `2px solid ${BASE_TOKENS.colors.white}`,
                  boxShadow: BASE_TOKENS.shadows.sm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img 
                    src={call.agent === 'Agent Smith' ? '/headshot-1.png' : 
                         call.agent === 'Agent Davis' ? '/headshot-2.png' : 
                         call.agent === 'Agent Johnson' ? '/headshot-5.png' : 
                         '/headshot-6.png'} 
                    alt={`${call.agent} avatar`}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: BASE_TOKENS.borderRadius.full,
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div>
                  <p style={{
                    color: BASE_TOKENS.colors.gray[800],
                    fontSize: BASE_TOKENS.typography.fontSize.lg,
                    fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                    margin: 0,
                    marginBottom: '4px'
                  }}>
                    {call.agent}
                  </p>
                  <p style={{
                    color: BASE_TOKENS.colors.gray[600],
                    fontSize: BASE_TOKENS.typography.fontSize.sm,
                    margin: 0
                  }}>
                    Duration: {call.duration}
                  </p>
                </div>
              </div>
              
              {/* Agent Notes */}
              {call.details.notes && (
                <div>
                  <p style={{
                    color: BASE_TOKENS.colors.gray[700],
                    fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                    marginBottom: BASE_TOKENS.spacing.md,
                    margin: 0,
                    fontSize: BASE_TOKENS.typography.fontSize.md
                  }}>
                    Agent Notes
                  </p>
                  <p style={{
                    color: BASE_TOKENS.colors.gray[600],
                    fontSize: BASE_TOKENS.typography.fontSize.sm,
                    lineHeight: BASE_TOKENS.typography.lineHeight.relaxed,
                    margin: 0
                  }}>
                    {call.details.notes}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'timeline' && (
            <EmbeddedTimeline 
              items={call.details.events.map((event, index) => ({
                id: `event-${index}`,
                title: event.description,
                time: event.time,
                subtitle: event.subtitle,
                status: 'completed'
              }))}
              maxWidth="100%"
              complete={true}
            />
          )}
          
          {activeTab === 'transcript' && (
            <div style={{
              padding: BASE_TOKENS.spacing.lg,
              backgroundColor: BASE_TOKENS.colors.gray[50],
              borderRadius: BASE_TOKENS.borderRadius.md,
              border: `1px solid ${BASE_TOKENS.colors.gray[200]}`
            }}>
              <p style={{
                color: BASE_TOKENS.colors.gray[600],
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                lineHeight: BASE_TOKENS.typography.lineHeight.relaxed,
                margin: 0
              }}>
                Call transcript functionality would be displayed here. This could include the full conversation between the customer and agent, with timestamps and speaker identification.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallLog;
