const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'f79e6ce7',
  apiSecret: 'QD2CpN5pOBv2BlP1',
});

const from = 'Nexmo';
const to = '2348069537560';
const text = 'Hello, complete your transaction with this OTP';

nexmo.message.sendSms(from, to, text);