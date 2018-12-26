

const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: { type: String },
  priority: { type: String },
  category: { type: String },
  due: { type: Date },
  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', taskSchema);
