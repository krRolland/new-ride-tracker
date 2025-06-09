import React from 'react';
import RideTrackingDashboard from './components/RideTrackingDashboard';
import { mockRideData } from './data/mockData';
import QueryVisualizer from './components/QueryVisualizer/QueryVisualizer';

function App() {
  return (
    <div className="App">
      <RideTrackingDashboard 
        tripInfo={mockRideData.tripInfo}
        timelineData={mockRideData.timelineData}
        callLogs={mockRideData.callLogs}
        messages={mockRideData.messages}
        driver={mockRideData.driver}
        rider={mockRideData.rider}
      />
      {/* <QueryVisualizer /> */}
    </div>
  );
}

export default App;