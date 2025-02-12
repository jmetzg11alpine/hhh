package config

import (
	"hhh/backend/handlers"
	"net/http"
)

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		allowedOrigins := map[string]bool{
			"http://localhost:8080": true,
		}
		origin := r.Header.Get("Origin")
		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTION")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func SetUpRoutes() *http.ServeMux {
	mux := http.NewServeMux()

	// admin
	mux.HandleFunc("/save_item", enableCORS(handlers.SaveItemHandler))
	mux.HandleFunc("/get_items_admin", enableCORS(handlers.GetItemsAdminHandler))
	mux.HandleFunc("/edit_item", enableCORS(handlers.EditItemHandler))
	mux.HandleFunc("/remove_item", enableCORS(handlers.RemoveItemHandler))
	mux.HandleFunc("/admin_claim_ite", enableCORS(handlers.AdminClaim))
	// customers
	mux.HandleFunc("/get_items", enableCORS(handlers.GetItemsHandler))
	mux.HandleFunc("/get_claimed_items", enableCORS(handlers.GetClaimedItemsHandler))

	return mux
}
