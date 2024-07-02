import React, { useState, useEffect } from 'react';

const TaskForm = ({ initialData, onSave, onUpdate, onCancel, isEditing }) => {
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [startDate, setStartDate] = useState(initialData ? initialData.startDate : '');
  const [dueDate, setDueDate] = useState(initialData ? initialData.dueDate : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setStartDate(initialData.startDate);
      setDueDate(initialData.dueDate);
    }
  }, [initialData]);

  const handleSave = () => {
    if (!name || !startDate || !dueDate) {
      setError('All fields are required.');
      return;
    }
    if (isEditing) {
      onUpdate({ name, startDate, dueDate });
    } else {
      onSave({ name, startDate, dueDate });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
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
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-lg"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
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
