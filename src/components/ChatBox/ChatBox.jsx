import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_TOKENS } from '../../tokens';

const ChatBox = ({ 
  width = '400px', 
  height = '500px', 
  position = 'relative',
  className = '',
  onUserMessage,
  ...props 
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Call the onUserMessage callback if provided
    if (onUserMessage) {
      onUserMessage(newMessage);
    }
    
    setInputValue('');
    
    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! This is a demo response.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Custom Icon Components
  const SendIcon = ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22,2 15,22 11,13 2,9"/>
    </svg>
  );

  const BotIcon = ({ size = 16, color = BASE_TOKENS.colors.blue[500] }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V7C1.9 7 1 7.9 1 9V16C1 17.1 1.9 18 3 18V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V18C22.1 18 23 17.1 23 16V9C23 7.9 22.1 7 21 7V9M19 9V7H17V9H19M7 9V7H5V9H7Z"/>
    </svg>
  );

  const UserIcon = ({ size = 16, color = BASE_TOKENS.colors.gray[500] }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
    </svg>
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const styles = {
    container: {
      width,
      height,
      position,
      backgroundColor: BASE_TOKENS.colors.white,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      border: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      boxShadow: BASE_TOKENS.shadows.lg,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'UberMove', 'UberMoveText', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden'
    },
    header: {
      padding: BASE_TOKENS.spacing.lg,
      borderBottom: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      backgroundColor: BASE_TOKENS.colors.gray[50]
    },
    headerTitle: {
      fontSize: BASE_TOKENS.typography.fontSize.lg,
      fontWeight: BASE_TOKENS.typography.fontWeight.semibold,
      color: BASE_TOKENS.colors.gray[900],
      margin: 0,
      marginBottom: BASE_TOKENS.spacing.xs
    },
    headerSubtitle: {
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      color: BASE_TOKENS.colors.gray[600],
      margin: 0
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
      backgroundColor: BASE_TOKENS.colors.gray[200],
      border: `2px solid ${BASE_TOKENS.colors.white}`,
      boxShadow: BASE_TOKENS.shadows.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden'
    },
    botAvatar: {
      backgroundColor: BASE_TOKENS.colors.blue[50]
    },
    userAvatar: {
      backgroundColor: BASE_TOKENS.colors.gray[200]
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
      backgroundColor: BASE_TOKENS.colors.blue[500],
      color: BASE_TOKENS.colors.white,
      borderBottomRightRadius: BASE_TOKENS.borderRadius.sm
    },
    botMessage: {
      backgroundColor: BASE_TOKENS.colors.gray[100],
      color: BASE_TOKENS.colors.gray[900],
      borderBottomLeftRadius: BASE_TOKENS.borderRadius.sm
    },
    messageTimestamp: {
      fontSize: BASE_TOKENS.typography.fontSize.xs,
      color: BASE_TOKENS.colors.gray[500],
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
      backgroundColor: BASE_TOKENS.colors.gray[100],
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
      backgroundColor: BASE_TOKENS.colors.gray[400]
    },
    inputContainer: {
      padding: BASE_TOKENS.spacing.lg,
      borderTop: `1px solid ${BASE_TOKENS.colors.gray[200]}`,
      backgroundColor: BASE_TOKENS.colors.white
    },
    inputWrapper: {
      display: 'flex',
      gap: BASE_TOKENS.spacing.sm,
      alignItems: 'flex-end'
    },
    textInput: {
      flex: 1,
      padding: `${BASE_TOKENS.spacing.sm} ${BASE_TOKENS.spacing.md}`,
      border: `1px solid ${BASE_TOKENS.colors.gray[300]}`,
      borderRadius: BASE_TOKENS.borderRadius.lg,
      fontSize: BASE_TOKENS.typography.fontSize.sm,
      outline: 'none',
      resize: 'none',
      minHeight: '40px',
      maxHeight: '120px',
      transition: `all ${BASE_TOKENS.animation.duration.normal} ${BASE_TOKENS.animation.easing.easeOut}`,
      fontFamily: 'inherit'
    },
    textInputFocus: {
      borderColor: BASE_TOKENS.colors.blue[500],
      boxShadow: `0 0 0 3px ${BASE_TOKENS.colors.blue[100]}`
    },
    sendButton: {
      padding: BASE_TOKENS.spacing.sm,
      backgroundColor: BASE_TOKENS.colors.blue[500],
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
    sendButtonHover: {
      backgroundColor: BASE_TOKENS.colors.blue[600]
    },
    sendButtonDisabled: {
      backgroundColor: BASE_TOKENS.colors.gray[300],
      cursor: 'not-allowed'
    }
  };

  return (
    <motion.div
      style={{ ...styles.container, ...props.style }}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.headerTitle}>Chat Support</h3>
        <p style={styles.headerSubtitle}>How can we help you today?</p>
      </div>

      {/* Messages */}
      <div style={styles.messagesContainer}>
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
      </div>

      {/* Input */}
      <div style={styles.inputContainer}>
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
                e.target.style.backgroundColor = BASE_TOKENS.colors.blue[600];
              }
            }}
            onMouseLeave={(e) => {
              if (inputValue.trim() !== '' && !isTyping) {
                e.target.style.backgroundColor = BASE_TOKENS.colors.blue[500];
              }
            }}
          >
            <SendIcon size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBox;
