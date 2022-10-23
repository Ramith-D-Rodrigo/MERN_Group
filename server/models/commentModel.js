const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    comment : String,
    date : Date,
    commenter : {type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
    article : {type: mongoose.Schema.Types.ObjectId, ref: 'article'},
}, {timestamps : true})

module.exports = mongoose.model("comments", commentSchema);