# Task Manager

A simple task manager app. React on the frontend, Express on the backend.
Tasks are stored in memory on the server, so they are lost when it restarts.

## Backend Setup

1. cd backend
2. npm install
3. npm start

The server runs on http://localhost:4000

## Frontend Setup

1. cd frontend
2. npm install
3. npm start

The app runs on http://localhost:3000
Start the backend first, otherwise you will get a connection error.

## API

All endpoints start with /api/tasks

- GET /api/tasks - returns all the tasks
- POST /api/tasks - creates a task. body: { title, description, priority }
- PUT /api/tasks/:id - updates a task. body can contain title, description or priority
- DELETE /api/tasks/:id - deletes a task
- PATCH /api/tasks/:id/toggle - switches completed between true and false

A task looks like this:

    {
      id: number,
      title: string,
      description: string,
      completed: boolean,
      createdAt: Date,
      priority: 'low' | 'medium' | 'high'
    }

Status codes I used:

- 200 - ok
- 201 - task was created
- 400 - missing or invalid input
- 404 - task id was not found
- 500 - server error

## Features

- Add a task with title, description and priority
- Edit a task. The same form is used for adding and editing
- Delete a task, with a confirmation before it happens
- Mark a task as completed or back to pending
- Filter by All / Completed / Pending
- Search by title or description
- Priority is shown as a background color on the card
- Tasks are displayed in an endless carousel

## Components

- App - holds all the data and talks to the server
- TaskForm - the form for adding and editing
- TaskFilter - the three filter buttons
- TaskList - the carousel
- TaskItem - a single task card with its buttons

## Design decisions

- Tasks are kept in a normal array in memory. The assignment said no database
  is needed.
- The router is mounted on /api/tasks in server.js, so the paths inside
  taskRoutes.js are relative ('/' and '/:id') and the prefix is only written
  once.
- The carousel is a CSS animation only, no libraries. The list is rendered
  twice and the track moves by -50%, so when the animation restarts the second
  copy is exactly where the first one was. That is what makes it look endless.
- The track needs width: max-content, otherwise the -50% is calculated from the
  container width instead of the real width of all the cards.
- The carousel only animates when there are 3 or more tasks. With less than
  that the loop would show the same task next to itself, so they are shown
  statically instead.
- The animation pauses on hover so the buttons can be clicked.
- All the data lives in App. The other components get what they need through
  props and report back with functions, so there is only one place where the
  state changes.
- Filtering and searching happen in App. TaskList only displays the list it
  gets and does not know that filtering exists.
- PUT only updates the fields that were sent, so it can be used for small
  edits without sending the whole task.
- Validation is done in the form and again on the server, because the form can
  be skipped with Postman.
- Every request has error handling. If the server is down or answers with an
  error status, a message is shown instead of failing silently.

## Time spent

- Backend: ~ 110 minutes
- Frontend: ~120 minutes
- Styling: ~35 minutes
- Testing and fixing: while doing the rest so i'd say about ~15 minutes in the end to handle end to end testing