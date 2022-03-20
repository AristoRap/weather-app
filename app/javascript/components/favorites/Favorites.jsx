import React, { useState, useEffect } from "react";
import "./Favorites.scss";
import axios from "axios";

export const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [favWeather, setFavWeather] = useState([]);

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
  };

  useEffect(() => {
    fetch("favorites", {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data);
        document.body.style.backgroundColor = "#6EBF8B";
      });
  }, []);

  useEffect(() => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/onecall?'
    const apiKey = `&appid=${process.env.WEATHER_API}`
    let query;

    favorites.forEach((favorite) => {
      query = `lat=${favorite && favorite.lat}&lon=${favorite && favorite.lon}`;
      axios
        .get(`${urlBase}${query}${apiKey}`)
        .then((response) => {
          setFavWeather(favWeather => [...favWeather, response.data]);
        })
        .catch((err) => {
          const mute = err;
        });
    })
  }, [favorites])

  console.log(favWeather)
  return (
    <div className="favorites">
      {favWeather &&
        favWeather.map((favWeather, i) => (
          <div
            className="favorite-wrapper"
            key={i}
          >
            <h2 className='p-3'>{favorites[i].name}</h2>
            <div className="fav-weather p-3">
              <h2 className="fav-weather-icon">
                {updateIcon(
                  favWeather.current && favWeather.current.weather[0].main
                )}
              </h2>
              <h3 className="favorite-degrees-high flex-grow-1">
                {favWeather.current &&
                  Math.round(favWeather.current.temp - 273.15)}
                °C
              </h3>
            </div>
          </div>
        ))}
    </div>
  );
};
