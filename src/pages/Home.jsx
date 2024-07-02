import React from 'react';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';

const Home = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const tasks = [
    { name: 'Web Development', progress: 93, tasks: 15, daysLeft: 3 },
    { name: 'Mobile App Design', progress: 45, tasks: 10, daysLeft: 3 },
    { name: 'Android Development', progress: 69, tasks: 12, daysLeft: 3 },
    { name: 'Data Analytics', progress: 45, tasks: 10, daysLeft: 3 },
    { name: 'User Research Experience', progress: 93, tasks: 15, daysLeft: 3 },
    { name: 'Cyber Security', progress: 69, tasks: 12, daysLeft: 3 },
  ];

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hi, Abdimahad 👋</h1>
          <p className="text-gray-500">{currentDate}</p>
        </div>
        <div className="relative">
          <FaSearch className="absolute top-2 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search project"
            className="pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>
      <section className="grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-xl font-bold">25</p>
          <p className="text-gray-500">In Progress</p>
        </div>
        <div>
          <p className="text-xl font-bold">10</p>
          <p className="text-gray-500">Upcoming</p>
        </div>
        <div>
          <p className="text-xl font-bold">9</p>
          <p className="text-gray-500">Done</p>
        </div>
        <div>
          <p className="text-xl font-bold">44</p>
          <p className="text-gray-500">Total Projects</p>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{task.name}</h3>
              <FaEllipsisV className="text-gray-400" />
            </div>
            <div className="flex items-center mb-2">
              <img
                src={`https://via.placeholder.com/40?text=${task.name.charAt(0)}`}
                alt={`${task.name}`}
                className="h-10 w-10 rounded-full mr-2"
              />
              <div>
                <p className="text-gray-500">{task.tasks} tasks</p>
                <p className="text-gray-500">{task.daysLeft} days left</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <p>{task.progress}%</p>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
