// import express, { Request, Response } from "express";
// import { getAllUsers, getAllProducts, searchProductsByName, createUser, createProduct, deleteUser, deleteProduct, editProduct } from "./database";

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.get("/users", (req: Request, res: Response) => {
//   try {
//     const users = getAllUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao obter usuários" });
//   }
// });

// app.get("/products", (req: Request, res: Response) => {
//   try {
//     const name = req.query.name as string;
//     if (name && name.length > 0) {
//       const filteredProducts = searchProductsByName(name);
//       res.status(200).json(filteredProducts);
//     } else {
//       const products = getAllProducts();
//       res.status(200).json(products);
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao obter produtos" });
//   }
// });

// app.post("/users", (req: Request, res: Response) => {
//   try {
//     const { id, name, email, password } = req.body;
//     if (!id || !name || !email || !password) {
//       res.status(400).json({ error: "Dados inválidos para criar usuário" });
//       return;
//     }
//     const existingUser = getAllUsers().find((user) => user.id === id || user.email === email);
//     if (existingUser) {
//       res.status(400).json({ error: "Já existe um usuário com a mesma ID ou e-mail" });
//       return;
//     }
//     const message = createUser(id, name, email, password);
//     res.status(201).send(message);
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao criar usuário" });
//   }
// });

// app.post("/products", (req: Request, res: Response) => {
//   try {
//     const { id, name, price, description, imageUrl } = req.body;
//     if (!id || !name || !price || !description || !imageUrl) {
//       res.status(400).json({ error: "Dados inválidos para criar produto" });
//       return;
//     }
//     const existingProduct = getAllProducts().find((product) => product.id === id);
//     if (existingProduct) {
//       res.status(400).json({ error: "Já existe um produto com a mesma ID" });
//       return;
//     }
//     const message = createProduct(id, name, price, description, imageUrl);
//     res.status(201).send(message);
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao criar produto" });
//   }
// });

// app.delete("/users/:id", (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const existingUser = getAllUsers().find((user) => user.id === id);
//     if (!existingUser) {
//       res.status(404).json({ error: "Usuário não encontrado" });
//       return;
//     }
//     const message = deleteUser(id);
//     res.status(200).send(message);
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao deletar usuário" });
//   }
// });

// app.delete("/products/:id", (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const existingProduct = getAllProducts().find((product) => product.id === id);
//     if (!existingProduct) {
//       res.status(404).json({ error: "Produto não encontrado" });
//       return;
//     }
//     const message = deleteProduct(id);
//     res.status(200).send(message);
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao deletar produto" });
//   }
// });

// app.put("/products/:id", (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const { name, price, description, imageUrl } = req.body;
//     const existingProduct = getAllProducts().find((product) => product.id === id);
//     if (!existingProduct) {
//       res.status(404).json({ error: "Produto não encontrado" });
//       return;
//     }
//     if (name && typeof name !== "string") {
//       res.status(400).json({ error: "Nome inválido" });
//       return;
//     }
//     if (price && typeof price !== "number") {
//       res.status(400).json({ error: "Preço inválido" });
//       return;
//     }
//     if (description && typeof description !== "string") {
//       res.status(400).json({ error: "Descrição inválida" });
//       return;
//     }
//     if (imageUrl && typeof imageUrl !== "string") {
//       res.status(400).json({ error: "URL da imagem inválida" });
//       return;
//     }
//     const message = editProduct(id, name, price, description, imageUrl);
//     res.status(200).send(message);
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao editar produto" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor está rodando em http://localhost:${port}`);
// });
// Create User

import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// Rota de teste
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// Rotas para manipulação dos dados do arquivo database.ts
const users: User[] = [];
const products: Product[] = [];

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

// Get All Users
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter os usuários" });
  }
});

// Get All Products
app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter os produtos" });
  }
});

// Get All Products (com filtro de nome)
app.get("/product", (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    if (name) {
      const filteredProducts = products.filter(
        (product) => product.name.toLowerCase().includes(name.toLowerCase())
      );
      res.status(200).json(filteredProducts);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter os produtos" });
  }
});

// Create User
app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;
    const createdAt = new Date().toISOString();
    const newUser: User = { id, name, email, password, createdAt };
    users.push(newUser);
    res.status(201).json("Cadastro realizado com sucesso");
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o usuário" });
  }
});

// Create Product
app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;
    const newProduct: Product = { id, name, price, description, imageUrl };
    products.push(newProduct);
    res.status(201).json("Produto cadastrado com sucesso");
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
});

// Delete User by id
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      res.status(200).json("Usuário apagado com sucesso");
    } else {
      res.status(404).json("Usuário não encontrado");
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o usuário" });
  }
});

// Delete Product by id
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      res.status(200).json("Produto apagado com sucesso");
    } else {
      res.status(404).json("Produto não encontrado");
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o produto" });
  }
});

// Edit Product by id
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, price, description, imageUrl } = req.body;
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = {
        id,
        name: name || products[index].name,
        price: price || products[index].price,
        description: description || products[index].description,
        imageUrl: imageUrl || products[index].imageUrl,
      };
      res.status(200).json("Produto atualizado com sucesso");
    } else {
      res.status(404).json("Produto não encontrado");
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  }
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
