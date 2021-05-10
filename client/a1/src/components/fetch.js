import {useState, useEffect} from 'react';

const API = "http://131.181.190.87:3000";

export default function FetchStocks(search) {
  const [rowData, setRowData] = useState([]);
  var stocksEndpoint = `${API}/stocks/symbols`;
  
  if (search) stocksEndpoint = `${API}/stocks/symbols?industry=${search}`;

  useEffect(() => {
      fetch(stocksEndpoint)
        .then(res => res.json())
        .then(data => {
          if (data.error) console.log(data.message)
          return (
            data.map(stock => {
              return {
                name: stock.name,
                symbol: stock.symbol,
                industry: stock.industry
              };
            })
          ) 
        })
        .then(stocks => setRowData(stocks))
        .catch((e) => console.log(e));
  }, [search, stocksEndpoint])

  return rowData;
}