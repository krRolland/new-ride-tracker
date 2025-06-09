import React, { useState, useRef, useEffect } from 'react';

const ChatBoxAnimationsExample = () => {
  const [inputValue, setInputValue] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [hasExpanded, setHasExpanded] = useState(false);

  useEffect(() => {
    const wasReady = isReady;
    const nowReady = inputValue.trim().length > 0;
    setIsReady(nowReady);
    
    // Trigger expansion when going from empty to having content
    if (!wasReady && nowReady) {
      setHasExpanded(true);
    }
    // Trigger contraction when going from content to empty
    if (wasReady && !nowReady) {
      setHasExpanded(false);
    }
  }, [inputValue]);

  const getContainerStyle = () => {
    return {
      position: 'relative',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '16px',
      border: '1px solid #e5e7eb',
      padding: '24px',
      overflow: 'hidden',
      // Combined glow effect
      boxShadow: isReady 
        ? '0 0 25px rgba(59, 130, 246, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      // Combined pulse effect
      transform: hasExpanded ? 'scale(1.015)' : 'scale(1)',
      // Combined shimmer effect
      background: isReady 
        ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #f8fafc 75%, #ffffff 100%)'
        : 'white',
      backgroundSize: isReady ? '200% 200%' : '100% 100%',
      animation: isReady ? 'shimmer 8s ease-in-out infinite' : 'none',
      transition: 'all 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Chat Box Animations Example</h1>
        <p className="text-gray-600">All three effects combined: Ambient Glow + Heartbeat Pulse + Shimmer Wave</p>
        <p className="text-sm text-gray-500 mt-2">Start typing to see the interface come alive...</p>
      </div>

      {/* Demo Container */}
      <div className="flex justify-center py-12">
        <div style={getContainerStyle()}>
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              What do you want to make?
            </h3>
            
            <div className="flex items-stretch border-none rounded-lg overflow-hidden shadow-sm">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Start a conversation..."
                className="flex-1 px-4 py-3 border-none outline-none text-sm bg-white"
              />
              <button
                disabled={!isReady}
                className={`px-6 py-3 font-semibold text-sm text-white border-none cursor-pointer transition-all duration-700 ${
                  isReady
                    ? 'bg-gray-900 hover:bg-gray-800'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Go!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Effect Breakdown */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-4">Active Effects Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-60 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <strong className="text-blue-800">Ambient Glow</strong>
            </div>
            <p className="text-sm text-blue-700">
              Soft blue glow appears around the container when text is present, creating an energy field effect.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-60 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <strong className="text-purple-800">Heartbeat Pulse</strong>
            </div>
            <p className="text-sm text-purple-700">
              Single subtle expansion when text appears, contraction when cleared. No continuous pulsing.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-60 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
              <strong className="text-indigo-800">Shimmer Wave</strong>
            </div>
            <p className="text-sm text-indigo-700">
              Gentle animated gradient flows across the background when active, creating a living surface.
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white bg-opacity-60 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Transition Time:</strong> All effects use 1.4-second transitions for a luxurious, thoughtful feel.
            The shimmer animation runs on an 8-second cycle for maximum subtlety.
          </p>
        </div>
      </div>

      {/* Implementation Code Preview */}
      <div className="bg-gray-900 rounded-lg p-6 text-white">
        <h3 className="font-semibold mb-4 text-gray-100">Implementation Preview</h3>
        <pre className="text-sm text-gray-300 overflow-x-auto">
{`const containerStyle = {
  // Ambient Glow
  boxShadow: isReady 
    ? '0 0 25px rgba(59, 130, 246, 0.2), ...'
    : 'default shadow...',
    
  // Heartbeat Pulse  
  transform: hasExpanded ? 'scale(1.015)' : 'scale(1)',
  
  // Shimmer Wave
  background: isReady 
    ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, ...)'
    : 'white',
  animation: isReady ? 'shimmer 8s ease-in-out infinite' : 'none',
  
  // Smooth transitions
  transition: 'all 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
};`}
        </pre>
      </div>
    </div>
  );
};

export default ChatBoxAnimationsExample;