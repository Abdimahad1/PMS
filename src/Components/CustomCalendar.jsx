import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ThemeContext } from '../Context/ThemeContext';
import '../index.css';

const CustomCalendar = () => {
    const [date, setDate] = useState(new Date());
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`calendar-container ${theme.background} p-4 h-screen overflow-hidden`}>
            <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center ${theme.text}`}>
                2024 CALENDAR FOR OUR PROJECT MANAGEMENT SYSTEM
            </h1>
            <div className="overflow-y-auto h-full flex flex-wrap justify-center">
                {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="month mb-4 p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                        <Calendar
                            onChange={setDate}
                            value={date}
                            defaultView="month"
                            activeStartDate={new Date(2024, i, 1)}
                            showNeighboringMonth={false}
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
