const mongoose = require('mongoose');

module.exports = mongoose.model('Temp', new mongoose.Schema({
  temp: String,
}, { collection : 'temps' }));