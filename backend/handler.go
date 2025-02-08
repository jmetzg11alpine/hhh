package backend

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Item struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Date        string `json:"date"`
}

func ItemHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received Post request to /api/item")

	var newItem Item
	err := json.NewDecoder(r.Body).Decode(&newItem)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	fmt.Printf("received new item: %+v\n", newItem)

	insertSQL := `INSERT INTO items (title, description, date) VALUES (?, ?, ?)`
	_, err = DB.Exec(insertSQL, newItem.Title, newItem.Description, newItem.Date)
	if err != nil {
		http.Error(w, "Failed to insert item into database", http.StatusInternalServerError)
	}

	response := map[string]string{"message": "New item inserted successfully"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
