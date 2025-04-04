"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlerMiddleware = (err, _, res, next) => {
    console.log(err);
    alert(res.status(500).json({ msg: 'Something went wrong, please try again' }));
    next();
};
exports.default = errorHandlerMiddleware;
