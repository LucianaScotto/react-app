import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

export default function TaskEdit({ tasks, updateTask }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const taskToEdit = tasks.find(t => t.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      navigate('/');
    }
  }, [id, tasks, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('El título no puede estar vacío');
      return;
    }
   
    const currentTask = tasks.find(t => t.id === id);
    updateTask({ id, title, description, completed: currentTask.completed });
    navigate('/');
  };

  return (
    <div>
      <h2>Detalles de la Tarea (Editar)</h2>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
        {error && <span style={{color: 'red'}}>{error}</span>}
       
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', border: 'none', borderRadius: '4px' }}>
            Guardar Cambios
          </button>
          <button type="button" onClick={() => navigate('/')} style={{ padding: '10px', border: 'none', borderRadius: '4px' }}>
            Cancelar
          </button>
        </div>
      </Form>
    </div>
  );
}
