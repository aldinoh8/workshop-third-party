package utils

import (
	"net/http"
	"time"

	"github.com/sirupsen/logrus"
)

func Logger(h http.Handler) http.Handler {
	loggingFn := func(rw http.ResponseWriter, req *http.Request) {
		start := time.Now()

		h.ServeHTTP(rw, req)

		duration := time.Since(start)

		logrus.WithFields(logrus.Fields{
			"uri":      req.RequestURI,
			"method":   req.Method,
			"duration": duration,
		}).Info("request completed")
	}
	return http.HandlerFunc(loggingFn)
}
