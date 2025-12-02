const express = require("express");
const app = express();

let tasks = [];
app.use(express.json());

// -------------------------------------
// BASIC ROUTES
// -------------------------------------

app.get("/", (req, res) => {
    res.json({ msg: "hi" });
});

app.get("/hello", (req, res) => {
    res.json({ message: "Hello rei" });
});


// -------------------------------------
// PRACTICED CRUD ROUTES (simple array items)
// -------------------------------------

app.post("/add-item", (req, res) => {
    const n = req.body.name;
    tasks.push(n);
    res.json({ message: "success" });
});

app.get("/items", (req, res) => {
    res.json(tasks);
});

app.delete("/delete-item/:index", (req, res) => {
    const taskId = parseInt(req.params.index);

    if (taskId < 0 || taskId >= tasks.length) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(taskId, 1);
    res.json({ message: "task deleted" });
});

app.put("/update-item/:index", (req, res) => {
    const id = parseInt(req.params.index);

    if (id < 0 || id >= tasks.length) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks[id] = req.body.title;
    res.json({ message: "Title updated" });
});


// -------------------------------------
// REAL TASK MANAGER ROUTES (object-based tasks)
// -------------------------------------

app.post("/add-with-status", (req, res) => {
    const ob = {
        id: tasks.length + 1,
        title: req.body.title,
        status: req.body.status
    };

    tasks.push(ob);
    res.json({ message: "Added task" });
});

app.get("/show-task", (req, res) => {
    res.json(tasks);
});



app.get("/get-task/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const asked_task = tasks.find(t => t.id === id);
    if (!asked_task) {
        return res.status(404).json({ message: "task not found" });
    }

    res.json(asked_task);
});


app.put("/update-task/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const ob = tasks.find(t => t.id === id);
    if (!ob) {
        return res.status(404).json({ message: "task not found" });
    }

    ob.title = req.body.title;
    ob.status = req.body.status;

    res.json({ message: "task updated" });
});

app.delete("/delete-task/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "task not found" });
    }

    tasks.splice(index, 1);
    res.json({ message: "task deleted" });
});


// -------------------------------------
// START SERVER
// -------------------------------------

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
