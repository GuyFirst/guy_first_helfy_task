const express = require('express');
// these paths are relative to where the router is mounted in server.js.
// server.js mounts it on '/api/tasks', so '/' here means /api/tasks
// and '/:id' means /api/tasks/:id
const router = express.Router();


// In-memory database
let tasks = [];
let nextTaskId = 1;

// API 1: Get all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// API 2: Create a New Task
router.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;

    if(!title){
        return res.status(400).json({ error: "A title for the task is required to create a task" });
    }
    if(priority !== 'low' && priority !== 'medium' && priority !== 'high') {
        return res.status(400).json({ error: "Priority must be low, medium, or high" });
    }
    if (!description){
        return res.status(400).json({error: "A description for the task is required to create a task"})
    }

    const newTask = {
        id: nextTaskId++,
        title: title,
        description: description,
        completed: false,
        createdAt: new Date(),
        priority: priority
    }

    tasks.push(newTask);
    res.status(201).json(newTask)
});

// API 3: Update a Task
router.put('/:id', (req, res) => {
    const taskToUpdate = tasks.find(task => task.id === parseInt(req.params.id));
    
    if (!taskToUpdate) {
        return res.status(404).json({ error: "Task not found in the system" });
    }

    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;

    // check the new priority before changing anything, so a bad value
    // does not leave the task half updated
    if (priority){
        if(priority !== 'low' && priority !== 'medium' && priority !== 'high') {
            return res.status(400).json({ error: "Priority must be low, medium, or high" });
        }
    }

    if(title){
        taskToUpdate.title = title;
    }
    if (description) {
        taskToUpdate.description = description;
    }
    if (priority) {
        taskToUpdate.priority = priority;
    }
    
    res.status(200).json(taskToUpdate)
});

// API 4: Delete a task
router.delete('/:id', (req, res) => {
    const taskToDelete =  tasks.find(task => task.id === parseInt(req.params.id));
    
    if (!taskToDelete) {
        return res.status(404).json({ error: "Task not found in the system" });
    }
    
    const taskIndex = tasks.indexOf(taskToDelete);
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: `task '${taskToDelete.title}' deleted successfully.` });
});

// API 5: Toggle task completion status
router.patch('/:id/toggle', (req, res) => {
    const taskToToggle =  tasks.find(task => task.id === parseInt(req.params.id));

    if (!taskToToggle) {
        return res.status(404).json({ error: "Task not found in the system" });
    }

    taskToToggle.completed = !taskToToggle.completed;

    res.status(200).json(taskToToggle);
});

module.exports = router;