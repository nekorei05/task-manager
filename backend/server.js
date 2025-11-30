const express = require("express");
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Task manager backend started");
});

app.listen(5000,()=>{
    console.log("Server started on port 5000");
});

app.get("/hello",(req,res)=>
{
    res.send("Hi this is our second route");
})

app.get("/task",(req,res)=>{
    res.json({
        name : "Rei",
        mood : "learning",
    })
});

app.get("/intro",(req,res)=>{
    const name = req.query.name;
    res.json({
        message : `Hello I got the name ${name}`
    });
});

app.post("/send-task",(req,res)=>
{
    const task = req.body.title;
    res.json({
        received : true,
        title : task
    })
});