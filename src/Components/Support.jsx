import React, { useState, useContext } from 'react';
import { FaHeadset } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Set this to your app's root element

const Support = () => {
    const { theme } = useContext(ThemeContext); // Access theme context
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        if (!name || !email || !message) {
            toast.error('Please fill in all fields.');
            return;
        }

        toast.success(`Your message has been received, ${name}. We will respond to you as soon as possible.`);
        
        // Delay closing the modal to ensure the toast is fully shown
        setTimeout(() => {
            closeModal();
            setFormData({ name: '', email: '', message: '' });
        }, 1000); // Adjust the delay as needed to ensure the toast is displayed
    };

    return (
        <div className={`support-container ${theme.background} ${theme.text} min-h-screen flex flex-col`}>
            <ToastContainer />
            <div className="hero bg-cover bg-center flex-grow-0 flex-shrink-0 flex flex-col justify-center items-center text-white" style={{ backgroundImage: "url('/path/to/your/hero-image.jpg')", minHeight: '25vh' }}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">Efficient <span className="text-red-500">Project Management</span> Support for Your Success</h1>
                <p className="text-lg md:text-xl mt-2 text-center">Discover how our project management support services can streamline your projects, enhance team collaboration, and drive your business towards success.</p>
                <button onClick={openModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Get Support</button>
            </div>

            <div className="features-section flex-grow bg-gray-100 flex items-center">
                <div className="container mx-auto text-center py-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Top Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="feature-card bg-white p-4 rounded shadow-lg">
                            <FaHeadset className="text-4xl text-red-500 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">24/7 Project Assistance</h3>
                            <p>Our support team is available 24/7 to assist you with any project management queries, ensuring continuous guidance and support.</p>
                        </div>
                        <div className="feature-card bg-white p-4 rounded shadow-lg">
                            <FaHeadset className="text-4xl text-red-500 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
                            <p>We offer multilingual support to cater to your global teams, ensuring effective communication and collaboration across different languages.</p>
                        </div>
                        <div className="feature-card bg-white p-4 rounded shadow-lg">
                            <FaHeadset className="text-4xl text-red-500 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Advanced Project Tools</h3>
                            <p>Utilizing the latest project management tools and technologies, we provide you with actionable insights to optimize your project workflows.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Contact Form"
                className="modal bg-white rounded-lg p-8"
                overlayClassName="modal-overlay bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
            >
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Get in touch</h2>
                        <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                            &times;
                        </button>
                    </div>
                    <p className="text-red-500 font-semibold mb-2">Registered & Company Address</p>
                    <p className="mb-4">Infinity studio building, 5th Block, Deorali, Gangtak, Sikkim, India - 737101</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Your full name" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="example@example.com" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Write your message" maxLength="500"></textarea>
                        </div>
                        <div className="mb-4 text-gray-600 text-sm">
                            <p>Note: Your details will only be kept for contacting in future. No promotional or newsletter will be sent to your email.</p>
                            <label className="inline-flex items-center mt-3">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
                                <span className="ml-2">To get weekly newsletter or promotional email, check mark this option</span>
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Send</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Support;
