package main

import (
	"fmt"
	"hhh/backend"
	"net/http"
)

func main() {
	backend.InitDB()
	defer backend.DB.Close()

	fs := http.FileServer(http.Dir("frontend"))
	http.Handle("/frontend/", http.StripPrefix("/frontend/", fs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "frontend/index.html")
	})

	http.Handle("/api/item", backend.EnableCORS(http.HandlerFunc(backend.ItemHandler)))

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
