const Task = require("../models/taskModel");

exports.createTask = async(req,res)=>{
    const task = await Task.create(req.body);
    res.json(task);
}

exports.getTasks = async(req,res)=>{
    const tasks = await Task.find();
    res.json(tasks);
}

exports.updateTasks = async(req,res)=>{
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );

    if(!task){
        return res.status(404).json({ message : "Task not found"});
    }
    res.json(task);
};

exports.deleteTask = async(req,res)=>{
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if(!task){
        res.status(404).json({ message : "Task not found"});
    }
    res.json({ message : "Task deleted"});
};