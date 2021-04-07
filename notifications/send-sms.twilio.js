const account_sid = 'AC89962192bd8e064d234e4b85b210cf7e'
const auth_token = 'd023229cca190762a87ff903a8f0046a'

const client = require('twilio')(account_sid, auth_token);

client.messages.create({
  to: '+380000000',
  from: '+15037446981',
  body: 'This is the ship than made the Kessel Run in 14 parsecs?'
}).then(console.log).catch(console.log)
