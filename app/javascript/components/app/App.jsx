import React, { useState, useEffect } from "react";
import { Form } from '../form/Form'
import axios from "axios";
import './App.scss'

export const App = (props) => {
  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const today = new Date();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${process.env.WEATHER_API}`;
  const [degrees, setDegrees] = useState([])
  console.log(url)
  useEffect(() =>{
    axios.get(url).then(response => console.log(response))
  },[])
  return (
    <div id="main">
      <Form />
      <h1 className="city">{props.city}</h1>
      <h3 className="date">{today.toLocaleDateString("en-US", dateOptions)}</h3>
      <div id="weather-current">
        <div className="weather-current">
          <h2 className="weather-degrees-main">11°C</h2>
          <h2 className="weather-icon">
            <i className="fa-solid fa-sun"></i>
          </h2>
        </div>
        <div className="weather-degrees">
          <h3 className="weather-degrees-high">
            <i className="fa-solid fa-angle-up"></i>
            17°
          </h3>
          <h3 className="weather-degrees-low">
            <i className="fa-solid fa-angle-down"></i>
            5°
          </h3>
        </div>
      </div>
      <div className="weather-hourly">
        {/* Here add "hourly" component by each hour */}
        <div className="hourly">
          <h3 className="hourly-time">Now</h3>
          <h3 className="hourly-degrees">11°</h3>
        </div>
      </div>
      <div className="weather-foreact">
        {/* Here add "forecast" component by each day */}
        <div className="daily">
          <h3 className="daily-day">Saturday</h3>
          <h3 className="daily-weather">
            <i className="fa-solid fa-sun"></i>
          </h3>
          <div className="daily-degrees">
            <h3 className="daily-degrees-high">11°</h3>
            <h3 className="daily-degrees-low">5°</h3>
          </div>
        </div>
      </div>
    </div>
  );
};



App.defaultProps = {
  city: "Amsterdam",
};
