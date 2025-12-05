const Task = require("../models/taskModel");

exports.createTask = async(req,res)=>{
    const task = await Task.create(req.body);
    res.json(task);
}

exports.getTasks = async(req,res)=>{
    const tasks = await Task.find();
    res.json(tasks);
}