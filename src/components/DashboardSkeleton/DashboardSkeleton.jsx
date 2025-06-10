import React from 'react';
import { motion } from 'framer-motion';

/**
 * A skeleton loader that mimics the structure of the dashboard.
 * It provides a better user experience by showing a preview of the upcoming content.
 */
const DashboardSkeleton = ({ tokens }) => {
  const skeletonBox = (height, width = '100%') => (
    <div style={{
      backgroundColor: tokens.colors.gray[200],
      borderRadius: tokens.borderRadius.md,
      height,
      width,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Shimmer effect */}
      <motion.div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent 0%, ${tokens.colors.gray[100]} 50%, transparent 100%)`,
          opacity: 0.6,
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        width: '100%', 
        height: '100%', 
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {skeletonBox('28px', '45%')}
        {skeletonBox('18px', '35%')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '40% 1fr', gap: '24px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {skeletonBox('280px')}
          {skeletonBox('220px')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {skeletonBox('320px')}
          {skeletonBox('180px')}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardSkeleton;
