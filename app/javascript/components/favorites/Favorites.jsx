import React, { useState, useEffect } from "react";
import "./Favorites.scss";

export const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [favWeather, setFavWeather] = useState([]);

  useEffect(() => {
    fetch("favorites", {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data);
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


  return (
    <div className="favorites">
      {
        favorites.map((f, i) => {
          <div className="favorite" key={i}>
            <h2>City</h2>
            <div className="d-flex">
              <h3 className="favorite-degrees-high">
                <i className="fa-solid fa-angle-up mr-1"></i>
                11°
              </h3>
              <h3 className="weather-degrees-low">
                <i className="fa-solid fa-angle-down mr-1"></i>
                7°
              </h3>
            </div>
          </div>;
        })
      }
    </div>
  )
};
