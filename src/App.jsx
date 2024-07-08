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
    const [showProjectsPopup, setShowProjectsPopup] = useState(false);
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('loggedInUser')));

    const handleProjectsClick = () => {
        setShowProjectsPopup(true);
        setShowSettingsPopup(false); // Close settings popup if open
    };

    const handleSettingsClick = () => {
        setShowSettingsPopup(true);
        setShowProjectsPopup(false); // Close projects popup if open
    };

    const handleClosePopup = () => {
        setShowProjectsPopup(false);
        setShowSettingsPopup(false);
    };

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
                    {user && <Sidebar user={user} onProjectsClick={handleProjectsClick} onSettingsClick={handleSettingsClick} onLogout={handleLogout} />}
                    <div className={`flex-1 p-6 ${user ? 'ml-20 md:ml-0' : ''}`}>
                        <Routes>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login setUser={setUser} />} />
                            <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                            <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                            <Route path="/team-members" element={user ? <TeamMembers /> : <Navigate to="/login" />} />
                            <Route path="/support" element={user ? <Support /> : <Navigate to="/login" />} />
                            <Route path="/custom-calendar" element={user ? <CustomCalendar /> : <Navigate to="/login" />} />
                        </Routes>
                    </div>
                    {showProjectsPopup && <ProjectsPopup onClose={handleClosePopup} />}
                    {showSettingsPopup && <SettingsPopup onClose={handleClosePopup} />}
                </div>
                <ToastContainer />
            </Router>
        </ThemeProvider>
    );
}

export default App;
