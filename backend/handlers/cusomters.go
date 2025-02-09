package handlers

import (
	"fmt"
	"hhh/backend/database"
	"log"
	"net/http"
)

func GetItemsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("customer items called")
	items, err := database.GetCustomerItems()
	if err != nil {
		http.Error(w, "Failed to get customer items", http.StatusInternalServerError)
		log.Println("Database error in GetItemsHandler:", err)
		return
	}
	JsonResponse(w, items)
}

func GetClaimedItemsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("customer claimed items called")
	items, err := database.GetClaimedItems()
	if err != nil {
		http.Error(w, "Failed to get claimed items", http.StatusInternalServerError)
		log.Println("Database error in GetClaimedItemsHandler:", err)
		return
	}
	JsonResponse(w, items)
}
