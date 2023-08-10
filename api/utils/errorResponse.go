package utils

type ErrorResponse struct {
	Message string `json:"message"`
}

var InternalServerError ErrorResponse = ErrorResponse{
	Message: "Internal Server Error",
}
