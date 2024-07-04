// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Home from './pages/Home';
import Support from './Components/Support';
import TeamMembers from './Components/TeamMembers';
import CustomCalendar from './Components/CustomCalendar';
import { ThemeProvider, ThemeContext } from './Context/ThemeContext';
import ProjectsPopup from './Components/ProjectsPopup';
import SettingsPopup from './Components/SettingsPopup';

function App() {
    const [showProjectsPopup, setShowProjectsPopup] = useState(false);
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);

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
                    <Sidebar onProjectsClick={handleProjectsClick} onSettingsClick={handleSettingsClick} />
                    <div className="flex-1 p-6 ml-20 md:ml-0">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/team-members" element={<TeamMembers />} />
                            <Route path="/support" element={<Support />} />
                            <Route path="/custom-calendar" element={<CustomCalendar />} />
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
