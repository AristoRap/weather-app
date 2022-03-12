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
    <div>
      {
        props.data && props.data.slice(0,6).map((h, i) => (
          <div className="hourly" key={i}>
            <h3 className="hourly-time">{formatTime(h.dt)}</h3>
            <h3 className="hourly-degrees">{Math.round(h.temp - 273.15)}°</h3>
          </div>
        ))
      }
     </div>
  )
}
