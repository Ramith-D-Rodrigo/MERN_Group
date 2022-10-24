const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const articleRoute = require("./routes/article");
const authorRoute = require("./routes/author");
const imageRoute = require("./routes/image");
const feedbackRoute = require("./routes/feedback");

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

//Routing
app.use("/articles", articleRoute);
app.use("/authors", authorRoute);
app.use("/images", imageRoute);
app.use("/feedbacks", feedbackRoute);

mongoose.connect(process.env.MONGODB_URI, (err, res)=>{
    if(err){
        console.log("Error connecting to MongoDB");
        process.exit(1);
    }
    else{
        console.log("Successfully connected to MongoDB");
    }
});

app.listen(process.env.PORT, ()=>{
    console.log("Server started");
})

app.get("/", (req, res)=>{
    res.send("Hello");
})