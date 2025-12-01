const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];
app.get("/",(req,res)=>{
    res.send("Task manager backend started");
});

app.listen(5000,()=>{
    console.log("Server started on port 5000");
});


app.post("/send-task",(req,res)=>
{
    const task = req.body.title;
    res.json({
        received : true,
        title : task
    })
});

// read 
app.get("/tasks",(req,res)=>
{
    res.json(tasks);
});

// create 
app.post("/tasks",(req,res)=>{
    const new_task = {
        id : tasks.length + 1,
        title : req.body.title
    }

tasks.push(new_task);
res.json({
    message : "Task added",
    task : new_task
});
});

//update
app.put("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const task = tasks.find(t => t.id === taskId)

    if(!task){
        return res.status(404).json({ message : "Task not found"});
    }

    task.title = newTitle;
    res.json({
        message : "task updated",
        task : task 
    });
    
});

//delete
app.delete("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id);

    const ti = tasks.findIndex(t => t.id === taskId);

    if(taskId === -1){
        res.status(404).json({ message : "Task not found"});

    }

    tasks.splice(taskId,1);

    res.json({ 
        message : "Task deleted"
    });

});
