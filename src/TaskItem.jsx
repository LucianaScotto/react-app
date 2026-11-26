import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: ${props => props.completed ? '#e6ffe6' : '#f9f9f9'};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <Card completed={task.completed}>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none', margin: 0 }}>
        {task.title}
      </h3>
      <p style={{ margin: 0 }}>{task.description}</p>

      <ButtonGroup>
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? 'Marcar como Pendiente' : 'Completar'}
        </button>
       
        <Link to={`/tarea/${task.id}`}>
          <button>Editar</button>
        </Link>
       
        <button
          onClick={() => onDelete(task.id)}
          style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '5px 10px' }}
        >
          Eliminar
        </button>
      </ButtonGroup>
    </Card>
  );
}