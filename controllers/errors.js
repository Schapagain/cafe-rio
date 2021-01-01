class ValidationError extends Error {
    constructor(field,message){
        super(`Invalid ${field} : ${message}`);
        this.message = message? `Invalid ${field} : ${message}`: `Invalid ${field}` ;
        this.field = field;
        this.name = this.constructor.name;
        this.httpCode = 400;
    }
}

class NotAuthorizedError extends Error {
    constructor(message){
        super(message? 'Not Authorized: '+message : 'Not Authorized');
        this.name = this.constructor.name;
        this.httpCode = 401;
    }
}

class NotUniqueError extends Error {
    constructor(field){
        super(`${field} already exists`);
        this.name = this.constructor.name;
        this.httpCode = 409;
    }
}

class NotFoundError extends Error {
    constructor(resource){
        super(`${resource} not found`);
        this.resource = resource;
        this.name = this.constructor.name;
        this.httpCode = 404;
    }
}

class ServerError extends Error {
    constructor(message){
        super(message? message:"Oops something's wrong with the server. We're working on a fix. ");
        this.name = this.constructor.name;
        this.httpCode = 500;
    }
}

async function getError(err){
    console.log(err)
    if (err){
        let firstError = {properties:{}};
        let errorName = err.name;
        if (err.errors) {
            firstError = err.errors[Object.keys(err.errors)[0]];
            errorName = firstError.name
        }
        switch (errorName) {
            case 'ValidationError':
                return err;
            case 'NotFoundError':
                return err;
            case 'NotAuthorizedError':
                return err;
            case 'ValidatorError':
                return new ValidationError(firstError.properties.path, firstError.properties.message);
            case 'MongoError':
                return new NotUniqueError(err.keyValue[Object.keys(err.keyValue)[0]]);
            case 'SequelizeDatabaseError':
                return new ValidationError('field',err.message) 
            case 'JwtParseError':
                return new NotAuthorizedError('Invalid token')
            default:
                return new ServerError();
        }
    }
    return new ServerError();
}

module.exports = {
    ValidationError,
    NotFoundError,
    NotAuthorizedError,
    NotUniqueError,
    getError
}