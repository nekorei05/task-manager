const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Task manager backend started");
});



mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch((err)=> console.log("DB error : ",err));

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks",taskRoutes);

app.listen(5000,()=>{
    console.log("Server started on port 5000");
});