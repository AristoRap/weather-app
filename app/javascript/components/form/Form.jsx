import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.scss";

export const Form = (props) => {
  const [location, setLocation] = useState('')
  const [result, setResult] = useState({})
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location || 'Amsterdam'}&appid=${process.env.WEATHER_API}`;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!location || location === "") return;
    setLocation('')
    props.submitSearch({ result });
  }

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        const mute = err;
      });
  }, [location]);

  return (
    <div className="search">
      <form onSubmit={submitHandler} className="form">
        <input
          type="text"
          aria-label="location"
          className="form-input"
          placeholder="Search for a city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" className="form-submit">
          <i className="fas fa-search form-icon"></i>
        </button>
      </form>
      <ul className="list-inline form-results">
        {location === '' ? '' : <li key={result.id}>{result.name}</li>}
     </ul>
    </div>
  );
}
