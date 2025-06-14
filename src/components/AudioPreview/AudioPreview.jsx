import React, { useState, useEffect, useRef } from 'react';
import { BASE_TOKENS } from '../../tokens';

// Enhanced AudioPreview Component with modern design
const AudioPreview = ({ duration, title = "Call Recording", timestamp, quality = "HD" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100 for percentage
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const intervalRef = useRef(null);
  const volumeTimeoutRef = useRef(null);
  const speedMenuRef = useRef(null);

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

  // Close speed menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target)) {
        setShowSpeedMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          const increment = (playbackSpeed / durationInSeconds) * 100;
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
          const newTime = prev + playbackSpeed;
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
          const increment = (playbackSpeed / durationInSeconds) * 100;
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
          const nextTime = prev + playbackSpeed;
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

  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(parseInt(e.target.value));
    setShowVolumeSlider(true);
    
    clearTimeout(volumeTimeoutRef.current);
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 2000);
  };

  // Generate enhanced waveform data
  const generateWaveform = (numBars = 120) => {
    const waveform = [];
    const seed = duration ? duration.length : 5;
    
    for (let i = 0; i < numBars; i++) {
      // Create more realistic call audio patterns
      const voiceFreq = Math.sin(i * 0.1 + seed) * 0.4;
      const speechPattern = Math.sin(i * 0.25 + seed * 2) * 0.3;
      const breathingPauses = Math.sin(i * 0.05 + seed * 3) * 0.2;
      
      // Add conversation dynamics
      const conversationFlow = Math.sin(i * 0.02 + seed * 4) * 0.25;
      const emphasis = Math.random() > 0.85 ? Math.random() * 0.4 : 0;
      
      const baseLevel = 0.25;
      const value = baseLevel + voiceFreq + speechPattern + breathingPauses + conversationFlow + emphasis;
      
      waveform.push(Math.max(0.08, Math.min(0.95, value)));
    }
    return waveform;
  };

  const waveformData = generateWaveform();
  const playedBars = Math.floor((progress / 100) * waveformData.length);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div style={{ 
      marginBottom: BASE_TOKENS.spacing['2xl'],
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: BASE_TOKENS.spacing.lg
      }}>
        <div>
          <h3 style={{
            color: BASE_TOKENS.colors.gray[900],
            fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
            margin: 0,
            fontSize: BASE_TOKENS.typography.fontSize.lg,
            marginBottom: BASE_TOKENS.spacing.xs
          }}>
            {title}
          </h3>
          {timestamp && (
            <p style={{
              color: BASE_TOKENS.colors.gray[500],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              margin: 0
            }}>
              {timestamp}
            </p>
          )}
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: BASE_TOKENS.spacing.sm
        }}>
          <span style={{
            backgroundColor: BASE_TOKENS.colors.green[100],
            color: BASE_TOKENS.colors.green[700],
            padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
            borderRadius: BASE_TOKENS.borderRadius.md,
            fontSize: BASE_TOKENS.typography.fontSize.xs,
            fontWeight: BASE_TOKENS.typography.fontWeight.medium
          }}>
            {quality}
          </span>
        </div>
      </div>

      {/* Main Player */}
      <div style={{
        backgroundColor: BASE_TOKENS.colors.white,
        border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
        borderRadius: BASE_TOKENS.borderRadius.xl,
        padding: BASE_TOKENS.spacing['2xl'],
        boxShadow: BASE_TOKENS.shadows.lg,
        background: `linear-gradient(135deg, ${BASE_TOKENS.colors.white} 0%, ${BASE_TOKENS.colors.gray[50]} 100%)`
      }}>
        {/* Waveform Visualization */}
        <div style={{
          position: 'relative',
          height: '80px',
          backgroundColor: BASE_TOKENS.colors.gray[50],
          borderRadius: BASE_TOKENS.borderRadius.lg,
          overflow: 'hidden',
          marginBottom: BASE_TOKENS.spacing.xl,
          border: `1px solid ${BASE_TOKENS.colors.gray[100]}`,
          cursor: 'pointer'
        }}
        onClick={handleProgressClick}
        >
          {/* Waveform bars */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `0 ${BASE_TOKENS.spacing.sm}`
          }}>
            {waveformData.map((height, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: index < playedBars 
                    ? BASE_TOKENS.colors.blue[500]
                    : BASE_TOKENS.colors.gray[300],
                  borderRadius: '2px',
                  height: `${height * 70}%`,
                  width: '3px',
                  flexShrink: 0,
                  transition: 'all 0.1s ease',
                  opacity: index < playedBars ? 1 : 0.7
                }}
              />
            ))}
          </div>
          
          {/* Progress indicator */}
          <div style={{
            position: 'absolute',
            left: `${progress}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '3px',
            height: '90%',
            backgroundColor: BASE_TOKENS.colors.blue[600],
            borderRadius: '2px',
            boxShadow: `0 0 8px ${BASE_TOKENS.colors.blue[400]}`,
            zIndex: 10
          }} />
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: BASE_TOKENS.spacing.lg
        }}>
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: BASE_TOKENS.borderRadius.full,
              backgroundColor: BASE_TOKENS.colors.blue[500],
              color: BASE_TOKENS.colors.white,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 4px 12px ${BASE_TOKENS.colors.blue[200]}`
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.blue[600];
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = `0 6px 16px ${BASE_TOKENS.colors.blue[300]}`;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.blue[500];
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = `0 4px 12px ${BASE_TOKENS.colors.blue[200]}`;
            }}
          >
            {isPlaying ? (
              <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg style={{ width: '20px', height: '20px', marginLeft: '3px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Time Display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: BASE_TOKENS.spacing.sm,
            minWidth: '120px'
          }}>
            <span style={{
              color: BASE_TOKENS.colors.gray[900],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              fontWeight: BASE_TOKENS.typography.fontWeight.medium,
              fontFamily: 'monospace'
            }}>
              {formatTime(currentTime)}
            </span>
            <span style={{
              color: BASE_TOKENS.colors.gray[400],
              fontSize: BASE_TOKENS.typography.fontSize.sm
            }}>
              /
            </span>
            <span style={{
              color: BASE_TOKENS.colors.gray[600],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              fontFamily: 'monospace'
            }}>
              {duration}
            </span>
          </div>

          {/* Volume Control */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: BASE_TOKENS.spacing.sm,
                borderRadius: BASE_TOKENS.borderRadius.md,
                color: BASE_TOKENS.colors.gray[600],
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = BASE_TOKENS.colors.gray[100];
                e.target.style.color = BASE_TOKENS.colors.gray[900];
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = BASE_TOKENS.colors.gray[600];
              }}
            >
              <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            </button>
            
            {showVolumeSlider && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: BASE_TOKENS.spacing.sm,
                backgroundColor: BASE_TOKENS.colors.white,
                border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
                borderRadius: BASE_TOKENS.borderRadius.lg,
                padding: BASE_TOKENS.spacing.md,
                boxShadow: BASE_TOKENS.shadows.lg,
                zIndex: 100
              }}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: '80px',
                    height: '4px',
                    background: `linear-gradient(to right, ${BASE_TOKENS.colors.blue[500]} 0%, ${BASE_TOKENS.colors.blue[500]} ${volume}%, ${BASE_TOKENS.colors.gray[200]} ${volume}%, ${BASE_TOKENS.colors.gray[200]} 100%)`,
                    borderRadius: '2px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{
                  textAlign: 'center',
                  marginTop: BASE_TOKENS.spacing.xs,
                  fontSize: BASE_TOKENS.typography.fontSize.xs,
                  color: BASE_TOKENS.colors.gray[600]
                }}>
                  {volume}%
                </div>
              </div>
            )}
          </div>

          {/* Speed Control */}
          <div style={{ position: 'relative' }} ref={speedMenuRef}>
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              style={{
                background: 'none',
                border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
                borderRadius: BASE_TOKENS.borderRadius.md,
                padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.md}`,
                cursor: 'pointer',
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                fontWeight: BASE_TOKENS.typography.fontWeight.medium,
                color: BASE_TOKENS.colors.gray[700],
                transition: 'all 0.2s ease',
                minWidth: '60px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = BASE_TOKENS.colors.gray[50];
                e.target.style.borderColor = BASE_TOKENS.colors.gray[400];
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = BASE_TOKENS.colors.gray[300];
              }}
            >
              {playbackSpeed}x
            </button>
            
            {showSpeedMenu && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: BASE_TOKENS.spacing.sm,
                backgroundColor: BASE_TOKENS.colors.white,
                border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
                borderRadius: BASE_TOKENS.borderRadius.lg,
                boxShadow: BASE_TOKENS.shadows.lg,
                zIndex: 100,
                minWidth: '80px'
              }}>
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackSpeed(speed);
                      setShowSpeedMenu(false);
                    }}
                    style={{
                      width: '100%',
                      padding: BASE_TOKENS.spacing.sm,
                      border: 'none',
                      background: speed === playbackSpeed ? BASE_TOKENS.colors.blue[50] : 'transparent',
                      color: speed === playbackSpeed ? BASE_TOKENS.colors.blue[700] : BASE_TOKENS.colors.gray[700],
                      fontSize: BASE_TOKENS.typography.fontSize.sm,
                      cursor: 'pointer',
                      textAlign: 'center',
                      borderRadius: speed === speedOptions[0] ? `${BASE_TOKENS.borderRadius.lg} ${BASE_TOKENS.borderRadius.lg} 0 0` :
                                   speed === speedOptions[speedOptions.length - 1] ? `0 0 ${BASE_TOKENS.borderRadius.lg} ${BASE_TOKENS.borderRadius.lg}` : '0'
                    }}
                    onMouseOver={(e) => {
                      if (speed !== playbackSpeed) {
                        e.target.style.backgroundColor = BASE_TOKENS.colors.gray[50];
                      }
                    }}
                    onMouseOut={(e) => {
                      if (speed !== playbackSpeed) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download Button */}
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: BASE_TOKENS.spacing.sm,
              borderRadius: BASE_TOKENS.borderRadius.md,
              color: BASE_TOKENS.colors.gray[600],
              transition: 'all 0.2s ease',
              marginLeft: 'auto'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.gray[100];
              e.target.style.color = BASE_TOKENS.colors.gray[900];
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = BASE_TOKENS.colors.gray[600];
            }}
            title="Download recording"
          >
            <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPreview;
