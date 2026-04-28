import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Select from 'react-select';
import useTasks from '../hooks/useTasks';
import api from '../services/api';

export default function TasksPage() {
  const { tasks, fetchTasks } = useTasks();
  const { register, handleSubmit, reset } = useForm();
  const [filter, setFilter] = useState({ value: 'all', label: 'All' });

  const onSubmit = async (values) => {
    await api.post('/tasks', values);
    reset();
    toast.success('Task created');
    fetchTasks();
  };

  const visible = tasks.filter((t) => (filter.value === 'all' ? true : t.status === filter.value));

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold">My Tasks</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="surface p-4 grid md:grid-cols-4 gap-3">
        <input {...register('title')} placeholder="Task title" className="input-modern" />
        <input type="date" {...register('dueDate')} className="input-modern" />
        <select {...register('priority')} className="input-modern"><option>low</option><option>medium</option><option>high</option><option>urgent</option></select>
        <button className="btn-primary">Add Task</button>
      </form>
      <div className="max-w-xs"><Select value={filter} onChange={setFilter} options={[{ value: 'all', label: 'All' }, { value: 'todo', label: 'Todo' }, { value: 'in-progress', label: 'In Progress' }, { value: 'done', label: 'Done' }]} /></div>
      <div className="grid gap-3">
        {visible.map((task) => (
          <div key={task._id} className="surface p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-xs text-slate-500">{task.priority} • {task.status}</p>
            </div>
            <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-slate-900" onClick={async () => { await api.put(`/tasks/${task._id}`, { completed: !task.completed, status: task.completed ? 'todo' : 'done' }); fetchTasks(); }}>
              {task.completed ? 'Reopen' : 'Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
