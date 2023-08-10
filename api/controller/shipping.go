package controller

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

type Shipping struct{}

func NewShippingController() Shipping {
	return Shipping{}
}

func (c Shipping) GetCities(w http.ResponseWriter, r *http.Request, p httprouter.Params) {

}

func (c Shipping) GetShippingFee(w http.ResponseWriter, r *http.Request, p httprouter.Params) {

}
