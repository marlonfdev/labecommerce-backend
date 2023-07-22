"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProduct = exports.deleteProduct = exports.deleteUser = exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
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
exports.products = [
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
function createUser(id, name, email, password) {
    const createdAt = new Date().toISOString();
    const newUser = { id, name, email, password, createdAt };
    exports.users.push(newUser);
    return "Cadastro realizado com sucesso";
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = { id, name, price, description, imageUrl };
    exports.products.push(newProduct);
    return "Produto criado com sucesso";
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function searchProductsByName(name) {
    const searchTerm = name.toLowerCase();
    const matchingProducts = exports.products.filter((product) => product.name.toLowerCase().includes(searchTerm));
    return matchingProducts;
}
exports.searchProductsByName = searchProductsByName;
function deleteUser(id) {
    const index = exports.users.findIndex((user) => user.id === id);
    if (index !== -1) {
        exports.users.splice(index, 1);
        return "User apagado com sucesso";
    }
    return "Usuário não encontrado";
}
exports.deleteUser = deleteUser;
function deleteProduct(id) {
    const index = exports.products.findIndex((product) => product.id === id);
    if (index !== -1) {
        exports.products.splice(index, 1);
        return "Produto apagado com sucesso";
    }
    return "Produto não encontrado";
}
exports.deleteProduct = deleteProduct;
function editProduct(id, name, price, description, imageUrl) {
    const product = exports.products.find((product) => product.id === id);
    if (product) {
        if (name)
            product.name = name;
        if (price)
            product.price = price;
        if (description)
            product.description = description;
        if (imageUrl)
            product.imageUrl = imageUrl;
        return "Produto atualizado com sucesso";
    }
    return "Produto não encontrado";
}
exports.editProduct = editProduct;
