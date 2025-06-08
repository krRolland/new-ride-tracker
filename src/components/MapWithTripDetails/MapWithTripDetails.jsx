import React, { useState, useEffect, useRef } from 'react';
import { BASE_TOKENS } from '../../tokens';

const MapWithTripDetails = ({ 
  distance, 
  duration, 
  fare, 
  surge,
  pickupLocation,
  dropoffLocation 
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
  const pickupCoords = [-122.4661, 37.7701]; // Japanese Tea Garden, Golden Gate Park
  const dropoffCoords = [-122.408, 37.793]; // North Beach SF
  
  // Driver starting position (5 minutes away from pickup)
  const driverStartCoords = [-122.4520, 37.7850]; // Richmond District, about 5 min drive to Tea Garden
  
  // Route from driver's current location to pickup (following streets with more points for smoothness)
  const toPickupRoute = [
    [-122.4520, 37.7850], // Driver starting position (Richmond)
    [-122.4522, 37.7848], // Start moving
    [-122.4525, 37.7845], // Geary Blvd approach
    [-122.4528, 37.7842], // On Geary
    [-122.4530, 37.7840], // Geary Blvd
    [-122.4533, 37.7837], // Continue
    [-122.4536, 37.7834], // Continue on Geary
    [-122.4540, 37.7830], // Continue on Geary
    [-122.4543, 37.7827], // Geary towards park
    [-122.4546, 37.7824], // Approaching park
    [-122.4550, 37.7820], // Geary towards park
    [-122.4553, 37.7817], // Getting closer
    [-122.4556, 37.7814], // Almost at park
    [-122.4560, 37.7810], // Approach Golden Gate Park
    [-122.4563, 37.7807], // Park entrance area
    [-122.4566, 37.7804], // Entering park zone
    [-122.4570, 37.7800], // Park Presidio Blvd
    [-122.4573, 37.7797], // In park area
    [-122.4576, 37.7794], // Continue in park
    [-122.4580, 37.7790], // Enter Golden Gate Park area
    [-122.4583, 37.7787], // JFK Drive approach
    [-122.4586, 37.7784], // On JFK
    [-122.4590, 37.7780], // JFK Drive
    [-122.4593, 37.7777], // Continue JFK
    [-122.4596, 37.7774], // JFK Drive
    [-122.4600, 37.7770], // Continue on JFK
    [-122.4603, 37.7767], // Approaching Tea Garden area
    [-122.4606, 37.7764], // Getting closer
    [-122.4610, 37.7760], // Approach Tea Garden
    [-122.4613, 37.7757], // Near Tea Garden
    [-122.4616, 37.7754], // Very close
    [-122.4620, 37.7750], // Near Tea Garden
    [-122.4623, 37.7747], // Almost there
    [-122.4626, 37.7744], // Getting closer
    [-122.4630, 37.7740], // Getting closer
    [-122.4633, 37.7737], // Very close
    [-122.4636, 37.7734], // Almost there
    [-122.4640, 37.7730], // Almost there
    [-122.4643, 37.7727], // Final approach
    [-122.4646, 37.7724], // Final approach
    [-122.4650, 37.7720], // Final approach
    [-122.4653, 37.7717], // Very close
    [-122.4656, 37.7714], // Almost arrived
    [-122.4659, 37.7711], // Almost arrived
    [-122.4661, 37.7701]  // Japanese Tea Garden (pickup)
  ];
  
  // Route from pickup to dropoff (following SF streets with more points)
  const fromPickupRoute = [
    [-122.4661, 37.7701], // Japanese Tea Garden
    [-122.4658, 37.7703], // Start leaving
    [-122.4655, 37.7705], // Exit Golden Gate Park
    [-122.4650, 37.7705], // Exit Golden Gate Park
    [-122.4647, 37.7707], // Stanyan approach
    [-122.4644, 37.7709], // On Stanyan
    [-122.4640, 37.7710], // Stanyan St
    [-122.4637, 37.7712], // Continue Stanyan
    [-122.4634, 37.7714], // Haight approach
    [-122.4630, 37.7716], // Turning to Haight
    [-122.4627, 37.7718], // On Haight
    [-122.4624, 37.7719], // Haight St
    [-122.4620, 37.7720], // Haight St
    [-122.4617, 37.7722], // Continue Haight
    [-122.4614, 37.7724], // Continue Haight
    [-122.4610, 37.7726], // Continue Haight
    [-122.4607, 37.7728], // Continue Haight
    [-122.4604, 37.7729], // Continue Haight
    [-122.4600, 37.7730], // Continue on Haight
    [-122.4597, 37.7732], // Divisadero approach
    [-122.4594, 37.7734], // Turning to Divisadero
    [-122.4590, 37.7736], // On Divisadero
    [-122.4587, 37.7738], // Divisadero St
    [-122.4584, 37.7739], // Divisadero St
    [-122.4580, 37.7740], // Divisadero St
    [-122.4577, 37.7742], // Continue Divisadero
    [-122.4574, 37.7744], // Fillmore approach
    [-122.4570, 37.7746], // Turning to Fillmore
    [-122.4567, 37.7748], // On Fillmore
    [-122.4564, 37.7749], // Fillmore St
    [-122.4560, 37.7750], // Fillmore St
    [-122.4557, 37.7752], // Continue east
    [-122.4554, 37.7754], // Continue east
    [-122.4550, 37.7756], // Continue east
    [-122.4547, 37.7758], // Steiner approach
    [-122.4544, 37.7759], // On Steiner
    [-122.4540, 37.7760], // Steiner St
    [-122.4537, 37.7762], // Continue east
    [-122.4534, 37.7764], // Continue east
    [-122.4530, 37.7766], // Pierce approach
    [-122.4527, 37.7768], // On Pierce
    [-122.4524, 37.7769], // Pierce St
    [-122.4520, 37.7770], // Pierce St
    [-122.4517, 37.7772], // Continue east
    [-122.4514, 37.7774], // Continue east
    [-122.4510, 37.7776], // Scott approach
    [-122.4507, 37.7778], // On Scott
    [-122.4504, 37.7779], // Scott St
    [-122.4500, 37.7780], // Scott St
    [-122.4497, 37.7782], // Continue east
    [-122.4494, 37.7784], // Continue east
    [-122.4490, 37.7786], // Divisadero approach
    [-122.4487, 37.7788], // Turning to Divisadero
    [-122.4484, 37.7789], // On Divisadero
    [-122.4480, 37.7790], // Divisadero to Geary
    [-122.4477, 37.7792], // Continue north
    [-122.4474, 37.7794], // Continue north
    [-122.4470, 37.7796], // Geary approach
    [-122.4467, 37.7798], // Turning to Geary
    [-122.4464, 37.7799], // On Geary
    [-122.4460, 37.7800], // Geary Blvd
    [-122.4457, 37.7802], // Continue Geary
    [-122.4454, 37.7804], // Continue Geary
    [-122.4450, 37.7806], // Continue Geary
    [-122.4447, 37.7808], // Continue Geary
    [-122.4444, 37.7809], // Continue Geary
    [-122.4440, 37.7810], // Continue on Geary
    [-122.4437, 37.7812], // Van Ness approach
    [-122.4434, 37.7814], // Van Ness approach
    [-122.4430, 37.7816], // Turning to Van Ness
    [-122.4427, 37.7818], // On Van Ness
    [-122.4424, 37.7819], // Van Ness Ave
    [-122.4420, 37.7820], // Van Ness Ave
    [-122.4417, 37.7822], // Continue east
    [-122.4414, 37.7824], // Continue east
    [-122.4410, 37.7826], // Polk approach
    [-122.4407, 37.7828], // On Polk
    [-122.4404, 37.7829], // Polk St
    [-122.4400, 37.7830], // Polk St
    [-122.4397, 37.7832], // Continue east
    [-122.4394, 37.7834], // Continue east
    [-122.4390, 37.7836], // Larkin approach
    [-122.4387, 37.7838], // On Larkin
    [-122.4384, 37.7839], // Larkin St
    [-122.4380, 37.7840], // Larkin St
    [-122.4377, 37.7842], // Continue east
    [-122.4374, 37.7844], // Continue east
    [-122.4370, 37.7846], // Hyde approach
    [-122.4367, 37.7848], // On Hyde
    [-122.4364, 37.7849], // Hyde St
    [-122.4360, 37.7850], // Hyde St
    [-122.4357, 37.7852], // Continue east
    [-122.4354, 37.7854], // Continue east
    [-122.4350, 37.7856], // Leavenworth approach
    [-122.4347, 37.7858], // On Leavenworth
    [-122.4344, 37.7859], // Leavenworth St
    [-122.4340, 37.7860], // Leavenworth St
    [-122.4337, 37.7862], // Continue east
    [-122.4334, 37.7864], // Continue east
    [-122.4330, 37.7866], // Jones approach
    [-122.4327, 37.7868], // On Jones
    [-122.4324, 37.7869], // Jones St
    [-122.4320, 37.7870], // Jones St
    [-122.4317, 37.7872], // Continue east
    [-122.4314, 37.7874], // Continue east
    [-122.4310, 37.7876], // Taylor approach
    [-122.4307, 37.7878], // On Taylor
    [-122.4304, 37.7879], // Taylor St
    [-122.4300, 37.7880], // Taylor St
    [-122.4297, 37.7882], // Continue east
    [-122.4294, 37.7884], // Continue east
    [-122.4290, 37.7886], // Mason approach
    [-122.4287, 37.7888], // On Mason
    [-122.4284, 37.7889], // Mason St
    [-122.4280, 37.7890], // Mason St
    [-122.4277, 37.7892], // Continue east
    [-122.4274, 37.7894], // Continue east
    [-122.4270, 37.7896], // Powell approach
    [-122.4267, 37.7898], // On Powell
    [-122.4264, 37.7899], // Powell St
    [-122.4260, 37.7900], // Powell St
    [-122.4257, 37.7902], // Continue east
    [-122.4254, 37.7904], // Continue east
    [-122.4250, 37.7906], // Stockton approach
    [-122.4247, 37.7908], // On Stockton
    [-122.4244, 37.7909], // Stockton St
    [-122.4240, 37.7910], // Stockton St
    [-122.4237, 37.7912], // Continue east
    [-122.4234, 37.7914], // Continue east
    [-122.4230, 37.7916], // Grant approach
    [-122.4227, 37.7918], // On Grant
    [-122.4224, 37.7919], // Grant Ave
    [-122.4220, 37.7920], // Grant Ave
    [-122.4217, 37.7921], // Continue east
    [-122.4214, 37.7922], // Continue east
    [-122.4210, 37.7923], // Kearny approach
    [-122.4207, 37.7924], // On Kearny
    [-122.4204, 37.7924], // Kearny St
    [-122.4200, 37.7925], // Kearny St
    [-122.4197, 37.7926], // Continue east
    [-122.4194, 37.7926], // Continue east
    [-122.4190, 37.7927], // Montgomery approach
    [-122.4187, 37.7927], // On Montgomery
    [-122.4184, 37.7928], // Montgomery St
    [-122.4180, 37.7928], // Montgomery St
    [-122.4177, 37.7929], // Continue east
    [-122.4174, 37.7929], // Continue east
    [-122.4170, 37.7930], // Sansome approach
    [-122.4167, 37.7930], // On Sansome
    [-122.4164, 37.7930], // Sansome St
    [-122.4160, 37.7930], // Sansome St
    [-122.4157, 37.7931], // Continue east
    [-122.4154, 37.7931], // Continue east
    [-122.4150, 37.7932], // Battery approach
    [-122.4147, 37.7932], // On Battery
    [-122.4144, 37.7932], // Battery St
    [-122.4140, 37.7932], // Battery St
    [-122.4137, 37.7933], // Continue east
    [-122.4134, 37.7933], // Continue east
    [-122.4130, 37.7934], // Front approach
    [-122.4127, 37.7934], // On Front
    [-122.4124, 37.7934], // Front St
    [-122.4120, 37.7934], // Front St
    [-122.4117, 37.7935], // Continue east
    [-122.4114, 37.7935], // Continue east
    [-122.4110, 37.7936], // Davis approach
    [-122.4107, 37.7936], // On Davis
    [-122.4104, 37.7936], // Davis St
    [-122.4100, 37.7936], // Davis St
    [-122.4097, 37.7937], // Continue east
    [-122.4094, 37.7937], // Continue east
    [-122.4090, 37.7938], // Drumm approach
    [-122.4087, 37.7938], // On Drumm
    [-122.4084, 37.7938], // Drumm St
    [-122.4080, 37.7938], // Drumm St
    [-122.4077, 37.7939], // Final approach
    [-122.4074, 37.7940], // Almost there
    [-122.4071, 37.7941], // Very close
    [-122.408, 37.793]     // North Beach SF (final destination)
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
    el.style.width = type === 'driver' ? '32px' : '24px';
    el.style.height = type === 'driver' ? '32px' : '24px';
    el.style.borderRadius = type === 'driver' ? '50%' : '12px 12px 12px 2px';
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.fontSize = '10px';
    el.style.fontWeight = '700';
    el.style.color = 'white';
    
    if (type === 'pickup') {
      el.style.backgroundColor = BASE_TOKENS.colors.green[500];
      el.textContent = 'P';
    } else if (type === 'dropoff') {
      el.style.backgroundColor = BASE_TOKENS.colors.red[500];
      el.textContent = 'D';
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
