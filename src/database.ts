import { User, Product } from "../src/type";

export const users: User[] = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: new Date().toISOString(),
    },
    {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: new Date().toISOString(),
    },
];

export const products: Product[] = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400",
    },
];

export function createUser(
    id: string,
    name: string,
    email: string,
    password: string
): string {
    const createdAt = new Date().toISOString();
    const newUser: User = { id, name, email, password, createdAt };
    users.push(newUser);
    return "Cadastro realizado com sucesso";
}

export function getAllUsers(): User[] {
    return users;
}

export function createProduct(
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
): string {
    const newProduct: Product = { id, name, price, description, imageUrl };
    products.push(newProduct);
    return "Produto criado com sucesso";
}

export function getAllProducts(): Product[] {
    return products;
}

export function searchProductsByName(name: string): Product[] {
    const searchTerm = name.toLowerCase();
    const matchingProducts: Product[] = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
    );
    return matchingProducts;
}

export function deleteUser(id: string): string {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return "User apagado com sucesso";
    }
    return "Usuário não encontrado";
}

export function deleteProduct(id: string): string {
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        return "Produto apagado com sucesso";
    }
    return "Produto não encontrado";
}

export function editProduct(
    id: string,
    name?: string,
    price?: number,
    description?: string,
    imageUrl?: string
): string {
    const product = products.find((product) => product.id === id);
    if (product) {
        if (name) product.name = name;
        if (price) product.price = price;
        if (description) product.description = description;
        if (imageUrl) product.imageUrl = imageUrl;
        return "Produto atualizado com sucesso";
    }
    return "Produto não encontrado";
}
