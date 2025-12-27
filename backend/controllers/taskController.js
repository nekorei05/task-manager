const Task = require("../models/taskModel");

exports.createTask = async(req,res)=>{
    try{
        const {title,status} = req.body;

        if(!title){
            return res.status(404).json({ message : "Title is required"});
        }
    
    const task = await Task.create({ title, status});
    res.status(201).json(task);
} catch (err){
    res.status(500).json({ message : "Server error"});
}
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
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
        res.status(404).json({ message : "Task not found"});
    }
    res.json({ message : "Task deleted"});
};

exports.getTaskbyId = async(req, res)=>{
    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({ message : "Task not found"});
    }
    res.json(task);
}