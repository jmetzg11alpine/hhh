package models

type Item struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Date        string `json:"date"`
	OriginalQ   int    `json:"originalQ"`
	RemainingQ  int    `json:"remainingQ"`
}

type NewItem struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Date        string `json:"date"`
	Quantity    int    `json:"quantity"`
}

type ClaimedItem struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Customer    string `json:"customer"`
	Quantity    int    `json:"quantity"`
	DateTime    string `json:"dateTime"`
}

type ItemId struct {
	ID int `json:"id"`
}
