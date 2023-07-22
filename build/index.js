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
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("knex"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configuração do banco de dados usando o Knex
const database = (0, knex_1.default)({
    client: "sqlite3",
    connection: {
        filename: "./database.db",
    },
    useNullAsDefault: true,
});
// Endpoint GET /users
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield database("users").select("*");
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
    }
}));
// Endpoint GET /products
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        let query = database("products").select("*");
        if (name) {
            query = query.where("name", "like", `%${name}%`);
        }
        const products = yield query;
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
}));
// Endpoint POST /users
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password } = req.body;
        yield database("users").insert({ id, name, email, password });
        res.status(201).json({ message: "Cadastro realizado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
}));
// Endpoint POST /products
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, description, imageUrl } = req.body;
        yield database("products").insert({
            id,
            name,
            price,
            description,
            imageUrl,
        });
        res.status(201).json({ message: "Produto cadastrado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
}));
// Endpoint POST /purchases
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, buyer, products } = req.body;
        yield database.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
            yield trx("purchases").insert({ id, buyer });
            yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
                const { id: productId, quantity } = product;
                yield trx("purchases_products").insert({
                    purchase_id: id,
                    product_id: productId,
                    quantity,
                });
            })));
        }));
        res.status(201).json({ message: "Pedido realizado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating purchase" });
    }
}));
// Endpoint GET /purchases/:id
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const purchase = yield database("purchases")
            .select("purchases.id as purchaseId", "users.id as buyerId", "users.name as buyerName", "users.email as buyerEmail", "purchases.total_price as totalPrice", "purchases.created_at as createdAt")
            .join("users", "purchases.buyer", "users.id")
            .where("purchases.id", id)
            .first();
        if (purchase) {
            const products = yield database("products")
                .select("products.id", "products.name", "products.price", "products.description", "products.imageUrl", "purchases_products.quantity")
                .join("purchases_products", "products.id", "purchases_products.product_id")
                .where("purchases_products.purchase_id", id);
            const formattedPurchase = {
                purchaseId: purchase.purchaseId,
                buyerId: purchase.buyerId,
                buyerName: purchase.buyerName,
                buyerEmail: purchase.buyerEmail,
                totalPrice: purchase.totalPrice,
                createdAt: purchase.createdAt,
                products: products.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    imageUrl: product.imageUrl,
                    quantity: product.quantity,
                })),
            };
            res.status(200).json(formattedPurchase);
        }
        else {
            res.status(404).json({ message: "Purchase not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving purchase" });
    }
}));
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
