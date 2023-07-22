"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
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
app.post("/users", (req, res) => {
    const { id, name, email, password } = req.body;
    const message = (0, database_1.createUser)(id, name, email, password);
    res.status(201).send(message);
});
app.post("/products", (req, res) => {
    const { id, name, price, description, imageUrl } = req.body;
    const message = (0, database_1.createProduct)(id, name, price, description, imageUrl);
    res.status(201).send(message);
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const message = (0, database_1.deleteUser)(id);
    res.status(200).send(message);
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const message = (0, database_1.deleteProduct)(id);
    res.status(200).send(message);
});
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const { name, price, description, imageUrl } = req.body;
    const message = (0, database_1.editProduct)(id, name, price, description, imageUrl);
    res.status(200).send(message);
});
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
