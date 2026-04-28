import { useEffect, useState } from 'react';
import api from '../services/api';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const { data } = await api.get('/tasks');
    setTasks(data.tasks || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, setTasks, loading, fetchTasks };
}
