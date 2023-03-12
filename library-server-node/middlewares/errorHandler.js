const {successResponse, errorResponse, logError} = require('../utils/functions');
const jwt = require('jsonwebtoken');

const errorHandler = (err, req, res, next)=>{

    logError(err.message, err.stack);

    const statusCode = res.statusCode || 500
    
    return res.status(statusCode).json( errorResponse('Server Error.') );
}

module.exports = errorHandler;