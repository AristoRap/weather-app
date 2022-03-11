import React from "react";
import './App.scss'

export const App = (props) => {
  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const today = new Date();
  return (
    <div id="main">
      <h2 className="city">{props.city}</h2>
      <h3 className="date">{today.toLocaleDateString("en-US", dateOptions)}</h3>
      <div id="weather-current"></div>
    </div>
  );
};



App.defaultProps = {
  city: "Amsterdam",
};
