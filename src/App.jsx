import React from 'react';
import RideTrackingDashboard from './components/RideTrackingDashboard';
import { mockRideData } from './data/mockData';
import QueryVisualizer from './components/QueryVisualizer/QueryVisualizer';
import ChatBox from './components/ChatBox';
import ExpandableChatBox from './components/ChatBox/ExpandableChatBox';
import ChatDemo from './components/ChatDemo';
import DarkThemeChatDemo from './components/DarkThemeChatDemo';

function App() {
  return (
    <div className="App" style={{ 
      // padding: '20px', 
      // backgroundColor: '#F9FAFB', 
      // minHeight: '100vh',
      // display: 'flex',
      // gap: '20px',
      // felexWrap: 'wrap',
      // alignItems: 'flex-start'
    }}>
      {/* <RideTrackingDashboard 
        tripInfo={mockRideData.tripInfo}
        timelineData={mockRideData.timelineData}
        callLogs={mockRideData.callLogs}
        messages={mockRideData.messages}
        driver={mockRideData.driver}
        rider={mockRideData.rider}
      /> */}
      {/* <QueryVisualizer /> */}
      
      {/* Regular ChatBox Demo */}
      {/* <ChatBox 
        width="400px" 
        height="600px" 
      />
       */}
      {/* Expandable ChatBox Demo */}
      {/* <ExpandableChatBox 
        width="400px" 
        height="600px" 
      /> */}
      
      {/* Another Expandable ChatBox with different size */}
      {/* <ExpandableChatBox 
        width="350px" 
        height="500px" 
      /> */}
      {/* <ChatDemo /> */}
      < DarkThemeChatDemo />
    </div>
  );
}

export default App;
