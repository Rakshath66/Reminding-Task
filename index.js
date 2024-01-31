// app.js
//5PMF7QWLHFTUJR4UQE86FJ5W
//rec code
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/config');
const cookieParser = require('cookie-parser')

const app = express();

// Database connection
mongoose.connect(config.DATABASE_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error(`Error connecting to MongoDB: ${error.message}`);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); //for cookie

//ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const indexRoute = require('./routes/index');
const tasksRoute = require('./routes/tasks');
const authRoute = require('./routes/user');
const {authenticateUser} = require('./middlewares/auth');//use in task/ index
app.use(authenticateUser("token"));

// Serve static files (e.g., styles)
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRoute);
app.use('/user', authRoute);
app.use('/tasks', tasksRoute);

const schedule = require('node-schedule');
//cronJobs
const {taskPrioritySchedule} = require('./controllers/cronJobs/taskPrioritySchedule');
const {voiceCallToUser}  = require('./controllers/cronJobs/voiceCallToUser');

//                                  Schedule Cron Jobs, 
//                     schedule call each hour (after 59 minutes)
schedule.scheduleJob('*/59 * * * *', taskPrioritySchedule);   // Cron job for changing task priority based on due_date
schedule.scheduleJob('*/59 * * * *', voiceCallToUser);        // Cron job for voice calling using Twilio if a task passes its due_date


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
