import express, { Request, Response } from "express";
import { getAllUsers, getAllProducts, searchProductsByName, createUser, createProduct, deleteUser, deleteProduct, editProduct } from "./database";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", (req: Request, res: Response) => {
  const users = getAllUsers();
  res.status(200).json(users);
});

app.get("/products", (req: Request, res: Response) => {
  const name = req.query.name as string;
  if (name) {
    const filteredProducts = searchProductsByName(name);
    res.status(200).json(filteredProducts);
  } else {
    const products = getAllProducts();
    res.status(200).json(products);
  }
});

app.post("/users", (req: Request, res: Response) => {
  const { id, name, email, password } = req.body;
  const message = createUser(id, name, email, password);
  res.status(201).send(message);
});

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl } = req.body;
  const message = createProduct(id, name, price, description, imageUrl);
  res.status(201).send(message);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const message = deleteUser(id);
  res.status(200).send(message);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const message = deleteProduct(id);
  res.status(200).send(message);
});

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, price, description, imageUrl } = req.body;
  const message = editProduct(id, name, price, description, imageUrl);
  res.status(200).send(message);
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
