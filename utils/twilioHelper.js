// utils/twilioHelper.js
const config = require('../config/config');
const accountSid=config.twilio.TWILIO_ACCOUNT_SID;
const authToken=config.twilio.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendVoiceCall = async (to, message) => {
  try {
    // console.log(to);
    await client.calls
    .create({
       url: 'http://demo.twilio.com/docs/voice.xml',
       to: to,
       from: config.twilio.TWILIO_PHONE_NUMBER,
       twiml: `<Response><Say>${message}</Say></Response>`,
     })
    .then(call => console.log(call.sid));
    
    console.log(`Voice call sent to ${to}`);
  } catch (error) {
    console.error(`Error sending voice call to ${to}: ${error.message}`);
  }
};

module.exports = {
  sendVoiceCall,
};
