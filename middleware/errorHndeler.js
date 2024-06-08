const {constants}=require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"VALIDATION_ERROR",
                message:err.stack,
                stackTrace:err.stack,
            });
            break;
            case constants.NOT_FOUND:
                res.json({
                    title:"NOT_FOUND",
                    message:err.stack,
                    stackTrace:err.stack,
                });
                break;

                case constants.UNAUTHORZED:
                    res.json({
                        title:"UNAUTHORZED",
                        message:err.stack,
                        stackTrace:err.stack,
                    });
                
                break;
                case constants.FORBIDEN:
                    res.json({
                        title:"FORBIDEN",
                        message:err.stack,
                        stackTrace:err.stack,
                    });
                    break;
                    case constants.SERVER_ERROR:
                        res.json({
                            title:"SERVER_ERROR",
                            message:err.stack,
                            stackTrace:err.stack,
                        });
                    
                default:
       

    }
    res.status(statusCode).json({ title: "Not Found", message: err.message, stackTrace: err.stack });
    res.status(statusCode).json({ title: "Validation field", message: err.message, stackTrace: err.stack });
    res.status(statusCode).json({ title: "Not Found", message: err.message, stackTrace: err.stack });
    res.status(statusCode).json({ title: "Not Found", message: err.message, stackTrace: err.stack });

};

module.exports = errorHandler;