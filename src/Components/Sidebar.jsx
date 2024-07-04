// src/Components/Sidebar.js

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaCog, FaUserCircle, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext';

const Sidebar = ({ onSettingsClick, onProjectsClick }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { theme } = useContext(ThemeContext);

    const menuItems = [
        { name: 'Home', icon: FaHome, route: '/' },
        { name: 'Team Members', icon: FaUserCircle, route: '/team-members' },
        { name: 'Support', icon: FaCog, route: '/support' },
        { name: 'Custom Calendar', icon: FaCalendarAlt, route: '/custom-calendar' },
    ];

    return (
        <div className={`h-screen flex flex-col ${collapsed ? 'w-20' : 'w-64'} ${theme.sidebar} text-white transition-all duration-300 fixed md:relative`}>
            <div className="p-4 flex justify-between items-center border-b border-blue-700">
                <span className="text-xl font-semibold">{!collapsed && 'PM-SYSTEM'}</span>
                <button onClick={() => setCollapsed(!collapsed)} className="focus:outline-none">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        {collapsed ? (
                            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8z"/>
                        ) : (
                            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.59-5.58L4 12l8 8z"/>
                        )}
                    </svg>
                </button>
            </div>
            <div className="mt-4 flex items-center p-2 border-b border-blue-700">
                <FaUserCircle className="h-10 w-10 mr-2" />
                {!collapsed && <div>
                    <p className="text-lg font-semibold">ABDIMAHAD</p>
                    <p className="text-sm">abdi123@gmail.comt</p>
                </div>}
            </div>
            <div className="mt-4 flex-1">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <Link to={item.route} className="flex items-center p-2 hover:bg-blue-700">
                            <item.icon className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                            {!collapsed && <span>{item.name}</span>}
                        </Link>
                        {index % 2 === 1 && index < menuItems.length - 1 && (
                            <div className="border-t border-blue-700 my-2"></div>
                        )}
                    </div>
                ))}
                <div className="flex items-center p-2 hover:bg-blue-700 cursor-pointer" onClick={(e) => { e.stopPropagation(); onProjectsClick(); }}>
                    <FaProjectDiagram className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                    {!collapsed && <span>Projects</span>}
                </div>
                <div className="flex items-center p-2 hover:bg-blue-700 cursor-pointer" onClick={(e) => { e.stopPropagation(); onSettingsClick(); }}>
                    <FaCog className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                    {!collapsed && <span>Settings</span>}
                </div>
            </div>
            <div className="p-2 border-t border-blue-700">
                <Link to="/logout" className="flex items-center p-2 hover:bg-blue-700">
                    <FaSignOutAlt className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                    {!collapsed && <span>Log Out</span>}
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
