import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './FraudTimelineMatrix.css';

// --- Helper function for generating varied mock calls ---
const generateMockCalls = (customerId, signUpDate, endDate, numCalls = 30, middleIntensityFactor = 3) => {
  const calls = [];
  const signUpTime = new Date(signUpDate).getTime();
  const endTime = endDate.getTime();
  const totalDurationMs = endTime - signUpTime;

  // Define a middle period for intensification (e.g., 25% to 75% of the timeline)
  const middleStartMs = signUpTime + totalDurationMs * 0.25;
  const middleEndMs = signUpTime + totalDurationMs * 0.75;
  const middleDurationMs = middleEndMs - middleStartMs;

  // Calculate how many calls for middle vs. outer periods
  const numMiddleCalls = Math.floor(numCalls * (middleIntensityFactor / (middleIntensityFactor + 1)));
  const numOuterCalls = numCalls - numMiddleCalls;

  // Generate calls for the middle intensified period
  for (let i = 0; i < numMiddleCalls; i++) {
    const randomTime = middleStartMs + Math.random() * middleDurationMs;
    const callDate = new Date(randomTime);
    calls.push(generateSingleCall(customerId, callDate));
  }

  // Generate calls for the outer periods
  for (let i = 0; i < numOuterCalls; i++) {
    let randomTime;
    if (Math.random() < 0.5) { // First half of outer period
      randomTime = signUpTime + Math.random() * (middleStartMs - signUpTime);
    } else { // Second half of outer period
      randomTime = middleEndMs + Math.random() * (endTime - middleEndMs);
    }
    const callDate = new Date(randomTime);
    calls.push(generateSingleCall(customerId, callDate));
  }

  // Sort calls by timestamp
  calls.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return calls;
};

// Helper for single call generation (reused from previous versions, slightly enhanced)
const generateSingleCall = (customerId, dateObj) => {
  const issues = ['Refund Request', 'Trip Clarification', 'Payment Dispute', 'Account Security', 'General Inquiry', 'Trip Issue', 'Feedback', 'Suspicious Activity', 'Promo Code Issue', 'Large Refund Request', 'Lost Item', 'Driver ETA', 'Excessive Charges', 'Account Lockout', 'Ride Cancellation', 'Lost Phone', 'Wrong Destination', 'App Crash', 'Late Arrival', 'Rating Issue'];
  const resolutions = ['Resolved', 'Pending', 'Escalated'];
  const types = ['Inbound', 'Outbound'];
  const drivers = ['Sarah M.', 'Mike R.', 'Alex K.', 'Lisa P.', 'Tom H.', 'Emma L.', 'John D.', 'Jane S.', 'Bob W.', 'Alice B.', 'Charlie C.', 'Diana D.', 'Mark S.', 'Linda T.', 'Samuel P.', 'Olivia N.', 'Peter O.'];
  const routes = ['Downtown → Airport', 'Home → Office', 'Mall → Hotel District', 'Restaurant → Home', 'Coffee Shop → Library', 'Cinema → Parking Lot', 'Park → Home', 'Airport → Hotel', 'Office → Gym', 'Cafe → Museum', 'Home → Work', 'Market → Home', 'Apt → Downtown', 'Hotel → Station', 'School → Home', 'Home → Store'];

  const customerExp = parseFloat((Math.random() * 10).toFixed(1));
  const fraudScore = parseFloat(Math.random().toFixed(2));
  const amount = parseFloat((Math.random() * 200).toFixed(2)); // More varied amounts

  let status = 'resolved';
  if (fraudScore > 0.5 || customerExp < 6) {
    status = Math.random() > 0.5 ? 'escalated' : 'pending';
  }

  return {
    id: `call_${Math.random().toString(36).substr(2, 9)}`,
    customerId,
    timestamp: dateObj.toISOString().replace('T', ' ').substring(0, 19),
    duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
    type: types[Math.floor(Math.random() * types.length)],
    issue: issues[Math.floor(Math.random() * issues.length)],
    resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
    customerExp,
    fraudScore,
    status,
    tripId: `trip_${Math.random().toString(36).substr(2, 7)}`,
    amount,
    driver: drivers[Math.floor(Math.random() * drivers.length)],
    route: routes[Math.floor(Math.random() * routes.length)],
  };
};

// --- CustomerJourneyTimeline Component ---
const CustomerJourneyTimeline = ({ customer, calls, currentTimestamp, onTimestampChange, onTimeWindowChange, timelineWindow }) => {
  const timelineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineWidth, setTimelineWidth] = useState(0);
  
  // Force stop timeline on mount
  useEffect(() => {
    setIsPlaying(false);
  }, []);

  // Calculate the customer's journey start and end dates
  const customerSignUpDate = new Date(customer.signUpDate);
  const endDate = new Date(); // Current date for the end of the timeline

  // Total duration from signup to today
  const totalDurationMs = endDate.getTime() - customerSignUpDate.getTime();

  // Handle window resize for responsive timeline
  useEffect(() => {
    const handleResize = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.clientWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial width
    return () => window.removeEventListener('resize', handleResize);
  }, [customer]);

  // Play/Pause functionality
  const playheadInterval = 1000; // Update every second
  // Use a fixed step of 1 day (86400000 ms) for consistent, predictable movement
  const playheadStepMs = 86400000; // 1 day in milliseconds

  // COMPLETELY REMOVED: Animation logic disabled to prevent uncontrolled playback
  // const animatePlayhead = useCallback(() => {
  //   // Animation disabled
  // }, []);

  // COMPLETELY REMOVED: Animation useEffect disabled
  // useEffect(() => {
  //   // Animation disabled
  // }, []);

  const togglePlay = () => {
    // DISABLED: Play functionality completely disabled
    // setIsPlaying(prev => !prev);
    console.log('Play button disabled to prevent uncontrolled timeline');
  };

  // Calculate playhead position
  const playheadPosition = totalDurationMs > 0
    ? ((currentTimestamp - customerSignUpDate.getTime()) / totalDurationMs) * 100
    : 0; // In percentage

  // Map call events to timeline positions
  const timelineEvents = calls.map(call => {
    const callDate = new Date(call.timestamp);
    const position = totalDurationMs > 0
      ? ((callDate.getTime() - customerSignUpDate.getTime()) / totalDurationMs) * 100
      : 0;
    return { ...call, position };
  });

  // Calculate highlight window position
  const highlightStartPos = timelineWindow && totalDurationMs > 0
    ? ((timelineWindow.start - customerSignUpDate.getTime()) / totalDurationMs) * 100
    : 0;
  const highlightEndPos = timelineWindow && totalDurationMs > 0
    ? ((timelineWindow.end - customerSignUpDate.getTime()) / totalDurationMs) * 100
    : 0;
  const highlightWidth = highlightEndPos - highlightStartPos;

  // Handle click on timeline to jump playhead - DISABLED
  const handleTimelineClick = (e) => {
    // COMPLETELY DISABLED: Timeline interaction disabled to prevent any timestamp changes
    console.log('Timeline interaction disabled');
    return;
  };

  // Calculate waveform data
  const numWaveformBins = 100; // Number of bars in the waveform
  const waveformBins = Array(numWaveformBins).fill(0);
  const binDurationMs = totalDurationMs > 0 ? totalDurationMs / numWaveformBins : 1; // Handle totalDurationMs = 0

  calls.forEach(call => {
    const callTimeMs = new Date(call.timestamp).getTime();
    const timeSinceSignUpMs = callTimeMs - customerSignUpDate.getTime();
    // Ensure timeSinceSignUpMs is non-negative and within bounds for bin calculation
    if (totalDurationMs > 0 && timeSinceSignUpMs >= 0 && timeSinceSignUpMs <= totalDurationMs) {
      const binIndex = Math.floor(timeSinceSignUpMs / binDurationMs);
      if (binIndex < numWaveformBins) { // Ensure within bounds
        waveformBins[binIndex]++;
      }
    } else if (totalDurationMs === 0 && calls.length > 0) { // All calls on signup date
        waveformBins[0]++; // Put all in the first bin
    }
  });

  const maxBinCount = Math.max(...waveformBins);
  const waveformBarWidth = 100 / numWaveformBins; // Percentage width for each bar

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h3 className="timeline-title">Customer Journey Timeline</h3>
        <div className="timeline-controls">
          <button
            onClick={togglePlay}
            className="control-button play-pause-btn"
            title={isPlaying ? "Pause" : "Play"}
          >
            <span className={`icon ${isPlaying ? 'pause-icon' : 'play-icon'}`}></span>
          </button>
          <button
            onClick={() => {
                // DISABLED: Reset functionality disabled
                console.log('Reset button disabled');
            }}
            className="control-button reset-btn"
            title="Reset Playhead (Disabled)"
          >
            <span className="icon stop-icon"></span>
          </button>
          <button
            onClick={() => {
              if (timelineWindow) {
                onTimeWindowChange(null); // Clear highlight
              } else {
                // Set a simple highlight window, e.g., current day
                const startOfDay = new Date(currentTimestamp);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(currentTimestamp);
                endOfDay.setHours(23, 59, 59, 999);
                onTimeWindowChange({ start: startOfDay.getTime(), end: endOfDay.getTime() });
              }
            }}
            className={`control-button highlight-btn ${timelineWindow ? 'active' : ''}`}
          >
            {timelineWindow ? "Clear Highlight" : "Highlight Day"}
          </button>
        </div>
      </div>

      {/* Main timeline container with click handler */}
      <div
        ref={timelineRef}
        className="timeline-track"
        onClick={handleTimelineClick} // Click handler on the container
      >
        {/* Waveform Overlay */}
        <div className="waveform-overlay">
          {waveformBins.map((count, index) => {
            // Give a minimum height if count > 0 for better visibility in sparse areas
            const barHeight = maxBinCount > 0 ? Math.max((count / maxBinCount) * 90, count > 0 ? 5 : 0) : 0; // Max height 90%, min 5% if count > 0
            return (
              <div
                key={`waveform-bar-${index}`}
                className="waveform-bar"
                style={{
                  width: `${waveformBarWidth}%`,
                  height: `${barHeight}%`,
                  left: `${index * waveformBarWidth}%`,
                }}
              ></div>
            );
          })}
        </div>

        {/* Timeline track (visual only, clicks handled by parent) */}
        <div className="track-line"></div>

        {/* Highlighted Window (visual only, clicks handled by parent) */}
        {timelineWindow && (
          <div
            className="highlight-window"
            style={{
              left: `${highlightStartPos}%`,
              width: `${highlightWidth}%`
            }}
          ></div>
        )}

        {/* Major ticks (Years/Months) */}
        <div className="timeline-ticks">
          <span className="tick-start">{customerSignUpDate.toLocaleDateString()}</span>
          <span className="tick-end">{endDate.toLocaleDateString()}</span>
        </div>

        {/* Timeline Events (calls) */}
        {timelineEvents.map((event, index) => (
          <div
            key={event.id} // Use unique call ID as key
            className={`timeline-event ${event.fraudScore > 0.5 ? 'high-risk' : event.fraudScore > 0.2 ? 'medium-risk' : 'low-risk'}`}
            style={{ left: `${event.position}%` }}
            title={`${event.issue} (${new Date(event.timestamp).toLocaleDateString()})`}
            // Important: These dots should NOT capture clicks for timeline scrubbing. Tooltips still work.
            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent dots from triggering timeline click
          ></div>
        ))}

        {/* Playhead */}
        <div
          className="playhead"
          style={{
            left: `${playheadPosition}%`,
          }}
        >
          <div className="playhead-date">
            {new Date(currentTimestamp).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- RiskMatrixComponent (reusable matrix) ---
const RiskMatrixComponent = ({ callsToShow, hoveredPoint, setHoveredPoint, tooltipPosition, setTooltipPosition }) => {

  const getScoreColor = (score, isCustomerExp = true) => {
    if (isCustomerExp) {
      if (score >= 8) return 'score-good';
      if (score >= 6) return 'score-medium';
      return 'score-bad';
    } else {
      if (score <= 0.2) return 'score-good';
      if (score <= 0.5) return 'score-medium';
      return 'score-bad';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return <span className="status-icon resolved">✓</span>;
      case 'pending': return <span className="status-icon pending">⚠</span>;
      case 'escalated': return <span className="status-icon escalated">✗</span>;
      default: return null;
    }
  };

  const handleMouseEnter = (call, event) => {
    const rect = event.currentTarget.closest('svg').getBoundingClientRect();
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
    setHoveredPoint(call);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Calculate radius based on amount (financial weight)
  const allAmounts = callsToShow.map(c => c.amount); // Scale based on *visible* calls
  const maxAmount = allAmounts.length > 0 ? Math.max(...allAmounts) : 1; // Avoid division by zero
  const minRadius = 4;
  const maxRadius = 15;
  const getRadius = (amount) => {
    if (maxAmount === 0) return minRadius;
    const amountRatio = amount / maxAmount;
    return minRadius + (maxRadius - minRadius) * amountRatio;
  };

  // Identify top N high-impact calls for the *current view*
  const topImpactCallsCurrentView = callsToShow
    .sort((a, b) => (b.fraudScore * b.amount) - (a.fraudScore * a.amount))
    .slice(0, 3); // Get top 3

  return (
    <div className="risk-matrix-container">
      <div className="matrix-header">
        <h2 className="matrix-title">Experience vs Fraud Score Matrix</h2>
        <span className="matrix-subtitle">Filtered View & Financial Weight</span>
      </div>

      <div className="matrix-chart">
        <svg width="100%" height="100%" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet" className="matrix-svg">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="25" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 25" fill="none" stroke="#374151" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Axes */}
          <line x1="50" y1="200" x2="350" y2="200" stroke="#6B7280" strokeWidth="2"/>
          <line x1="50" y1="200" x2="50" y2="30" stroke="#6B7280" strokeWidth="2"/>

          {/* Risk zones */}
          <rect x="50" y="30" width="150" height="85" fill="#DC2626" fillOpacity="0.1" />
          <rect x="200" y="30" width="150" height="85" fill="#F59E0B" fillOpacity="0.1" />
          <rect x="50" y="115" width="150" height="85" fill="#F59E0B" fillOpacity="0.1" />
          <rect x="200" y="115" width="150" height="85" fill="#10B981" fillOpacity="0.1" />

          {/* Zone labels */}
          <text x="125" y="75" fill="#DC2626" fontSize="12" textAnchor="middle" className="zone-label">High Risk</text>
          <text x="275" y="75" fill="#F59E0B" fontSize="12" textAnchor="middle" className="zone-label">Medium Risk</text>
          <text x="125" y="160" fill="#F59E0B" fontSize="12" textAnchor="middle" className="zone-label">Low Exp</text>
          <text x="275" y="160" fill="#10B981" fontSize="12" textAnchor="middle" className="zone-label">Good</text>

          {/* Axis labels */}
          <text x="200" y="230" fill="#9CA3AF" fontSize="12" textAnchor="middle">Customer Experience Score</text>
          <text x="25" y="115" fill="#9CA3AF" fontSize="12" textAnchor="middle" transform="rotate(-90 25 115)">Fraud Score</text>

          {/* Data points for the current view */}
          {callsToShow.filter(call => !call.isCurrentFocusDay).map((call) => {
            const x = 50 + (call.customerExp / 10) * 300;
            const y = 200 - (call.fraudScore * 170);
            const color = call.fraudScore > 0.5 ? '#DC2626' :
                         call.fraudScore > 0.2 ? '#F59E0B' : '#10B981';
            const radius = getRadius(call.amount);

            return (
              <g key={call.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={radius * 0.7} // Smaller radius for previous day
                  fill="none" // Hollow circle
                  stroke={color}
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  fillOpacity="0.1"
                />
              </g>
            );
          })}

          {callsToShow.filter(call => call.isCurrentFocusDay).map((call) => {
            const x = 50 + (call.customerExp / 10) * 300;
            const y = 200 - (call.fraudScore * 170);
            const color = call.fraudScore > 0.5 ? '#DC2626' :
                         call.fraudScore > 0.2 ? '#F59E0B' : '#10B981';
            const isHovered = hoveredPoint?.id === call.id;
            const radius = getRadius(call.amount);
            const isTopImpact = topImpactCallsCurrentView.some(c => c.id === call.id);

            return (
              <g key={call.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? radius * 1.3 : radius} // Grow on hover
                  fill={color}
                  fillOpacity="0.8"
                  // Highlight stroke for top impact, make it distinct
                  stroke={isHovered ? "#ffffff" : (isTopImpact ? '#38BDF8' : color)}
                  strokeWidth={isHovered ? "3" : (isTopImpact ? "3" : "2")} // Thicker stroke for top impact
                  className="matrix-point"
                  onMouseEnter={(e) => handleMouseEnter(call, e)}
                  onMouseLeave={handleMouseLeave}
                />
              </g>
            );
          })}

          {/* Axis ticks and labels */}
          {[0, 2, 4, 6, 8, 10].map(tick => (
            <g key={tick}>
              <line x1={50 + (tick/10)*300} y1="200" x2={50 + (tick/10)*300} y2="205" stroke="#6B7280" strokeWidth="1"/>
              <text x={50 + (tick/10)*300} y="220" fill="#9CA3AF" fontSize="10" textAnchor="middle">{tick}</text>
            </g>
          ))}

          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(tick => (
            <g key={tick}>
              <line x1="45" y1={200 - tick*170} x2="50" y2={200 - tick*170} stroke="#6B7280" strokeWidth="1"/>
              <text x="40" y={205 - tick*170} fill="#9CA3AF" fontSize="10" textAnchor="end">{tick.toFixed(1)}</text>
            </g>
          ))}
        </svg>

        {/* Interactive Tooltip */}
        {hoveredPoint && (
          <div
            className="matrix-tooltip"
            style={{
              left: tooltipPosition.x + 15,
              top: tooltipPosition.y - 10,
            }}
          >
            <div className="tooltip-content">
              {/* Header */}
              <div className="tooltip-header">
                <span className="tooltip-id">{hoveredPoint.id}</span>
                <span className={`tooltip-type ${hoveredPoint.type === 'Inbound' ? 'inbound' : 'outbound'}`}>
                  {hoveredPoint.type}
                </span>
              </div>

              {/* Trip Details */}
              <div className="tooltip-details">
                <div className="detail-item">
                  <span className="detail-label">Trip ID:</span>
                  <div className="detail-value trip-id">{hoveredPoint.tripId}</div>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Amount:</span>
                  <div className="detail-value amount">${hoveredPoint.amount.toFixed(2)}</div>
                </div>
              </div>

              {/* Scores */}
              <div className="tooltip-scores">
                <div className="score-item">
                  <span className="score-label">Customer Exp:</span>
                  <div className={`score-value ${getScoreColor(hoveredPoint.customerExp, true)}`}>
                    {hoveredPoint.customerExp.toFixed(1)}/10
                  </div>
                </div>
                <div className="score-item">
                  <span className="score-label">Fraud Risk:</span>
                  <div className={`score-value ${getScoreColor(hoveredPoint.fraudScore, false)}`}>
                    {(hoveredPoint.fraudScore * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              {/* Issue & Resolution */}
              <div className="tooltip-issue">
                <div className="issue-item">
                  <span className="issue-label">Issue:</span>
                  <span className="issue-value">{hoveredPoint.issue}</span>
                </div>
                <div className="issue-item">
                  <span className="issue-label">Status:</span>
                  <div className="status-container">
                    {getStatusIcon(hoveredPoint.status)}
                    <span className={`status-text ${hoveredPoint.status}`}>
                      {hoveredPoint.resolution}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="tooltip-timestamp">
                {hoveredPoint.timestamp}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="matrix-legend">
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-dot high-risk"></div>
            <span>High Risk</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot medium-risk"></div>
            <span>Medium Risk</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot low-risk"></div>
            <span>Low Risk</span>
          </div>
        </div>
        <div className="legend-note">
          <span className="dollar-icon">$</span>
          <span>Point size indicates associated monetary value.</span>
        </div>
      </div>
      <div className="matrix-impact-legend">
        <div className="impact-legend-item">
          <div className="legend-dot impact-highlight"></div>
          <span>Top 3 highest impact calls for the displayed period are highlighted.</span>
        </div>
      </div>
    </div>
  );
};

// --- (Parent Component) ---
const FraudTimelineMatrix = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('cust_001'); // Default selected customer
  const [currentTimestamp, setCurrentTimestamp] = useState(new Date('2024-06-01').getTime()); // FIXED timestamp - no updates allowed
  const [timelineTimeWindow, setTimelineTimeWindow] = useState(null); // For highlighting a specific period on timeline

  // Mock Customer Data
  const customers = [
    { id: 'cust_001', name: 'Alice Smith', signUpDate: '2024-01-15' }, // Earlier signup
    { id: 'cust_002', name: 'Bob Johnson', signUpDate: '2024-03-01' },
    { id: 'cust_003', name: 'Charlie Brown', signUpDate: '2024-05-10' },
  ];

  // Generate calls for each customer, distributed from signup to today
  // Memoize allCallLogs to prevent re-creation on every render
  const allCallLogs = useMemo(() => {
    const generatedLogs = customers.flatMap(customer => {
      const customerEndDate = new Date(); // End date for calls is always today
      return generateMockCalls(customer.id, customer.signUpDate, customerEndDate, 30); // 30 calls per customer
    });
    return generatedLogs;
  }, [customers]); // Dependency: only re-generate if customers array changes

  const currentCustomer = customers.find(c => c.id === selectedCustomer);
  // callsForSelectedCustomer should also be memoized, or filtered inside useEffect/useCallback if its dependencies are complex
  const callsForSelectedCustomer = useMemo(() => {
    return allCallLogs.filter(call => call.customerId === selectedCustomer);
  }, [allCallLogs, selectedCustomer]);

  // Helper to get the previous day's date string
  const getPreviousDay = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0]; // FormatYYYY-MM-DD
  };

  // Filter calls for the Risk Matrix based on the timeline's current timestamp and window
  const filteredCallsForMatrix = useMemo(() => {
    return callsForSelectedCustomer.filter(call => {
      const callDate = new Date(call.timestamp);
      const focusDateObj = new Date(currentTimestamp);
      const previousFocusDateObj = getPreviousDay(focusDateObj.toISOString().split('T')[0]);

      if (timelineTimeWindow) {
        // If a highlight window is active, show calls within that window
        return callDate.getTime() >= timelineTimeWindow.start && callDate.getTime() <= timelineTimeWindow.end;
      } else {
        // Otherwise, show calls from the "focused day" and the previous day
        const callDateStr = callDate.toISOString().split('T')[0];
        return callDateStr === focusDateObj.toISOString().split('T')[0] || callDateStr === previousFocusDateObj;
      }
    }).map(call => {
      const callDateStr = new Date(call.timestamp).toISOString().split('T')[0];
      const focusDateStr = new Date(currentTimestamp).toISOString().split('T')[0];
      const isCurrentFocusDay = callDateStr === focusDateStr;
      // Add a flag to distinguish between current day and previous day for rendering
      return { ...call, isCurrentFocusDay };
    });
  }, [callsForSelectedCustomer, currentTimestamp, timelineTimeWindow]); // Dependencies for filtered calls

  // Common state for tooltip across components
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // DISABLED: Timeline timestamp updates completely disabled to prevent movement
  // useEffect(() => {
  //   // All timeline updates disabled
  // }, []);

  return (
    <div className="fraud-timeline-matrix">
      {/* Header */}
      <div className="main-header">
        <div className="header-content">
          <h1 className="main-title">Customer Journey & Risk Analysis</h1>
          <div className="customer-selector">
            <label htmlFor="customerSelect" className="selector-label">
              <span className="user-icon">👤</span> Select Customer:
            </label>
            <select
              id="customerSelect"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="customer-select"
            >
              {customers.map(cust => (
                <option key={cust.id} value={cust.id}>{cust.name} ({cust.id})</option>
              ))}
            </select>
          </div>
        </div>
        <p className="customer-info">
          Viewing interactions for <span className="customer-name">{currentCustomer?.name || 'N/A'}</span> (Joined: {currentCustomer?.signUpDate || 'N/A'})
        </p>
      </div>

      {/* Customer Journey Timeline */}
      {currentCustomer && (
        <CustomerJourneyTimeline
          customer={currentCustomer}
          calls={callsForSelectedCustomer}
          currentTimestamp={currentTimestamp}
          onTimestampChange={() => {}} // DISABLED: No timestamp changes allowed
          onTimeWindowChange={setTimelineTimeWindow}
          timelineWindow={timelineTimeWindow}
        />
      )}

      {/* Risk Matrix Component */}
      <RiskMatrixComponent
        callsToShow={filteredCallsForMatrix}
        hoveredPoint={hoveredPoint}
        setHoveredPoint={setHoveredPoint}
        tooltipPosition={tooltipPosition}
        setTooltipPosition={setTooltipPosition}
      />

      {/* General Legend for the Matrix */}
      <div className="general-legend">
        <p className="legend-description">
          The matrix above visualizes calls based on the selected focus date and highlighted window from the timeline.
        </p>
        <div className="legend-row">
          <div className="legend-group">
            <div className="legend-item">
              <div className="legend-dot high-risk"></div>
              <span>High Risk</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot medium-risk"></div>
              <span>Medium Risk</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot low-risk"></div>
              <span>Low Risk</span>
            </div>
          </div>
          <div className="legend-group">
            <div className="legend-item">
              <span className="dollar-icon">$</span>
              <span>Point size indicates associated monetary value.</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot impact-highlight"></div>
              <span>Top 3 highest impact calls for the displayed period are highlighted.</span>
            </div>
          </div>
        </div>
        <div className="legend-row">
          <div className="legend-group">
            <div className="legend-item">
              <div className="legend-dot current-day"></div>
              <span>Calls on Focus Date</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot previous-day"></div>
              <span>Calls from Previous Day (Hollow)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudTimelineMatrix;
