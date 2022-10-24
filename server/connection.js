const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        //mongo db connection string
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log(`mongoDB connected Successfully : ${conn.connection.host}`);
    } catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;