import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [newListName, setNewListName] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/shoppings/');
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createShoppingList = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/shoppings/', { name: newListName });
            const newList = response.data;
            setOrders([...orders, newList]);
            setNewListName('');
        } catch (error) {
            console.log(error);
        }
    };

    const deleteShoppingList = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8000/api/shoppings/${orderId}`);
            const updatedOrders = orders.filter((order) => order.id !== orderId);
            setOrders(updatedOrders);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Form onSubmit={createShoppingList}>
                        <Form.Group>
                            <Form.Label>Nazwa nowej listy zakupów:</Form.Label>
                            <Form.Control
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="mb-4">Utwórz nową listę zakupów</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {orders.map((order) => (
                    <Col key={order.id} sm={12} md={6} lg={4} xl={3}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{order.name}</Card.Title>
                                <Card.Text>Utworzone: {order.created_at.slice(0, 19).replace("T", " ")}</Card.Text>
                                <Card.Text>Liczba produktów: {order.item_count}</Card.Text>
                                <Card.Text>Cena za wszystkie produkty: {order.total_item_price}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button as={Link} to={`items/${order.id}`} className="mr-2">Przejdź do listy zakupów</Button>
                                    <Button variant="danger" onClick={() => deleteShoppingList(order.id)}>Usuń</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default OrderList;
