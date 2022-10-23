const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const articleRoute = require("./routes/article");
const authorRoute = require("./routes/author");
const imageRoute = require("./routes/image");

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

//Routing
app.use("/article", articleRoute);
app.use("/author", authorRoute);
app.use("/images", imageRoute);

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