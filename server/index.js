const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const articleRoute = require("./routes/article");
const authorRoute = require("./routes/author");
const imageRoute = require("./routes/image");
const feedbackRoute = require("./routes/feedback");
const commentRoute = require("./routes/comment");
const connectDB = require("./connection");
const {errorHandler} = require("./middleware/errorMiddleware");

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

//Routing
app.use("/articles", articleRoute);
app.use("/authors", authorRoute);
app.use("/images", imageRoute);
app.use("/feedbacks", feedbackRoute);
app.use("/comments", commentRoute);
app.use(errorHandler);  //override the default express error handler

//connect to mongoDB
connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT ${process.env.PORT} \nGo to http://localhost:3005/`);
})

app.get("/", (req, res)=>{
    res.send("Hello");
    // res.redirect("http://localhost:3000/")
})