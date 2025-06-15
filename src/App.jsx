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
    <div className="App">

      {/* BONUS: QUERY VISUALIZER */}  
      {/* LOOKS BAD */}
      {/* <QueryVisualizer /> */}

      {/* CHATDEMO 2 */}
      {/* ANIMATION SWAPPING IN AND OUT THE COMPONENTS ON SECOND MSG. */}
      {/* <ChatDemo2 /> */}

      {/* CHATDEMO 3 */}
      {/* SKELETONLOAD AGAIN ON SECOND MSG */}
      <ChatDemo3 />
      
      
      {/* CHAT DEMO 4 */}
      {/* CALL FRAUD DASHBOARD WITH CHAT DEMO */}
      {/* <ChatDemo4 /> */}

      {/* <CallFraudDashboard/> */}
      
    </div>
  );
}

export default App;
