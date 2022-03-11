import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.scss";

export const Form = (props) => {
  const [location, setLocation] = useState('')
  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={submitHandler} className="form">
      <input
        type="text"
        aria-label="location"
        className="form-input"
        placeholder="Search for a city"
        value={location}
        onChange={e => setLocation(e.target.value)}
        />
      <button type="submit" className="form-submit">
        <i class="fas fa-search form-icon"></i>
      </button>
    </form>
  )
}
