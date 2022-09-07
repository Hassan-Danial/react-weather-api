import { useState } from "react";
import "./search.css";
import axios from "axios";
import Metrics from "../metrics/Metrics.js";

var data = require("./US_States.json");

export default function Search() {
  const [value, setValue] = useState("");
  const [isToggle, setToggle] = useState(false);
  const [metric_data, setmetric_data] = useState([]);
  const [listGraph] = useState([]);
  const [searchTermValue, setsearchTermValue] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=`;

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    let dataValues = [];
    // our api to fetch the search result
    try {

      axios
        .get(url + searchTerm + `&appid=957fd4528329f9863b439949994970ee`)
        .then((response) => {
          const data = [];
          data.push(response.data["main"].temp);
          data.push(response.data["main"].humidity);
          data.push(response.data["main"].pressure);

          setmetric_data(data);

          setsearchTermValue(searchTerm)
        });
      return dataValues;

    } catch (error) {
      console.log(error)
    }


  };
  function validateForm() {

    if (value.trim().length !== 0) {
      console.log('input value is NOT empty');
      setToggle(true)
    } else {
      alert('Enter US state name');

    }
  }

  return (
    <div className="App">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-inner">
          <input className='search-input' type="text" value={value} onChange={onChange} />
          <button
            onClick={() => {
              onSearch(value);
              validateForm()
            }}>{" "}Search{" "}
          </button>
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const name = item.name.toLowerCase();
              return (
                searchTerm && name.startsWith(searchTerm) && name !== searchTerm
              );
            })
            .map((item) => (
              <div
                onClick={() => { validateForm(); onSearch(item.name); }}
                className="dropdown-row"
                key={item.name}>
                {item.name}
              </div>
            ))}
        </div>

      </div>
      <div>
        {isToggle && <Metrics metrics_data={metric_data} listGraph={listGraph} searchTerm={searchTermValue} />}
      </div>

    </div>

  );
}
