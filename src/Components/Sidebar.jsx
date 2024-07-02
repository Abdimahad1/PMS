import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaBell, FaProjectDiagram, FaCog, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { name: 'Home', icon: FaHome, route: '/' },
        { name: 'My Tasks', icon: FaTasks, route: '/tasks' },
        { name: 'Notifications', icon: FaBell, route: '/notifications' },
        { name: 'Projects', icon: FaProjectDiagram, route: '/projects' },
        { name: 'Settings', icon: FaCog, route: '/settings' }
    ];

    return (
        <div className={`h-screen ${collapsed ? 'w-20' : 'w-64'} bg-blue-900 text-white transition-all duration-300 fixed md:relative`}>
            <div className="p-4 flex justify-between items-center">
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
            <div className="mt-4 flex items-center p-2">
                <FaUserCircle className="h-10 w-10 mr-2" />
                {!collapsed && <div>
                    <p className="text-lg font-semibold">User Name</p>
                    <p className="text-sm">My Account</p>
                </div>}
            </div>
            <div className="mt-4">
                {menuItems.map((item, index) => (
                    <Link to={item.route} key={index} className="flex items-center p-2 hover:bg-blue-700">
                        <item.icon className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                        {!collapsed && <span>{item.name}</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
