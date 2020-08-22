/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */

/* eslint-disable */
const locations = JSON.parse(document.getElementById("map").dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXl1c2gwMDciLCJhIjoiY2tlNWJheHN4MTFmNzJ4bXNlNmo2bXFlZyJ9.b3XL6Bz2Jys3fd0QQ-Iejw";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/ayush007/cke5chyyh20cy1aoxco85b3nb/draft",
  //   center: [-118.113491, 34.111745],
  //   zoom: 10,
  //   interactive: false,
});

const bounds = new mapboxgl.LatLangBounds();

locations.forEach(loc => {
    const el
})