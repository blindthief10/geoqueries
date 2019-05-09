const form = document.querySelector('form');
const radiusKMField = document.querySelector('input');

navigator.geolocation.getCurrentPosition(async position => {
  const usersLatitutde = position.coords.latitude;
  const usersLongitude = position.coords.longitude;

  const myMap = L.map('myMap').setView([usersLatitutde, usersLongitude], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'This is the Jakes map'
  }).addTo(myMap);

  L.marker([usersLatitutde, usersLongitude])
  .bindPopup('We are here!')
  .addTo(myMap);

  const layerGroup = L.layerGroup().addTo(myMap);

  form.addEventListener('submit', ev => {
    ev.preventDefault();

    const inputValue = radiusKMField.value;

    radiusKMField.value = '';

    const response = await fetch('/shops/getByDistance', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({radius: inputValue, longitude: usersLongitude, latitude: usersLatitutde})
    });

    const restaurants = await response.json();

    layerGroup.clearLayers();
    restaurants.forEach(restaurant => {
      L.marker([restaurant.location.coordinates[1], restaurant.location.coordinates[0]])
      .bindPopup(`<h3>Name of the shop: ${restaurant.name}</h3>
                  <p>Cheapest dish: <strong>${restaurant.cheapestDish}$</strong></p>
                  <p>Distance from you: ${Math.round(restaurant.dist.calculated)}</p>`).addTo(layerGroup);
    })

    myMap.setView([usersLatitutde, usersLongitude], 7);


})
