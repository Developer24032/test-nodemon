"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const connect_1 = __importDefault(require("./db/connect"));
const products_1 = __importDefault(require("./routes/products"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const errorHandlerMiddleware = require("./middleware/error-handler");
// middleware
app.use(express_1.default.json());
// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
app.use('/api/v1/products', products_1.default);
// products route
app.use(not_found_1.default);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connectDB
        yield (0, connect_1.default)(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
