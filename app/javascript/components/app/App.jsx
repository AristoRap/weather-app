import React, { useState, useEffect } from "react";
import { Form } from "../form/Form";
import { Hourly } from "../hourly/Hourly";
import { Daily } from "../daily/Daily";
import axios from "axios";
import "./App.scss";

export const App = (props) => {
  const [weather, setWeather] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [user, setUser] = useState({});

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
    const formatted = new Date(date)
    return formatted.toLocaleDateString("en-US", dateOptions);
  })

  const updateIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <i className="fa-solid fa-sun yellow"></i>;
      case "Drizzle":
        return <i className="fa-solid fa-cloud-rain dark"></i>;
      case "Clouds":
        return <i className="fa-solid fa-cloud dark"></i>;
      case "Rain":
        return <i className="fa-solid fa-cloud-showers-heavy dark"></i>;
    }
  }

  const submitSearch = (data) => {
    setCurrentWeather(data.result);
  };

  useEffect(() => {
    fetch('/',{
      method: "GET",
      headers: { Accept: "application/json" },
    })
    .then(response => response.json())
    .then(data => {
      setUser(data);
    })
  }, []);

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
    const wrapper = document.querySelector('.wrapper') ;
    axios
    .get(mainUrl)
    .then((response) => {
      setWeather(response.data);
      const classIcon = currentWeather.weather && currentWeather.weather[0].main.toLowerCase();
      if (classIcon) {
        wrapper.className = 'wrapper'
        wrapper.classList.add(classIcon);
      }
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
            {updateIcon(
              currentWeather.weather && currentWeather.weather[0].main
            )}
          </h2>
        </div>
        <div className="weather-degrees">
          <h3 className="weather-degrees-high">
            <i className="fa-solid fa-angle-up mr-1"></i>
            {currentWeather.main &&
              Math.round(currentWeather.main.temp_max - 273.15)}
            °
          </h3>
          <h3 className="weather-degrees-low">
            <i className="fa-solid fa-angle-down mr-1"></i>
            {currentWeather.main &&
              Math.round(currentWeather.main.temp_min - 273.15)}
            °
          </h3>
        </div>
      </div>

      <Hourly data={weather && weather.hourly} />

      <Daily data={weather && weather.daily} />
    </div>
  );
};
