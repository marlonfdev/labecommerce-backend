"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 3000;
app.get("/users", (req, res) => {
    const users = (0, database_1.getAllUsers)();
    res.status(200).json(users);
});
app.get("/products", (req, res) => {
    const name = req.query.name;
    if (name) {
        const filteredProducts = (0, database_1.searchProductsByName)(name);
        res.status(200).json(filteredProducts);
    }
    else {
        const products = (0, database_1.getAllProducts)();
        res.status(200).json(products);
    }
});
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
