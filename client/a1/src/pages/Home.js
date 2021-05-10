import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

export default function Home() {
  return (
    <div class="centered">
      <Jumbotron id="jumbo">
        <h1 className="display-3">Stock Prices App</h1>
        <p className="lead">Welcome to the Stock Prices portal.</p>
        <hr className="my-2" />
        <p>Login or Register to see detailed price history for a specific stock, otherwise view all stocks, optionally filtered by Industry.</p>
        <p className="lead">
          <Button color="primary" href="/table">Stocks Table</Button> <Button color="primary" href="/login">Login or Register</Button>
        </p>
      </Jumbotron>
    </div>
  )
}