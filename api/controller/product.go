package controller

import (
	"api/repository"
	"api/utils"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

type Product struct {
	Repository repository.Product
}

func NewProductController(r repository.Product) Product {
	return Product{Repository: r}
}

func (c Product) Index(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	products, err := c.Repository.FindAll()

	if err != nil {
		utils.WriteJSONResponse(w, http.StatusInternalServerError, utils.InternalServerError)
		return
	}

	utils.WriteJSONResponse(w, http.StatusOK, products)
}

func (c Product) Detail(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	paramId := p.ByName("id")
	id, err := strconv.Atoi(paramId)

	if err != nil {
		utils.WriteJSONResponse(w, http.StatusBadRequest, utils.ErrorResponse{Message: err.Error()})
		return
	}

	product, err := c.Repository.FindById(id)
	if err != nil {
		utils.WriteJSONResponse(w, http.StatusNotFound, utils.ErrorResponse{Message: err.Error()})
		return
	}

	utils.WriteJSONResponse(w, http.StatusOK, product)
}
