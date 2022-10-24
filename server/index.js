const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const articleRoute = require("./routes/article");
const authorRoute = require("./routes/author");
const imageRoute = require("./routes/image");
const feedbackRoute = require("./routes/feedback");
const connectDB = require("./connection");

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

//Routing
app.use("/articles", articleRoute);
app.use("/authors", authorRoute);
app.use("/images", imageRoute);
app.use("/feedbacks", feedbackRoute);

//connect to mongoDB
connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT ${process.env.PORT} \nGo to http://localhost:3005/`);
})

app.get("/", (req, res)=>{
    res.send("Hello");
    // res.redirect("http://localhost:3000/")
})