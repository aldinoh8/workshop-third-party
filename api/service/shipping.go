package service

type City struct {
	Id   string `json:"city_id"`
	Name string `json:"city"`
}

type CostDetail struct {
	Value float64 `json:"value"`
	Etd   string  `json:"etd"`
	Note  string  `json:"note"`
}

type Cost struct {
	Service     string       `json:"service"`
	Description string       `json:"description"`
	CostDetail  []CostDetail `json:"cost"`
}

type Courier struct {
	Code  string `json:"code"`
	Name  string `json:"name"`
	Costs []Cost `json:"costs"`
}

type Shipper interface {
	GetCities(int) ([]City, error)
	GetCosts(int, int) (Courier, error)
}
