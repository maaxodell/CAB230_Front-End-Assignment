import React, { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"

import FetchStocks from '../components/fetch'

export default function Stocks() {
  const [search, setSearch] = useState("");
  const stocksData = FetchStocks(search);
  const [selectedIndustry, selectIndustry] = useState("All Industries");
  
  function StockTable({stocks}) {
    const stocksColumns = [
      {headerName: "Name", field: "name", sortable: true, width: 300},
      {headerName: "Symbol", field: "symbol", sortable: true, flex: 1},
      {headerName: "Industry", field: "industry", sortable: true, flex: 1}
    ];

    return (
      <div className="stocktable">
        <div className="ag-theme-alpine-dark" style={{
          width: "900px"
        }}>
          <AgGridReact
            columnDefs={stocksColumns} 
            rowData={stocks}
            pagination={true}
            paginationPageSize={20}
            onRowClicked={(row) => window.location.href = `stock/${row.data.symbol}`}
            domLayout="autoHeight"
            rowClass="rowStyle"
          />
        </div>
      </div>
    )
  }

  function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState("");
    
    return (
      <div className="searchbar">
        <input
          aria-labelledby="search-button"
          name="search"
          id="search"
          type="search"
          value={innerSearch}
          placeholder="Industry"
          onChange={event => {
            const {value} = event.target;
            setInnerSearch(value);
          }} 
        />
        <button 
        id="search-button" 
        type="button"
        onClick={() => props.onSubmit(innerSearch)}
        >Search</button>
      </div>
    )
  }

  function DropdownIndustry() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    function select(industry) {
      if (industry === "") {
        selectIndustry("All Industries")
        setSearch("");
      } else {
        selectIndustry(industry);
        setSearch(industry);
      }
    }

    return (
      <div className="dropdown">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            {selectedIndustry}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => select("")}>All Industries</DropdownItem>
            <DropdownItem onClick={() => select("Health Care")}>Health Care</DropdownItem>
            <DropdownItem onClick={() => select("Industrials")}>Industrials</DropdownItem>
            <DropdownItem onClick={() => select("Consumer Discretionary")}>Consumer Discretionary</DropdownItem>
            <DropdownItem onClick={() => select("Information Technology")}>Information Technology</DropdownItem>
            <DropdownItem onClick={() => select("Consumer Staples")}>Consumer Staples</DropdownItem>
            <DropdownItem onClick={() => select("Utilities")}>Utilities</DropdownItem>
            <DropdownItem onClick={() => select("Financials")}>Financials</DropdownItem>
            <DropdownItem onClick={() => select("Real Estate")}>Real Estate</DropdownItem>
            <DropdownItem onClick={() => select("Materials")}>Materials</DropdownItem>
            <DropdownItem onClick={() => select("Energy")}>Energy</DropdownItem>
            <DropdownItem onClick={() => select("Telecommunication Services")}>Telecommunication Services</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }

  return (
    
    <div>
      <h1>Stocks Table</h1>
      <i>Click on a stock to view price data, or filter by Industry</i>
      <div className="grid-container">
        <div className="item1"><SearchBar onSubmit={setSearch} /></div>
        <div className="item2"><DropdownIndustry /></div>
        <div className="item3"><StockTable stocks={stocksData} /></div> 
      </div> 
    </div>
     
  )
} 