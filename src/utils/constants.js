// Application constants
export const APP_CONFIG = {
    name: 'Ride Tracking Dashboard',
    version: '1.0.0',
    baseApiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
  };
  
  export const BREAKPOINTS = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px'
  };
  
  export const TRIP_STATUSES = {
    REQUESTED: 'requested',
    DRIVER_ASSIGNED: 'driver_assigned',
    DRIVER_EN_ROUTE: 'driver_en_route',
    PICKUP: 'pickup',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  };
  
  export const MESSAGE_TYPES = {
    CALL: 'call',
    MESSAGE: 'message',
    SYSTEM: 'system'
  };
  
  export const PARTICIPANTS = {
    DRIVER: 'driver',
    RIDER: 'rider',
    SYSTEM: 'system'
  };