import { createContext, useContext, useState } from 'react';
import { supabase } from '../supabase/client';

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskContextProvider');
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();
      const { error, data } = await supabase
        .from('tasks')
        .select()
        .eq('userId', user.id)
        .eq('done', done)
        .order('id', { ascending: true });

      if (error) throw error;
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (taskName, taskDescription) => {
    setAdding(true);
    try {
      const user = supabase.auth.user();
      const { error, data } = await supabase.from('tasks').insert({
        title: taskName,
        description: taskDescription,
        userId: user.id,
      });

      if (error) throw error;
      setTasks([...tasks, ...data]);
    } catch (error) {
      console.log('error', error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      const user = supabase.auth.user();
      const { error, data } = await supabase
        .from('tasks')
        .delete()
        .eq('userId', user.id)
        .eq('id', id);
      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateTask = async (id, updatedFields) => {
    try {
      const user = supabase.auth.user();
      const { error, data } = await supabase
        .from('tasks')
        .update(updatedFields)
        .eq('userId', user.id)
        .eq('id', id);

      if (error) throw error;

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
