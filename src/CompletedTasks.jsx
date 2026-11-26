import TaskItem from './TaskItem';

export default function CompletedTasks({ tasks, deleteTask, toggleComplete }) {
  return (
    <div>
      <h2>Tareas Completadas</h2>
      {tasks.length === 0 ? <p>Aún no has completado ninguna tarea.</p> : (
        <div>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}