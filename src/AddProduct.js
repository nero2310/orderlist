import React, { useState } from 'react';
import ShoppingItemList from './ShoppingItemList';

function AddItemForm({ onAddItem, items }) {
    const [newItem, setNewItem] = useState({ name: '', unit_price: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, unit_price } = newItem;

        const shoppingItemData = {
            name: name,
            unit_price: parseFloat(unit_price),
        };

        fetch('http://localhost:8000/api/items/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shoppingItemData),
        })
            .then((response) => response.json())
            .then((data) => {
                onAddItem(data); // Dodajemy nowy element do listy przedmiotów
                setNewItem({ name: '', unit_price: '' });
            })
            .catch((error) => {
                console.error('Error creating shopping item:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h3>Dodaj produkt</h3>
                    <label htmlFor="name">Nazwa:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="unitPrice">Cena Jednostkowa:</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="unitPrice"
                        value={newItem.unit_price}
                        onChange={(e) => setNewItem({ ...newItem, unit_price: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Dodaj produkt
                </button>
            </form>

            <ShoppingItemList items={items} />
        </div>
    );
}

export default AddItemForm;
