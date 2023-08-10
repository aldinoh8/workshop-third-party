CREATE TABLE IF NOT EXISTS products (
    "id" SERIAL PRIMARY KEY,
    "name" varchar NOT NULL,
    "description" text NOT NULL,
    "price" int NOT NULL,
    "stock" int NOT NULL,
    "weight" int NOT NULL
);