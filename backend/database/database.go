package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error

	baseDir, err := os.Getwd()
	if err != nil {
		log.Fatal("Error getting current working directory:", err)
	}
	dbPath := filepath.Join(baseDir, "database.db")

	DB, err = sql.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatal("Error opening database:", err)
	}
	createTableSQL := `
	CREATE TABLE IF NOT EXISTS items (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		description TEXT NOT NULL,
		date TEXT NOT NULL,
		original_quantity INTEGER NOT NULL,
		remaining_quantity INTEGER NOT NULL,
		is_active INTEGER NOT NULL DEFAULT 1,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	CREATE TABLE IF NOT EXISTS claimed_items (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		item_id INTEGER NOT NULL,
		customer TEXT NOT NULL,
		quantity INTEGER NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		is_active INTEGER NOT NULL DEFAULT 1,
		FOREIGN KEY (item_id) REFERENCES items(id) on DELETE CASCADE

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
		insertItemsSQL := `
		INSERT INTO items (title, description, date, original_quantity, remaining_quantity) VALUES
		("Apples", "Green and Red", "2024-01-11", 6, 4),
		("Eggs", "Still warm", "2024-01-15", 36, 24),
		("Bread", "In loaves", "2024-01-11", 5, 3),
		("Brownies", "Extra sweet", "2024-02-11", 6, 3),
		("Oranges", "Yummy", "2024-01-11", 4, 4),
		("Almonds", "Roasted", "2024-01-11", 66, 66);
		`

		_, err = DB.Exec(insertItemsSQL)
		if err != nil {
			log.Println("Error inserting default data:", err)
		}

		insertClaimedSQL := `
		INSERT INTO claimed_items (item_id, customer, quantity) VALUES
		((SELECT id FROM items WHERE title = "Bread" LIMIT 1), "Bill", 2),
		((SELECT id FROM items WHERE title = "Eggs" LIMIT 1), "James", 12),
		((SELECT id FROM items WHERE title = "Apples" LIMIT 1), "Mary", 2),
		((SELECT id FROM items WHERE title = "Brownies" LIMIT 1), "Sally", 3);`

		_, err = DB.Exec(insertClaimedSQL)
		if err != nil {
			log.Fatal("Error inserting claimed items:", err)
		}

	} else {
		fmt.Println("Database already container data, skipping insert.")
	}
	fmt.Println("Database initialized successfully!")
}
