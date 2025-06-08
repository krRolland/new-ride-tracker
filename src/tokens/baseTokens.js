// Base UI Design Tokens - Complete Uber specifications
export const BASE_TOKENS = {
  // Spacing (4px base grid)
  spacing: {
    xs: '4px',
    sm: '8px', 
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
    '6xl': '64px'
  },
  
  // Typography
  typography: {
    fontSize: {
      xs: '12px',
      sm: '14px', 
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      xs: '16px',
      sm: '20px',
      base: '24px', 
      lg: '28px',
      xl: '32px',
      '2xl': '36px',
      '3xl': '40px'
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },
  
  // Colors (Base UI exact values)
  colors: {
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6', 
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8'
    },
    green: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857'
    },
    red: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C'
    },
    yellow: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309'
    },
    white: '#FFFFFF',
    black: '#000000',
    
    // Semantic colors for consistency
    primary: {
      50: '#F9FAFB',
      500: '#111827',
      600: '#374151'
    },
    success: {
      50: '#ECFDF5',
      500: '#10B981'
    },
    warning: {
      50: '#FFFBEB',
      500: '#F59E0B'
    },
    danger: {
      50: '#FEF2F2',
      500: '#EF4444'
    }
  },
  
  // Border radius
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '6px', 
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px'
  },
  
  // Shadows (your subtle approach is perfect)
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.01)',
    md: '0 1px 3px 0 rgba(0, 0, 0, 0.01), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    lg: '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    xl: '0 10px 15px -3px rgba(0, 0, 0, 0.01), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.02)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.01)'
  },
  
  // Motion & Transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms'
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  
  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  },
  
  // Breakpoints (for responsive design)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Component-specific tokens
  components: {
    button: {
      height: {
        sm: '32px',
        md: '40px',
        lg: '48px'
      },
      padding: {
        sm: '8px 12px',
        md: '12px 16px',
        lg: '16px 20px'
      }
    },
    input: {
      height: {
        sm: '32px',
        md: '40px',
        lg: '48px'
      }
    },
    avatar: {
      size: {
        xs: '24px',
        sm: '32px',
        md: '40px',
        lg: '48px',
        xl: '56px',
        '2xl': '64px'
      }
    }
  }
};