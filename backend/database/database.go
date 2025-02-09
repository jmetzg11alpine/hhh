package database

import (
	"database/sql"
	"fmt"
	"hhh/models"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./database/database.db")
	if err != nil {
		log.Fatal("Error opening database:", err)
	}
	createTableSQL := `
	CREATE TABLE IF NOT EXISTS items (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		description TEXT NOT NULL,
		date TEXT NOT NULL,
		customer TEXT NOT NULL DEFAULT '',
		quantity INTEGER NOT NULL DEFAULT 0,
		is_active INTEGER NOT NULL DEFAULT 1
	);`
	_, err = DB.Exec(createTableSQL)
	if err != nil {
		log.Fatal("Error creating table:", err)
	}
	var count int
	err = DB.QueryRow("SELECT COUNT(*) FROM items").Scan(&count)
	if err != nil {
		log.Fatal("Error checking for existing data:", err)
	}

	if count == 0 {
		insertSQL := `
		INSERT INTO items (title, description, date, customer, quantity) VALUES
		("Apples", "Yummy", "2024-01-11", "", 6),
		("Eggs", "Still warm", "2024-01-15", "", 36),
		("Bread", "In loaves", "2024-01-11", "Bill", 5),
		("Brownies", "Extra sweet", "2024-02-11", "Sally", 6),
		("Oranges", "Yummy", "2024-01-11", "", 4),
		("Almonds", "Roasted", "2024-01-11", "", 66);
		`

		_, err = DB.Exec(insertSQL)
		if err != nil {
			log.Println("Error inserting default data:", err)
		} else {
			fmt.Println("Inserted default itmes successfully!")
		}
	} else {
		fmt.Println("Database already container data, skipping insert.")
	}
	fmt.Println("Database initialized successfully!")
}

func SaveItem(item models.Item) error {
	insertSQL := `INSERT INTO items (title, description, date, customer, quantity) VALUES (?, ?, ?, ?, ?)`
	_, err := DB.Exec(insertSQL, item.Title, item.Description, item.Date, item.Customer, item.Quantity)
	return err
}

func GetCustomerItems() ([]models.Item, error) {
	query := `
	SELECT
		id, title, description, date, customer, quantity
		FROM items
		WHERE is_active = 1
		AND customer = ''
		ORDER BY date;
	`
	rows, err := DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []models.Item
	for rows.Next() {
		var item models.Item
		if err := rows.Scan(&item.ID, &item.Title, &item.Description, &item.Date, &item.Customer, &item.Quantity); err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}

func GetAdminItems() ([]models.Item, error) {
	query := `
	SELECT id, title, description, date, customer, quantity
	FROM items
	WHERE is_active = 1
	ORDER BY date;
	`
	rows, err := DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []models.Item
	for rows.Next() {
		var item models.Item
		if err := rows.Scan(&item.ID, &item.Title, &item.Description, &item.Date, &item.Customer, &item.Quantity); err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}
