import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskItem from './TaskItem';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Home({ tasks, addTask, deleteTask, toggleComplete }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 

    
    if (!title.trim()) {
      setError('El título de la tarea es obligatorio.');
      return;
    }

    const newTask = {
      id: uuidv4(), 
      title: title,
      description: description,
      completed: false 
    };

    
    addTask(newTask);

   
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <div>
      <h2>Añadir Nueva Tarea</h2>
     
      
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <span style={{ color: 'red', fontSize: '14px' }}>{error}</span>}
        <Button type="submit">Añadir Tarea</Button>
      </FormContainer>

      <hr />

   
      <h2>Tareas Pendientes</h2>
      {tasks.length === 0 ? (
        <p>No tienes tareas pendientes. ¡Añade una!</p>
      ) : (
        <div>
          {tasks.map((task) => (
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
