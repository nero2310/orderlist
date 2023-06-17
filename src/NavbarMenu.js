import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar() {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/languages/');
                setLanguages(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLanguages();
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Shopping List APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text><a className={"text-decoration-none"} href="/items">Produkty</a></Navbar.Text>
                <Nav className="ml-auto">
                    <NavDropdown title="Language" id="language-dropdown">
                        {languages.map((language) => (
                            <NavDropdown.Item key={language.id} href={`#${language.short_code}`}>
                                {language.name}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
