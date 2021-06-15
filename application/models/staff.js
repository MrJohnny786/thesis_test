var mongoose = require('mongoose');

var staffSchema = new mongoose.Schema({
    name: String,
    surname: String,
    role: String,
    description: String,
});

module.exports = mongoose.model("Staff", staffSchema);