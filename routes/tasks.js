const express = require('express');
const router = express.Router();
const {notFound, errorHandler} = require('../controllers/errorHandle');

//Controllers -> tasks and substasks import
const {getAllTasksWithFilter, createNewTask, updateTask, deleteTask} = require('../controllers/tasks');
const {getAllSubTasks, createNewSubTask, updateSubTask, deleteSubTask} = require('../controllers/subtasks');
//Middlewares import
const {authenticateUser} = require('../middlewares/auth');//use in task/ index


//                                 1. Tasks
router.get('/', getAllTasksWithFilter); // Get all tasks with filters
router.post('/', createNewTask);        // Create a new task
router.put('/:taskId', updateTask);     // Update a task
router.delete('/:taskId', deleteTask);  // Delete a task (soft deletion)


//                                 2. Sub Tasks
router.post('/:taskId/subtasks', createNewSubTask);           // Create a new subtask
router.get('/:taskId/subtasks', getAllSubTasks);              // Get all subtasks for a task
router.put('/:taskId/subtasks/:subtaskId', updateSubTask);    // Update a subtask
router.delete('/:taskId/subtasks/:subtaskId', deleteSubTask); // Delete a subtask (soft deletion)


//                                 4. Error Handling
router.use(notFound);      // Handle 404 - Not Found
router.use(errorHandler);  // Use error handler middleware

module.exports = router;

