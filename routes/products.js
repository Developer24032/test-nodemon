"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const products_1 = require("../controllers/products");
router.route('/').get(products_1.getAllProducts);
router.route('/static').get(products_1.getAllProductsStatic);
exports.default = router;
