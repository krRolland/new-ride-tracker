import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { BASE_TOKENS } from '../../tokens';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const QueryVisualizer = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  // Mock GPU utilization data
  const gpuData = [
    { time: '15:25', utilization: 45 },
    { time: '15:49', utilization: 60 },
    { time: '16:13', utilization: 25 },
    { time: '16:37', utilization: 55 },
    { time: '17:01', utilization: 80 },
    { time: '17:25', utilization: 65 },
    { time: '17:49', utilization: 30 }
  ];

  // Mock memory usage data
  const memoryData = [
    { name: 'GPU Memory', value: 45, color: BASE_TOKENS.colors.gray[500] },
    { name: 'System RAM', value: 25, color: BASE_TOKENS.colors.green[500] },
    { name: 'Cache', value: 15, color: BASE_TOKENS.colors.yellow[500] },
    { name: 'Available', value: 15, color: BASE_TOKENS.colors.red[500] }
  ];

  // Mock model performance data
  const modelRuns = [
    { id: 'run_001', epoch: 15, accuracy: 0.924, loss: 0.076, precision: 0.918, recall: 0.931, status: 'Running' },
    { id: 'run_002', epoch: 12, accuracy: 0.891, loss: 0.109, precision: 0.885, recall: 0.897, status: 'Complete' },
    { id: 'run_003', epoch: 8, accuracy: 0.867, loss: 0.133, precision: 0.859, recall: 0.875, status: 'Complete' },
    { id: 'run_004', epoch: 20, accuracy: 0.945, loss: 0.055, precision: 0.942, recall: 0.948, status: 'Complete' },
    { id: 'run_005', epoch: 5, accuracy: 0.823, loss: 0.177, precision: 0.815, recall: 0.831, status: 'Failed' }
  ];

  const filteredRuns = modelRuns.filter(run => 
    run.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    run.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setRefreshCount(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Custom Icon Components
  const SearchIcon = ({ size = 16, color = BASE_TOKENS.colors.gray[400] }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );

  const RefreshIcon = ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <polyline points="23 4 23 10 17 10"/>
      <polyline points="1 20 1 14 7 14"/>
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
    </svg>
  );

  const PlayIcon = ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  );

  const PauseIcon = ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  );

  const StopIcon = ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    </svg>
  );

  const ExternalLinkIcon = ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );

  const AlertIcon = ({ size = 20, color = BASE_TOKENS.colors.yellow[600] }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );

  // Chart.js configurations
  const lineChartData = {
    labels: gpuData.map(d => d.time),
    datasets: [
      {
        label: 'GPU Utilization (%)',
        data: gpuData.map(d => d.utilization),
        borderColor: BASE_TOKENS.colors.blue[500],
        backgroundColor: BASE_TOKENS.colors.blue[100],
        borderWidth: 2,
        pointBackgroundColor: BASE_TOKENS.colors.blue[500],
        pointBorderColor: BASE_TOKENS.colors.white,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: BASE_TOKENS.colors.white,
        titleColor: BASE_TOKENS.colors.gray[900],
        bodyColor: BASE_TOKENS.colors.gray[700],
        borderColor: BASE_TOKENS.colors.gray[200],
        borderWidth: 1,
        cornerRadius: parseInt(BASE_TOKENS.borderRadius.md),
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.parsed.y}% utilization`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: BASE_TOKENS.colors.gray[200],
          drawBorder: false,
        },
        ticks: {
          color: BASE_TOKENS.colors.gray[500],
          font: {
            size: 12,
            family: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: BASE_TOKENS.colors.gray[200],
          drawBorder: false,
        },
        ticks: {
          color: BASE_TOKENS.colors.gray[500],
          font: {
            size: 12,
            family: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          },
          callback: function(value) {
            return value + '%';
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart',
    },
  };

  const doughnutChartData = {
    labels: memoryData.map(d => d.name),
    datasets: [
      {
        data: memoryData.map(d => d.value),
        backgroundColor: memoryData.map(d => d.color),
        borderColor: BASE_TOKENS.colors.white,
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: BASE_TOKENS.colors.white,
        titleColor: BASE_TOKENS.colors.gray[900],
        bodyColor: BASE_TOKENS.colors.gray[700],
        borderColor: BASE_TOKENS.colors.gray[200],
        borderWidth: 1,
        cornerRadius: parseInt(BASE_TOKENS.borderRadius.md),
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      },
    },
    cutout: '60%',
    animation: {
      animateRotate: true,
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const componentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running': 
        return {
          color: BASE_TOKENS.colors.blue[600],
          backgroundColor: BASE_TOKENS.colors.blue[50]
        };
      case 'Complete': 
        return {
          color: BASE_TOKENS.colors.green[600],
          backgroundColor: BASE_TOKENS.colors.green[50]
        };
      case 'Failed': 
        return {
          color: BASE_TOKENS.colors.red[600],
          backgroundColor: BASE_TOKENS.colors.red[50]
        };
      default: 
        return {
          color: BASE_TOKENS.colors.gray[600],
          backgroundColor: BASE_TOKENS.colors.gray[50]
        };
    }
  };

  // Styles using BASE_TOKENS (matching RideTrackingDashboard structure)
  const styles = {
    container: {
      backgroundColor: BASE_TOKENS.colors.gray[50],
      minHeight: '100vh',
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    },
    header: {
      position: 'sticky',
      top: 0,
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: `${BASE_TOKENS.spacing.lg} ${BASE_TOKENS.spacing['2xl']}`,
      marginBottom: BASE_TOKENS.spacing['2xl'],
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: `0 ${BASE_TOKENS.spacing['2xl']} ${BASE_TOKENS.spacing['2xl']}`
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerTitle: {
      fontSize: BASE_TOKENS.typography.fontSize['2xl'],
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: '#ffffff',
      lineHeight: BASE_TOKENS.typography.lineHeight.xl,
      margin: 0,
      marginBottom: BASE_TOKENS.spacing.xs
    },
    headerSubtitle: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      color: '#cccccc',
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      margin: 0,
      marginBottom: '2px'
    },
    jobId: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: '#999999',
      fontWeight: BASE_TOKENS.typography.fontWeight.normal,
      margin: 0
    },
    headerControls: {
      display: 'flex',
      alignItems: 'center',
      gap: BASE_TOKENS.spacing.md
    },
    statusIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: BASE_TOKENS.spacing.sm
    },
    statusDot: {
      width: '12px',
      height: '12px',
      borderRadius: BASE_TOKENS.borderRadius.full
    },
    statusText: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium
    },
    controlButton: {
      padding: BASE_TOKENS.spacing.sm,
      color: BASE_TOKENS.colors.gray[600],
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: BASE_TOKENS.borderRadius.md,
      cursor: 'pointer',
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`,
      ':hover': {
        color: BASE_TOKENS.colors.gray[900],
        backgroundColor: BASE_TOKENS.colors.gray[100]
      }
    },
    primaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: BASE_TOKENS.spacing.sm,
      backgroundColor: BASE_TOKENS.colors.blue[600],
      color: BASE_TOKENS.colors.white,
      padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.lg}`,
      borderRadius: BASE_TOKENS.borderRadius.md,
      border: 'none',
      cursor: 'pointer',
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`,
      ':hover': {
        backgroundColor: BASE_TOKENS.colors.blue[700]
      }
    },
    gridLayout: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: BASE_TOKENS.spacing['2xl'],
      marginBottom: BASE_TOKENS.spacing['2xl']
    },
    card: {
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      padding: BASE_TOKENS.spacing['2xl'],
      boxShadow: BASE_TOKENS.shadows.md
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: BASE_TOKENS.spacing.lg
    },
    cardTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.lg,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      margin: 0
    },
    cardSubtitle: {
      display: 'flex',
      alignItems: 'center',
      gap: BASE_TOKENS.spacing.sm,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      color: BASE_TOKENS.colors.gray[600]
    },
    searchContainer: {
      position: 'relative'
    },
    searchInput: {
      paddingLeft: BASE_TOKENS.spacing['3xl'],
      paddingRight: BASE_TOKENS.spacing.lg,
      paddingTop: BASE_TOKENS.spacing.sm,
      paddingBottom: BASE_TOKENS.spacing.sm,
      border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      outline: 'none',
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`,
      ':focus': {
        borderColor: BASE_TOKENS.colors.blue[500],
        boxShadow: `0 0 0 3px ${BASE_TOKENS.colors.blue[100]}`
      }
    },
    searchIcon: {
      position: 'absolute',
      left: BASE_TOKENS.spacing.md,
      top: '50%',
      transform: 'translateY(-50%)',
      color: BASE_TOKENS.colors.gray[400]
    },
    select: {
      border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.md}`,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      outline: 'none',
      backgroundColor: BASE_TOKENS.colors.white,
      cursor: 'pointer',
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`,
      ':focus': {
        borderColor: BASE_TOKENS.colors.blue[500],
        boxShadow: `0 0 0 3px ${BASE_TOKENS.colors.blue[100]}`
      }
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      borderBottom: `1px solid ${BASE_TOKENS.colors.gray[200]}`
    },
    tableHeaderCell: {
      textAlign: 'left',
      padding: `${BASE_TOKENS.spacing.md} ${BASE_TOKENS.spacing.lg}`,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium,
      color: BASE_TOKENS.colors.gray[700],
      fontSize: BASE_TOKENS.typography.fontSize.sm
    },
    tableRow: {
      borderBottom: `1px solid ${BASE_TOKENS.colors.gray[100]}`
    },
    tableCell: {
      padding: `${BASE_TOKENS.spacing.md} ${BASE_TOKENS.spacing.lg}`,
      fontSize: BASE_TOKENS.typography.fontSize.sm
    },
    statusTag: {
      padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.sm}`,
      borderRadius: BASE_TOKENS.borderRadius.full,
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      fontWeight: BASE_TOKENS.typography.fontWeight.medium
    },
    alertBanner: {
      position: 'fixed',
      bottom: BASE_TOKENS.spacing.lg,
      right: BASE_TOKENS.spacing.lg,
      backgroundColor: BASE_TOKENS.colors.yellow[50],
      border: `1px solid ${BASE_TOKENS.colors.yellow[200]}`,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      padding: BASE_TOKENS.spacing.lg,
      boxShadow: BASE_TOKENS.shadows.lg,
      zIndex: BASE_TOKENS.zIndex.toast
    },
    alertContent: {
      display: 'flex',
      alignItems: 'center',
      gap: BASE_TOKENS.spacing.sm
    },
    alertText: {
      color: BASE_TOKENS.colors.yellow[800],
      fontSize: BASE_TOKENS.typography.fontSize.sm
    }
  };

  return (
    <motion.div 
      style={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        style={styles.header}
        variants={headerVariants}
      >
        <div style={styles.headerContent}>
          <div>
            <motion.h1 
              style={styles.headerTitle}
              variants={componentVariants}
            >
              ML Training Dashboard
            </motion.h1>
            <motion.p 
              style={styles.headerSubtitle}
              variants={componentVariants}
            >
              Model: uber-demand-prediction-v3 | Job ID: job_92a7a5d7
            </motion.p>
          </div>
          <motion.div 
            style={styles.headerControls}
            variants={componentVariants}
          >
            <div style={styles.statusIndicator}>
              <div 
                style={{
                  ...styles.statusDot,
                  backgroundColor: isRunning ? BASE_TOKENS.colors.green[400] : BASE_TOKENS.colors.red[400]
                }}
              />
              <span style={styles.statusText}>
                {isRunning ? 'Running' : 'Stopped'}
              </span>
            </div>
            <button
              onClick={() => setIsRunning(!isRunning)}
              style={styles.controlButton}
              onMouseEnter={(e) => {
                e.target.style.color = BASE_TOKENS.colors.gray[900];
                e.target.style.backgroundColor = BASE_TOKENS.colors.gray[100];
              }}
              onMouseLeave={(e) => {
                e.target.style.color = BASE_TOKENS.colors.gray[600];
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {isRunning ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
            </button>
            <button 
              style={styles.controlButton}
              onMouseEnter={(e) => {
                e.target.style.color = BASE_TOKENS.colors.gray[900];
                e.target.style.backgroundColor = BASE_TOKENS.colors.gray[100];
              }}
              onMouseLeave={(e) => {
                e.target.style.color = BASE_TOKENS.colors.gray[600];
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <StopIcon size={18} />
            </button>
            <button 
              style={styles.primaryButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = BASE_TOKENS.colors.blue[700];
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = BASE_TOKENS.colors.blue[600];
              }}
            >
              <RefreshIcon size={16} />
              <span>Refresh</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={styles.content}>
        <motion.div 
          style={styles.gridLayout}
          variants={containerVariants}
        >
          {/* GPU Utilization Chart */}
          <motion.div 
            style={styles.card}
            variants={componentVariants}
          >
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>GPU Utilization Over Time</h2>
              <div style={styles.cardSubtitle}>
                <span>Last 24 Hours</span>
                {refreshCount > 0 && (
                  <span style={{ color: BASE_TOKENS.colors.green[600] }}>
                    • Live ({refreshCount})
                  </span>
                )}
              </div>
            </div>
            <div style={{ height: '250px' }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </motion.div>

          {/* Memory Usage Distribution */}
          <motion.div 
            style={styles.card}
            variants={componentVariants}
          >
            <h2 style={styles.cardTitle}>Memory Usage Distribution</h2>
            <div style={{ height: '200px' }}>
              <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            </div>
            <div style={{ marginTop: BASE_TOKENS.spacing.lg }}>
              {memoryData.map((item, index) => (
                <div 
                  key={index} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: BASE_TOKENS.spacing.sm,
                    fontSize: BASE_TOKENS.typography.fontSize.sm
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: BASE_TOKENS.spacing.sm }}>
                    <div 
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: BASE_TOKENS.borderRadius.full,
                        backgroundColor: item.color
                      }}
                    />
                    <span style={{ color: BASE_TOKENS.colors.gray[700] }}>
                      {item.name}
                    </span>
                  </div>
                  <span style={{ fontWeight: BASE_TOKENS.typography.fontWeight.medium }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Model Performance Details */}
        <motion.div 
          style={{
            ...styles.card,
            marginTop: BASE_TOKENS.spacing['2xl']
          }}
          variants={componentVariants}
        >
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Model Performance Details</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: BASE_TOKENS.spacing.lg }}>
            <div style={styles.searchContainer}>
              <SearchIcon 
                size={16} 
              />
              <input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <select style={styles.select}>
              <option>Sort by Name</option>
              <option>Sort by Accuracy</option>
              <option>Sort by Date</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Run ID</th>
                <th style={styles.tableHeaderCell}>Epoch</th>
                <th style={styles.tableHeaderCell}>Accuracy</th>
                <th style={styles.tableHeaderCell}>Loss</th>
                <th style={styles.tableHeaderCell}>Precision</th>
                <th style={styles.tableHeaderCell}>Recall</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRuns.map((run, index) => {
                const statusColors = getStatusColor(run.status);
                return (
                  <tr 
                    key={run.id} 
                    style={{
                      ...styles.tableRow,
                      backgroundColor: index % 2 === 0 ? BASE_TOKENS.colors.gray[50] : BASE_TOKENS.colors.white
                    }}
                  >
                    <td style={{
                      ...styles.tableCell,
                      fontFamily: 'monospace'
                    }}>
                      {run.id}
                    </td>
                    <td style={styles.tableCell}>{run.epoch}</td>
                    <td style={{
                      ...styles.tableCell,
                      fontWeight: BASE_TOKENS.typography.fontWeight.medium
                    }}>
                      {run.accuracy.toFixed(3)}
                    </td>
                    <td style={styles.tableCell}>{run.loss.toFixed(3)}</td>
                    <td style={styles.tableCell}>{run.precision.toFixed(3)}</td>
                    <td style={styles.tableCell}>{run.recall.toFixed(3)}</td>
                    <td style={styles.tableCell}>
                      <span 
                        style={{
                          ...styles.statusTag,
                          ...statusColors
                        }}
                      >
                        {run.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={{
                          color: BASE_TOKENS.colors.blue[600],
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: BASE_TOKENS.spacing.xs,
                          borderRadius: BASE_TOKENS.borderRadius.sm,
                          transition: `color ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = BASE_TOKENS.colors.blue[800];
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = BASE_TOKENS.colors.blue[600];
                        }}
                      >
                        <ExternalLinkIcon size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </motion.div>
      </div>

      {/* Alert Banner */}
      {!isRunning && (
        <motion.div 
          style={styles.alertBanner}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div style={styles.alertContent}>
            <AlertIcon 
              size={20} 
            />
            <span style={styles.alertText}>
              Training job paused. Click play to resume monitoring.
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QueryVisualizer;
