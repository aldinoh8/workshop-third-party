CREATE TABLE IF NOT EXISTS product_images (
  "id" SERIAL PRIMARY KEY,
  "url" varchar NOT NULL,
  "product_id" int NOT NULL,
  FOREIGN KEY ("product_id")
    REFERENCES products ("id")
);