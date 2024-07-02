import React, { useState } from 'react';
import { FaSearch, FaEllipsisV, FaCheck } from 'react-icons/fa';

const Home = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const initialTasks = [
    { name: 'Web Development', progress: 93, tasks: 15, daysLeft: 3, bgColor: 'bg-yellow-200' },
    { name: 'Mobile App Design', progress: 45, tasks: 10, daysLeft: 3, bgColor: 'bg-purple-200' },
    { name: 'Android Development', progress: 69, tasks: 12, daysLeft: 3, bgColor: 'bg-green-200' },
    { name: 'Data Analytics', progress: 45, tasks: 10, daysLeft: 3, bgColor: 'bg-blue-200' },
    { name: 'User Research Experience', progress: 93, tasks: 15, daysLeft: 3, bgColor: 'bg-teal-200' },
    { name: 'Cyber Security', progress: 69, tasks: 12, daysLeft: 3, bgColor: 'bg-pink-200' },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const handleTaskCompletionToggle = (index) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, progress: task.progress === 100 ? 0 : 100 };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const inProgressCount = tasks.filter(task => task.progress > 0 && task.progress < 100).length;
  const upcomingCount = tasks.filter(task => task.progress === 0).length;
  const doneCount = tasks.filter(task => task.progress === 100).length;
  const totalCount = tasks.length;

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
      <section className="flex justify-around bg-white p-4 rounded-lg shadow-md">
        <div className="text-center">
          <p className="text-xl font-bold">{inProgressCount}</p>
          <p className="text-gray-500">In Progress</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{upcomingCount}</p>
          <p className="text-gray-500">Upcoming</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{doneCount}</p>
          <p className="text-gray-500">Done</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{totalCount}</p>
          <p className="text-gray-500">Total Projects</p>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 shadow-sm ${task.bgColor} relative hover:shadow-lg transition-shadow duration-300`}
          >
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
              <button onClick={() => handleTaskCompletionToggle(index)}>
                <FaCheck className={`text-green-500 ${task.progress === 100 ? 'line-through' : ''}`} />
              </button>
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
