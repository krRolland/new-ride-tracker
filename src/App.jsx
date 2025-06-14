import React from 'react';
import RideTrackingDashboard from './components/RideTrackingDashboard';
import { mockRideData } from './data/mockData';
import QueryVisualizer from './components/QueryVisualizer/QueryVisualizer';
import { ChatBox, ExpandableChatBox } from './components/ChatBox';
import ChatDemo from './components/ChatDemo';
import DarkThemeChatDemo from './components/DarkThemeChatDemo';
import CallbackDemo from './components/ChatDemo/CallbackDemo';
import ChatDemo2 from './components/ChatDemo/ChatDemo2';
import ChatDemo3 from './components/ChatDemo/ChatDemo3';
import ChatDemo4 from './components/ChatDemo/ChatDemo4';
import FraudTimelineMatrix from './components/FraudTImelineMatrix/FraudTimelineMatrix';
import Timeline from './components/Timeline';
import { CallFraudDashboard } from './components/CallFraudDashboard';

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
        showCommunicationLog={false}
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
      <ChatDemo4 />
      {/* <CallFraudDashboard /> */}

      {/* < Timeline /> */}
      {/* <CallbackDemo /> */}
      {/* < DarkThemeChatDemo /> */}
      {/* <QueryVisualizer /> */}
    </div>
  );
}

export default App;
