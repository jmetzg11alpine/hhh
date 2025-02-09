package handlers

import (
	"encoding/json"
	"fmt"
	"hhh/database"
	"hhh/models"
	"log"
	"net/http"
)

func SaveItemHandler(w http.ResponseWriter, r *http.Request) {
	var newItem models.Item
	err := json.NewDecoder(r.Body).Decode(&newItem)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		log.Println("error with jason in saving item:", err)
		return
	}
	fmt.Printf("received new item: %+v\n", newItem)
	if err := database.SaveItem(newItem); err != nil {
		http.Error(w, "Failed to insert item into database", http.StatusInternalServerError)
		log.Println("Database error in SaveIemHandler:", err)
		return
	}
	response := map[string]string{"message": "New item inserted successfully"}
	jsonResponse(w, response)
}

func GetItemsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("customer items called")
	items, err := database.GetCustomerItems()
	if err != nil {
		http.Error(w, "Failed to get customer items", http.StatusInternalServerError)
		log.Println("Database error in GetItemsHandler:", err)
		return
	}
	jsonResponse(w, items)
}

func GetItemsAdminHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("admin items called")
	items, err := database.GetAdminItems()
	if err != nil {
		http.Error(w, "Failed to get admin items", http.StatusInternalServerError)
		log.Println("Database error in GetItemsAdminHandler:", err)
		return
	}
	jsonResponse(w, items)

}

func jsonResponse(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
