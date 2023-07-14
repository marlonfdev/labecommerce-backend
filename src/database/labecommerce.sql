-- Active: 1689353122973@@127.0.0.1@3306

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, created_at)
VALUES
  ('u001', 'Fulano', 'fulano@example.com', '123456', '2023-07-15T10:30:00+00:00'),
  ('u002', 'Beltrano', 'beltrano@example.com', 'abcdef', '2023-07-15T11:45:00+00:00'),
  ('u003', 'Ciclano', 'ciclano@example.com', 'qwerty', '2023-07-15T13:15:00+00:00');

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES
  ('prod001', 'Mouse gamer', 250, 'O melhor mouse para jogos!', 'https://picsum.photos/seed/Mouse%20gamer/400'),
  ('prod002', 'Monitor', 900, 'Monitor LED Full HD 24 polegadas', 'https://picsum.photos/seed/Monitor/400'),
  ('prod003', 'Teclado mecânico', 350, 'Teclado mecânico com iluminação RGB', 'https://picsum.photos/seed/Teclado%20mecanico/400'),
  ('prod004', 'Fone de ouvido', 150, 'Fone de ouvido com cancelamento de ruído', 'https://picsum.photos/seed/Fone%20de%20ouvido/400'),
  ('prod005', 'Notebook', 2000, 'Notebook com processador Intel Core i7 e SSD 512GB', 'https://picsum.photos/seed/Notebook/400');

CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY,
  buyer TEXT NOT NULL,
  total_price REAL NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (buyer) REFERENCES users(id)
);

-- Exemplo de criação de pedido para a primeira pessoa cadastrada
INSERT INTO purchases (id, buyer, total_price, created_at) 
VALUES ('1', 'id_da_primeira_pessoa', 'valor_aleatorio', 'data_em_texto');

-- Exemplo de criação de pedido para a segunda pessoa cadastrada
INSERT INTO purchases (id, buyer, total_price, created_at) 
VALUES ('2', 'id_da_segunda_pessoa', 'valor_aleatorio', 'data_em_texto');

SELECT purchases.id AS purchase_id, users.id AS buyer_id, users.name AS buyer_name, users.email AS buyer_email, purchases.total_price, purchases.created_at
FROM purchases
JOIN users ON purchases.buyer = users.id
WHERE purchases.id = 'id_da_compra';

-- Criação da tabela de relações
CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

-- Inserção dos dados
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
  ('c001', 'p001', 5),
  ('c001', 'p002', 3),
  ('c002', 'p003', 2),
  ('c002', 'p004', 4),
  ('c003', 'p002', 1),
  ('c003', 'p005', 2);

-- Consulta com junção INNER JOIN
SELECT pp.*, p.*, pr.*
FROM purchases_products AS pp
INNER JOIN purchases AS p ON pp.purchase_id = p.id
INNER JOIN products AS pr ON pp.product_id = pr.id;

-- Exemplo de tabela "orders" com chave estrangeira "customer_id"
CREATE TABLE orders (
  id INT PRIMARY KEY,
  order_number INT,
  customer_id INT,
  -- outras colunas da tabela
  FOREIGN KEY (customer_id)
    REFERENCES customers(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
