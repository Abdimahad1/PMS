import React, { useState, useEffect } from 'react';

const TaskForm = ({ initialData, onSave, onUpdate, onCancel, isEditing }) => {
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [dueDate, setDueDate] = useState(initialData ? initialData.dueDate : '');
  const [progress, setProgress] = useState(initialData ? initialData.progress : 0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDueDate(initialData.dueDate);
      setProgress(initialData.progress);
    }
  }, [initialData]);

  const handleSave = () => {
    if (!name || !dueDate) {
      setError('All fields are required.');
      return;
    }
    const taskData = { name, dueDate, progress };
    if (isEditing) {
      onUpdate(taskData);
    } else {
      onSave(taskData);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white max-w-md mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="mb-4">
        <label className="block text-gray-700">Task Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Due Date</label>
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-lg"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            setError('');
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Progress</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg"
          value={progress}
          onChange={(e) => {
            setProgress(e.target.value);
            setError('');
          }}
          min="0"
          max="100"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700"
          onClick={handleSave}
        >
          {isEditing ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
