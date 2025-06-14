import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BASE_TOKENS } from '../../tokens';
import EmbeddedTimeline from '../EmbeddedTimeline';
import CallItem from './CallItem';
import CompactAudioPreview from '../AudioPreview/CompactAudioPreview';

// CallLog Component
const CallLog = ({ callsData }) => {
  const [selectedCall, setSelectedCall] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Set the first call as selected by default for initial display
  useEffect(() => {
    if (callsData.length > 0 && !selectedCall) {
      setSelectedCall(callsData[0]);
      // Set a timeout to mark initial load as complete after animations would finish
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
    }
  }, [callsData, selectedCall]);

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

  return (
    <motion.div 
      style={{
        display: 'flex',
        flexDirection: 'row', // Changed to row to handle columns directly
        position: 'relative',
        height: '100vh',
        overflow: 'hidden'
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* The component now directly lays out its two main children */}
      <motion.div variants={componentVariants}>
        <AllCalls
          calls={callsData}
          onSelectCall={setSelectedCall}
          selectedCallId={selectedCall?.id}
          isInitialLoad={isInitialLoad}
        />
      </motion.div>
      {selectedCall && (
        <motion.div variants={componentVariants}>
          <CallDetails call={selectedCall} />
        </motion.div>
      )}
    </motion.div>
  );
};

// AllCalls Component
const AllCalls = ({ calls, onSelectCall, selectedCallId, isInitialLoad }) => {
  const [sortBy, setSortBy] = useState('Newest First');
  const [colorBy, setColorBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const [hasInitialSelection, setHasInitialSelection] = useState(false);
  const filtersDropdownRef = useRef(null);

  // Track when initial selection happens
  useEffect(() => {
    if (selectedCallId && !hasInitialSelection) {
      setHasInitialSelection(true);
    }
  }, [selectedCallId, hasInitialSelection]);

  // Close filters dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersDropdownRef.current && !filtersDropdownRef.current.contains(event.target)) {
        setShowFiltersDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      flex: '0 0 420px', // Increased by 40px from 380px
      padding: BASE_TOKENS.spacing['2xl'], // Changed from lg to 2xl for proper alignment
      borderRight: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }}>
      

      {/* Header with call count and filters */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        <span style={{
          fontSize: BASE_TOKENS.typography.fontSize.sm,
          color: BASE_TOKENS.colors.black,
          fontWeight: BASE_TOKENS.typography.fontWeight.medium
        }}>
          {filteredCalls.length} Calls
        </span>
        
        {/* Filters Dropdown */}
        <div style={{ position: 'relative' }} ref={filtersDropdownRef}>
          <button
            onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: BASE_TOKENS.spacing.xs,
              padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
              border: 'none',
              borderRadius: BASE_TOKENS.borderRadius.md,
              backgroundColor: 'transparent',
              color: BASE_TOKENS.colors.black,
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              fontWeight: BASE_TOKENS.typography.fontWeight.medium,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.gray[100];
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            Filters
            <svg 
              style={{
                width: '14px',
                height: '14px',
                transform: showFiltersDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showFiltersDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: BASE_TOKENS.spacing.xs,
              backgroundColor: BASE_TOKENS.colors.white,
              border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
              borderRadius: BASE_TOKENS.borderRadius.lg,
              boxShadow: BASE_TOKENS.shadows.lg,
              zIndex: 100,
              minWidth: '200px',
              padding: BASE_TOKENS.spacing.sm
            }}>
              {/* Sort Options */}
              <div style={{ marginBottom: BASE_TOKENS.spacing.md }}>
                <div style={{
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[500],
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: BASE_TOKENS.spacing.sm
                }}>
                  Sort By
                </div>
                {['Newest First', 'Oldest First', 'Duration (Shortest)', 'Duration (Longest)'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowFiltersDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: BASE_TOKENS.spacing.sm,
                      border: 'none',
                      background: sortBy === option ? BASE_TOKENS.colors.blue[50] : 'transparent',
                      color: sortBy === option ? BASE_TOKENS.colors.blue[700] : BASE_TOKENS.colors.gray[700],
                      fontSize: BASE_TOKENS.typography.fontSize.sm,
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: BASE_TOKENS.borderRadius.md,
                      marginBottom: BASE_TOKENS.spacing.xs
                    }}
                    onMouseOver={(e) => {
                      if (sortBy !== option) {
                        e.target.style.backgroundColor = BASE_TOKENS.colors.gray[50];
                      }
                    }}
                    onMouseOut={(e) => {
                      if (sortBy !== option) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {/* Color By Options */}
              <div>
                <div style={{
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                  color: BASE_TOKENS.colors.gray[500],
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: BASE_TOKENS.spacing.sm
                }}>
                  Color By
                </div>
                {[
                  { label: 'None', value: null },
                  { label: 'Fraud Risk', value: 'Fraud Risk' },
                  { label: 'Sentiment', value: 'Sentiment' }
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => {
                      setColorBy(option.value);
                      setShowFiltersDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: BASE_TOKENS.spacing.sm,
                      border: 'none',
                      background: colorBy === option.value ? BASE_TOKENS.colors.blue[50] : 'transparent',
                      color: colorBy === option.value ? BASE_TOKENS.colors.blue[700] : BASE_TOKENS.colors.gray[700],
                      fontSize: BASE_TOKENS.typography.fontSize.sm,
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: BASE_TOKENS.borderRadius.md,
                      marginBottom: BASE_TOKENS.spacing.xs
                    }}
                    onMouseOver={(e) => {
                      if (colorBy !== option.value) {
                        e.target.style.backgroundColor = BASE_TOKENS.colors.gray[50];
                      }
                    }}
                    onMouseOut={(e) => {
                      if (colorBy !== option.value) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
              padding: `calc(${BASE_TOKENS.spacing.sm} + 4px) ${BASE_TOKENS.spacing.sm} calc(${BASE_TOKENS.spacing.sm} + 4px) calc(${BASE_TOKENS.spacing['2xl']} + 4px)`,
              border: 'none',
              backgroundColor: '#EEEEEE',
              borderRadius: BASE_TOKENS.borderRadius.full,
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              outline: 'none'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
          const isFirstCall = index === 0;
          // Don't animate if this is initial load OR if this is the first call and we haven't had user interaction yet
          const shouldAnimate = !isInitialLoad && hasInitialSelection && !(isFirstCall && !hasInitialSelection);
          const isLastItem = index === filteredCalls.length - 1;
          return (
            <div key={call.id} style={{ position: 'relative' }}>
              {/* Super light gray overlay for selected items - extends to pane edges */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: `-${BASE_TOKENS.spacing['2xl']}`,
                right: `-${BASE_TOKENS.spacing['2xl']}`,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                opacity: isSelected ? 1 : 0,
                transition: shouldAnimate ? 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              
              <div style={{
                transform: isSelected ? 'translateX(5px)' : 'translateX(0)',
                transition: shouldAnimate ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                position: 'relative',
                zIndex: 1
              }}>
                <CallItem
                  call={call}
                  isSelected={false} // Never pass selected state to CallItem
                  onSelectCall={onSelectCall}
                  colorBy={colorBy}
                  getCallBackgroundColor={getCallBackgroundColor}
                  getCallBorder={getCallBorder}
                />
              </div>
              
              {/* Thick left border indicator for selected items */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '5px',
                backgroundColor: BASE_TOKENS.colors.black,
                opacity: isSelected ? 1 : 0,
                transform: isSelected ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left center',
                transition: shouldAnimate ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                pointerEvents: 'none',
                zIndex: 2
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// CallDetails Component
const CallDetails = ({ call }) => {
  const [activeTab, setActiveTab] = useState('summary');
  
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
      flex: '1 1 0',
      minWidth: '600px', // Fixed minimum width to prevent shrinking
      maxWidth: 'none',
      width: 'auto',
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
        padding: `${BASE_TOKENS.spacing.lg} ${BASE_TOKENS.spacing['2xl']}`
      }}>
        {/* Single Row - Title and Metrics */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Left Side - Title and Description */}
          <div>
            <div style={{
              paddingTop: '16px',
              paddingBottom: '16px',
              marginTop: '0px',
              marginBottom: '15px'
            }}>
              <h2 style={{
                fontSize: '19px',
                fontWeight: BASE_TOKENS.typography.fontWeight.bold,
                color: BASE_TOKENS.colors.gray[900],
                margin: 0
              }}>
                Support for Lost Phone
              </h2>
            </div>
            <p style={{
              color: BASE_TOKENS.colors.gray[500],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              fontWeight: BASE_TOKENS.typography.fontWeight.normal,
              margin: 0,
              marginTop: '-20px'
            }}>
              {formatDate(call.dateTime.split(' - ')[0])} • Case #8742
            </p>
          </div>

          {/* Right Side - Status Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            {/* Status Badge */}
            <div style={{
              padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.md}`,
              backgroundColor: '#0D8345',
              color: '#FFFFFF',
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
        

        {/* Compact Audio Preview - Full Width Row */}
        <div style={{
          width: '100%'
        }}>
          <CompactAudioPreview duration={call.duration} />
        </div>

        {/* Tabbed Content Section - Full Width */}
        <div style={{
          width: '100%'
        }}>
          <div style={{
            borderBottom: `2px solid ${BASE_TOKENS.colors.gray[200]}`,
            marginBottom: BASE_TOKENS.spacing.md,
            display: 'flex',
            gap: BASE_TOKENS.spacing.md
          }}>
            <button 
              style={{
                padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'summary' ? `2px solid ${BASE_TOKENS.colors.black}` : '2px solid transparent',
                color: activeTab === 'summary' ? BASE_TOKENS.colors.black : BASE_TOKENS.colors.gray[600],
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button 
              style={{
                padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'timeline' ? `2px solid ${BASE_TOKENS.colors.black}` : '2px solid transparent',
                color: activeTab === 'timeline' ? BASE_TOKENS.colors.black : BASE_TOKENS.colors.gray[600],
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
                borderBottom: activeTab === 'transcript' ? `2px solid ${BASE_TOKENS.colors.black}` : '2px solid transparent',
                color: activeTab === 'transcript' ? BASE_TOKENS.colors.black : BASE_TOKENS.colors.gray[600],
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
          
          {activeTab === 'summary' && (
            <div style={{
              padding: BASE_TOKENS.spacing['2xl'],
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: BASE_TOKENS.borderRadius.lg,
              boxShadow: 'none'
            }}>
              {/* Agent Profile Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: BASE_TOKENS.spacing.lg,
                alignItems: 'center',
                marginBottom: BASE_TOKENS.spacing.lg
              }}>
                {/* Profile Photo */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: BASE_TOKENS.borderRadius.full,
                  backgroundColor: BASE_TOKENS.colors.gray[200],
                  border: `3px solid ${BASE_TOKENS.colors.white}`,
                  boxShadow: BASE_TOKENS.shadows.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img 
                    src={call.agent === 'Agent Alex' ? '/alex-headshot.png' : 
                         call.agent === 'Agent Davis' ? '/davis-headshot.png' : 
                         call.agent === 'Agent Johnson' ? '/johnson-headshot.png' : 
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
                
                {/* Agent Name and Role */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <h3 style={{
                    color: BASE_TOKENS.colors.gray[900],
                    fontSize: '15px',
                    fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                    margin: 0,
                    marginBottom: BASE_TOKENS.spacing.xs,
                    lineHeight: BASE_TOKENS.typography.lineHeight.sm
                  }}>
                    {call.agent.split(' ')[1]} {/* Extract just the name part */}
                  </h3>
                  <p style={{
                    color: BASE_TOKENS.colors.gray[600],
                    fontSize: '13px',
                    fontWeight: BASE_TOKENS.typography.fontWeight.normal,
                    margin: 0,
                    lineHeight: BASE_TOKENS.typography.lineHeight.xs
                  }}>
                    Customer Service Representative
                  </p>
                </div>
              </div>
              
              {/* Grey Divider Line */}
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: BASE_TOKENS.colors.gray[200],
                marginBottom: BASE_TOKENS.spacing.lg
              }} />
              
              {/* Agent Notes Section */}
              {call.details.notes && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: BASE_TOKENS.spacing.lg,
                  alignItems: 'flex-start'
                }}>
                  <p style={{
                    color: BASE_TOKENS.colors.gray[600],
                    fontWeight: BASE_TOKENS.typography.fontWeight.normal,
                    fontSize: '13px',
                    lineHeight: BASE_TOKENS.typography.lineHeight.xs,
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}>
                    Notes
                  </p>
                  <p style={{
                    color: BASE_TOKENS.colors.black,
                    fontSize: '13px',
                    lineHeight: BASE_TOKENS.typography.lineHeight.xs,
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
