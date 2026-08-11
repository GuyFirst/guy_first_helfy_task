import React from 'react';
import '../styles/TaskItem.css';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`}>      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>      
      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark Pending' : 'Mark Completed'}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;