const SubTask = require('../models/subtasks');

const getAllSubTasks = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      // Fetch all subtasks for the specified task
      const subtasks = await SubTask.find({ task_id: taskId });
  
      // Return the subtasks
      res.json(subtasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createNewSubTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status, subtask_name } = req.body;
  
      // Create a new subtask
      const newSubTask = new SubTask({
        task_id: taskId,
        subtask_name,
        status,
      });
  
      // Save the subtask to the database
      const savedSubTask = await newSubTask.save();
  
      // Return the created subtask
      res.status(201).json(savedSubTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateSubTask = async (req, res) => {
    try {
      const { taskId, subtaskId } = req.params;
      const { status } = req.body;
  
      // Update subtask based on provided data
      const updatedSubTask = await SubTask.findByIdAndUpdate(
        subtaskId,
        { status },
        { new: true }
      );
  
      // Return the updated subtask
      res.json(updatedSubTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteSubTask = async (req, res) => {
    try {
      const { taskId, subtaskId } = req.params;
  
      // Soft delete subtask by setting deleted_at timestamp
      const deletedSubTask = await SubTask.findByIdAndUpdate(
        subtaskId,
        { deleted_at: Date.now() },
        { new: true }
      );
  
      // Return the deleted subtask
      res.json(deletedSubTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {getAllSubTasks, createNewSubTask, updateSubTask, deleteSubTask};
