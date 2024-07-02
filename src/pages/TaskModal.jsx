import React, { useState } from 'react';
import { FaTimes, FaCheck, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import TaskForm from './TaskForm';

const TaskModal = ({ task, onClose, toggleSubTaskCompletion, handleDeleteSubTask, handleAddSubTask, handleSaveSubTask }) => {
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [isEditingSubTask, setIsEditingSubTask] = useState(false);
  const [selectedSubTask, setSelectedSubTask] = useState(null);

  const subTaskColors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];

  const handleSaveSubTaskForm = (newSubTask) => {
    if (isEditingSubTask) {
      handleSaveSubTask(task, { ...selectedSubTask, ...newSubTask });
    } else {
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
            <button onClick={() => setIsAddingSubTask(true)} className="text-blue-500 hover:text-blue-700">
              <FaPlus />
            </button>
            <button onClick={onClose}>
              <FaTimes className="text-gray-500" />
            </button>
          </div>
        </div>
        {isAddingSubTask && (
          <TaskForm
            initialData={{ name: '', startDate: '', dueDate: '' }}
            onSave={handleSaveSubTaskForm}
            onCancel={() => setIsAddingSubTask(false)}
            isEditing={false}
          />
        )}
        {isEditingSubTask && (
          <TaskForm
            initialData={selectedSubTask}
            onSave={handleSaveSubTaskForm}
            onCancel={() => setIsEditingSubTask(false)}
            isEditing={true}
          />
        )}
        <div className="grid grid-cols-3 gap-4">
          {task.subTasks.map((subTask, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 shadow-sm ${subTaskColors[index % subTaskColors.length]} relative hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold mb-2">{subTask.name}</h3>
                <div className="flex items-center space-x-2">
                  <button onClick={() => toggleSubTaskCompletion(task, subTask)}>
                    <FaCheck className={`text-green-500 ${subTask.progress === 100 ? 'line-through' : ''}`} />
                  </button>
                  <button onClick={() => {
                    setSelectedSubTask(subTask);
                    setIsEditingSubTask(true);
                  }}>
                    <FaEdit className="text-blue-500" />
                  </button>
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
