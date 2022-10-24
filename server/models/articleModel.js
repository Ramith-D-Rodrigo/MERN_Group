const mongoose = require("mongoose");


const articleSchema = mongoose.Schema({
    title : String,
    content : String,
    author : {type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    likes : [{type: mongoose.Schema.Types.ObjectId, ref: 'authors'}],
    updated : Boolean
}, {timestamps : true})

module.exports = mongoose.model("articles", articleSchema);