import React, { useState, useEffect, useRef } from 'react';
import { BASE_TOKENS } from '../../tokens';

const MapWithTripDetails = ({ 
  distance, 
  duration, 
  fare, 
  surge,
  pickupLocation,
  dropoffLocation,
  rider 
}) => {
  const [mapLoading, setMapLoading] = useState(true);
  const [driverPosition, setDriverPosition] = useState(0); // 0 to 1 along route
  const [driverMoving, setDriverMoving] = useState(false);
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const driverMarker = useRef(null);
  const pickupMarker = useRef(null);
  const dropoffMarker = useRef(null);
  const routeSource = useRef(null);

  // Demo coordinates (San Francisco area)
  const pickupCoords = [-122.465827, 37.772639];
  const dropoffCoords = [-122.432902, 37.775673]; // North Beach SF
  
  // Driver starting position (5 minutes away from pickup)
  const driverStartCoords = [-122.4520, 37.7850]; // Richmond District, about 5 min drive to Tea Garden
  
  // Route from driver's current location to pickup (realistic SF streets)
  const toPickupRoute = [
    [-122.452052, 37.784944],
    [-122.451873, 37.784126],
    [-122.459096, 37.783866],
    [-122.458411, 37.774338],
    [-122.465891, 37.773436],     // Fixed: added brackets, flipped coordinates
    [-122.465827, 37.772639]      // Fixed: added brackets, flipped coordinates
];
  // Route from pickup to dropoff (following SF streets with more points)
  const fromPickupRoute = [
    [-122.466684, 37.772583], 
    [-122.465264, 37.772590],
    [-122.462078, 37.771790],
    [-122.455251, 37.770904],     // Fixed: added brackets, flipped coordinates
    [-122.454031, 37.771459],     // Fixed: added brackets, flipped coordinates
    [-122.453573, 37.769206],     // Fixed: added brackets, flipped coordinates
    [-122.437062, 37.771275],     // Fixed: added brackets, flipped coordinates
    [-122.437497, 37.773209],     // Fixed: added brackets, flipped coordinates
    [-122.435844, 37.773444],     // Fixed: added brackets, flipped coordinates
    [-122.436175, 37.775234],     // Fixed: added brackets, flipped coordinates
    [-122.432902, 37.775673]      // Fixed: added brackets, flipped coordinates
];
  // Combined route coordinates
  const routeCoordinates = [...toPickupRoute, ...fromPickupRoute.slice(1)]; // Remove duplicate pickup point
  
  const styles = {
    container: {
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      overflow: 'hidden',
      boxShadow: BASE_TOKENS.shadows.md
    },
    header: {
      padding: BASE_TOKENS.spacing['2xl'],
      borderBottom: `1px solid ${BASE_TOKENS.colors.gray[100]}`
    },
    headerTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.xl,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.lg,
      margin: 0
    },
    mapContainer: {
      position: 'relative',
      height: '320px'
    },
    mapboxContainer: {
      width: '100%',
      height: '100%'
    },
    // Base UI placeholder state
    mapPlaceholder: {
      height: '320px',
      backgroundColor: BASE_TOKENS.colors.gray[50],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: BASE_TOKENS.colors.gray[500]
    },
    placeholderIcon: {
      width: '48px',
      height: '48px',
      marginBottom: BASE_TOKENS.spacing.md,
      color: BASE_TOKENS.colors.gray[400]
    },
    placeholderText: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      color: BASE_TOKENS.colors.gray[600],
      marginBottom: BASE_TOKENS.spacing.sm
    },
    placeholderSubtext: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      marginBottom: BASE_TOKENS.spacing.lg
    },
    // Base UI primary button
    activateButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${BASE_TOKENS.spacing.md} ${BASE_TOKENS.spacing.lg}`,
      backgroundColor: BASE_TOKENS.colors.gray[900],
      color: BASE_TOKENS.colors.white,
      border: 'none',
      borderRadius: BASE_TOKENS.borderRadius.md,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit'
    },
    activateButtonHover: {
      backgroundColor: BASE_TOKENS.colors.gray[700]
    },
    // Loading state
    loadingContainer: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(249, 250, 251, 0.9)',
      backdropFilter: 'blur(2px)',
      zIndex: 1000
    },
    loadingSpinner: {
      width: '24px',
      height: '24px',
      border: `2px solid ${BASE_TOKENS.colors.gray[200]}`,
      borderTop: `2px solid ${BASE_TOKENS.colors.gray[900]}`,
      borderRadius: BASE_TOKENS.borderRadius.full,
      animation: 'spin 1s linear infinite'
    },
    // Map controls overlay
    mapControls: {
      position: 'absolute',
      top: BASE_TOKENS.spacing.md,
      right: BASE_TOKENS.spacing.md,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: BASE_TOKENS.spacing.sm
    },
    controlButton: {
      padding: BASE_TOKENS.spacing.sm,
      backgroundColor: BASE_TOKENS.colors.white,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      borderRadius: BASE_TOKENS.borderRadius.md,
      cursor: 'pointer',
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      color: BASE_TOKENS.colors.gray[700],
      boxShadow: BASE_TOKENS.shadows.sm,
      transition: 'all 0.2s ease'
    },
    controlButtonActive: {
      backgroundColor: BASE_TOKENS.colors.gray[900],
      color: BASE_TOKENS.colors.white,
      borderColor: BASE_TOKENS.colors.gray[900]
    },
    tripDetails: {
      padding: BASE_TOKENS.spacing['2xl']
    },
    sectionTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.base,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.base,
      marginBottom: BASE_TOKENS.spacing.md,
      margin: 0
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: BASE_TOKENS.spacing.lg,
      marginBottom: BASE_TOKENS.spacing.lg
    },
    detailItem: {
      textAlign: 'center'
    },
    detailLabel: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: BASE_TOKENS.spacing.xs
    },
    detailValue: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.sm
    },
    surgeTag: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
      backgroundColor: BASE_TOKENS.colors.red[100],
      color: BASE_TOKENS.colors.red[600],
      borderRadius: BASE_TOKENS.borderRadius.full,
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold
    },
    routeSection: {
      paddingTop: BASE_TOKENS.spacing.lg,
      borderTop: `1px solid ${BASE_TOKENS.colors.gray[100]}`
    },
    routeItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: BASE_TOKENS.spacing.md
    },
    routeDot: {
      width: '8px',
      height: '8px',
      borderRadius: BASE_TOKENS.borderRadius.full,
      marginTop: BASE_TOKENS.spacing.sm,
      marginRight: BASE_TOKENS.spacing.md,
      flexShrink: 0
    },
    pickupDot: {
      backgroundColor: BASE_TOKENS.colors.green[500]
    },
    dropoffDot: {
      backgroundColor: BASE_TOKENS.colors.red[500]
    },
    routeLocation: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      color: BASE_TOKENS.colors.gray[900],
      lineHeight: BASE_TOKENS.typography.lineHeight.sm,
      marginBottom: '2px'
    },
    routeLabel: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
      lineHeight: BASE_TOKENS.typography.lineHeight.xs
    }
  };

  // Create custom marker elements
  const createMarkerElement = (type) => {
    const el = document.createElement('div');
    el.style.width = type === 'driver' ? '32px' : '28px';
    el.style.height = type === 'driver' ? '32px' : '28px';
    el.style.borderRadius = type === 'pickup' ? '50%' : (type === 'driver' ? '50%' : '12px 12px 12px 2px');
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.fontSize = '10px';
    el.style.fontWeight = '700';
    el.style.color = 'white';
    el.style.overflow = 'hidden';
    
    if (type === 'pickup') {
      // Use rider avatar for pickup marker
      if (rider && rider.name) {
        const img = document.createElement('img');
        img.src = '/headshot-2.png'; // Rider avatar
        img.alt = `${rider.name} avatar`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '50%';
        el.appendChild(img);
      } else {
        // Fallback to green P if no rider data
        el.style.backgroundColor = BASE_TOKENS.colors.green[500];
        el.textContent = 'P';
      }
    } else if (type === 'dropoff') {
      el.style.backgroundColor = 'transparent';
      el.style.border = 'none';
      el.style.boxShadow = 'none';
      el.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="black">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>`;
    } else if (type === 'driver') {
      el.style.backgroundColor = BASE_TOKENS.colors.blue[500];
      el.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>`;
    }
    
    return el;
  };

  // Initialize Mapbox
  const initializeMap = async () => {
    if (!window.mapboxgl || map.current) return;

    try {
      // Check if we have a Mapbox token and custom style
      const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
      const customStyle = import.meta.env.VITE_MAPBOX_STYLE;
      
      let mapStyle;
      
      if (mapboxToken && mapboxToken !== 'your_actual_mapbox_token_here' && customStyle) {
        // Use custom Mapbox style
        mapStyle = customStyle;
      } else {
        // Fallback to OpenStreetMap-based style
        mapStyle = {
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm'
            }
          ]
        };
      }

      map.current = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [-122.457, 37.780], // Center between driver start and pickup
        zoom: 12,
        attributionControl: true,
        logoPosition: 'bottom-right'
      });

      await new Promise((resolve) => {
        map.current.on('load', resolve);
      });

      // Add full route (grey)
      const routeGeoJSON = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoordinates
        }
      };

      map.current.addSource('route', {
        type: 'geojson',
        data: routeGeoJSON
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': BASE_TOKENS.colors.gray[400],
          'line-width': 4,
          'line-opacity': 0.8
        }
      });

      // Add completed route (jet black) - initially empty
      const completedRouteGeoJSON = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      };

      map.current.addSource('completed-route', {
        type: 'geojson',
        data: completedRouteGeoJSON
      });

      map.current.addLayer({
        id: 'completed-route',
        type: 'line',
        source: 'completed-route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#000000', // Jet black
          'line-width': 4,
          'line-opacity': 1
        }
      });

      // Add markers
      pickupMarker.current = new window.mapboxgl.Marker({
        element: createMarkerElement('pickup')
      })
        .setLngLat(pickupCoords)
        .addTo(map.current);

      dropoffMarker.current = new window.mapboxgl.Marker({
        element: createMarkerElement('dropoff')
      })
        .setLngLat(dropoffCoords)
        .addTo(map.current);

      driverMarker.current = new window.mapboxgl.Marker({
        element: createMarkerElement('driver')
      })
        .setLngLat(driverStartCoords)
        .addTo(map.current);

      // Fit bounds to show all markers (driver start, pickup, dropoff)
      const bounds = new window.mapboxgl.LngLatBounds()
        .extend(driverStartCoords)
        .extend(pickupCoords)
        .extend(dropoffCoords);
      
      map.current.fitBounds(bounds, {
        padding: 50,
        duration: 1000
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  // Load Mapbox GL JS
  const loadMapbox = () => {
    if (window.mapboxgl) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.onload = () => {
      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      window.mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
      initializeMap();
    };
    document.head.appendChild(script);
  };

  // Auto-load map on component mount
  useEffect(() => {
    const handleMapLoad = async () => {
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMapLoading(false);
      
      // Initialize map after component updates
      setTimeout(() => {
        loadMapbox();
      }, 100);
      
      // Auto-start driver animation after map loads
      setTimeout(() => {
        animateDriver();
      }, 2000); // Start animation 2 seconds after map loads
    };

    handleMapLoad();
  }, []);

  // Handle map resize when container size changes
  useEffect(() => {
    if (!map.current) return;

    const resizeObserver = new ResizeObserver(() => {
      // Delay resize to ensure container has finished resizing
      setTimeout(() => {
        if (map.current) {
          map.current.resize();
        }
      }, 100);
    });

    if (mapContainer.current) {
      resizeObserver.observe(mapContainer.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [map.current]);

  // Animate driver movement along the route
  const animateDriver = () => {
    if (!driverMarker.current || driverMoving) return;
    
    setDriverMoving(true);
    const duration = 300000; // 5 minutes (300 seconds) for realistic timing
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate position along the route
      const totalPoints = routeCoordinates.length - 1;
      const segmentProgress = progress * totalPoints;
      const segmentIndex = Math.floor(segmentProgress);
      const segmentRatio = segmentProgress - segmentIndex;
      
      let currentPosition;
      if (segmentIndex >= totalPoints) {
        // At the end
        currentPosition = routeCoordinates[totalPoints];
      } else {
        // Interpolate between current and next point
        const currentPoint = routeCoordinates[segmentIndex];
        const nextPoint = routeCoordinates[segmentIndex + 1];
        
        currentPosition = [
          currentPoint[0] + (nextPoint[0] - currentPoint[0]) * segmentRatio,
          currentPoint[1] + (nextPoint[1] - currentPoint[1]) * segmentRatio
        ];
      }
      
      driverMarker.current.setLngLat(currentPosition);
      setDriverPosition(progress);
      
      // Update completed route (jet black) based on progress
      const completedPointIndex = Math.floor(segmentProgress) + 1;
      const completedCoordinates = routeCoordinates.slice(0, completedPointIndex);
      
      // Add the current position to show smooth progress
      if (completedPointIndex < routeCoordinates.length) {
        completedCoordinates.push(currentPosition);
      }
      
      // Update the completed route source
      if (map.current && map.current.getSource('completed-route')) {
        map.current.getSource('completed-route').setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: completedCoordinates
          }
        });
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDriverMoving(false);
        // Reset after a pause
        setTimeout(() => {
          driverMarker.current.setLngLat(driverStartCoords);
          setDriverPosition(0);
          
          // Reset completed route to empty
          if (map.current && map.current.getSource('completed-route')) {
            map.current.getSource('completed-route').setData({
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: []
              }
            });
          }
        }, 10000); // 10 second pause before restarting
      }
    };
    
    animate();
  };


  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .mapboxgl-popup-content {
          background: ${BASE_TOKENS.colors.white};
          border: 1px solid ${BASE_TOKENS.colors.gray[200]};
          border-radius: ${BASE_TOKENS.borderRadius.md};
          box-shadow: ${BASE_TOKENS.shadows.lg};
        }
        .mapboxgl-ctrl-group {
          background: ${BASE_TOKENS.colors.white};
          border: 1px solid ${BASE_TOKENS.colors.gray[200]};
          border-radius: ${BASE_TOKENS.borderRadius.md};
        }
      `}</style>

      <div style={styles.container}>
        {/* Map Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Live Map</h2>
        </div>

        {/* Map Container */}
        <div style={styles.mapContainer}>
          <div ref={mapContainer} style={styles.mapboxContainer} />

          {/* Loading Overlay */}
          {mapLoading && (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
            </div>
          )}
        </div>

        {/* Trip Details */}
        <div style={styles.tripDetails}>
          <h3 style={styles.sectionTitle}>Trip</h3>
          
          {/* Trip Stats Grid */}
          <div style={styles.detailsGrid}>
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Distance</div>
              <div style={styles.detailValue}>{distance}</div>
            </div>
            
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Duration</div>
              <div style={styles.detailValue}>{duration}</div>
            </div>
            
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Fare</div>
              <div style={styles.detailValue}>{fare}</div>
            </div>
            
            <div style={styles.detailItem}>
              <div style={styles.detailLabel}>Surge</div>
              <div style={styles.surgeTag}>{surge}</div>
            </div>
          </div>

          {/* Route Information */}
          <div style={styles.routeSection}>
            <div style={styles.routeItem}>
              <div style={{...styles.routeDot, ...styles.pickupDot}}></div>
              <div>
                <div style={styles.routeLocation}>{pickupLocation}</div>
                <div style={styles.routeLabel}>Pickup location</div>
              </div>
            </div>
            
            <div style={styles.routeItem}>
              <div style={{...styles.routeDot, ...styles.dropoffDot}}></div>
              <div>
                <div style={styles.routeLocation}>{dropoffLocation}</div>
                <div style={styles.routeLabel}>Drop-off location</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapWithTripDetails;
