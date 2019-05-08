const form = document.querySelector('form');
const radiusKMField = document.querySelector('input');

navigator.geolocation.getCurrentPosition(position => {
  console.log(position.coords.longitude, position.coords.latitude);

  const myMap = L.map('myMap').setView([position.coords.latitude, position.coords.longitude], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'This is the Jakes map'
  }).addTo(myMap);

  L.marker([position.coords.latitude, position.coords.longitude])
  .bindPopup('We are here!')
  .addTo(myMap);

  const layerGroup = L.layerGroup().addTo(myMap);

  form.addEventListener('submit', ev => {
    ev.preventDefault();

    const inputValue = radiusKMField.value;

    radiusKMField.value = '';

    fetch('/shops/getByDistance', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({radius: inputValue, longitude: position.coords.longitude, latitude: position.coords.latitude})
    })
    .then(response => response.json())
    .then(restaurants => {
      layerGroup.clearLayers();
      restaurants.forEach(restaurant => {
        L.marker([restaurant.location.coordinates[1], restaurant.location.coordinates[0]])
        .bindPopup(`<h3>Name of the shop: ${restaurant.name}</h3>
                    <p>Cheapest dish: <strong>${restaurant.cheapestDish}$</strong></p>
                    <p>Distance from you: ${Math.round(restaurant.dist.calculated)}</p>`).addTo(layerGroup);
      })

      myMap.setView([position.coords.latitude, position.coords.longitude], 7);
    })
    .catch(error => console.log(error))
  })

})
