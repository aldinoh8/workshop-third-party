package router

import (
	"api/controller"
	"api/repository"
	"api/service"
	"database/sql"

	"github.com/julienschmidt/httprouter"
)

func New(db *sql.DB) *httprouter.Router {
	router := httprouter.New()

	productRepository := repository.NewProductRepository(db)

	productController := controller.NewProductController(productRepository)
	router.GET("/products", productController.Index)
	router.GET("/products/:id", productController.Detail)

	shippingService := service.GenerateRajaOngkirShipper()
	shippingController := controller.NewShippingController(shippingService, productRepository)
	router.GET("/shipping/cities", shippingController.GetCities)
	router.GET("/shipping/cost", shippingController.GetShippingFee)

	return router
}
