// react components
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// css
import './App.css';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"

// written components
import Header from './components/header';

// pages
import Stocks from './pages/Stocks';
import Home from './pages/Home';
import ViewStock from './pages/ViewStock';
import LoginRegister from './pages/LoginRegister';
import Logout from './pages/Logout';

export default function App() {
  return (
    <div className="App">
      <Router>
        
        <Header />

        <Switch>
          
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/table">
            <Stocks />
          </Route>

          <Route path="/stock">
            <ViewStock symbol={window.location.pathname} />
          </Route>

          <Route path="/login">
            <LoginRegister />
          </Route>

          <Route path="/register">
            <LoginRegister />
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>

        </Switch>
    
      </Router>
    </div> 
  )
}