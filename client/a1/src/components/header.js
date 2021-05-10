import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default function Header() {
    
    function LoginCheck() {
        if (!localStorage.getItem("token")) {
            return (
                <NavItem>
                    <NavLink href="/login">Login/Register</NavLink>
                </NavItem>
            )
        } else {
            return (
                <NavItem>
                    <NavLink href="/logout">Logout</NavLink>
                </NavItem>
            )
        }
    }

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/table">Stocks Table</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink rel="noopener noreferrer" href="http://131.181.190.87:3000/" target="_blank">API</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <LoginCheck />
                </Nav>
            </Navbar>
        </div>
    )
}