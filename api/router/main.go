package router

import (
	"api/controller"
	"api/repository"
	"database/sql"

	"github.com/julienschmidt/httprouter"
)

func New(db *sql.DB) *httprouter.Router {
	router := httprouter.New()

	productRepository := repository.NewProductRepository(db)
	productController := controller.NewProductController(productRepository)
	router.GET("/products", productController.Index)
	router.GET("/products/:id", productController.Detail)

	return router
}
