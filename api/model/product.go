package model

import (
	"context"
	"database/sql"
	"errors"
)

type Product struct {
	Id          int      `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Price       int      `json:"price"`
	Stock       int      `json:"stock"`
	Weight      int      `json:"weight"`
	Images      []string `json:"images"`
	Thumbnail   string   `json:"thumbnail"`
}

func ProductFindAll(tx *sql.DB) (products []Product, err error) {
	query := `
		SELECT p.id, p.name, p.description, p.price, p.stock, p.weight, MIN(pi.url)
    FROM products p
    LEFT JOIN product_images pi ON p.id = pi.product_id
    GROUP BY p.id, p.name
	`

	rows, err := tx.QueryContext(context.Background(), query)
	if err != nil {
		return products, err
	}
	defer rows.Close()

	for rows.Next() {
		p := Product{}
		rows.Scan(&p.Id, &p.Name, &p.Description, &p.Price, &p.Stock, &p.Weight, &p.Thumbnail)
		products = append(products, p)
	}

	return products, err
}

func ProductFindById(tx *sql.DB, id int) (product Product, err error) {
	queryProduct := `
		SELECT id, name, description, price, stock, weight
		FROM products WHERE id = $1
	`
	productRow, err := tx.QueryContext(context.Background(), queryProduct, id)
	if err != nil {
		return product, err
	}
	defer productRow.Close()

	if productRow.Next() {
		productRow.Scan(&product.Id,
			&product.Name,
			&product.Description,
			&product.Price,
			&product.Stock,
			&product.Weight,
		)
	} else {
		return product, errors.New("data not found")
	}

	queryImages := `
		SELECT url from product_images
		WHERE product_id = $1
	`
	imageRows, err := tx.QueryContext(context.Background(), queryImages, id)
	if err != nil {
		return product, err
	}
	defer imageRows.Close()

	for imageRows.Next() {
		var imageUrl string
		imageRows.Scan(&imageUrl)
		product.Images = append(product.Images, imageUrl)
	}

	return product, err
}
