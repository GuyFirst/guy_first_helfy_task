import React from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (!tasks || tasks.length === 0) {
    return <div>No tasks available</div>;
  }

  // the carousel only animates when there are 3 or more tasks.
  // with 1 or 2 tasks the loop would show the same task next to itself,
  // so we skip the duplication and show them without animation
  const canScroll = tasks.length >= 3;
  const infiniteTasks = canScroll ? [...tasks, ...tasks] : tasks;

  return (
    <div className="carousel-container">
      <div className={canScroll ? 'carousel-track' : 'carousel-track static'}>
        {infiniteTasks.map((task, index) => (
          <div key={`${task.id}-${index}`} className="carousel-item">
            <TaskItem
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;