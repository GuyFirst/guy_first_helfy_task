import React from 'react';

const TaskFilter = ({ filter, onFilterChange }) => {
  return (
    <div className="filters">
      <button onClick={() => onFilterChange('all')} disabled={filter === 'all'}>
        All
      </button>
      <button onClick={() => onFilterChange('completed')} disabled={filter === 'completed'}>
        Completed
      </button>
      <button onClick={() => onFilterChange('pending')} disabled={filter === 'pending'}>
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;