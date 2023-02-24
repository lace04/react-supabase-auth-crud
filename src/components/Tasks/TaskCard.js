import { useTasks } from '../../context/TaskContext';

function TaskCard({ task }) {
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleDone = () => {
    updateTask(task.id, { done: !task.done });
  };

  return (
    <div className='card card-body mb-2'>
      <h3 className='h5'>{`${task.id}. ${task.title}`}</h3>
      <p>{task.description}</p>
      <p>{task.done ? '✔' : '❌'}</p>
      <div className='ms-auto'>
        <button
          className='btn btn-danger btn-sm me-1'
          onClick={() => handleDelete()}
        >
          Delete
        </button>
        <button
          className='btn btn-secondary btn-sm'
          onClick={() => handleDone()}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
