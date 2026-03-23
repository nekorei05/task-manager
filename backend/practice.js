const express = require("express");
const app = express();

let tasks = [];
let nextId = 1; 

app.use(express.json());

// Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Add a new task (Object-based)
app.post("/tasks", (req, res) => {
    const newTask = {
        id: nextId++, 
        title: req.body.title || "Untitled Task",
        status: req.body.status || "pending"
    };

    tasks.push(newTask);
    res.json({ message: "Task added", task: newTask });
});

// Update a task (Title or Status)
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.status) task.status = req.body.status;

    res.json({ message: "Task updated", task });
});

// Toggle status (Pending - Complete)
app.patch("/tasks/toggle/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.status = (task.status === "pending") ? "complete" : "pending";
    res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(index, 1);
    res.json({ message: "Task deleted" });
});

app.get("/tasks/filter", (req, res) => {
    const status = req.query.status;
    const filtered = tasks.filter(t => t.status === status);
    res.json(filtered);
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
