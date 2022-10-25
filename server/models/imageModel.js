const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    title: String,
    Date: Date,
    likes : [{type: mongoose.Schema.Types.ObjectId, ref: 'authors'}],
    author : {type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
    file: {
        data: Buffer,
        contentType: String
    }
}, {timestamps : true})

module.exports = mongoose.model("images", imageSchema);