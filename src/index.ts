import express, { Request, Response } from "express";
import Knex from "knex";

const app = express();
app.use(express.json());

const database = Knex({
    client: "sqlite3",
    connection: {
        filename: "./database.db",
    },
    useNullAsDefault: true,
});

app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await database("users").select("*");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
    }
});

app.get("/products", async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        let query = database("products").select("*");
        if (name) {
            query = query.where("name", "like", `%${name}%`);
        }
        const products = await query;
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
});

app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body;
        await database("users").insert({ id, name, email, password });
        res.status(201).json({ message: "Cadastro realizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
});

app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl } = req.body;
        await database("products").insert({
            id,
            name,
            price,
            description,
            imageUrl,
        });
        res.status(201).json({ message: "Produto cadastrado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
});

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, buyer, products } = req.body;
        await database.transaction(async (trx) => {
            await trx("purchases").insert({ id, buyer });
            await Promise.all(
                products.map(async (product: any) => {
                    const { id: productId, quantity } = product;
                    await trx("purchases_products").insert({
                        purchase_id: id,
                        product_id: productId,
                        quantity,
                    });
                })
            );
        });
        res.status(201).json({ message: "Pedido realizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Error creating purchase" });
    }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const purchase = await database("purchases")
            .select(
                "purchases.id as purchaseId",
                "users.id as buyerId",
                "users.name as buyerName",
                "users.email as buyerEmail",
                "purchases.total_price as totalPrice",
                "purchases.created_at as createdAt"
            )
            .join("users", "purchases.buyer", "users.id")
            .where("purchases.id", id)
            .first();

        if (purchase) {
            const products = await database("products")
                .select(
                    "products.id",
                    "products.name",
                    "products.price",
                    "products.description",
                    "products.imageUrl",
                    "purchases_products.quantity"
                )
                .join(
                    "purchases_products",
                    "products.id",
                    "purchases_products.product_id"
                )
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
        } else {
            res.status(404).json({ message: "Purchase not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving purchase" });
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
