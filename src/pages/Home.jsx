import React, { useState } from 'react';
import { FaSearch, FaEllipsisV, FaCheck, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import TaskModal from './TaskModal';
import TaskForm from './TaskForm';
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
      dueDate: '2024-07-31',
      progress: 93,
      bgColor: 'bg-yellow-200',
      subTasks: [
        { name: 'Frontend Development', dueDate: '2024-07-15', progress: 0 },
        { name: 'Backend Development', dueDate: '2024-07-20', progress: 0 },
        { name: 'Database Integration', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    {
      name: 'Mobile App Design',
      dueDate: '2024-07-31',
      progress: 45,
      bgColor: 'bg-purple-200',
      subTasks: [
        { name: 'UI Design', dueDate: '2024-07-15', progress: 0 },
        { name: 'UX Research', dueDate: '2024-07-20', progress: 0 },
        { name: 'Prototype Creation', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    {
      name: 'Android Development',
      dueDate: '2024-07-31',
      progress: 69,
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
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleTaskCompletionToggle = (index) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, progress: task.progress === 100 ? 0 : 100 };
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
    toast.dismiss();
  };

  const handleSaveTask = (updatedTask, index, subTaskIndex = null) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        if (subTaskIndex !== null) {
          const updatedSubTasks = task.subTasks.map((subTask, subIdx) => {
            if (subIdx === subTaskIndex) {
              return { ...subTask, ...updatedTask };
            }
            return subTask;
          });
          return { ...task, subTasks: updatedSubTasks };
        } else {
          return { ...task, ...updatedTask };
        }
      }
      return task;
    });
    setTasks(updatedTasks);
    toast.success("Task updated successfully!");
  };

  const handleAddMainTask = () => {
    setIsAddingTask(true);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, progress: 0, subTasks: [], bgColor: 'bg-gray-200' }]);
    toast.success("Task saved successfully!");
    setIsAddingTask(false);
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
    <div className="p-6 space-y-6 overflow-auto">
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
          <TaskCard
            key={index}
            task={task}
            index={index}
            onToggleCompletion={handleTaskCompletionToggle}
            onSave={handleSaveTask}
            onDelete={handleDeleteTask}
            onDeleteSubTask={confirmDeleteSubTask}
          />
        ))}
      </section>
    </div>
  );
};

const TaskCard = ({ task, index, onToggleCompletion, onSave, onDelete, onDeleteSubTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showSubTasks, setShowSubTasks] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedTask({ ...task });
  };

  const handleSaveChanges = () => {
    onSave(editedTask, index);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`border rounded-lg p-4 shadow-sm ${task.bgColor} relative hover:shadow-lg transition-shadow duration-300 cursor-default`}>
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            className="text-lg font-semibold border-b-2 focus:outline-none"
          />
        ) : (
          <h3 className="text-lg font-semibold">{task.name}</h3>
        )}
        <div className="flex items-center space-x-2">
          <button onClick={() => onToggleCompletion(index)}>
            <FaCheck className={`text-green-500 ${task.progress === 100 ? 'line-through' : ''}`} />
          </button>
          <button onClick={handleEditToggle}>
            <FaEdit className="text-blue-500" />
          </button>
          <button onClick={() => onDelete(task)}>
            <FaTrash className="text-red-500" />
          </button>
          <button onClick={() => setShowSubTasks(!showSubTasks)}>
            <FaEllipsisV className="text-gray-400" />
          </button>
        </div>
      </div>
      {isEditing ? (
        <>
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            className="mb-2 w-full border-b-2 focus:outline-none"
          />
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700"
              onClick={handleSaveChanges}
            >
              Update
            </button>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
      {showSubTasks && task.subTasks.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-semibold">Sub-tasks:</h4>
          {task.subTasks.map((subTask, subIndex) => (
            <SubTaskCard
              key={subIndex}
              subTask={subTask}
              mainTaskIndex={index}
              subTaskIndex={subIndex}
              onSave={onSave}
              onDelete={onDeleteSubTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SubTaskCard = ({ subTask, mainTaskIndex, subTaskIndex, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubTask, setEditedSubTask] = useState({ ...subTask });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedSubTask({ ...subTask });
  };

  const handleSaveChanges = () => {
    onSave(editedSubTask, mainTaskIndex, subTaskIndex);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSubTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`border rounded-lg p-4 shadow-sm bg-white mt-2 hover:shadow-lg transition-shadow duration-300 cursor-default`}>
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedSubTask.name}
            onChange={handleChange}
            className="text-md font-semibold border-b-2 focus:outline-none"
          />
        ) : (
          <h4 className="text-md font-semibold">{subTask.name}</h4>
        )}
        <div className="flex items-center space-x-2">
          <button onClick={handleEditToggle}>
            <FaEdit className="text-blue-500" />
          </button>
          <button onClick={() => onDelete(editedSubTask)}>
            <FaTrash className="text-red-500" />
          </button>
        </div>
      </div>
      {isEditing ? (
        <>
          <input
            type="date"
            name="dueDate"
            value={editedSubTask.dueDate}
            onChange={handleChange}
            className="mb-2 w-full border-b-2 focus:outline-none"
          />
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700"
              onClick={handleSaveChanges}
            >
              Update
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-500">{subTask.dueDate}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <p>{subTask.progress}%</p>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${subTask.progress}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
