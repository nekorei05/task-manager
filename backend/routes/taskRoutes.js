const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/",taskController.createTask);
router.get("/",taskController.getTasks);
router.patch("/:id",taskController.updateTasks);
router.delete("/:id",taskController.deleteTask);
router.get("/:id",taskController.getTaskbyId);


module.exports = router;
