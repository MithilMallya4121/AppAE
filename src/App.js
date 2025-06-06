import React, { useState, useEffect, useRef } from 'react';
import { ClipboardList, MessageCircle } from 'lucide-react'; // Icons from lucide-react - Corrected: Changed 'Form' to 'ClipboardList'

// ADRForm Component: Handles the reporting form and document upload.
const ADRForm = ({ onNavigateToChat }) => {
    // State for patient details
    const [patientDetails, setPatientDetails] = useState({
        patientId: '',
        age: '',
        gender: '',
    });
    // State for drug details
    const [drugDetails, setDrugDetails] = useState({
        name: '',
        dosage: '',
        route: '',
        startDate: '',
        endDate: '',
    });
    // State for ADR (Adverse Drug Reaction) details
    const [adrDetails, setADRDetails] = useState({
        description: '',
        onset_date: '',
        outcome: '',
        severity: '',
    });
    // State for reporter details
    const [reporterDetails, setReporterDetails] = useState({
        name: '',
        contact: '',
    });
    // State to store the uploaded image data (as a Data URL)
    const [uploadedImage, setUploadedImage] = useState(null);

    // Handles changes to patient detail input fields
    const handlePatientChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails({ ...patientDetails, [name]: value });
    };

    // Handles changes to drug detail input fields
    const handleDrugChange = (e) => {
        const { name, value } = e.target;
        setDrugDetails({ ...drugDetails, [name]: value });
    };

    // Handles changes to ADR detail input fields
    const handleADRChange = (e) => {
        const { name, value } = e.target;
        setADRDetails({ ...adrDetails, [name]: value });
    };

    // Handles changes to reporter detail input fields
    const handleReporterChange = (e) => {
        const { name, value } = e.target;
        setReporterDetails({ ...reporterDetails, [name]: value });
    };

    // Handles image file selection and reads it as a Data URL for preview
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result); // Set the base64 string
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }
    };

    // Handles the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)

        // Construct the report object from current state
        const report = {
            patientDetails,
            drugDetails,
            adrDetails,
            reporterDetails,
            // In a real application, you would send the base64 string or upload the file to a server.
            // For this demo, we just indicate if an image was uploaded.
            uploadedImage: uploadedImage ? 'Image uploaded (base64 data captured)' : 'No image uploaded',
        };

        console.log('ADR Report Submitted:', report); // Log the report to console for demonstration
        // In a production app, you would send this 'report' object to a backend API.
        // Instead of an alert, a custom modal or toast notification would confirm submission.

        // Reset all form fields after submission
        setPatientDetails({ patientId: '', age: '', gender: '' });
        setDrugDetails({ name: '', dosage: '', route: '', startDate: '', endDate: '' });
        setADRDetails({ description: '', onset_date: '', outcome: '', severity: '' });
        setReporterDetails({ name: '', contact: '' });
        setUploadedImage(null); // Clear the uploaded image preview
    };

    // Reusable InputField component for consistent styling and structure
    const InputField = ({ label, name, type, value, onChange, placeholder, required = false }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                {label} {required && <span className="text-red-500">*</span>} {/* Add asterisk for required fields */}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
        </div>
    );

    // Reusable TextAreaField component for consistent styling and structure
    const TextAreaField = ({ label, name, value, onChange, placeholder, required = false }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows="4" // Default rows for textarea
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
            ></textarea>
        </div>
    );

    return (
        <div className="container mx-auto p-4 max-w-md bg-white rounded-xl shadow-lg my-8"> {/* Added margin top/bottom for better spacing */}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Report Adverse Drug Reaction</h2>
            <form onSubmit={handleSubmit} className="space-y-6"> {/* Adds vertical spacing between form sections */}
                {/* Patient Details Section */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Patient Details</h3>
                    <InputField label="Patient ID (Optional)" name="patientId" type="text" value={patientDetails.patientId} onChange={handlePatientChange} placeholder="e.g., P12345" />
                    <InputField label="Age" name="age" type="number" value={patientDetails.age} onChange={handlePatientChange} placeholder="e.g., 45" required />
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
                            Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={patientDetails.gender}
                            onChange={handlePatientChange}
                            required
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                </div>

                {/* Drug Details Section */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Drug Details</h3>
                    <InputField label="Drug Name" name="name" type="text" value={drugDetails.name} onChange={handleDrugChange} placeholder="e.g., Ibuprofen" required />
                    <InputField label="Dosage" name="dosage" type="text" value={drugDetails.dosage} onChange={handleDrugChange} placeholder="e.g., 200mg" required />
                    <InputField label="Route" name="route" type="text" value={drugDetails.route} onChange={handleDrugChange} placeholder="e.g., Oral" />
                    <InputField label="Start Date" name="startDate" type="date" value={drugDetails.startDate} onChange={handleDrugChange} required />
                    <InputField label="End Date (Optional)" name="endDate" type="date" value={drugDetails.endDate} onChange={handleDrugChange} />
                </div>

                {/* ADR Details Section */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">ADR Details</h3>
                    <TextAreaField label="Description of Reaction" name="description" value={adrDetails.description} onChange={handleADRChange} placeholder="Describe the adverse reaction in detail..." required />
                    <InputField label="Onset Date of Reaction" name="onset_date" type="date" value={adrDetails.onset_date} onChange={handleADRChange} required />
                    <div className="mb-4">
                        <label htmlFor="outcome" className="block text-gray-700 text-sm font-bold mb-2">
                            Outcome <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="outcome"
                            name="outcome"
                            value={adrDetails.outcome}
                            onChange={handleADRChange}
                            required
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                            <option value="">Select Outcome</option>
                            <option value="Recovered">Recovered</option>
                            <option value="Recovering">Recovering</option>
                            <option value="Not Recovered">Not Recovered</option>
                            <option value="Fatal">Fatal</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="severity" className="block text-gray-700 text-sm font-bold mb-2">
                            Severity <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="severity"
                            name="severity"
                            value={adrDetails.severity}
                            onChange={handleADRChange}
                            required
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                            <option value="">Select Severity</option>
                            <option value="Mild">Mild</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Severe">Severe</option>
                        </select>
                    </div>
                </div>

                {/* Reporter Details Section */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Reporter Details</h3>
                    <InputField label="Reporter Name" name="name" type="text" value={reporterDetails.name} onChange={handleReporterChange} placeholder="e.g., Dr. John Doe" required />
                    <InputField label="Contact Email/Phone" name="contact" type="text" value={reporterDetails.contact} onChange={handleReporterChange} placeholder="e.g., john.doe@example.com" required />
                </div>

                {/* Document Upload Section */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Scan/Upload Documents</h3>
                    <label htmlFor="file-upload" className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300">
                        {/* Camera icon using SVG for direct camera access */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.865-1.297A2 2 0 0111.933 3h.134a2 2 0 011.664.89l.865 1.297A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-semibold">Upload Document (Camera / Gallery)</span>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*" // Accept only image files
                            capture="environment" // Hint to use the device's environment (rear) camera
                            onChange={handleImageUpload}
                            className="hidden" // Hide the default file input
                        />
                    </label>
                    {uploadedImage && ( // Display image preview if an image is uploaded
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                            <img src={uploadedImage} alt="Uploaded preview" className="max-w-full h-auto rounded-lg shadow-md mx-auto" />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline focus:ring-4 focus:ring-green-300 transition duration-300 transform hover:scale-105 shadow-xl"
                >
                    Submit ADR Report
                </button>
            </form>

            {/* Floating Chat Button */}
            <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
                <button
                    onClick={onNavigateToChat} // Navigates to the chat view
                    className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 transform hover:scale-110"
                    aria-label="Open Chatbot"
                >
                    <MessageCircle size={28} /> {/* Chat icon */}
                </button>
            </div>
        </div>
    );
};

// Chatbot Component: Handles the conversational interface with the Gemini API.
const Chatbot = ({ onNavigateToForm }) => {
    const [messages, setMessages] = useState([]); // State to store chat messages
    const [inputMessage, setInputMessage] = useState(''); // State for the current message being typed
    const [loading, setLoading] = useState(false); // State to indicate if a response is being fetched
    const messagesEndRef = useRef(null); // Ref for scrolling to the latest message

    // Scrolls the chat container to the bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Effect to scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Sends the user's message to the Gemini API and updates chat history
    const sendMessage = async () => {
        if (inputMessage.trim() === '') return; // Don't send empty messages

        const userMessage = { text: inputMessage, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to chat
        setInputMessage(''); // Clear input field
        setLoading(true); // Set loading state

        try {
            // Prepare chat history for the API request
            let chatHistory = [{ role: 'user', parts: [{ text: inputMessage }] }];
            const payload = { contents: chatHistory };
            const apiKey = ''; // API key for Gemini API (provided by Canvas runtime)
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            // Make the API call
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json(); // Parse the JSON response

            // Extract the bot's response and add it to chat history
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setMessages((prevMessages) => [...prevMessages, { text: text, sender: 'bot' }]);
            } else {
                // Handle cases where the response structure is unexpected
                setMessages((prevMessages) => [...prevMessages, { text: 'Sorry, I could not get a response.', sender: 'bot' }]);
            }
        } catch (error) {
            console.error('Error fetching from Gemini API:', error);
            setMessages((prevMessages) => [...prevMessages, { text: 'Error: Could not connect to chatbot.', sender: 'bot' }]);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Allows sending message by pressing Enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            sendMessage();
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md bg-white rounded-xl shadow-lg flex flex-col h-[80vh] md:h-[70vh] my-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Medical Chatbot</h2>
            <div id="chat-messages" className="flex-1 overflow-y-auto p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        Type a message to start chatting about ADRs or medical queries!
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        // Apply different styles based on sender for user and bot messages
                        className={`mb-3 p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto rounded-br-none' : 'bg-gray-200 text-gray-800 mr-auto rounded-bl-none'}`}
                    >
                        {msg.text}
                    </div>
                ))}
                {loading && ( // Show "Thinking..." message when loading
                    <div className="mb-3 p-3 rounded-lg bg-gray-200 text-gray-800 mr-auto">
                        Thinking...
                    </div>
                )}
                <div ref={messagesEndRef} /> {/* Dummy div to scroll to */}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question about ADRs..."
                    className="flex-1 shadow appearance-none border rounded-l-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 transition duration-200"
                    disabled={loading} // Disable input while loading
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105"
                    disabled={loading} // Disable button while loading
                >
                    Send
                </button>
            </div>

            {/* Floating Form Button */}
            <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
                <button
                    onClick={onNavigateToForm} // Navigates to the form view
                    className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 transform hover:scale-110"
                    aria-label="Open ADR Form"
                >
                    <ClipboardList size={28} /> {/* Form icon - Corrected: Used ClipboardList */}
                </button>
            </div>
        </div>
    );
};


// Main App Component: Manages the overall application state and view switching.
function App() {
    // State to control which view is currently displayed ('form' or 'chat')
    const [view, setView] = useState('form');

    // Callback to switch to the chat view
    const handleNavigateToChat = () => setView('chat');
    // Callback to switch to the form view
    const handleNavigateToForm = () => setView('form');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center py-8 font-sans">
            {/* Conditionally render ADRForm or Chatbot based on the 'view' state */}
            {view === 'form' && <ADRForm onNavigateToChat={handleNavigateToChat} />}
            {view === 'chat' && <Chatbot onNavigateToForm={handleNavigateToForm} />}
        </div>
    );
}

export default App;

