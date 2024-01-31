const Task = require('../models/tasks');
const SubTask = require('../models/subtasks');
const {calculatePriority}=require('./cronJobs/calculatePriority');

const getAllTasksWithFilter = async (req, res) => {
    try {
      const { priority, dueDate, page } = req.body;

      // Construct filter conditions based on user-specified filters
      const filters = {};
      if (priority) filters.priority = parseInt(priority);
      if (dueDate) filters.due_date = { $gte: new Date(dueDate) };

      // Implement logic to fetch tasks based on filters and pagination
      const pageSize = 10;
      const skip = (page - 1) * pageSize;

      const filteredTasks = await Task.find(filters)
        .limit(pageSize)
        .skip(skip)
        .sort({ due_date: 1 }); // Optionally, you can sort tasks by due_date

  
      // Render the EJS view and pass the filtered tasks data
      res.render('task-list', { title: 'Task List', tasks: filteredTasks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createNewTask = async (req, res) => {
    try {
      const { title, description, due_date } = req.body;
      const userId=req.user._id;
      // console.log(req.user._id);
      
      const newTask = new Task({
        userId:userId,
        title,
        description,
        due_date: new Date(due_date),
        priority: calculatePriority(new Date(due_date)),
        userId,
      });
  
      // Save the task to the database
      const savedTask = await newTask.save();
  
      // Return the created task
      res.status(201).json(savedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { due_date, status } = req.body;

        // Update task based on provided data
        const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { due_date, status, priority: calculatePriority(new Date(due_date)) },
        { new: true }
        );

        // Update corresponding subtasks if needed
        if (status === 'DONE') {
        await SubTask.updateMany({ task_id: taskId }, { status: 1 });
        }

        // Return the updated task
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      // Soft delete task by setting deleted_at timestamp
      const deletedTask = await Task.findByIdAndUpdate(
        taskId,
        { deleted_at: Date.now() },
        { new: true }
      );
      //  const deletedTask = await Task.deleteOne({ _id: taskId }); -> permanent Deletion
  
      // Soft delete corresponding subtasks if needed
      await SubTask.updateMany({ task_id: taskId }, { deleted_at: Date.now() });
  
      // Return the deleted task
      res.json(deletedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {getAllTasksWithFilter, createNewTask, updateTask, deleteTask};
