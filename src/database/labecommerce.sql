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
