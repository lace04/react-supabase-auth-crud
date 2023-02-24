import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';

function Home() {
  const [showTaskDone, setShowTaskDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase.auth.user()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='row pt-4'>
      <div className='col-md-4 offset-md-4'>
        <TaskForm />
        <header className='d-flex justify-content-between mt-3'>
          <span className='h5'>
            {showTaskDone ? 'Task completed' : 'Task pending'}
          </span>
          <button
            className='btn btn-dark btn-sm mb-4'
            onClick={() => setShowTaskDone(!showTaskDone)}
          >
            {showTaskDone ? 'Show tasks to do' : 'Show task done'}
          </button>
        </header>
        <TaskList done={showTaskDone} />
      </div>
    </div>
  );
}

export default Home;
