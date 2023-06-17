import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';
import OrderList from "./orderlist";
import ShoppingItemList from "./shoppingitem";
import AddItemForm from "./AddProduct";

const App = () => {
    return (
        <Router>
            <NavbarMenu/>
            <div style={{ marginTop: '60px', padding: '20px' }}>
                <Routes>
                    <Route path="/items" element={<AddItemForm/>}/>
                    <Route path="/items/:pk" element={<ShoppingItemList/>}/>,
                <Route path="" element={<OrderList/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
