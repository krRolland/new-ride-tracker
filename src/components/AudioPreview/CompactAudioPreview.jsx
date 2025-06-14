 import React, { useState, useEffect, useRef } from 'react';
import { BASE_TOKENS } from '../../tokens';

// Compact AudioPreview Component for the new layout
const CompactAudioPreview = ({ duration, title = "Call Recording", quality = "HD" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100 for percentage
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef(null);

  // Convert duration string to seconds for calculations
  const durationInSeconds = duration ? 
    duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0) : 180;

  // Reset progress and stop playback when duration changes
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [duration]);

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      const startProgress = progress === 100 ? 0 : progress;
      const startTime = startProgress === 0 ? 0 : (startProgress / 100) * durationInSeconds;
      
      setProgress(startProgress);
      setCurrentTime(startTime);
      
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          const increment = (1 / durationInSeconds) * 100;
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setCurrentTime(durationInSeconds);
            return 100;
          }
          return newProgress;
        });
        
        setCurrentTime(prev => {
          const newTime = prev + 1;
          return Math.min(newTime, durationInSeconds);
        });
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * durationInSeconds;
    
    setProgress(newProgress);
    setCurrentTime(newTime);
    
    if (isPlaying) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          const increment = (1 / durationInSeconds) * 100;
          const nextProgress = prev + increment;
          if (nextProgress >= 100) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setCurrentTime(durationInSeconds);
            return 100;
          }
          return nextProgress;
        });
        
        setCurrentTime(prev => {
          const nextTime = prev + 1;
          return Math.min(nextTime, durationInSeconds);
        });
      }, 100);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ 
      marginBottom: BASE_TOKENS.spacing.lg,
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Compact Player Controls */}
      <div style={{
        padding: BASE_TOKENS.spacing.lg,
        backgroundColor: '#EDEDED',
        border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
        borderRadius: `calc(${BASE_TOKENS.borderRadius.lg} + 2px)`,
        boxShadow: BASE_TOKENS.shadows.sm,
        position: 'relative'
      }}>
        {/* Header with mock photo, title, HD badge, and play button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: `calc(${BASE_TOKENS.spacing.md} + 10px)`,
          position: 'relative'
        }}>
          {/* Mock Photo */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: BASE_TOKENS.borderRadius.md,
            backgroundColor: BASE_TOKENS.colors.gray[300],
            marginRight: BASE_TOKENS.spacing.md,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '20px', height: '20px', color: BASE_TOKENS.colors.gray[600] }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>

          {/* Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1
          }}>
            <h3 style={{
              color: BASE_TOKENS.colors.gray[900],
              fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
              margin: 0,
              fontSize: `calc(${BASE_TOKENS.typography.fontSize.md} - 3px)`
            }}>
              {title}
            </h3>
          </div>

          {/* Play/Pause Button - Top Right */}
          <button
            onClick={togglePlay}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: BASE_TOKENS.borderRadius.full,
              backgroundColor: BASE_TOKENS.colors.black,
              color: BASE_TOKENS.colors.white,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 2px 8px rgba(0, 0, 0, 0.2)`
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.gray[800];
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.black;
              e.target.style.transform = 'scale(1)';
            }}
          >
            {isPlaying ? (
              <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg style={{ width: '16px', height: '16px', marginLeft: '2px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{
          marginBottom: BASE_TOKENS.spacing.xs
        }}>
          <div 
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: BASE_TOKENS.colors.gray[200],
              borderRadius: '2px',
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={handleProgressClick}
          >
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: BASE_TOKENS.colors.black,
              borderRadius: '2px',
              transition: 'width 0.1s ease'
            }} />
            <div style={{
              position: 'absolute',
              left: `${progress}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '12px',
              backgroundColor: BASE_TOKENS.colors.black,
              borderRadius: BASE_TOKENS.borderRadius.full,
              border: `2px solid ${BASE_TOKENS.colors.white}`,
              boxShadow: BASE_TOKENS.shadows.sm
            }} />
          </div>
        </div>

        {/* Time Display - Both sides below timeline */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span style={{
            color: BASE_TOKENS.colors.gray[500],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}>
            {formatTime(currentTime)}
          </span>
          <span style={{
            color: BASE_TOKENS.colors.gray[500],
            fontSize: BASE_TOKENS.typography.fontSize.sm,
            fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}>
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompactAudioPreview;
