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
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      boxShadow: BASE_TOKENS.shadows.md,
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
    if (colorBy === 'Fraud Risk' && call.fraudRisk) {
      return BASE_TOKENS.colors.red[100];
    }
    if (colorBy === 'Sentiment') {
      if (call.details.sentiment < 6) return BASE_TOKENS.colors.yellow[100];
      if (call.details.sentiment >= 8) return BASE_TOKENS.colors.green[100];
    }
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
      flex: '0 0 300px',
      padding: BASE_TOKENS.spacing['2xl'], // Changed from lg to 2xl for proper alignment
      borderRight: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Header for the entire Calls section */}
      <h2 style={{
        fontSize: BASE_TOKENS.typography.fontSize.xl,
        fontWeight: BASE_TOKENS.typography.fontWeight.bold,
        color: BASE_TOKENS.colors.gray[800],
        margin: 0,
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        Calls
      </h2>

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
              border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
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
            padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
            border: `1px solid ${colorBy === 'Fraud Risk' ? BASE_TOKENS.colors.red[500] : BASE_TOKENS.colors.gray[300]}`,
            borderRadius: BASE_TOKENS.borderRadius.full,
            backgroundColor: colorBy === 'Fraud Risk' ? BASE_TOKENS.colors.red[100] : BASE_TOKENS.colors.white,
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
              e.target.style.backgroundColor = BASE_TOKENS.colors.white;
            }
          }}
        >
          Fraud Risk
        </button>
        
        {/* Sentiment Pill */}
        <button
          style={{
            padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
            border: `1px solid ${colorBy === 'Sentiment' ? BASE_TOKENS.colors.blue[500] : BASE_TOKENS.colors.gray[300]}`,
            borderRadius: BASE_TOKENS.borderRadius.full,
            backgroundColor: colorBy === 'Sentiment' ? BASE_TOKENS.colors.blue[100] : BASE_TOKENS.colors.white,
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
              e.target.style.backgroundColor = BASE_TOKENS.colors.white;
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
        gap: BASE_TOKENS.spacing.sm,
        flex: 1,
        overflowY: 'auto',
        paddingRight: BASE_TOKENS.spacing.xs
      }}>
        {filteredCalls.map((call) => {
          const isSelected = selectedCallId === call.id;
          return (
            <CallItem
              key={call.id}
              call={call}
              isSelected={isSelected}
              onSelectCall={onSelectCall}
              colorBy={colorBy}
              getCallBackgroundColor={getCallBackgroundColor}
              getCallBorder={getCallBorder}
            />
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
      overflow: 'hidden'
    }}>
      
      {/* Fixed Header Section with Grey Background */}
      <div style={{
        flexShrink: 0,
        backgroundColor: BASE_TOKENS.colors.gray[50],
        // Removed negative margins and redundant properties
        padding: `${BASE_TOKENS.spacing['2xl']} ${BASE_TOKENS.spacing['2xl']} ${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing['2xl']}`,
        boxShadow: '1px 1px 6px rgba(0,0,0,.1)'
      }}>
        {/* Title Section - matching "Calls" header style and position */}
        <div style={{
          paddingBottom: BASE_TOKENS.spacing.lg,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h2 style={{
              fontSize: BASE_TOKENS.typography.fontSize.xl,
              fontWeight: BASE_TOKENS.typography.fontWeight.bold,
              color: BASE_TOKENS.colors.gray[800],
              margin: 0,
              marginBottom: BASE_TOKENS.spacing.md
            }}>
              {call.type}
            </h2>
            <p style={{
              color: BASE_TOKENS.colors.gray[600],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              margin: 0
            }}>
              Customer called about {call.details.reason.toLowerCase()} from recent trip.
            </p>
          </div>
          
          {/* Status Badge on the right */}
          <div style={{
            padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
            backgroundColor: BASE_TOKENS.colors.green[500],
            color: BASE_TOKENS.colors.white,
            borderRadius: BASE_TOKENS.borderRadius.full,
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            boxShadow: BASE_TOKENS.shadows.md,
            flexShrink: 0
          }}>
            {call.details.resolution}
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
        {/* Call Details Grid - 3 columns */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          backgroundColor: BASE_TOKENS.colors.white,
          borderRadius: BASE_TOKENS.borderRadius.lg,
          padding: BASE_TOKENS.spacing.lg,
          boxShadow: BASE_TOKENS.shadows.sm
        }}>
          {/* Date & Time */}
          <div style={{
            flex: 1,
            textAlign: 'left',
            paddingRight: BASE_TOKENS.spacing.lg,
            borderRight: `1px solid ${BASE_TOKENS.colors.gray[200]}`
          }}>
            <p style={{
              color: BASE_TOKENS.colors.gray[800],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              fontWeight: BASE_TOKENS.typography.fontWeight.medium,
              margin: 0,
              marginBottom: BASE_TOKENS.spacing.sm,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {formatDate(call.dateTime.split(' - ')[0])}
            </p>
            <p style={{
              color: BASE_TOKENS.colors.gray[600],
              fontSize: BASE_TOKENS.typography.fontSize.xs,
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {call.dateTime.split(' - ')[1]}
            </p>
          </div>

          {/* Issue Type */}
          <div style={{
            flex: 1,
            textAlign: 'left',
            paddingLeft: BASE_TOKENS.spacing.lg,
            paddingRight: BASE_TOKENS.spacing.lg,
            borderRight: `1px solid ${BASE_TOKENS.colors.gray[200]}`
          }}>
            <p style={{
              color: BASE_TOKENS.colors.gray[800],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              fontWeight: BASE_TOKENS.typography.fontWeight.medium,
              margin: 0,
              marginBottom: BASE_TOKENS.spacing.sm,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {call.type}
            </p>
            <p style={{
              color: BASE_TOKENS.colors.gray[600],
              fontSize: BASE_TOKENS.typography.fontSize.xs,
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {call.details.reason}
            </p>
          </div>

          {/* Customer Sentiment */}
          <div style={{
            flex: 1,
            textAlign: 'left',
            paddingLeft: BASE_TOKENS.spacing.lg
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: BASE_TOKENS.spacing.sm
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: BASE_TOKENS.borderRadius.full,
                backgroundColor: getSentimentBackgroundColor(call.details.sentiment),
                boxShadow: BASE_TOKENS.shadows.sm,
                border: `2px solid ${BASE_TOKENS.colors.white}`
              }}>
                <span style={{
                  color: BASE_TOKENS.colors.white,
                  fontSize: BASE_TOKENS.typography.fontSize.md,
                  fontWeight: BASE_TOKENS.typography.fontWeight.bold,
                  lineHeight: 1
                }}>
                  {call.details.sentiment}
                </span>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <span style={{
                  color: BASE_TOKENS.colors.gray[400],
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                  lineHeight: 1.2
                }}>
                  out of
                </span>
                <span style={{
                  color: BASE_TOKENS.colors.gray[600],
                  fontSize: BASE_TOKENS.typography.fontSize.sm,
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  lineHeight: 1.2
                }}>
                  10
                </span>
              </div>
            </div>
          </div>
        </div>

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
