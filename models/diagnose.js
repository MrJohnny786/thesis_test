const mongoose = require('mongoose');

const diagnoseSchema = mongoose.Schema({ // change the name to  ανοσοθεραπεια
  courseOfTreatment: String,
  general: String,
  doc: String,
  date: { type: Date },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  alpha: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  treatments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treatment',
    },
  ],

});

module.exports = mongoose.model('Diagnose', diagnoseSchema);
