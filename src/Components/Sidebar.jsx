import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaBell, FaProjectDiagram, FaCog, FaUserCircle, FaSignOutAlt, FaCalendarAlt, FaSun, FaMoon, FaLeaf, FaTint, FaRegCircle, FaFireAlt } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { theme, changeTheme } = useContext(ThemeContext); // Use ThemeContext
    const [showSettings, setShowSettings] = useState(false);

    const menuItems = [
        { name: 'Home', icon: FaHome, route: '/' },
        { name: 'My Tasks', icon: FaTasks, route: '/tasks' },
        { name: 'Notifications', icon: FaBell, route: '/notifications' },
        { name: 'Projects', icon: FaProjectDiagram, route: '/projects' },
        { name: 'Calendar', icon: FaCalendarAlt, route: '/calendar' }, // Added Calendar item
    ];

    return (
        <div className={`h-screen flex flex-col ${collapsed ? 'w-20' : 'w-64'} ${theme.sidebar} text-white transition-all duration-300 fixed md:relative`}>
            <div className="p-4 flex justify-between items-center border-b border-blue-700">
                <span className="text-xl font-semibold">{!collapsed && 'Facenote'}</span>
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
                    <p className="text-lg font-semibold">User Name</p>
                    <p className="text-sm">My Account</p>
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
                <div className="flex items-center p-2 hover:bg-blue-700 cursor-pointer" onClick={() => setShowSettings(!showSettings)}>
                    <FaCog className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                    {!collapsed && <span>Settings</span>}
                </div>
                {showSettings && (
                    <div className="mt-4">
                        <p className="text-white mb-2">Select Theme:</p>
                        <button onClick={() => changeTheme('light')} className="text-white flex items-center mb-2"><FaSun className="mr-2" /> Light</button>
                        <button onClick={() => changeTheme('dark')} className="text-white flex items-center mb-2"><FaMoon className="mr-2" /> Dark</button>
                        <button onClick={() => changeTheme('green')} className="text-white flex items-center mb-2"><FaLeaf className="mr-2" /> Green</button>
                        <button onClick={() => changeTheme('blue')} className="text-white flex items-center mb-2"><FaTint className="mr-2" /> Blue</button>
                        <button onClick={() => changeTheme('gray')} className="text-white flex items-center mb-2"><FaRegCircle className="mr-2" /> Gray</button>
                        <button onClick={() => changeTheme('red')} className="text-white flex items-center mb-2"><FaFireAlt className="mr-2" /> Red</button>
                    </div>
                )}
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
