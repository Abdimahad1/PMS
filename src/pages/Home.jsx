import React, { useState, useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { FaSearch, FaEllipsisV, FaCheck, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ user }) => {
  const { theme } = useContext(ThemeContext); // Use ThemeContext to access theme settings
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const initialTasks = [
    // Example tasks
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
    {
      name: 'Windows Development',
      dueDate: '2024-07-31',
      progress: 69,
      bgColor: 'bg-green-200',
      subTasks: [
        { name: 'UI Development', dueDate: '2024-07-15', progress: 0 },
        { name: 'API Integration', dueDate: '2024-07-20', progress: 0 },
        { name: 'Testing', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    {
      name: 'Linux Development',
      dueDate: '2024-07-31',
      progress: 69,
      bgColor: 'bg-gray-200',
      subTasks: [
        { name: 'UI Development', dueDate: '2024-07-15', progress: 0 },
        { name: 'API Integration', dueDate: '2024-07-20', progress: 0 },
        { name: 'Testing', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    {
      name: 'Apple Development',
      dueDate: '2024-07-31',
      progress: 69,
      bgColor: 'bg-blue-200',
      subTasks: [
        { name: 'UI Development', dueDate: '2024-07-15', progress: 0 },
        { name: 'API Integration', dueDate: '2024-07-20', progress: 0 },
        { name: 'Testing', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    {
      name: 'Samsung Development',
      dueDate: '2024-07-31',
      progress: 69,
      bgColor: 'bg-gray-200',
      subTasks: [
        { name: 'UI Development', dueDate: '2024-07-15', progress: 0 },
        { name: 'API Integration', dueDate: '2024-07-20', progress: 0 },
        { name: 'Testing', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    {
      name: 'Space Development',
      dueDate: '2024-07-31',
      progress: 69,
      bgColor: 'bg-green-200',
      subTasks: [
        { name: 'UI Development', dueDate: '2024-07-15', progress: 0 },
        { name: 'API Integration', dueDate: '2024-07-20', progress: 0 },
        { name: 'Testing', dueDate: '2024-07-25', progress: 0 },
      ],
    },
    {
      name: 'Ultra Development',
      dueDate: '2024-07-31',
      progress: 69,
      bgColor: 'bg-blue-200',
      subTasks: [
        { name: 'UI Development', dueDate: '2024-07-15', progress: 0 },
        { name: 'API Integration', dueDate: '2024-07-20', progress: 0 },
        { name: 'Testing', dueDate: '2024-07-25', progress: 0 },
      ],
    },
  ];

  const [tasks, setTasks] = useState(initialTasks); // State to manage tasks
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [isAddingTask, setIsAddingTask] = useState(false); // State to toggle task addition
  const [selectedMainTask, setSelectedMainTask] = useState(null); // State to track selected main task
  const [isAddingSubTask, setIsAddingSubTask] = useState(false); // State to toggle sub-task addition

  const handleTaskCompletionToggle = (index) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        const updatedSubTasks = task.subTasks.map(subTask => ({
          ...subTask,
          progress: task.progress === 100 ? 0 : 100,
        }));
        return { ...task, progress: task.progress === 100 ? 0 : 100, subTasks: updatedSubTasks };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSubTaskCompletionToggle = (mainTaskIndex, subTaskIndex) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === mainTaskIndex) {
        const updatedSubTasks = task.subTasks.map((subTask, sIdx) => {
          if (sIdx === subTaskIndex) {
            return { ...subTask, progress: subTask.progress === 100 ? 0 : 100 };
          }
          return subTask;
        });
        return { ...task, subTasks: updatedSubTasks };
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

  const handleDeleteSubTask = (mainTaskIndex, subTaskIndex) => {
    toast.warning(
      <div>
        <p>Are you sure you want to delete this sub-task?</p>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => confirmDeleteSubTask(mainTaskIndex, subTaskIndex)}
        >
          Confirm
        </button>
      </div>
    );
  };

  const confirmDeleteSubTask = (mainTaskIndex, subTaskIndex) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === mainTaskIndex) {
        return {
          ...task,
          subTasks: task.subTasks.filter((_, sIdx) => sIdx !== subTaskIndex),
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

  const handleAddSubTask = (mainTask) => {
    setSelectedMainTask(mainTask);
    setIsAddingSubTask(true);
  };

  const handleSaveSubTask = (mainTask, newSubTask) => {
    const updatedTasks = tasks.map(task => {
      if (task.name === mainTask.name) {
        return {
          ...task,
          subTasks: [...task.subTasks, newSubTask],
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    setIsAddingSubTask(false);
    toast.success("Sub-task added successfully!");
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
    <div className={`main-content p-6 space-y-6 overflow-auto ${theme.background} ${theme.text}`}>
      <ToastContainer />
      <header className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Hi, Welcome {user.name} 👋</h1>
          <p className="text-gray-500">{currentDate}</p>
        </div>
        <div className="relative w-full md:w-auto">
          <FaSearch className="absolute top-2 left-3 text-black-400" />
          <input
            type="text"
            placeholder="Search project"
            className="w-full md:w-auto pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <section className="flex flex-col md:flex-row justify-around items-center bg-white p-4 rounded-lg shadow-md">
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl font-bold">{inProgressCount}</p>
          <p className="text-gray-500">In Progress</p>
        </div>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl font-bold">{upcomingCount}</p>
          <p className="text-gray-500">Upcoming</p>
        </div>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl font-bold">{doneCount}</p>
          <p className="text-gray-500">Done</p>
        </div>
        <div className="text-center mb-4 md:mb-0 relative">
          <p className="text-xl font-bold">{totalCount}</p>
          <p className="text-gray-500 ml-2">Total Projects</p>
        </div>
        <div className="text-center relative">
          <button
            className="ml-2 text-green-500 hover:text-green-700"
            onClick={handleAddMainTask}
          >
            <FaPlus />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
        {filteredTasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            index={index}
            onToggleCompletion={handleTaskCompletionToggle}
            onSave={handleSaveTask}
            onDelete={handleDeleteTask}
            onDeleteSubTask={handleDeleteSubTask}
            onAddSubTask={handleAddSubTask}
            onToggleSubTaskCompletion={handleSubTaskCompletionToggle}
          />
        ))}
      </section>
      {isAddingSubTask && (
        <SubTaskForm
          mainTask={selectedMainTask}
          onSave={handleSaveSubTask}
          onCancel={() => setIsAddingSubTask(false)}
        />
      )}
      {isAddingTask && (
        <TaskForm
          onSave={handleAddTask}
          onCancel={() => setIsAddingTask(false)}
        />
      )}
    </div>
  );
};

const TaskCard = ({ task, index, onToggleCompletion, onSave, onDelete, onDeleteSubTask, onAddSubTask, onToggleSubTaskCompletion }) => {
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
          <button onClick={() => onAddSubTask(task)}>
            <FaPlus className="text-blue-500" />
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
              onToggleCompletion={onToggleSubTaskCompletion}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SubTaskCard = ({ subTask, mainTaskIndex, subTaskIndex, onSave, onDelete, onToggleCompletion }) => {
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
          <button onClick={() => onToggleCompletion(mainTaskIndex, subTaskIndex)}>
            <FaCheck className={`text-green-500 ${subTask.progress === 100 ? 'line-through' : ''}`} />
          </button>
          <button onClick={handleEditToggle}>
            <FaEdit className="text-blue-500" />
          </button>
          <button onClick={() => onDelete(mainTaskIndex, subTaskIndex)}>
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

const SubTaskForm = ({ mainTask, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSave = () => {
    if (!name || !dueDate) {
      toast.error("Please fill all fields");
      return;
    }

    const newSubTask = { name, dueDate, progress };
    onSave(mainTask, newSubTask);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Add Sub-task to {mainTask.name}</h3>
        <input
          type="text"
          placeholder="Sub-task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskForm = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    if (!name || !dueDate) {
      toast.error("Please fill all fields");
      return;
    }

    const newTask = { name, dueDate, progress: 0, subTasks: [], bgColor: 'bg-gray-200' };
    onSave(newTask);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
