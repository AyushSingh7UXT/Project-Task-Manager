import { useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import useTasks from '../hooks/useTasks';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const { tasks } = useTasks();

  const dueToday = useMemo(() => tasks.filter((t) => t.dueDate && new Date(t.dueDate).toDateString() === new Date(date).toDateString()), [tasks, date]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Calendar</h2>
      <div className="glass p-4">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="glass p-4">
        <h3 className="font-semibold">Tasks on {new Date(date).toDateString()}</h3>
        {dueToday.map((t) => <p key={t._id}>• {t.title}</p>)}
      </div>
    </div>
  );
}
