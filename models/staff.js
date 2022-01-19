const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
  name: String,
  surname: String,
  role: String,
  description: String,
  information: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    timeAdded: String
  }
})

module.exports = mongoose.model('Staff', staffSchema)
