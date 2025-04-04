"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundMiddleware = (req, res) => {
    res.status(404).send("Sorry, this route does not exist");
};
exports.default = notFoundMiddleware;
