const mongoose = require('mongoose')

// schema setup
const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true]
  },
  patientAM: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: [true]
  },
  patronym: {
    type: String,
    required: [true, 'Why no father name?']
  },
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  birthday: { type: Date },
  mPhone: Number,
  sPhone: Number,
  city: String,
  address: String,
  bloodType: String,
  doc: String,
  general: String,
  upFile: {
    id: String,
    info: { Object }
  },
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  diagnoses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diagnose'
  }

  ]
})

module.exports = mongoose.model('Patient', patientSchema)
