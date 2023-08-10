package config

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/lib/pq"
)

func InitializeDatabase(creds string) *sql.DB {
	db, err := sql.Open("postgres", creds)
	if err != nil {
		log.Fatal(err.Error())
	}

	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	return db
}
