// src/components/ChatInterface.jsx
'use client';

import { useState } from 'react';

export default function ChatInterface({ small }) {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setChatHistory([...chatHistory, { sender: 'user', text: userInput }]);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });
      
      const data = await response.json();
      if (data.reply) {
        setChatHistory(prev => [...prev, { sender: 'bot', text: data.reply }]);
      }
    } catch (error) {
      console.error('Error calling chatbot:', error);
      setChatHistory(prev => [...prev, { sender: 'bot', text: 'Error: Could not reach the chatbot.' }]);
    }

    setUserInput('');
  };

  // Adjust styles for small modal context if needed.
  const containerStyle = small
    ? { height: 'calc(100% - 40px)', overflowY: 'auto', padding: '0.5rem' }
    : { height: '300px', overflowY: 'auto', padding: '1rem' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      <div style={{ 
        ...containerStyle, 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#fcd163',
        padding: '1rem'
      }}>
        {chatHistory.map((msg, idx) => (
          <div key={idx} style={{ 
            marginBottom: '1rem',
            padding: '0.75rem',
            borderRadius: '12px',
            backgroundColor: msg.sender === 'user' ? '#fcd163' : 'rgba(255, 255, 255, 0.1)',
            color: msg.sender === 'user' ? '#3C1E00' : '#3C1E00',
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <strong style={{ color: msg.sender === 'user' ? '#3C1E00' : '#333' }}>
              {msg.sender === 'user' ? 'You:' : 'Bot:'}
            </strong> 
            <div style={{ marginTop: '0.25rem' }}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={userInput}
          placeholder="Ask about SWAYAM events..."
          onChange={e => setUserInput(e.target.value)}
          style={{ 
            flex: 1, 
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend} 
          style={{ 
            padding: '0.75rem 1.5rem',
            backgroundColor: '#fcd163',
            color: '#3C1E00',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
