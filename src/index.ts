import { createProduct, createUser, getAllProducts, getAllUsers, searchProductsByName } from "./database";

console.log(createUser(
    "u003", 
    "Astrodev", 
    "astrodev@email.com", 
    "astrodev99"));

console.log(getAllUsers());

console.log(createProduct(
        "prod003", 
        "SSD gamer", 
        349.99, 
        "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
        "https://picsum.photos/seed/SSD%20gamer/400"
    )
  );

  console.log(getAllProducts());

  console.log(searchProductsByName("gamer"));