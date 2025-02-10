package main

import (
	"fmt"
	"hhh/backend/config"
	"hhh/backend/database"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	database.InitDB()
	defer database.DB.Close()

	wd, err := os.Getwd()
	if err != nil {
		log.Fatal("Error getting current working directory:", err)
	}
	frontendPath := filepath.Join(wd, "frontend")

	mux := config.SetUpRoutes()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join(frontendPath, "index.html"))
	})

	fs := http.FileServer(http.Dir(frontendPath))
	mux.Handle("/frontend/", http.StripPrefix("/frontend/", fs))

	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
