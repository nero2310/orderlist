import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function ShoppingItemList() {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [newItem, setNewItem] = useState({ product: '', quantity: '', unit_price: '' });
    const { pk } = useParams();

    useEffect(() => {
        const fetchShoppingItems = async () => {
            try {
                const response = await fetch(`https://shopinglistbackend.onrender.com/api/shopping-items/${pk}/`);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchItems = async () => {
            try {
                const response = await fetch('https://shopinglistbackend.onrender.com/api/items/');
                const data = await response.json();
                setNewItem({ ...newItem, product: data[0]?.id }); // Set the default selected product
                setSelectedItems(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchShoppingItems();
        fetchItems();
    }, [pk]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const { product, quantity, unit_price } = newItem;

        const shoppingItemData = {
            item: parseInt(product),
            shopping: pk,
            quantity: parseFloat(quantity),
            unit_price: parseFloat(unit_price),
        };

        fetch(`https://shopinglistbackend.onrender.com/api/shopping-items/${pk}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shoppingItemData),
        })
            .then((response) => response.json())
            .then((data) => {
                setItems([...items, data]);
                setNewItem({ product: '', quantity: '', unit_price: '' });
            })
            .catch((error) => {
                console.error('Error adding shopping item:', error);
            });
    };

    return (
        <div className="container">
            <h1>Lista Zakupów</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="product">Produkt:</label>
                    <select
                        className="form-control"
                        id="product"
                        value={newItem.product}
                        onChange={(e) => setNewItem({ ...newItem, product: e.target.value })}
                    >
                        <option value="">Wybierz produkt</option>
                        {selectedItems.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Ilość:</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Dodaj Produkt
                </button>
            </form>

            <ul className="list-group mt-4">
                {items.map((item) => (
                    <li key={item.pk} className="list-group-item">
                        <p>Nazwa: {item.item.name}</p>
                        <p>Ilość: {item.quantity}</p>
                        <p>Cena końcowa: {(item.quantity * item.item.unit_price).toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingItemList;
