package models

type Item struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Date        string `json:"date"`
	Customer    string `json:"customer"`
	Quantity    int    `json:"quantity"`
}
