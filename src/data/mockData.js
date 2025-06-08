// Mock data for the ride tracking dashboard
export const mockRideData = {
    tripInfo: {
      id: 'TR-789-XYZ-2025',
      uuid: 'user_abc123_def456',
      distance: '3.2 miles',
      duration: '12 min',
      fare: '$18.50',
      surge: '1.5x',
      pickupLocation: 'Golden Gate Park',
      dropoffLocation: 'The Painted Ladies'
    },
  
    timelineData: [
      { 
        id: 1, 
        status: 'completed', 
        title: 'Ride Requested', 
        time: '2:25 PM', 
        icon: '✓' 
      },
      { 
        id: 2, 
        status: 'completed', 
        title: 'Driver Assigned', 
        time: '2:26 PM', 
        icon: '✓' 
      },
      { 
        id: 3, 
        status: 'completed', 
        title: 'Driver Called', 
        time: '2:28 PM', 
        icon: '📞' 
      },
      { 
        id: 4, 
        status: 'current', 
        title: 'Driver En Route', 
        time: '2:30 PM', 
        subtitle: 'ETA: 5 min', 
        icon: '🧭' 
      },
      { 
        id: 5, 
        status: 'pending', 
        title: 'Pickup', 
        time: '2:42 PM', 
        icon: '📍' 
      },
      { 
        id: 6, 
        status: 'pending', 
        title: 'Drop-off', 
        time: '2:53 PM', 
        icon: '✓' 
      }
    ],
  
    callLogs: [
      {
        id: 1,
        type: 'call',
        participant: 'rider',
        direction: 'incoming',
        duration: '45 seconds',
        status: 'completed',
        timestamp: '2:28 PM'
      }
    ],
  
    messages: [],
  
    driver: {
      name: 'Marcus Johnson',
      rating: 4.9,
      phone: '+1 (222) 123-4567',
      vehicle: '2022 Silver Toyota Camry',
      license: 'ABC-1234'
    },
  
    rider: {
      name: 'Drew C',
      rating: 4.8,
      phone: '+1 (444) 987-6543'
    }
  };
