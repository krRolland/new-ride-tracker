import React, { useState } from 'react';
import { ChatBox, ExpandableChatBox } from '../ChatBox';

const CallbackDemo = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [expandableMessages, setExpandableMessages] = useState([]);

  const handleChatBoxMessage = (message) => {
    console.log('ChatBox user message:', message);
    setUserMessages(prev => [...prev, message]);
  };

  const handleExpandableChatBoxMessage = (message) => {
    console.log('ExpandableChatBox user message:', message);
    setExpandableMessages(prev => [...prev, message]);
  };

  return (
    <div style={{ 
      padding: '20px', 
      display: 'flex', 
      gap: '40px',
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>ChatBox with onUserMessage Callback</h2>
        <ChatBox 
          onUserMessage={handleChatBoxMessage}
          width="400px"
          height="500px"
        />
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>User Messages Received:</h3>
          {userMessages.length === 0 ? (
            <p style={{ color: '#999', fontStyle: 'italic' }}>No messages yet...</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {userMessages.map((msg, index) => (
                <li key={index} style={{ marginBottom: '5px', color: '#333' }}>
                  <strong>{msg.timestamp}:</strong> {msg.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>ExpandableChatBox with onUserMessage Callback</h2>
        <ExpandableChatBox 
          onUserMessage={handleExpandableChatBoxMessage}
          width="400px"
          height="500px"
        />
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>User Messages Received:</h3>
          {expandableMessages.length === 0 ? (
            <p style={{ color: '#999', fontStyle: 'italic' }}>No messages yet...</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {expandableMessages.map((msg, index) => (
                <li key={index} style={{ marginBottom: '5px', color: '#333' }}>
                  <strong>{msg.timestamp}:</strong> {msg.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallbackDemo;
