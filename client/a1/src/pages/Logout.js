import React from 'react';
import { Button } from 'reactstrap';

export default function Logout() {
    localStorage.removeItem("token");
    
    return (
        <div className="centered">
            <h1>Successfully Logged Out</h1>
            <br></br>
            <Button color="primary" href="/login">Login Another User</Button> <Button color="secondary" href="/table">Return</Button>
        </div>
    )
}