import React, { useState } from 'react';
import { FaTimes, FaCheck, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import TaskForm from './TaskForm';

const TaskModal = ({ task, onClose, toggleSubTaskCompletion, handleDeleteSubTask, handleAddSubTask, handleSaveSubTask }) => {
  // State variables for managing the sub-task form and editing state
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [isEditingSubTask, setIsEditingSubTask] = useState(false);
  const [selectedSubTask, setSelectedSubTask] = useState(null);

  // Define a list of background colors for sub-tasks
  const subTaskColors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];

  // Function to handle saving a sub-task form
  const handleSaveSubTaskForm = (newSubTask) => {
    if (isEditingSubTask) {
      // If editing, update the existing sub-task
      handleSaveSubTask(task, { ...selectedSubTask, ...newSubTask });
    } else {
      // If adding, save the new sub-task
      handleSaveSubTask(task, newSubTask);
    }
    setIsAddingSubTask(false);
    setIsEditingSubTask(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{task.name} Sub-tasks</h2>
          <div className="flex items-center space-x-4">
            {/* Button to add a new sub-task */}
            <button onClick={() => setIsAddingSubTask(true)} className="text-blue-500 hover:text-blue-700">
              <FaPlus />
            </button>
            {/* Button to close the modal */}
            <button onClick={onClose}>
              <FaTimes className="text-gray-500" />
            </button>
          </div>
        </div>
        {/* Render the TaskForm component for adding a new sub-task */}
        {isAddingSubTask && (
          <TaskForm
            initialData={{ name: '', startDate: '', dueDate: '' }}
            onSave={handleSaveSubTaskForm}
            onCancel={() => setIsAddingSubTask(false)}
            isEditing={false}
          />
        )}
        {/* Render the TaskForm component for editing an existing sub-task */}
        {isEditingSubTask && (
          <TaskForm
            initialData={selectedSubTask}
            onSave={handleSaveSubTaskForm}
            onCancel={() => setIsEditingSubTask(false)}
            isEditing={true}
          />
        )}
        <div className="grid grid-cols-3 gap-4">
          {/* Map through the sub-tasks and render each one */}
          {task.subTasks.map((subTask, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 shadow-sm ${subTaskColors[index % subTaskColors.length]} relative hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold mb-2">{subTask.name}</h3>
                <div className="flex items-center space-x-2">
                  {/* Button to toggle the completion of a sub-task */}
                  <button onClick={() => toggleSubTaskCompletion(task, subTask)}>
                    <FaCheck className={`text-green-500 ${subTask.progress === 100 ? 'line-through' : ''}`} />
                  </button>
                  {/* Button to edit a sub-task */}
                  <button onClick={() => {
                    setSelectedSubTask(subTask);
                    setIsEditingSubTask(true);
                  }}>
                    <FaEdit className="text-blue-500" />
                  </button>
                  {/* Button to delete a sub-task */}
                  <button onClick={() => handleDeleteSubTask(task, subTask)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-gray-500">{subTask.dueDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
