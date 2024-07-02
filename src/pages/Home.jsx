import React, { useState } from 'react';
import { FaSearch, FaEllipsisV, FaCheck, FaTrash, FaPlus } from 'react-icons/fa';
import TaskModal from './TaskModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const initialTasks = [
    {
      name: 'Web Development',
      progress: 93,
      tasks: 3,
      daysLeft: 3,
      bgColor: 'bg-yellow-200',
      subTasks: [
        { name: 'Frontend Development', dueDate: '2024-07-15', progress: 0 },
        { name: 'Backend Development', dueDate: '2024-07-20', progress: 0 },
        { name: 'Database Integration', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    {
      name: 'Mobile App Design',
      progress: 45,
      tasks: 3,
      daysLeft: 3,
      bgColor: 'bg-purple-200',
      subTasks: [
        { name: 'UI Design', dueDate: '2024-07-15', progress: 0 },
        { name: 'UX Research', dueDate: '2024-07-20', progress: 0 },
        { name: 'Prototype Creation', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    {
      name: 'Android Development',
      progress: 69,
      tasks: 3,
      daysLeft: 3,
      bgColor: 'bg-green-200',
      subTasks: [
        { name: 'UI Development', dueDate: '2024-07-15', progress: 0 },
        { name: 'API Integration', dueDate: '2024-07-20', progress: 0 },
        { name: 'Testing', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    // Add more tasks here
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskCompletionToggle = (index) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, progress: task.progress === 100 ? 0 : 100 };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const toggleSubTaskCompletion = (mainTask, subTask) => {
    const updatedTasks = tasks.map(task => {
      if (task.name === mainTask.name) {
        return {
          ...task,
          subTasks: task.subTasks.map(st => {
            if (st.name === subTask.name) {
              return { ...st, progress: st.progress === 100 ? 0 : 100 };
            }
            return st;
          }),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (task) => {
    toast.warning(
      <div>
        <p>Are you sure you want to delete "{task.name}"?</p>
        <p>This task contains {task.subTasks.length} sub-tasks.</p>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => confirmDeleteTask(task)}
        >
          Confirm
        </button>
      </div>
    );
  };

  const confirmDeleteTask = (task) => {
    const updatedTasks = tasks.filter(t => t.name !== task.name);
    setTasks(updatedTasks);
    toast.dismiss();
  };

  const handleDeleteSubTask = (mainTask, subTask) => {
    toast.warning(
      <div>
        <p>Are you sure you want to delete this sub-task?</p>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => confirmDeleteSubTask(mainTask, subTask)}
        >
          Confirm
        </button>
      </div>
    );
  };

  const confirmDeleteSubTask = (mainTask, subTask) => {
    const updatedTasks = tasks.map(task => {
      if (task.name === mainTask.name) {
        return {
          ...task,
          subTasks: task.subTasks.filter(st => st.name !== subTask.name),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    if (selectedTask) {
      setSelectedTask({
        ...selectedTask,
        subTasks: selectedTask.subTasks.filter(st => st.name !== subTask.name),
      });
    }
    toast.dismiss();
  };

  const handleAddMainTask = () => {
    const newTaskName = prompt('Enter the name of the new main task:');
    if (newTaskName) {
      const newTask = {
        name: newTaskName,
        progress: 0,
        tasks: 0,
        daysLeft: 0,
        bgColor: 'bg-gray-200',
        subTasks: [],
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleAddSubTask = (mainTask) => {
    const newSubTaskName = prompt('Enter the name of the new sub-task:');
    if (newSubTaskName) {
      const updatedTasks = tasks.map(task => {
        if (task.name === mainTask.name) {
          return {
            ...task,
            subTasks: [
              ...task.subTasks,
              { name: newSubTaskName, dueDate: '2024-07-30', progress: 0 },
            ],
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      setSelectedTask({
        ...mainTask,
        subTasks: [
          ...mainTask.subTasks,
          { name: newSubTaskName, dueDate: '2024-07-30', progress: 0 },
        ],
      });
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inProgressCount = tasks.reduce((count, task) => {
    return count + task.subTasks.filter(subTask => subTask.progress > 0 && subTask.progress < 100).length;
  }, tasks.filter(task => task.progress > 0 && task.progress < 100).length);

  const upcomingCount = tasks.reduce((count, task) => {
    return count + task.subTasks.filter(subTask => subTask.progress === 0).length;
  }, tasks.filter(task => task.progress === 0).length);

  const doneCount = tasks.reduce((count, task) => {
    return count + task.subTasks.filter(subTask => subTask.progress === 100).length;
  }, tasks.filter(task => task.progress === 100).length);

  const totalCount = tasks.reduce((count, task) => {
    return count + task.subTasks.length;
  }, tasks.length);

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hi, Abdimahad 👋</h1>
          <p className="text-gray-500">{currentDate}</p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <FaSearch className="absolute top-2 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search project"
              className="pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition duration-300"
            onClick={handleAddMainTask}
          >
            <FaPlus className="mr-2" /> Add Main Task
          </button>
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
        {filteredTasks.map((task, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 shadow-sm ${task.bgColor} relative hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
            onClick={() => handleTaskClick(task)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{task.name}</h3>
              <div className="flex items-center space-x-2">
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleTaskCompletionToggle(index);
                }}>
                  <FaCheck className={`text-green-500 ${task.progress === 100 ? 'line-through' : ''}`} />
                </button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task);
                }}>
                  <FaTrash className="text-red-500" />
                </button>
                <FaEllipsisV className="text-gray-400" />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <img
                src={`https://via.placeholder.com/40?text=${task.name.charAt(0)}`}
                alt={`${task.name}`}
                className="h-10 w-10 rounded-full mr-2"
              />
              <div>
                <p className="text-gray-500">{task.subTasks.length} tasks</p>
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
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={handleCloseModal}
          toggleSubTaskCompletion={toggleSubTaskCompletion}
          handleDeleteSubTask={handleDeleteSubTask}
          handleAddSubTask={handleAddSubTask}
        />
      )}
    </div>
  );
};

export default Home;
