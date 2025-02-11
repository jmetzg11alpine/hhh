package database

import (
	"hhh/backend/models"
)

func SaveItem(item models.NewItem) error {
	insertSQL := `INSERT INTO items (title, description, date, original_quantity, remaining_quantity) VALUES (?, ?, ?, ?, ?)`
	_, err := DB.Exec(insertSQL, item.Title, item.Description, item.Date, item.Quantity, item.Quantity)
	return err
}

func GetAdminItems() ([]models.Item, error) {
	query := `
	SELECT id, title, description, date, original_quantity, remaining_quantity
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
		if err := rows.Scan(&item.ID, &item.Title, &item.Description, &item.Date, &item.OriginalQ, &item.RemainingQ); err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}

func EditItem(item models.Item) error {
	query := `
		UPDATE items
		SET title = ?, description = ?, original_quantity = ?, remaining_quantity =?, date = ?
		WHERE id = ?
	`
	_, err := DB.Exec(query, item.Title, item.Description, item.OriginalQ, item.RemainingQ, item.Date, item.ID)
	return err
}

func RemoveItem(item models.ItemId) error {
	query := `
		UPDATE items
		SET is_active = 0
		WHERE id = ?
	`
	_, err := DB.Exec(query, item.ID)
	return err
}
