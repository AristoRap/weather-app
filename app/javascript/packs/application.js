// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import React from "react"
import ReactDOM from "react-dom";

Rails.start()
Turbolinks.start()
ActiveStorage.start()


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";

// Internal imports, e.g:
import { App } from "../components/app/App";
import { Favorites } from "../components/favorites/Favorites";
import { loadSwiperCarousel } from "../plugins/init_swiper";


document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById("app");
  const favorites = document.getElementById("favorites");
  if (app) {
    ReactDOM.render(<App />, app);
    loadSwiperCarousel();
  } else if (favorites) {
    ReactDOM.render(<Favorites />, favorites);
  }
});
