const mongoose = require('mongoose');


const authorSchema = mongoose.Schema({
    email : String,
    name : String,
    password : String,
}, {timestamps : true})

module.exports = mongoose.model("authors", authorSchema);