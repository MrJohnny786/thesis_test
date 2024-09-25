const mongoose = require('mongoose');

const treatmentSchema = mongoose.Schema({
  date: { type: Date },
  mg: Number,
  numOfDose: String,
  numOfApproval: String,
  staff: String,
  status: String,
  observation: String,
  createdAt: { type: Date, default: Date.now },
  // responsible: {
  //     id: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "Staff"
  //     },
  //     surname: String
  // },
  beta: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  effects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Effect',
  }],

});

module.exports = mongoose.model('Treatment', treatmentSchema);
