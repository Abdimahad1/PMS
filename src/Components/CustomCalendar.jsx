import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ThemeContext } from '../Context/ThemeContext';
import '../index.css';

const CustomCalendar = () => {
    // useState hook to manage the selected date state
    const [date, setDate] = useState(new Date());
    
    // useContext hook to access the current theme from ThemeContext
    const { theme } = useContext(ThemeContext);

    return (
        // Applying theme and custom styles to the calendar container
        <div className={`calendar-container ${theme.background} p-4 h-screen overflow-hidden`}>
            <h1 className={`text-4xl font-bold mb-4 text-center ${theme.text}`}>
                2024 CALENDAR FOR OUR PROJECT MANAGEMENT SYSTEM
            </h1>
            <div className="overflow-y-auto h-full flex flex-wrap justify-center">
                {/* Generating 12 Calendar components for each month */}
                {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="month mb-4 p-2">
                        <Calendar
                            // Update the selected date when a different date is chosen
                            onChange={setDate}
                            // The currently selected date
                            value={date}
                            // Display the calendar in month view
                            defaultView="month"
                            // Start the calendar view from the 1st day of each month in 2024
                            activeStartDate={new Date(2024, i, 1)}
                            // Hide days from neighboring months
                            showNeighboringMonth={false}
                            // Custom class for Sundays to highlight them in red
                            tileClassName={({ date, view }) => 
                                view === 'month' && date.getDay() === 0 ? 'text-red-500' : ''
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomCalendar;
