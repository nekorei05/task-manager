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
// START SERVER
// -------------------------------------

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
