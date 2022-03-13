import React from 'react'
import "./Daily.scss";

export const Daily = (props) => {
  const dateOptions = {
    weekday: "long"
  };
  const formatDate = (date) => {
    const formatted = new Date(date * 1000);
    return formatted.toLocaleDateString("en-US", dateOptions);
  };
  return (
    <div className="weather-forecast">
      {props.data &&
        props.data.slice(1, 7).map((d, i) => (
          <div className="daily" key={i}>
            <h3 className="daily-day">{formatDate(d.dt)}</h3>
            <div className="d-flex justify-content-between">
              <h3 className="daily-weather">
                <i className="fa-solid fa-sun"></i>
              </h3>
              <div className="daily-degrees">
                <h3 className="daily-degrees-high">
                  {Math.round(d.temp.max - 273.15)}°
                </h3>
                <h3 className="daily-degrees-low">
                  {Math.round(d.temp.min - 273.15)}°
                </h3>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
