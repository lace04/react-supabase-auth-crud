import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';

function TaskForm() {
  const { createTask, adding } = useTasks();

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(taskName, taskDescription);
    setTaskName('');
    setTaskDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className='card card-body'>
      <input
        type='text'
        name='title'
        placeholder='Write a title'
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
        autoFocus
        className='form-control mb-2'
      />
      <textarea
        name='description'
        placeholder='Write a description'
        onChange={(e) => setTaskDescription(e.target.value)}
        value={taskDescription}
        className='form-control mb-2'
      ></textarea>
      <button disabled={adding} className='btn btn-info text-white btn-sm'>{adding ? 'Adding...' : 'Add Task'}</button>
    </form>
  );
}

export default TaskForm;
