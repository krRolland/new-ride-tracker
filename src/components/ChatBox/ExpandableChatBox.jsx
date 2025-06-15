import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_TOKENS } from '../../tokens';

const ExpandableChatBox = ({ 
  width = '400px', 
  height = '500px', 
  position = 'relative',
  className = '',
  showCollapseButton = true,
  darkMode = false,
  onExpansionChange,
  onMinimizedChange,
  onUserMessage,
  customBotResponses = {},
  fixedTime = null,
  chatTitle = "Call Fraud Dashboard",
  chatSubtitle = "Building your custom dashboard",
  initialTitle = "What do you want to make?",
  initialSubtitle = "Let's build something amazing together",
  ...props 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(initialTitle);
  const [headerSubtitle, setHeaderSubtitle] = useState(initialSubtitle);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'bot',
      timestamp: fixedTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasExpanded, setHasExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
    }
  }, [messages, isExpanded]);

  // Animation effects for collapsed state
  useEffect(() => {
    const wasReady = isReady;
    const nowReady = inputValue.trim().length > 0;
    setIsReady(nowReady);
    
    // Trigger expansion when going from empty to having content
    if (!wasReady && nowReady) {
      setHasExpanded(true);
    }
    // Trigger contraction when going from content to empty
    if (wasReady && !nowReady) {
      setHasExpanded(false);
    }
  }, [inputValue, isReady]);

  // Notify parent of expansion state changes
  useEffect(() => {
    if (onExpansionChange) {
      onExpansionChange(isExpanded);
    }
  }, [isExpanded, onExpansionChange]);

  // Notify parent of minimized state changes
  useEffect(() => {
    if (onMinimizedChange) {
      onMinimizedChange(isMinimized);
    }
  }, [isMinimized, onMinimizedChange]);

  const handleCollapse = () => {
    setIsExpanded(false);
    setIsMinimized(true);
    setInputValue('');
  };

  const handleExpand = () => {
    setIsMinimized(false);
    setIsExpanded(true);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: fixedTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Call the onUserMessage callback if provided
    if (onUserMessage) {
      onUserMessage(newMessage);
    }
    
    const currentInputValue = inputValue;
    setInputValue('');
    
    // Expand after sending the first message
    if (!isExpanded) {
      setIsExpanded(true);
      // Focus input after expansion animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 700);
    }
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Change header title after "thinking" (during typing)
    setTimeout(() => {
      setHeaderTitle(chatTitle);
      setHeaderSubtitle(chatSubtitle);
    }, 1000);
    
    setTimeout(() => {
      // Determine bot response text based on message count and custom responses
      const userMessageCount = messages.filter(msg => msg.sender === 'user').length + 1;
      let botResponseText = "Here's your ride dashboard!";
      
      if (customBotResponses[userMessageCount]) {
        botResponseText = customBotResponses[userMessageCount];
      }
      
      // Add the bot message first, then stop typing to create smoother transition
      const botResponse = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: fixedTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Stop typing after a brief delay to allow message to start animating
      setTimeout(() => {
        setIsTyping(false);
      }, 100);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Custom Icon Components
  const ArrowIcon = ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M5 12h14"/>
      <path d="M12 5l7 7-7 7"/>
    </svg>
  );

  const CollapseIcon = ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M11 17l-5-5 5-5"/>
      <path d="M18 17l-5-5 5-5"/>
    </svg>
  );

  const ExpandIcon = ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M13 7l5 5-5 5"/>
      <path d="M6 7l5 5-5 5"/>
    </svg>
  );

  const ChatIcon = ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );

  // Simple fade variants - no size changes
  const containerVariants = {
    collapsed: {
      opacity: 1
    },
    minimized: {
      opacity: 1
    },
    expanded: {
      opacity: 1
    }
  };

  const contentVariants = {
    collapsed: {
      opacity: 0
    },
    expanded: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const individualContentVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { duration: 0.4 },
        y: { duration: 0.6 },
        scale: { duration: 0.5 }
      }
    }
  };

  const typingVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Dark theme color tokens
  const darkTheme = {
    background: '#1a1a1a',
    backgroundSecondary: '#2a2a2a',
    text: 'rgba(255, 255, 255, 0.9)',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(255, 255, 255, 0.2)',
    borderHover: 'rgba(255, 255, 255, 0.4)',
    button: '#333333',
    buttonHover: '#404040',
    input: '#2a2a2a',
    inputBorder: 'rgba(255, 255, 255, 0.3)',
    messageBg: '#333333',
    userMessageBg: '#4a4a4a',
    avatar: '#404040',
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
  };

  // Static container style - no size animations
  const getContainerStyle = () => {
    let containerWidth, containerHeight;
    
    if (isMinimized) {
      containerWidth = '60px';
      containerHeight = height;
    } else if (isExpanded) {
      containerWidth = width;
      containerHeight = height;
    } else {
      containerWidth = width;
      containerHeight = '100px';
    }
    
    return {
      position,
      width: containerWidth,
      height: containerHeight,
      backgroundColor: isMinimized 
        ? (darkMode ? darkTheme.background : BASE_TOKENS.colors.gray[900])
        : isExpanded 
          ? (darkMode ? darkTheme.background : BASE_TOKENS.colors.white)
          : (darkMode ? 'rgb(42, 42, 42)' : BASE_TOKENS.colors.white),
      borderRadius: isExpanded ? BASE_TOKENS.borderRadius.lg : '35px',
      border: `1px solid ${darkMode ? darkTheme.border : BASE_TOKENS.colors.gray[200]}`,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden',
      boxShadow: darkMode ? darkTheme.shadow : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    };
  };

  const styles = {
    collapsedContainer: {
      padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.md}`,
      minWidth: '300px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    collapsedTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.lg,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: darkMode ? darkTheme.text : BASE_TOKENS.colors.gray[900],
      margin: 0,
      marginBottom: BASE_TOKENS.spacing.md,
      textAlign: 'center'
    },
    collapsedInput: {
      display: 'flex',
      alignItems: 'center',
      border: 'none',
      borderRadius: BASE_TOKENS.borderRadius.lg,
      overflow: 'hidden',
      boxShadow: 'none',
      width: '100%',
      margin: `0 ${BASE_TOKENS.spacing.xs}`
    },
    collapsedInputField: {
      flex: .9,
      padding: `${BASE_TOKENS.spacing.md} ${BASE_TOKENS.spacing.lg}`,
      border: 'none',
      outline: 'none',
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      fontFamily: 'inherit',
      backgroundColor: darkMode ? darkTheme.input : BASE_TOKENS.colors.white,
      color: darkMode ? darkTheme.text : BASE_TOKENS.colors.gray[900],
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`
    },
    collapsedButton: {
      padding: `${BASE_TOKENS.spacing.xs} ${BASE_TOKENS.spacing.md}`,
      backgroundColor: darkMode ? darkTheme.button : BASE_TOKENS.colors.gray[900],
      color: BASE_TOKENS.colors.white,
      border: 'none',
      borderRadius: BASE_TOKENS.borderRadius.lg,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease-out',
      minWidth: '50px',
      height: '36px'
    },
    header: {
      padding: BASE_TOKENS.spacing.lg,
      borderBottom: `1px solid ${darkMode ? darkTheme.border : BASE_TOKENS.colors.gray[200]}`,
      backgroundColor: darkMode ? darkTheme.backgroundSecondary : BASE_TOKENS.colors.gray[50],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerContent: {
      flex: 1
    },
    headerTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.lg,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: darkMode ? darkTheme.text : BASE_TOKENS.colors.gray[900],
      margin: 0,
      marginBottom: BASE_TOKENS.spacing.xs
    },
    headerSubtitle: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      color: darkMode ? darkTheme.textSecondary : BASE_TOKENS.colors.gray[600],
      margin: 0
    },
    closeButton: {
      padding: BASE_TOKENS.spacing.xs,
      backgroundColor: 'transparent',
      color: darkMode ? darkTheme.textSecondary : BASE_TOKENS.colors.gray[500],
      border: 'none',
      borderRadius: BASE_TOKENS.borderRadius.md,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`,
      width: '32px',
      height: '32px'
    },
    messagesContainer: {
      flex: 1,
      padding: BASE_TOKENS.spacing.lg,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: BASE_TOKENS.spacing.md
    },
    messageWrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: BASE_TOKENS.spacing.sm
    },
    userMessageWrapper: {
      justifyContent: 'flex-end'
    },
    botMessageWrapper: {
      justifyContent: 'flex-start'
    },
    messageAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: BASE_TOKENS.borderRadius.full,
      backgroundColor: darkMode ? darkTheme.avatar : BASE_TOKENS.colors.gray[200],
      border: `2px solid ${darkMode ? darkTheme.background : BASE_TOKENS.colors.white}`,
      boxShadow: darkMode ? darkTheme.shadow : BASE_TOKENS.shadows.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden'
    },
    botAvatar: {
      backgroundColor: darkMode ? darkTheme.avatar : BASE_TOKENS.colors.blue[50]
    },
    userAvatar: {
      backgroundColor: darkMode ? darkTheme.avatar : BASE_TOKENS.colors.gray[200]
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      borderRadius: BASE_TOKENS.borderRadius.full,
      objectFit: 'cover'
    },
    messageContent: {
      maxWidth: '70%',
      display: 'flex',
      flexDirection: 'column',
      gap: BASE_TOKENS.spacing.xs
    },
    messageBubble: {
      padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.md}`,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      lineHeight: BASE_TOKENS.typography.lineHeight.sm,
      wordWrap: 'break-word'
    },
    userMessage: {
      backgroundColor: darkMode ? darkTheme.userMessageBg : BASE_TOKENS.colors.gray[900],
      color: BASE_TOKENS.colors.white,
      borderBottomRightRadius: BASE_TOKENS.borderRadius.sm
    },
    botMessage: {
      backgroundColor: darkMode ? darkTheme.messageBg : BASE_TOKENS.colors.gray[100],
      color: darkMode ? darkTheme.text : BASE_TOKENS.colors.gray[900],
      borderBottomLeftRadius: BASE_TOKENS.borderRadius.sm
    },
    messageTimestamp: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: darkMode ? darkTheme.textSecondary : BASE_TOKENS.colors.gray[500],
      alignSelf: 'flex-end'
    },
    userTimestamp: {
      alignSelf: 'flex-end'
    },
    botTimestamp: {
      alignSelf: 'flex-start'
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: BASE_TOKENS.spacing.sm,
      padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.md}`,
      backgroundColor: darkMode ? darkTheme.messageBg : BASE_TOKENS.colors.gray[100],
      borderRadius: BASE_TOKENS.borderRadius.lg,
      borderBottomLeftRadius: BASE_TOKENS.borderRadius.sm,
      maxWidth: '70%'
    },
    typingDots: {
      display: 'flex',
      gap: BASE_TOKENS.spacing.xs
    },
    typingDot: {
      width: '6px',
      height: '6px',
      borderRadius: BASE_TOKENS.borderRadius.full,
      backgroundColor: darkMode ? darkTheme.textSecondary : BASE_TOKENS.colors.gray[400]
    },
    inputContainer: {
      padding: BASE_TOKENS.spacing.lg,
      borderTop: `1px solid ${darkMode ? darkTheme.border : BASE_TOKENS.colors.gray[200]}`,
      backgroundColor: darkMode ? darkTheme.backgroundSecondary : BASE_TOKENS.colors.white
    },
    inputWrapper: {
      display: 'flex',
      gap: BASE_TOKENS.spacing.sm,
      alignItems: 'flex-end'
    },
    textInput: {
      flex: .9,
      padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.md}`,
      border: `1px solid ${darkMode ? darkTheme.inputBorder : BASE_TOKENS.colors.gray[300]}`,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      outline: 'none',
      resize: 'none',
      minHeight: '40px',
      maxHeight: '120px',
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`,
      fontFamily: 'inherit',
      backgroundColor: darkMode ? darkTheme.input : BASE_TOKENS.colors.white,
      color: darkMode ? darkTheme.text : BASE_TOKENS.colors.gray[900]
    },
    sendButton: {
      padding: BASE_TOKENS.spacing.sm,
      backgroundColor: darkMode ? darkTheme.button : BASE_TOKENS.colors.gray[900],
      color: BASE_TOKENS.colors.white,
      border: 'none',
      borderRadius: BASE_TOKENS.borderRadius.lg,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`,
      minWidth: '40px',
      height: '40px'
    },
    sendButtonDisabled: {
      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : BASE_TOKENS.colors.gray[300],
      cursor: 'not-allowed'
    }
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <motion.div
        style={{ ...getContainerStyle(), ...props }}
        className={className}
        variants={containerVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : isMinimized ? "minimized" : "collapsed"}
        {...props}
      >
      {isMinimized ? (
        // Minimized State - 60px floating column (entire column is clickable)
        <div 
          onClick={handleExpand}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: BASE_TOKENS.spacing.sm,
            cursor: 'pointer',
            transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = BASE_TOKENS.colors.gray[800];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = BASE_TOKENS.colors.gray[900];
          }}
        >
          <div style={{
            padding: BASE_TOKENS.spacing.sm,
            backgroundColor: 'transparent',
            color: BASE_TOKENS.colors.white,
            border: 'none',
            borderRadius: BASE_TOKENS.borderRadius.full,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            pointerEvents: 'none'
          }}>
            <ExpandIcon size={16} />
          </div>
        </div>
      ) : !isExpanded ? (
        // Collapsed State - Input Box Only
        <div style={{
          ...styles.collapsedContainer,
          justifyContent: 'center',
          backgroundColor: darkMode ? 'rgba(42,42,42)' : BASE_TOKENS.colors.white,
        }}>
          <div style={{...styles.collapsedInput, justifyContent:'center'}}>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Start a conversation..."
              style={{
                ...styles.collapsedInputField,
                resize: 'none',
                minHeight: '40px',
                // maxHeight: '80px',
                overflow: 'auto',
                lineHeight: '1.4',
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
              style={{
                ...styles.collapsedButton,
                ...(inputValue.trim() === '' ? styles.sendButtonDisabled : {})
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim() !== '') {
                  e.target.style.backgroundColor = BASE_TOKENS.colors.gray[800];
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim() !== '') {
                  e.target.style.backgroundColor = BASE_TOKENS.colors.gray[900];
                }
              }}
            >
              <span style={{
                fontSize: BASE_TOKENS.typography.fontSize.sm,
                fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
                color: BASE_TOKENS.colors.white,
                fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
              }}>
                Go!
              </span>
            </button>
          </div>
        </div>
      ) : (
        // Expanded State - Full Chat Interface
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: width}}
          variants={contentVariants}
          initial="collapsed"
          animate="expanded"
        >
          {/* Header */}
          <motion.div 
            style={styles.header}
            variants={individualContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div style={styles.headerContent}>
              <motion.h3 
                style={styles.headerTitle}
                key={headerTitle}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {headerTitle}
              </motion.h3>
              <motion.p 
                style={styles.headerSubtitle}
                key={headerSubtitle}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                {headerSubtitle}
              </motion.p>
            </div>
            {showCollapseButton && (
              <button
                onClick={handleCollapse}
                style={styles.closeButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = BASE_TOKENS.colors.gray[100];
                  e.target.style.color = BASE_TOKENS.colors.gray[700];
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = BASE_TOKENS.colors.gray[500];
                }}
              >
                <CollapseIcon size={16} />
              </button>
            )}
          </motion.div>

          {/* Messages */}
          <motion.div 
            style={styles.messagesContainer}
            variants={individualContentVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  style={{
                    ...styles.messageWrapper,
                    ...(message.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper)
                  }}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {message.sender === 'bot' && (
                    <div style={{ ...styles.messageAvatar, ...styles.botAvatar }}>
                      <img 
                        src="/headshot-3.png" 
                        alt="Support avatar"
                        style={styles.avatarImage}
                      />
                    </div>
                  )}
                  
                  <div style={styles.messageContent}>
                    <div
                      style={{
                        ...styles.messageBubble,
                        ...(message.sender === 'user' ? styles.userMessage : styles.botMessage)
                      }}
                    >
                      {message.text}
                    </div>
                    <span
                      style={{
                        ...styles.messageTimestamp,
                        ...(message.sender === 'user' ? styles.userTimestamp : styles.botTimestamp)
                      }}
                    >
                      {message.timestamp}
                    </span>
                  </div>

                  {message.sender === 'user' && (
                    <div style={{ ...styles.messageAvatar, ...styles.userAvatar }}>
                      <img 
                        src="/headshot-4.png" 
                        alt="User avatar"
                        style={styles.avatarImage}
                      />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  style={styles.messageWrapper}
                  variants={typingVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div style={{ ...styles.messageAvatar, ...styles.botAvatar }}>
                    <img 
                      src="/headshot-3.png" 
                      alt="Support avatar"
                      style={styles.avatarImage}
                    />
                  </div>
                  <div style={styles.typingIndicator}>
                    <span style={{ fontSize: BASE_TOKENS.typography.fontSize.xs, color: BASE_TOKENS.colors.gray[600] }}>
                      Typing
                    </span>
                    <div style={styles.typingDots}>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          style={styles.typingDot}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </motion.div>

          {/* Input */}
          <motion.div 
            style={styles.inputContainer}
            variants={individualContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div style={styles.inputWrapper}>
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={styles.textInput}
                onFocus={(e) => {
                  e.target.style.borderColor = BASE_TOKENS.colors.blue[500];
                  e.target.style.boxShadow = `0 0 0 3px ${BASE_TOKENS.colors.blue[100]}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = BASE_TOKENS.colors.gray[300];
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isTyping}
                style={{
                  ...styles.sendButton,
                  ...(inputValue.trim() === '' || isTyping ? styles.sendButtonDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim() !== '' && !isTyping) {
                    e.target.style.backgroundColor = BASE_TOKENS.colors.gray[800];
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputValue.trim() !== '' && !isTyping) {
                    e.target.style.backgroundColor = BASE_TOKENS.colors.gray[900];
                  }
                }}
              >
                <ArrowIcon size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </motion.div>
    </>
  );
};

export default ExpandableChatBox;
