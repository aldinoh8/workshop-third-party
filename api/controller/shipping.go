package controller

import (
	"api/repository"
	"api/service"
	"api/utils"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

type Shipping struct {
	Shipper           service.Shipper
	productRepository repository.Product
}

func NewShippingController(shipper service.Shipper, repo repository.Product) Shipping {
	return Shipping{Shipper: shipper, productRepository: repo}
}

func (c Shipping) GetCities(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	provinceIdstr := r.URL.Query().Get("province_id")
	provinceId, err := strconv.Atoi(provinceIdstr)

	if err != nil {
		utils.WriteJSONResponse(w, http.StatusBadRequest, utils.ErrorResponse{Message: err.Error()})
		return
	}

	cities, err := c.Shipper.GetCities(provinceId)
	if err != nil {
		utils.WriteJSONResponse(w, http.StatusInternalServerError, utils.InternalServerError)
		return
	}

	utils.WriteJSONResponse(w, http.StatusOK, cities)
}

func (c Shipping) GetShippingFee(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	cityIdstr := r.URL.Query().Get("city_id")
	cityId, errCity := strconv.Atoi(cityIdstr)

	productIdstr := r.URL.Query().Get("product_id")
	productId, errProduct := strconv.Atoi(productIdstr)

	if errCity != nil || errProduct != nil {
		utils.WriteJSONResponse(w, http.StatusBadRequest, utils.ErrorResponse{
			Message: "failed to parse cost parameter",
		})
		return
	}

	product, err := c.productRepository.FindById(productId)

	if err != nil {
		utils.WriteJSONResponse(w, http.StatusNotFound, utils.ErrorResponse{
			Message: err.Error(),
		})
		return
	}

	costs, err := c.Shipper.GetCosts(cityId, product.Weight)
	if err != nil {
		utils.WriteJSONResponse(w, http.StatusInternalServerError, utils.InternalServerError)
		return
	}

	utils.WriteJSONResponse(w, http.StatusOK, costs)
}
