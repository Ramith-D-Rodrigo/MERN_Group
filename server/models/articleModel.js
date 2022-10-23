const mongoose = require("mongoose");


const articleSchema = mongoose.Schema({
    title : String,
    content : String,
    author : {type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
    comments : {type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
    likes : [{type: mongoose.Schema.Types.ObjectId, ref: 'authors'}],
}, {timestamps : true})

module.exports = mongoose.model("articles", articleSchema);