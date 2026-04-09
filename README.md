# Task Manager

A minimal full-stack Task Manager built to understand backend architecture, REST APIs, and frontend–backend interaction without relying on a database.

## Features
- Add, edit, and delete tasks
- Drag & drop tasks between Pending and Completed
- Real-time UI updates using Fetch API
- Persistent storage using a local JSON file (no database)
- Clean separation of frontend and backend
- 
## Tech Stack
- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express.js
- Storage: File system (fs module with JSON file)

## API Endpoints
- **GET /tasks** – Fetch all tasks  
- **POST /tasks** – Create a task  
- **PUT /tasks/:id** – Update task  
- **DELETE /tasks/:id** – Delete task
  
## Site preview
https://nekorei05.github.io/task-manager/


## What This Project Demonstrates
- REST API design and route handling
- Full CRUD operations without a database
- Understanding of HTTP methods (GET, POST, PATCH, DELETE)
- Backend persistence using file system
- Drag-and-drop UI interaction
- Frontend–backend communication using Fetch API

## Project Structure
```text
task-manager/
├── backend/        # Express server, routes, controllers
├── frontend/       # UI and client-side logic
└── tasks.json      # File-based data persistence

