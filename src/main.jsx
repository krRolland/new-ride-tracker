import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Base UI Font Import
const fontLink = document.createElement('link');
fontLink.href = 'https://d1a3f4spazzrp4.cloudfront.net/uber-fonts/4.0.0/superfine.css';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Global styles
const globalStyles = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #F9FAFB;
  }

  button {
    font-family: inherit;
  }

  *:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
  }

  /* Responsive breakpoints */
  @media (max-width: 768px) {
    .mobile-responsive {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
  }
`;

const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);