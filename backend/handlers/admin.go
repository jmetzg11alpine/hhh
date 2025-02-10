package handlers

import (
	"encoding/json"
	"fmt"
	"hhh/backend/database"
	"hhh/backend/models"
	"log"
	"net/http"
)

func SaveItemHandler(w http.ResponseWriter, r *http.Request) {
	var newItem models.NewItem
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
	JsonResponse(w, response)
}

func GetItemsAdminHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("admin items called")
	items, err := database.GetAdminItems()
	if err != nil {
		http.Error(w, "Failed to get admin items", http.StatusInternalServerError)
		log.Println("Database error in GetItemsAdminHandler:", err)
		return
	}
	JsonResponse(w, items)
}

func EditItemHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("edit items called")
	var editItem models.EditItem
	err := json.NewDecoder(r.Body).Decode(&editItem)
	if err != nil {
		http.Error(w, "Invalid reqest body", http.StatusBadRequest)
		log.Println("error with json in edit items", err)
	}

	if err := database.EditItem(editItem); err != nil {
		http.Error(w, "Failed to edit item in database", http.StatusInternalServerError)
		log.Println("Database error in EditItemHandler:", err)
	}

	items, err := database.GetAdminItems()
	if err != nil {
		http.Error(w, "Failed to get admin items", http.StatusInternalServerError)
		log.Println("Database error in GetItemsAdminHandler:", err)
		return
	}
	JsonResponse(w, items)
}
