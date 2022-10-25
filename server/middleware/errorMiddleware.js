//functions that execute during the req res cycle.
const errorHandler = (err , req , res , next) => {
    const statusCode = res.statusCode? res.statusCode : 500;

    res.status(statusCode);

    res.json({
        message:err.message,
        stack: process.env.NODE_ENV == 'production' ? err.stack : null
    })
}

module.exports  = {
    errorHandler,
}
