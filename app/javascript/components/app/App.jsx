import React, { useState, useEffect } from "react";
import { Form } from "../form/Form";
import { Hourly } from "../hourly/Hourly";
import axios from "axios";
import "./App.scss";

export const App = (props) => {
  const [weather, setWeather] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});

  const mainUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${
    (currentWeather.coord && currentWeather.coord.lat) || "52.374"
  }&lon=${
    (currentWeather.coord && currentWeather.coord.lon) || "4.8897"
  }&appid=${process.env.WEATHER_API}`;
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=${process.env.WEATHER_API}`;

  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  const today = new Date();

  const formatDate = ((date) => {
    const formatted = new Date(date * 1000)
    return formatted.toLocaleDateString("en-US", dateOptions);
  })


  const submitSearch = (data) => {
    setCurrentWeather(data.result);
  };

  useEffect(() => {
    axios
    .get(currentUrl)
    .then((response) => {
      setCurrentWeather(response.data);
    })
    .catch((err) => {
      const mute = err;
    });
  }, []);

  useEffect(() => {
    axios
    .get(mainUrl)
    .then((response) => {
      setWeather(response.data);
    })
    .catch((err) => {
      const mute = err;
    });
  }, [currentWeather]);

  return (
    <div id="main">
      <Form submitSearch={submitSearch} />
      <h1 className="city">{currentWeather.name}</h1>
      <h3 className="date">{formatDate(today)}</h3>
      <div id="weather-current">
        <div className="weather-current">
          <h2 className="weather-degrees-main">
            {currentWeather.main &&
              Math.round(currentWeather.main.temp - 273.15)}
            °C
          </h2>
          <h2 className="weather-icon">
            <i className="fa-solid fa-sun"></i>
          </h2>
        </div>
        <div className="weather-degrees">
          <h3 className="weather-degrees-high">
            <i className="fa-solid fa-angle-up"></i>
            {currentWeather.main &&
              Math.round(currentWeather.main.temp_max - 273.15)}
            °
          </h3>
          <h3 className="weather-degrees-low">
            <i className="fa-solid fa-angle-down"></i>
            {currentWeather.main &&
              Math.round(currentWeather.main.temp_min - 273.15)}
            °
          </h3>
        </div>
      </div>
      <div className="weather-hourly">
        <Hourly data= {weather && weather.hourly} />
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
