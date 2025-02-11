package database

import "hhh/backend/models"

func GetCustomerItems() ([]models.Item, error) {
	query := `
	SELECT
		id, title, description, date, remaining_quantity
		FROM items
		WHERE remaining_quantity > 0 AND is_active = 1
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
		if err := rows.Scan(&item.ID, &item.Title, &item.Description, &item.Date, &item.RemainingQ); err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}

func GetClaimedItems() ([]models.ClaimedItem, error) {
	query := `
		SELECT
			c.id, i.title, i.description, c.customer, c.quantity, c.created_at
		FROM claimed_items AS c
		JOIN items AS I ON c.item_id = i.id
		WHERE c.is_active = 1;
	`
	rows, err := DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []models.ClaimedItem
	for rows.Next() {
		var item models.ClaimedItem
		if err := rows.Scan(&item.ID, &item.Title, &item.Description, &item.Customer, &item.Quantity, &item.DateTime); err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}
