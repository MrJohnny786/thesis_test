var mongoose = require("mongoose");

var calendarSchema = mongoose.Schema({
    event_name:String,
    start_time:String,
    end_time:String,
    choice1_am_pm:String,
    choice2_am_pm:String,
    date: { type: Date },
    //createdAt:{type:Date, default:Date.now},
    alpha: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    }
    
});


module.exports = mongoose.model("Calendar", calendarSchema);
