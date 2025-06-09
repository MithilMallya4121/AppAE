// src/MainAppContent.jsx
import React, { useState } from 'react';
import ADRForm from './ADRForm';
import Chatbot from './Chatbot';
//import { useNavigate } from 'react-router-dom'; // Import useNavigate for logout redirect
//import { Form } from 'lucide-react'; // Example icon for form, though ADRForm uses MessageCircle

const MainAppContent = ({ currentUser, onLogout }) => {
    const [view, setView] = useState('form'); // 'form' or 'chat'
    const navigate = useNavigate(); // For redirecting to login on logout

    const handleNavigateToChat = () => setView('chat');
    const handleNavigateToForm = () => setView('form');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center py-8 font-sans">
            <header className="w-full max-w-md mx-auto bg-gray-800 text-white p-4 rounded-t-lg shadow-lg flex justify-between items-center">
                <h1 className="text-xl font-bold">ADR Reporting & Chat</h1>
                {currentUser && (
                    <div className="flex items-center space-x-2">
                        <span className="text-sm hidden sm:inline">Logged in as: {currentUser}</span>
                        <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg transition duration-300">
                            Logout
                        </button>
                    </div>
                )}
            </header>
            {view === 'form' && <ADRForm onNavigateToChat={handleNavigateToChat} />}
            {view === 'chat' && <Chatbot onNavigateToForm={handleNavigateToForm} />}
        </div>
    );
};

export default MainAppContent;
