import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Badge } from 'reactstrap'
import ReactDatePicker from 'react-datepicker';
import { AgGridReact } from 'ag-grid-react';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"
import "react-datepicker/dist/react-datepicker.css";

export default function ViewStock(props) {
    const stockSymbol = (props.symbol.split("/").pop());
    const stocksAPIURL = "http://131.181.190.87:3000/stocks"
    var stockPoint = `${stocksAPIURL}/${stockSymbol}`;
    var authedStockPoint = `${stocksAPIURL}/authed/${stockSymbol}`;
    
    const [authData, setauthData] = useState([]);
    const [recentData, setRecentData] = useState({});

    const [startDate, setStartDate] = useState(new Date("11/09/2019"));
    const [endDate, setEndDate] = useState(new Date("03/24/2020"));

    const token = localStorage.getItem("token");

    function FooterMessage() {
        const redirect = `/login?redirect=${recentData.symbol}`
        if (!token) {
            return (
                <p><a href={redirect}>Login</a> to see {recentData.symbol} price history, search by a range of dates and more.</p>
            )
        } else {
            return <p></p>
        }
    }

    function DatePicker() {
        if (token) {
            return (
                <div className="datepicker">
                    <b className="date1">From: </b>
                    <ReactDatePicker className="date2"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="d/MM/yyyy"
                        selectsStart
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <b className="date3">To: </b>
                    <ReactDatePicker className="date4"
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        dateFormat="d/MM/yyyy"
                        selectsStart
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
            )
        } else return <br></br>
    }
    
    useEffect(() => {
        fetch(stockPoint)
        .then((res) => res.json())
        .then(data => setRecentData(data));

        if (token) {
            const from = startDate.toISOString();
            const to = endDate.toISOString();
            const headers = {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

            fetch(`${authedStockPoint}?from=${from}&to=${to}`, { headers })
            .then((res) => res.json())
            .then(data => {
                return (
                    data.map(entry => {
                        return {
                            date: entry.timestamp.substr(0, 10),
                            open: entry.open,
                            high: entry.high,
                            low: entry.low,
                            close: entry.close,
                            volumes: entry.volumes
                        }
                    })
                )
            })
            .then(entries => setauthData(entries))
            .catch((e) => console.log(e));
        }
        
    }, [stockPoint, authedStockPoint, endDate, startDate, token]);

    function PriceTable() {
        const priceColumns = [
            {headerName: "Date", field: "date", sortable: true},
            {headerName: "Open ($)", field: "open", sortable: true, width: 100},
            {headerName: "High ($)", field: "high", sortable: true, width: 100},
            {headerName: "Low ($)", field: "low", sortable: true, width: 100},
            {headerName: "Close ($)", field: "close", sortable: true, width: 100},
            {headerName: "Volumes", field: "volumes", sortable: true, flex: 1}
        ];

        if (token) {
            return (
                <div align="left">
                    <div className="ag-theme-alpine-dark" style={{
                        width: "720px"}}>
                        <AgGridReact
                            columnDefs={priceColumns}
                            rowData={authData}
                            pagination={true}
                            paginationPageSize={5}
                            domLayout="autoHeight"
                            rowClass="rowStyle"
                        />
                    </div>
                </div>
            )  
        } else if (!token) { 
            if (recentData.timestamp) var date = recentData.timestamp.substr(0, 10);
            recentData.date = date;

            return (
                <div align="left">
                    <div className="ag-theme-alpine-dark" style={{
                        width: "725px"}}>
                        <AgGridReact
                            columnDefs={priceColumns}
                            rowData={[recentData]}
                            domLayout="autoHeight"
                        />
                    </div>
                </div>
            )
        }
        
    }

    function Graph() {
        if (!token) return <p></p>
        const state = {
            labels: authData.map(entry => entry.date).reverse(),
            datasets: [
                {
                    data: authData.map(entry => entry.close).reverse(),
                    borderWidth: 1,
                    pointRadius: 0.1,
                }
            ]
        }

        return (
            <div>
                <Line 
                data={state}
                options={{
                    title:{
                        display: true,
                        text: `${recentData.name} - Close Price`,
                    },
                    legend:{
                        display: false
                    }
                }}
                />
            </div>
        )
    }
    return (
        <div className="centered">
            <h1>{recentData.name} <Badge color="info">{recentData.symbol}</Badge></h1>
            <h5><Badge color="secondary">{recentData.industry}</Badge></h5>
            <DatePicker />
            <PriceTable />
            <FooterMessage />
            <Graph />
        </div>  
    )
}