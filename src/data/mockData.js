// Mock data for the ride tracking dashboard
export const mockRideData = {
    tripInfo: {
      id: 'TR-789-XYZ-2025',
      uuid: 'user_abc123_def456',
      distance: '3.2 miles',
      duration: '12 min',
      fare: '$18.50',
      surge: '1.5x',
      pickupLocation: 'The Japanese Tea Garden',
      dropoffLocation: 'Salesforce Park'
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
        time: '3:15 PM', 
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
        timestamp: '2:56 PM'
      }
    ],
  
    messages: [
      {
        id: 1,
        type: 'message',
        participant: 'rider',
        message: "Hi, I'm the one in the blue jacket by the coffee shop",
        timestamp: '2:58 PM'
      },
      {
        id: 2,
        type: 'message',
        participant: 'driver',
        message: 'Got it! I see you. Silver Camry pulling up now',
        timestamp: '2:59 PM'
      },
      {
        id: 3,
        type: 'message',
        participant: 'rider',
        message: 'Perfect, thank you!',
        timestamp: '3:00 PM'
      }
    ],
  
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
  