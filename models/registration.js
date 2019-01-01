//MongoDb database schema creation
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  time: {
    type: Number,
    trim: true,
  },
  tasks: {
    type: Array,
    trim: true,
  },
  attempted: {
    type: Array,
    trim: true,
  },
  taskList: {
    type: Array,
    trim: true,
  }, 
});

module.exports = mongoose.model('Registration', registrationSchema);
