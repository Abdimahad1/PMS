import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Notifications from './pages/Notifications';
import Projects from './pages/Projects';
import Settings from './pages/Settings';
import { ThemeProvider } from './Context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1 p-6 ml-20 md:ml-0">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/notifications" element={<Notifications />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
