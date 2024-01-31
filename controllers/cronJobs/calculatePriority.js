function calculatePriority(dueDate) {
  // Implement your logic to calculate priority based on due_date
  // Example logic: If due_date is today, set priority to 0
  // You can customize this based on your specific requirements
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeDiff = dueDate - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  // console.log(timeDiff,dueDate,today, daysDiff)

  if (daysDiff <= 0) {
    return 0;
  } else if (daysDiff <= 2) {
    return 1;
  } else if (daysDiff <= 4) {
    return 2;
  } else {
    return 3;
  }
};

module.exports = {calculatePriority};





























// const taskPrioritySchedule = async () => {
//   try {
//     // 0 - Get all tasks with due_date today
//     const todayTasks = await Task.find({
//       due_date: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) },
//     });
//     // Update priority of tasks due today to 0
//     await Task.updateMany({ _id: { $in: todayTasks.map(task => task._id) } }, { priority: 0 });



//     // 1-2 Get all tasks with due_date between tomorrow and day after tomorrow and Update priority of tasks to 1
//     const tomorrowTasks = await Task.find({
//       due_date: { $gte: new Date(new Date().setDate(new Date().getDate() + 1)), $lt: new Date(new Date().setDate(new Date().getDate() + 2)) },
//     });
//     await Task.updateMany({ _id: { $in: tomorrowTasks.map(task => task._id) } }, { priority: 1 });



//     // 3-4 Get all tasks with due_date between third day and fourth day and Update priority of tasks to 2
//     const thirdAndFourthDayTasks = await Task.find({
//       due_date: { $gte: new Date(new Date().setDate(new Date().getDate() + 3)), $lt: new Date(new Date().setDate(new Date().getDate() + 4)) },
//     });
//     await Task.updateMany({ _id: { $in: thirdAndFourthDayTasks.map(task => task._id) } }, { priority: 2 });


  
//     // 5+ Get all tasks with due_date after 5+ days and Update priority of tasks to 2
//     const fivePlusDaysTasks = await Task.find({ due_date: { $gte: new Date(new Date().setDate(new Date().getDate() + 5)) } });
//     await Task.updateMany({ _id: { $in: fivePlusDaysTasks.map(task => task._id) } }, { priority: 3 });

//     console.log('Task priorities updated based on due_date.');
//   } 
  
//   catch (error) {
//     console.error(`Error in changing task priority: ${error.message}`);
//   }
// };

// const voiceCallToUser = async () => {
//   try {
//     // Get tasks that are due and not marked as DONE
//     const overdueTasks = await Task.find({
//       due_date: { $lt: new Date() },
//       status: { $ne: 'DONE' },
//     }).sort({ priority: 1 }); // Sort by priority ascending

//     for (const task of overdueTasks) {
//       // Fetch the user associated with the task
//       const user = await User.findById(task.userId);

//       // Check if the user has a valid phone number
//       if (user && user.phone_number) {
//         // Call the user using Twilio
//         await twilioHelper.sendVoiceCall(user.phone_number, `Task overdue: ${task.title}`);
//         console.log(`Voice call sent to ${user.phone_number} for overdue task: ${task.title}`);
//         break; // Break after calling the first user
//       }
//     }

//     console.log('Voice calls made based on task priority.');
//   } 
  
//   catch (error) {
//     console.error(`Error in voice calling: ${error.message}`);
//   }
// };