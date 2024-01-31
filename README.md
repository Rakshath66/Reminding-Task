# TaskFlow

## Overview

This repository contains the implementation of a task management application with background tasks handled by cron jobs and integration with Twilio for voice calling. Users can create tasks, update due dates, receive voice call reminders, and perform various interactions with the task management application.

## Models

### User Model

The User model represents individuals using the application. It includes an identifier (id), phone number (phone_number), and a priority level (priority) with supporting options is used for determining the order of voice calling in the Twilio cron job.
The User model represents individuals using the application. It includes the following fields:

- `id`: Identifier
- `phone_number`: Phone number
- `priority`: Priority level for voice calling order

### Task Model

The Task model represents a primary task to be completed, containing a title, description, due date, priority, and status. Each task can have multiple SubTasks, represented by the SubTask model. SubTasks are associated with a Task through the task_id reference. SubTasks have a status indicating whether they are incomplete (0) or complete (1).
The Task model represents a primary task to be completed, with fields:

- `title`: Task title
- `description`: Task description
- `due_date`: Due date
- `priority`: Priority based on due date
- `status`: Task status (TODO, IN_PROGRESS, DONE)
- `userId`: Reference to the User model

### SubTask Model

SubTasks are associated with a Task through the `task_id` reference. They have a `status` indicating whether they are incomplete (0) or complete (1).

## Cron Jobs

Two cron jobs are implemented for background tasks:

1. **Changing Priority of Task based on Due Date:**
   - Evaluates due dates of tasks and updates their priority.
   - Scheduled intervals: Daily

2. **Voice Calling using Twilio:**
   - Initiates voice calls for overdue tasks based on user priority.
   - Scheduled intervals: Every hour

## APIs

### Create Task API

Input: Title, description, due_date, and JWT auth token.
Functionality: Validates input, authenticates the user, and creates a new task with default status "TODO."

### Create Sub Task API

Input: Task_id.
Functionality: Validates input and creates a new subtask associated with the specified task_id.

### Get All User Tasks API

Filters: Priority, due date, pagination.
Functionality: Authenticates the user, fetches all tasks, and allows filtering by priority, due date, and pagination.

### Get All User Sub Tasks API

Filters: Task_id.
Functionality: Authenticates the user, fetches all subtasks, and allows filtering by task_id if provided.

### Update Task API

Input: Due_date, status ("TODO" or "DONE").
Functionality: Validates input, updates the specified task, and handles subtask updates accordingly.

### Update Sub Task API

Input: Status (0 or 1).
Functionality: Validates input and updates the specified subtask.

### Delete Task API

Functionality: Soft deletes the specified task and updates associated subtasks.

### Delete Sub Task API

Functionality: Soft deletes the specified subtask.

## Instructions for Implementation

1. Use Node.js to implement the server and Express.js for handling API routes.
2. Set up a database (e.g., MongoDB) to store user, task, and subtask data.
3. Implement JWT authentication for securing API endpoints.
4. Utilize a job scheduler library (e.g., node-schedule) for cron jobs.
5. Integrate Twilio for voice calling in the Twilio cron job.
6. Implement proper error handling and validation for user-friendly responses.
7. Test APIs using Postman to demonstrate functionality.

## Twilio Overview

Twilio is a cloud communications platform that enables developers to integrate various communication functionalities into their applications, such as SMS, voice calls, and video calls.

## User Task Creation in Detail

1. A user creates a new task via the "Create Task" API, providing a title, description, due date, and authentication token.
2. The server validates the input, authenticates the user using the JWT token, and creates a new task in the database with a default status of "TODO."

# Indetail description
A user creates a new task via the "Create Task" API, providing a title, description, due date, and authentication token.
The server validates the input, authenticates the user using the JWT token, and creates a new task in the database with a default status of "TODO."
Task Due Date Update:

The user decides to update the due date of a task via the "Update Task" API, providing the new due date and authentication token.
The server validates the input, authenticates the user, updates the task's due date in the database, and triggers the cron job for changing task priority.
Changing Task Priority (Cron Job):

The cron job runs based on the scheduled intervals, evaluating the due dates of tasks.
For each task, it calculates the priority based on due date categories (0, 1, 2, 3) and updates the task's priority in the database.
Voice Calling using Twilio (Cron Job):

Another cron job runs to initiate voice calls using Twilio for tasks that have passed their due date.
The job prioritizes users based on their user priority levels.
Twilio is utilized to make voice calls to users in sequence, starting with priority 0, then 1, and finally 2.
If a user with higher priority does not answer, the next user in line is called.
User Interaction with Voice Call:

The user receives a phone call from Twilio as a reminder for the overdue task.
If the user answers the call, they might receive a pre-recorded message reminding them of the task.
The user can acknowledge the call or perform any required actions based on the reminder.
Updating Task Status:

The user decides to update the status of a task via the "Update Task" API, providing the new status (e.g., "DONE") and authentication token.
The server validates the input, authenticates the user, updates the task's status in the database, and triggers any necessary updates for associated subtasks.
User Task Deletion:

The user requests to delete a task via the "Delete Task" API.
The server performs a soft deletion, updating the task's status and setting the "deleted_at" timestamp. It also updates associated subtasks accordingly.
User Subtask Creation and Update:

Users create subtasks via the "Create Subtask" API, providing the task_id.
Subtasks can be updated with the "Update Subtask" API, changing their status between incomplete (0) and complete (1).
This story illustrates how users interact with the application through various APIs, triggering updates, reminders, and interactions with Twilio for voice calls as part of the scheduled cron jobs. The server acts as the central controller, managing data in the database, handling user requests, and orchestrating background tasks.

## How to Use

1. Clone the repository:

```bash
git clone https://github.com/Rakshath66/TaskFlow/
```

2. Install dependencies:
   ```bash
   npm install express body-parser jsonwebtoken mongoose node-schedule twilio ejs
   ```

3. Create a Twilio account, set up environment variables in the .env file:
   ```bash
    PORT=3000
    DATABASE_URI=your-mongodb-uri
    JWT_SECRET=your-secret
    TWILIO_ACCOUNT_SID=your-twilio-account-sid
    TWILIO_AUTH_TOKEN=your-twilio-auth-token
    TWILIO_PHONE_NUMBER=your-twilio-phone-number
   ```

4. Run the application:
   ```bash
    npm start
   ```

5. Access the application at http://localhost:3000
   
Make sure to adjust any paths or additional information according to your specific implementation.

Thank You.
   

