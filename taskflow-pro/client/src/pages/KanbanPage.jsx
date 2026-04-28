import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useTasks from '../hooks/useTasks';
import api from '../services/api';

const columns = ['todo', 'in-progress', 'review', 'done'];

export default function KanbanPage() {
  const { tasks, setTasks } = useTasks();

  const onDragEnd = async ({ destination, draggableId }) => {
    if (!destination) return;
    const status = destination.droppableId;
    await api.put(`/tasks/${draggableId}`, { status, completed: status === 'done' });
    setTasks((prev) => prev.map((t) => (t._id === draggableId ? { ...t, status } : t)));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-4 gap-3">
          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="glass p-3 min-h-80">
                  <h3 className="font-semibold mb-3 capitalize">{col}</h3>
                  {tasks.filter((t) => t.status === col).map((t, index) => (
                    <Draggable draggableId={t._id} index={index} key={t._id}>
                      {(draggable) => (
                        <div ref={draggable.innerRef} {...draggable.draggableProps} {...draggable.dragHandleProps} className="p-2 rounded-lg bg-white dark:bg-slate-800 mb-2">
                          {t.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
