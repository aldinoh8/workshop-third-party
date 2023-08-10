package main

import (
	"api/config"
	"api/router"
	"api/utils"
	"fmt"
	"net/http"
	"os"

	_ "github.com/joho/godotenv/autoload"
	"github.com/rs/cors"
	"github.com/sirupsen/logrus"
)

func main() {
	db := config.InitializeDatabase(os.Getenv("DB"))
	router := router.New(db)

	addr := fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT"))
	server := http.Server{
		Addr:    addr,
		Handler: cors.Default().Handler(utils.Logger(router)),
	}
	logrus.WithField("addr", addr).Info("starting server ...")

	if err := server.ListenAndServe(); err != nil {
		logrus.WithField("event", "start server").Fatal(err)
	}
}
