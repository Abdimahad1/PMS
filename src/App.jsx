import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Home from './pages/Home';
import Support from './Components/Support';
import TeamMembers from './Components/TeamMembers';
import CustomCalendar from './Components/CustomCalendar';
import { ThemeProvider } from './Context/ThemeContext';
import ProjectsPopup from './Components/ProjectsPopup';
import SettingsPopup from './Components/SettingsPopup';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // State variables for managing the visibility of popups and user authentication
    const [showProjectsPopup, setShowProjectsPopup] = useState(false);
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('loggedInUser')));

    // Function to handle the Projects button click
    const handleProjectsClick = () => {
        setShowProjectsPopup(true);
        setShowSettingsPopup(false); // Close settings popup if open
    };

    // Function to handle the Settings button click
    const handleSettingsClick = () => {
        setShowSettingsPopup(true);
        setShowProjectsPopup(false); // Close projects popup if open
    };

    // Function to close any open popup
    const handleClosePopup = () => {
        setShowProjectsPopup(false);
        setShowSettingsPopup(false);
    };

    // Function to handle user logout
    const handleLogout = () => {
        const toastId = toast.info(
            <div>
                <p>Are you sure you want to log out?</p>
                <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => {
                        setUser(null);
                        sessionStorage.removeItem('loggedInUser');
                        window.location.href = '/login'; // Redirect to login after logout
                        toast.dismiss(toastId);
                        toast.success('Logged out successfully!');
                    }}
                >
                    Confirm
                </button>
            </div>,
            { autoClose: false }
        );
    };

    // Effect to handle clicks outside of the popup to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProjectsPopup || showSettingsPopup) {
                handleClosePopup();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showProjectsPopup, showSettingsPopup]);

    return (
        <ThemeProvider>
            <Router>
                <div className="flex">
                    {/* Render Sidebar only if user is logged in */}
                    {user && <Sidebar user={user} onProjectsClick={handleProjectsClick} onSettingsClick={handleSettingsClick} onLogout={handleLogout} />}
                    <div className={`flex-1 p-6 ${user ? 'ml-20 md:ml-0' : ''}`}>
                        <Routes>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login setUser={setUser} />} />
                            {/* Redirect to home if user is logged in, else redirect to login */}
                            <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                            {/* Protected routes */}
                            <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                            <Route path="/team-members" element={user ? <TeamMembers /> : <Navigate to="/login" />} />
                            <Route path="/support" element={user ? <Support /> : <Navigate to="/login" />} />
                            <Route path="/custom-calendar" element={user ? <CustomCalendar /> : <Navigate to="/login" />} />
                        </Routes>
                    </div>
                    {/* Conditionally render ProjectsPopup and SettingsPopup */}
                    {showProjectsPopup && <ProjectsPopup onClose={handleClosePopup} />}
                    {showSettingsPopup && <SettingsPopup onClose={handleClosePopup} />}
                </div>
                <ToastContainer />
            </Router>
        </ThemeProvider>
    );
}

export default App;
