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

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // create marker extend the mark bound
  const el = document.createElement("div");
  el.className = "marker";

  new mapboxgl.Marker({
    element: el,
    anchor: "bottom",
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // add pop-up
  new mapboxgl.Popup()
    .setLngLat(loc.coordinates)
    .setHTML("<p>Day ${loc.day}: ${loc.description}</p>")
    .addTo(map);

  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100,
  },
});
