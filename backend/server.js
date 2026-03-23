const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Task manager backend started");
});



const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks",taskRoutes);

app.listen(5000,()=>{
    console.log("Server started on port 5000");
});