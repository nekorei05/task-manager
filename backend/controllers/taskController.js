const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../tasks.json");

let tasks = [];
try {
    const data = fs.readFileSync(filePath, "utf-8");
    tasks = data ? JSON.parse(data) : [];
} catch (err) {
    tasks = [];
}

let nextId = tasks.length > 0 
    ? Math.max(...tasks.map(t => t.id)) + 1 
    : 1;

function saveTasks() {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}


exports.getTasks = (req, res) => {
    console.log("--- Current Task List ---");
    console.table(tasks);
    res.json(tasks);
};


exports.createTask = (req, res) => {
    try {
        const { title, status } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = {
            id: nextId++,
            title,
            status: status || "pending"
        };

        tasks.push(task);
        saveTasks(); 

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateTask = (req, res) => {
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        console.log("Task not found for ID:", id);
        return res.status(404).json({ message: "Task not found" });
    }

    tasks[taskIndex].status = req.body.status || tasks[taskIndex].status;
    tasks[taskIndex].title = req.body.title || tasks[taskIndex].title;

    saveTasks(); 

    console.log("Updated Task:", tasks[taskIndex]);

    res.json(tasks[taskIndex]);
};


exports.deleteTask = (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(index, 1);
    saveTasks(); 
    res.json({ message: "Task deleted" });
};

exports.getTaskbyId = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
};