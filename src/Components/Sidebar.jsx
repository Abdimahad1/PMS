import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaCog, FaUserCircle, FaSignOutAlt, FaCalendarAlt, FaLifeRing } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext';
import { toast } from 'react-toastify';

const Sidebar = ({ user, onSettingsClick, onProjectsClick, onLogout }) => {
    const [collapsed, setCollapsed] = useState(true);
    const { theme } = useContext(ThemeContext);

    const handleLogoutClick = () => {
        const toastId = toast.info(
            <div>
                <p>Are you sure you want to log out?</p>
                <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => {
                        onLogout();
                        toast.dismiss(toastId);
                    }}
                >
                    Confirm
                </button>
            </div>,
            { autoClose: false }
        );
    };

    const menuItems = [
        { name: 'Home', icon: FaHome, route: '/home' },
        { name: 'Team Members', icon: FaUserCircle, route: '/team-members' },
        { name: 'Support', icon: FaLifeRing, route: '/support' }, // Changed icon here
        { name: 'Custom Calendar', icon: FaCalendarAlt, route: '/custom-calendar' },
    ];

    return (
        <div className={`h-screen flex flex-col ${collapsed ? 'w-16' : 'w-64'} ${theme.sidebar} transition-all duration-300 fixed md:relative`}>
            <div className={`p-4 flex justify-between items-center border-b ${theme.borderColor}`}>
                <span className="text-xl font-semibold">{!collapsed && 'PM-SYSTEM'}</span>
                <button onClick={() => setCollapsed(!collapsed)} className="focus:outline-none">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        {collapsed ? (
                            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8z" />
                        ) : (
                            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.59-5.58L4 12l8 8z" />
                        )}
                    </svg>
                </button>
            </div>
            <div className={`mt-4 flex items-center p-2 border-b ${theme.borderColor}`}>
                <FaUserCircle className="h-10 w-10 mr-2" />
                {!collapsed && (
                    <div>
                        <p className="text-lg font-semibold">{user.displayName}</p>
                        <p className="text-sm">{user.email}</p>
                    </div>
                )}
            </div>
            <div className="mt-4 flex-1">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <Link to={item.route} className={`flex items-center p-2 hover:${theme.hoverBgColor}`}>
                            <item.icon className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                            {!collapsed && <span>{item.name}</span>}
                        </Link>
                        {index % 2 === 1 && index < menuItems.length - 1 && (
                            <div className={`border-t my-2 ${theme.borderColor}`}></div>
                        )}
                    </div>
                ))}
                <div className={`flex items-center p-2 hover:${theme.hoverBgColor} cursor-pointer`} onClick={(e) => { e.stopPropagation(); onProjectsClick(); }}>
                    <FaProjectDiagram className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                    {!collapsed && <span>Projects</span>}
                </div>
                <div className={`flex items-center p-2 hover:${theme.hoverBgColor} cursor-pointer`} onClick={(e) => { e.stopPropagation(); onSettingsClick(); }}>
                    <FaCog className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                    {!collapsed && <span>Settings</span>}
                </div>
            </div>
            <div className={`p-2 border-t ${theme.borderColor}`}>
                <div className={`flex items-center p-2 hover:${theme.hoverBgColor} cursor-pointer`} onClick={handleLogoutClick}>
                    <FaSignOutAlt className={`h-6 w-6 ${!collapsed && 'mr-4'}`} />
                    {!collapsed && <span>Log Out</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
