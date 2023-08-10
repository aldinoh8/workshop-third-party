package service

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"
)

type RajaOngkir struct {
	Url    string
	Apikey string
	Client http.Client
}

type RoResultResponse = map[string]interface{}
type RoGeneralResponse = map[string]map[string][]RoResultResponse

const (
	originCityId      = 153
	originCourierCode = "jne"
)

func GenerateRajaOngkirShipper() RajaOngkir {
	return RajaOngkir{
		Url:    os.Getenv("RAJA_ONGKIR_URL"),
		Apikey: os.Getenv("RAJA_ONGKIR_KEY"),
		Client: *http.DefaultClient,
	}
}

func (ro RajaOngkir) GetCities(provinceId int) (cities []City, err error) {
	url := fmt.Sprintf("%s/city?province=%d", ro.Url, provinceId)
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	req.Header.Add("key", ro.Apikey)

	response, err := ro.Client.Do(req)
	if err != nil {
		return cities, errors.New("failed to hit Shipping API")
	}
	defer response.Body.Close()

	var result RoGeneralResponse
	json.NewDecoder(response.Body).Decode(&result)
	cities = ro.ParseCities(result["rajaongkir"]["results"])

	return cities, err
}

func (ro RajaOngkir) GetCosts(cityId, productWeight int) (costs Courier, err error) {
	url := "https://api.rajaongkir.com/starter/cost"

	reqBody := fmt.Sprintf(`{
		"origin":      %v,
		"destination": %v,
		"weight":      %v,
		"courier":     "%v"
	}`, originCityId, cityId, productWeight*1000, originCourierCode)

	req, _ := http.NewRequest(http.MethodPost, url, strings.NewReader(reqBody))
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("key", ro.Apikey)

	response, err := ro.Client.Do(req)
	if err != nil {
		return costs, errors.New("failed to hit Shipping API")
	}
	defer response.Body.Close()

	var result RoGeneralResponse
	json.NewDecoder(response.Body).Decode(&result)
	costs = ro.ParseCourier(result["rajaongkir"]["results"])

	return costs, nil
}

func (ro RajaOngkir) ParseCities(respCities []RoResultResponse) (cities []City) {
	for _, respCity := range respCities {
		cities = append(cities, City{
			Id:   respCity["city_id"].(string),
			Name: respCity["city_name"].(string),
		})
	}

	return cities
}

func (ro RajaOngkir) ParseCourier(respCourier []RoResultResponse) (courier Courier) {
	mapCourier := respCourier[0]
	courier.Code = mapCourier["code"].(string)
	courier.Name = mapCourier["name"].(string)

	for _, v := range mapCourier["costs"].([]interface{}) {
		cost := v.(map[string]interface{})
		costData := Cost{
			Service:     cost["service"].(string),
			Description: cost["description"].(string),
		}

		costDetails := cost["cost"].([]interface{})
		for _, cd := range costDetails {
			val, _ := cd.(map[string]interface{})["value"].(float64)
			costData.CostDetail = append(costData.CostDetail, CostDetail{
				Value: val,
				Etd:   cd.(map[string]interface{})["etd"].(string),
			})
		}

		courier.Costs = append(courier.Costs, costData)
	}

	return courier
}
