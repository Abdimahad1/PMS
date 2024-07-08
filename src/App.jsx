import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Home from './pages/Home';
import Support from './Components/Support';
import TeamMembers from './Components/TeamMembers';
import CustomCalendar from './Components/CustomCalendar';
import { ThemeProvider, ThemeContext } from './Context/ThemeContext';
import ProjectsPopup from './Components/ProjectsPopup';
import SettingsPopup from './Components/SettingsPopup';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { toast } from 'react-toastify';

function App() {
    const [showProjectsPopup, setShowProjectsPopup] = useState(false);
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('loggedInUser')) || null);

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
        toast.info(
            <div>
                <p>Are you sure you want to log out?</p>
                <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => {
                        sessionStorage.removeItem('loggedInUser');
                        setUser(null);
                        toast.dismiss();
                    }}
                >
                    Confirm
                </button>
            </div>
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
                    {user && <Sidebar user={user} onProjectsClick={handleProjectsClick} onSettingsClick={handleSettingsClick} />}
                    <div className={`flex-1 p-6 ${user ? 'ml-20 md:ml-0' : ''}`}>
                        <Routes>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login setUser={setUser} />} />
                            <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                            <Route path="/team-members" element={user ? <TeamMembers /> : <Navigate to="/login" />} />
                            <Route path="/support" element={user ? <Support /> : <Navigate to="/login" />} />
                            <Route path="/custom-calendar" element={user ? <CustomCalendar /> : <Navigate to="/login" />} />
                        </Routes>
                    </div>
                    {showProjectsPopup && <ProjectsPopup onClose={handleClosePopup} />}
                    {showSettingsPopup && <SettingsPopup onClose={handleClosePopup} />}
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
