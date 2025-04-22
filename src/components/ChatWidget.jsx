'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you with Swayam 2025?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    const input = userInput;
    setUserInput('');

    try {
      setIsTyping(true);
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: input })
      });

      const data = await response.json();
      
      // Format the bot's response
      const formattedResponse = formatBotResponse(data.reply);
      
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: formattedResponse }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: "Sorry, I'm having trouble connecting to the server. Please try again later." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to format bot responses
  const formatBotResponse = (text) => {
    // Convert markdown-like formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n/g, '<br />') // Line breaks
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>') // Code blocks
      .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'); // Links
  };

  const handleClearChat = () => {
    setMessages([{ sender: 'bot', text: 'Hi! How can I help you with Swayam 2025?' }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Icon */}
      <div
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#5F4A37] to-[#5F4A37] flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'hidden' : 'block'
        }`}
        onClick={handleToggle}
        role="button"
        aria-label="Open chat"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleToggle();
          }
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
          stroke="#f9efd1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>

      {/* Chat Window */}
      <div className={`w-[90vw] md:w-96 ${isMinimized ? 'h-16' : 'h-[70vh] md:h-[600px]'} bg-[#f9efd1] rounded-xl shadow-2xl flex flex-col transform transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
      }`} style={{ 
        position: 'fixed', 
        bottom: '1rem', 
        right: '1rem',
        maxWidth: 'calc(100vw - 2rem)',
        maxHeight: 'calc(100vh - 2rem)',
        background: 'radial-gradient(circle at center, #f9efd1 0%, #f9efd1 50%, #f9efd1 100%)'
      }}>
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#5F4A37] to-[#5F4A37] px-4 md:px-6 py-3 md:py-4 rounded-t-xl flex items-center justify-between shadow-sm">
          <h3 className="text-[#f9efd1] text-lg md:text-xl font-bold">Swayam Assistant</h3>
          <div className="flex gap-2">
            <button 
              onClick={handleMinimize}
              className="p-1 md:p-2 rounded-full hover:bg-[#FBEAD3]/10 transition-colors duration-200"
              aria-label="Minimize chat"
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="#FBEAD3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 15l7-7 7 7"/>
              </svg>
            </button>
            <button 
              onClick={handleToggle}
              className="p-1 md:p-2 rounded-full hover:bg-[#FBEAD3]/10 transition-colors duration-200"
              aria-label="Close chat"
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="#FBEAD3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        {!isMinimized && (
          <>
            {/* Chat Messages */}
            <div className="flex-1 p-3 md:p-4 space-y-3 md:space-y-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] p-2 md:p-3 rounded-lg shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-[#5F4A37] to-[#5F4A37] text-[#f9efd1] ml-auto'
                      : 'bg-white text-[#5F4A37] mr-auto'
                  }`}
                >
                  <div 
                    className="text-sm md:text-base"
                    dangerouslySetInnerHTML={{ __html: msg.sender === 'bot' ? formatBotResponse(msg.text) : msg.text }}
                  />
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 border-t border-[#5F4A37]/30">
              <div className="flex items-center gap-2 md:gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-1.5 md:px-4 md:py-2 border border-[#5F4A37]/30 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5F4A37] focus:border-transparent text-[#5F4A37] bg-white/90 placeholder-[#5F4A37]/60 text-sm md:text-base"
                />
                <button
                  onClick={handleSend}
                  className="p-2 md:p-3 bg-gradient-to-br from-[#5F4A37] to-[#5F4A37] text-[#f9efd1] rounded-lg md:rounded-xl hover:opacity-90 transition-opacity duration-200 shadow-sm"
                  aria-label="Send message"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}