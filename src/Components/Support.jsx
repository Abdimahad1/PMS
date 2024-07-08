import React, { useState, useContext } from 'react';
import { FaLaptop, FaGamepad, FaMobileAlt, FaChair, FaTools, FaCog, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../Context/ThemeContext';

const Support = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [currentIndex, setCurrentIndex] = useState(0); // State for current index in services array
    const { theme } = useContext(ThemeContext); // Access theme context

    // Services array with service details
    const services = [
        { name: 'Asana', icon: <FaLaptop className="text-4xl mb-2" />, },
        { name: 'Trello', icon: <FaGamepad className="text-4xl mb-2" />, },
        { name: 'Jira', icon: <FaMobileAlt className="text-4xl mb-2" />, },
        { name: 'Basecamp', icon: <FaChair className="text-4xl mb-2" />, },
        { name: 'Monday', icon: <FaTools className="text-4xl mb-2" />, },
        { name: 'ClickUp', icon: <FaCog className="text-4xl mb-2" />, },
        { name: 'Wrike', icon: <FaLaptop className="text-4xl mb-2" />, },
        { name: 'Smartsheet', icon: <FaGamepad className="text-4xl mb-2" />, },
        { name: 'Zoho Projects', icon: <FaMobileAlt className="text-4xl mb-2" />, },
        { name: 'Teamwork', icon: <FaChair className="text-4xl mb-2" />, },
        { name: 'Microsoft Project', icon: <FaTools className="text-4xl mb-2" />, },
        { name: 'Podio', icon: <FaCog className="text-4xl mb-2" />, },
        { name: 'Notion', icon: <FaLaptop className="text-4xl mb-2" />, },
        { name: 'Workfront', icon: <FaGamepad className="text-4xl mb-2" />, },
        { name: 'ProofHub', icon: <FaMobileAlt className="text-4xl mb-2" />, },
    ];

    // Filter services based on search term
    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle previous button click
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Handle next button click
    const handleNext = () => {
        if (currentIndex < filteredServices.length - 5) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className={`support-container ${theme.background} ${theme.text}`}>
            {/* Header with background image */}
            <div className="support-header bg-cover bg-center h-64 flex flex-col justify-center items-center text-black" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
                <h1 className="text-4xl font-bold text-black">Welcome to PM System Support</h1>
                <p className="text-xl mt-2 text-black">We're here to help</p>
            </div>

            {/* Services section with navigation */}
            <div className={`support-services py-8 relative ${theme.background} ${theme.text}`}>
                <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full">
                    <FaArrowLeft className="text-2xl text-white" />
                </button>
                <div className="flex justify-center space-x-8 overflow-hidden w-full">
                    {filteredServices.slice(currentIndex, currentIndex + 5).map(service => (
                        <NavLink to={service.link} key={service.name} className="flex flex-col items-center">
                            {service.icon}
                            <span>{service.name}</span>
                        </NavLink>
                    ))}
                </div>
                <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full">
                    <FaArrowRight className="text-2xl text-white" />
                </button>
            </div>

            {/* Content section with support videos and topics */}
            <div className={`support-content py-8 ${theme.background} ${theme.text}`}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Popular Support Videos</h2>
                            <ul className="list-disc list-inside">
                                <li>Install the PM System on your PC</li>
                                <li>Fix sync issues between third-party tools</li>
                                <li>Resolve PM System issues when it does not start</li>
                                <li>Troubleshoot and resolve common issues</li>
                                <li>Detect PM System in your environment</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Popular Support Topics</h2>
                            <ul className="list-disc list-inside">
                                <li>PM System FAQs</li>
                                <li>Common issues and solutions</li>
                                <li>How to use advanced features</li>
                                <li>Firmware updates for PM System</li>
                                <li>Device detection issues</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
