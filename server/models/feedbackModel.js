const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    rating : Number,
    date : Date,
    feedback : String,
    author : {type: mongoose.Schema.Types.ObjectId, ref: 'author'},
}, {timestamps : true})

module.exports = mongoose.model("feedbacks", feedbackSchema);