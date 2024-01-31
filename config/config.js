// access data from .env file
//to more structure the code and improve code quality
//I always use this format
require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'Rakshath',
  DATABASE_URI: process.env.DATABASE_URI || 'mongodb://localhost:27017/TaskFlow',
  twilio: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || 'your-twilio-account-sid',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || 'your-twilio-auth-token',
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || 'your-twilio-phone-number',
  },
};
