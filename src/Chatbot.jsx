// src/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ClipboardList } from 'lucide-react';

// --- IMPORTANT: Replace with your actual Gemini API Key ---
// For demonstration purposes, we're placing it directly here.
// For production, use environment variables (e.g., process.env.REACT_APP_GEMINI_API_KEY)
// and Netlify's environment variable settings to keep it secure!
// src/Chatbot.jsx
// ...
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // <-- This is the secure way
// --------------------------------------------------------

// Helper Components
const MessageDisplay = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto border border-gray-200 rounded-lg mb-4 bg-gray-50 custom-scrollbar">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          Type a message to start chatting about ADRs or medical queries!
        </div>
      )}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-3 p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto rounded-br-none' : 'bg-gray-200 text-gray-800 mr-auto rounded-bl-none'}`}
        >
          {msg.text}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const MessageInput = ({ onSendMessage, isLoading }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={isLoading ? "AI is thinking..." : "Ask a question about ADRs..."}
        className="flex-1 shadow appearance-none border rounded-l-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 transition duration-200"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105"
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

// Main Chatbot Component
const Chatbot = ({ onNavigateToForm }) => { // onNavigateToForm for the button
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const callGeminiAPI = async (userMessage) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text
        ? data.candidates[0].content.parts[0].text
        : "Sorry, I couldn't get a response from the AI.";

      return aiResponse;

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "There was an error connecting to the AI. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text) => {
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text }]);
    const aiResponse = await callGeminiAPI(text);
    setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: aiResponse }]);
  };

  return (
    <div className="container mx-auto p-4 max-w-md bg-white rounded-xl shadow-lg flex flex-col h-[80vh] md:h-[70vh] my-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Medical Chatbot</h2>
      <MessageDisplay messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />

      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          <button
              onClick={onNavigateToForm}
              className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 transform hover:scale-110"
              aria-label="Open ADR Form"
          >
              <ClipboardList size={28} />
          </button>
      </div>
    </div>
  );
};

export default Chatbot;