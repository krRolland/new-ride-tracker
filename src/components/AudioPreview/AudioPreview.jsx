import React, { useState, useEffect, useRef } from 'react';
import { BASE_TOKENS } from '../../tokens';

// AudioPreview Component
const AudioPreview = ({ duration }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 100 for percentage
    const intervalRef = useRef(null);
  
    // Reset progress and stop playback when duration changes
    useEffect(() => {
      setProgress(0);
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
        // Start playback from current progress or reset if at end
        const startProgress = progress === 100 ? 0 : progress;
        setProgress(startProgress);
        intervalRef.current = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + 1; // Increment by 1 for demonstration
            if (newProgress > 100) {
              clearInterval(intervalRef.current);
              setIsPlaying(false);
              return 100; // Cap at 100%
            }
            return newProgress;
          });
        }, 150); // Adjust speed of playhead movement
      }
      setIsPlaying(!isPlaying);
    };
  
    // Generate a static waveform data (array of heights) - same for each duration
    const generateWaveform = (numBars = 150) => {
      const waveform = [];
      // Use a seed based on duration to ensure consistent waveform for same duration
      const seed = duration.length;
      for (let i = 0; i < numBars; i++) {
        // Create call audio-like patterns with more variation and spikes
        const voiceFreq = Math.sin(i * 0.08 + seed) * 0.3;
        const speechPattern = Math.sin(i * 0.2 + seed * 2) * 0.25;
        const breathingPauses = Math.sin(i * 0.03 + seed * 3) * 0.15;
        
        // Add random spikes to simulate speech consonants and emphasis
        const randomSpike = (Math.random() - 0.5) * 0.4;
        const spikeChance = Math.sin(i * 0.12 + seed * 4) > 0.3 ? randomSpike : 0;
        
        // Create more realistic call audio with lower baseline and occasional peaks
        const baseLevel = 0.3;
        const value = baseLevel + voiceFreq + speechPattern + breathingPauses + spikeChance;
        
        // Clamp values with more realistic range for call audio
        waveform.push(Math.max(0.05, Math.min(0.9, value))); // Heights between 5% and 90%
      }
      return waveform;
    };
  
    const waveformData = generateWaveform();
  
    return (
      <div style={{ marginBottom: BASE_TOKENS.spacing['2xl'] }}>
        <p style={{
          color: BASE_TOKENS.colors.gray[700],
          fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
          margin: 0,
          fontSize: BASE_TOKENS.typography.fontSize.md,
          marginBottom: BASE_TOKENS.spacing.md
        }}>
          Call Audio Preview
        </p>
        <div style={{
          backgroundColor: BASE_TOKENS.colors.white,
          border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
          borderRadius: BASE_TOKENS.borderRadius.lg,
          padding: BASE_TOKENS.spacing.lg,
          display: 'flex',
          alignItems: 'center',
          gap: BASE_TOKENS.spacing.lg,
          boxShadow: BASE_TOKENS.shadows.sm
        }}>
          <button
            onClick={togglePlay}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: BASE_TOKENS.borderRadius.full,
              backgroundColor: BASE_TOKENS.colors.gray[900],
              color: BASE_TOKENS.colors.white,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: BASE_TOKENS.shadows.sm
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.gray[800];
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = BASE_TOKENS.colors.gray[900];
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
          
          <div style={{
            position: 'relative',
            flex: 1,
            height: '32px',
            backgroundColor: BASE_TOKENS.colors.gray[100],
            borderRadius: BASE_TOKENS.borderRadius.md,
            overflow: 'hidden',
            border: `1px solid ${BASE_TOKENS.colors.gray[200]}`
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'space-between',
              padding: `0 1px`
            }}>
              {waveformData.map((height, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: index <= (progress / 100) * waveformData.length 
                      ? BASE_TOKENS.colors.gray[900] 
                      : BASE_TOKENS.colors.gray[300],
                    borderRadius: '1px',
                    height: `${height * 100}%`,
                    width: '2px',
                    flexShrink: 0
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            flexShrink: 0
          }}>
            <span style={{
              color: BASE_TOKENS.colors.gray[700],
              fontSize: BASE_TOKENS.typography.fontSize.sm,
              fontWeight: BASE_TOKENS.typography.fontWeight.medium,
              fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            }}>
              {duration}
            </span>
            <span style={{
              fontSize: BASE_TOKENS.typography.fontSize.xs,
              color: BASE_TOKENS.colors.gray[500],
              marginTop: BASE_TOKENS.spacing.xs,
              lineHeight: BASE_TOKENS.typography.lineHeight.xs
            }}>
              Duration
            </span>
          </div>
        </div>
      </div>
    );
  };

export default AudioPreview;
