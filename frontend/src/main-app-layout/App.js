import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');  

  useEffect(() => {
  fetch('http://localhost:4000/api/tasks')
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => setTasks(data))
    .catch(() => setError('Could not connect to the server'))
    .finally(() => setLoading(false));
}, []);

  const handleSave = (task) => {
  if (editingTask) {
    fetch(`http://localhost:4000/api/tasks/${editingTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(updated => {
        setTasks(tasks.map(t => t.id === updated.id ? updated : t));
        setEditingTask(null);
        setError('');
      })
      .catch(() => setError('Could not update the task'));
  } else {
    fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(created => {
        setTasks([...tasks, created]);
        setError('');
      })
      .catch(() => setError('Could not create the task'));
  }
};

  const handleDelete = (id) => {
  fetch(`http://localhost:4000/api/tasks/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error();
      setTasks(tasks.filter(t => t.id !== id));
      setError('');
    })
    .catch(() => setError('Could not delete the task'));
};

 const handleToggle = (id) => {
  fetch(`http://localhost:4000/api/tasks/${id}/toggle`, { method: 'PATCH' })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(updated => {
      setTasks(tasks.map(t => t.id === id ? updated : t));
      setError('');
    })
    .catch(() => setError('Could not update the task'));
};


  const filteredTasks = tasks.filter(task => {
    const text = search.toLowerCase();
    const found = task.title.toLowerCase().includes(text) ||
                  task.description.toLowerCase().includes(text);

    if (!found) return false;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
});

  return (
  <div>
    <h1>Task Manager</h1>

    {error && <p className="error">{error}</p>}

    <TaskForm editingTask={editingTask} onSave={handleSave} />

    <input
      className="search"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <TaskFilter filter={filter} onFilterChange={setFilter} />

    {loading ? (
      <p className="loading">Loading tasks...</p>
    ) : (
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={setEditingTask}
      />
    )}
  </div>
);
}

export default App;