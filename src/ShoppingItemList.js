import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function ShoppingItemList() {
    const [items, setItems] = useState([]);
    const { pk } = useParams();

    useEffect(() => {
        const fetchShoppingItems = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/items/`);
                const data = await response.json();
                console.log(data);
                setItems(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchShoppingItems();
    }, [pk]);

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    return (
        <div className="container">
            <h1>Lista Produktów</h1>

            <table className="table mt-4">
                <thead>
                <tr>
                    <th className="wider-column">Nazwa Produktu</th>
                    <th className="narrow-column">Cena Jednostkowa</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td className="wider-column">{item.name}</td>
                        <td className="narrow-column">{item.unit_price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShoppingItemList;

