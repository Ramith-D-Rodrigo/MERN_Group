const express = require("express");
const router = express.Router();
const Author = require("../models/authorModel");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const {check} = require("../middleware/authmiddleware");

const saltRounds = 10;


router.get("/:id",(req, res)=>{ //get certain author
    Author.find({_id:req.params.id}, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

//Instead of above end point route --> uncomment
//@access : private
// router.get("/",check ,asyncHandler( async (req, res)=>{ //get certain author
//     const {_id , name , email } = await Author.findById(req.user.id);

//     res.status(200).json({
//         id:_id,
//         name,
//         email,
//     })

// }));


router.post("/auth",async (req, res)=>{    //author authentication
    const a = await Author.findOne({ email : req.body.email });
    if(a){
        const validPassword = await bcrypt.compare(req.body.password, a.password);
        if(validPassword){
            const author = {
                id: a._id,
                email: a.email,
                name: a.name
            };
            res.json({status : 200, token : jwt.sign(author, process.env.TOKEN_SECRET)});
        }
        else{
            res.json({status: 400, msg: "Invalid login credentials", data: null});
        }
    }
    else{
        res.json({status: 400, msg: "User was not found", data: null});
    }
})


//returns a token for registered user which can use in frontend to authenticate Authers
router.post("/register", asyncHandler( async (req, res)=> {    //Author Register
    let email = req.body.email;
    let name = req.body.name;
    let plainpassword = req.body.password;

    if(!email || !name || !plainpassword){
        res.status(400);
        throw new Error("Please add all fields");
    }

    const result = await Author.findOne({email});
    //check if auther already exists
    if(result){
        res.status(400);
        throw new Error("Account already exists");
    }
    else{       //hash the password
        const password = await bcrypt.hash(plainpassword, saltRounds);

        let newAuthorObject = {email, name, password};
    
        const newAuther = await Author.create(newAuthorObject);
        
        if(newAuther){
            res.status(201).json({
                _id:newAuther.id,
                name:newAuther.name,
                email:newAuther.email,
                token:generateToken(newAuther._id),
            });
        }else{
            res.status(400);
            throw new Error('Invalid Auther data');
        }
    }
}));

//returns a token for registered user which can use in frontend to authenticate Authers
router.post('/login' , asyncHandler( async (req , res) =>{
    const {email, password} = req.body;

    const newAuther = await newAuther.findOne({email});

    if(newAuther && (await bcrypt.compare(password , newAuther.password))){
        res.status(200).json({
            _id:newAuther.id,
            name:newAuther.name,
            email:newAuther.email,
            token:generateToken(newAuther._id),
        })
    }else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
}));

//generate jwt --> used in above routes /register and login to generate token for registered or logged user.(expires in 30 days after generate)
const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn: '30d',
    });
}

module.exports = router;