package backend

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func ItemHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received Post request to /api/item")

	response := map[string]string{"message": "New item received"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
