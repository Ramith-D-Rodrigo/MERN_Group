const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel");

router.get("/",(req, res)=>{ //get all feedbacks
    Feedback.find({}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})


router.post("/:id",(req, res)=>{    //feedback post
    let rating = req.body.rating;
    let date = req.body.date;
    let author = req.params.id;
    let feedback = req.body.feedback;   
    let newFeedback = {rating, date, author, feedback};

    Feedback.create(newFeedback, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

module.exports = router;