import React from "react";
import "./Hourly.scss";

export const Hourly = (props) => {
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const formatTime = (date) => {
    const formatted = new Date(date * 1000);
    return formatted.toLocaleTimeString([], timeOptions);
  };

  return (
    <div className="weather-hourly mySwiper">
      <div className="swiper-wrapper">
        {props.data &&
          props.data.slice(0, 23).map((h, i) => (
            <div className="hourly swiper-slide" key={i}>
              <h3 className="hourly-time">{formatTime(h.dt)}</h3>
              <h3 className="hourly-degrees">{Math.round(h.temp - 273.15)}°</h3>
            </div>
          ))}
      </div>
      <div className="swiper-button-next swiper-nav text-white"></div>
      <div className="swiper-button-prev swiper-nav text-white"></div>
    </div>
  );
}
