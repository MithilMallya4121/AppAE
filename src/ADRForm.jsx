// src/ADRForm.jsx
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react'; // Chat icon from lucide-react

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
                {label} {required && <span className="text-red-500">*</span>}
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
                rows="4"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
            ></textarea>
        </div>
    );

    return (
        <div className="container mx-auto p-4 max-w-md bg-white rounded-xl shadow-lg my-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Report Adverse Drug Reaction</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Drug Details</h3>
                    <InputField label="Drug Name" name="name" type="text" value={drugDetails.name} onChange={handleDrugChange} placeholder="e.g., Ibuprofen" required />
                    <InputField label="Dosage" name="dosage" type="text" value={drugDetails.dosage} onChange={handleDrugChange} placeholder="e.g., 200mg" required />
                    <InputField label="Route" name="route" type="text" value={drugDetails.route} onChange={handleDrugChange} placeholder="e.g., Oral" />
                    <InputField label="Start Date" name="startDate" type="date" value={drugDetails.startDate} onChange={handleDrugChange} required />
                    <InputField label="End Date (Optional)" name="endDate" type="date" value={drugDetails.endDate} onChange={handleDrugChange} />
                </div>

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

                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Reporter Details</h3>
                    <InputField label="Reporter Name" name="name" type="text" value={reporterDetails.name} onChange={handleReporterChange} placeholder="e.g., Dr. John Doe" required />
                    <InputField label="Contact Email/Phone" name="contact" type="text" value={reporterDetails.contact} onChange={handleReporterChange} placeholder="e.g., john.doe@example.com" required />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Scan/Upload Documents</h3>
                    <label htmlFor="file-upload" className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.865-1.297A2 2 0 0111.933 3h.134a2 2 0 011.664.89l.865 1.297A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-semibold">Upload Document (Camera / Gallery)</span>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                    {uploadedImage && (
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                            <img src={uploadedImage} alt="Uploaded preview" className="max-w-full h-auto rounded-lg shadow-md mx-auto" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline focus:ring-4 focus:ring-green-300 transition duration-300 transform hover:scale-105 shadow-xl"
                >
                    Submit ADR Report
                </button>
            </form>

            <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
                <button
                    onClick={onNavigateToChat}
                    className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 transform hover:scale-110"
                    aria-label="Open Chatbot"
                >
                    <MessageCircle size={28} />
                </button>
            </div>
        </div>
    );
};

export default ADRForm;