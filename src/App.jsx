import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Home from './Home';
import CompletedTasks from './CompletedTasks';
import TaskEdit from './TaskEdit';

const Navbar = styled.nav`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding: 10px;
  background: #f4f4f4;
  border-radius: 5px;
`;

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (task) => setTasks([...tasks, task]);
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>Gestor de Tareas "ToDo"</h1>
        <Navbar>
          <Link to="/">Lista de Tareas</Link>
          <Link to="/completadas">Tareas Completadas</Link>
        </Navbar>
       
        <Routes>
          <Route path="/" element={
            <Home
              tasks={tasks.filter(t => !t.completed)}
              addTask={addTask}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
            />
          } />
         
          <Route path="/completadas" element={
            <CompletedTasks
              tasks={tasks.filter(t => t.completed)}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
            />
          } />
          <Route path="/tarea/:id" element={
            <TaskEdit tasks={tasks} updateTask={updateTask} />
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}