const mongoose = require('mongoose');

module.exports = mongoose.model('Light', new mongoose.Schema({
  id: String,
  idNum: String,
  building: String,
  room: String,
  watt: String,
  voltage: String,
  lum: String,
}, { collection : 'lights' }));