import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const app = document.getElementById('app');
app.innerHTML = `
  <h1>Tankstellen im Umkreis (5 km)</h1>
  <div id="map"></div>
`;

const map = L.map('map').setView([53.5511, 9.9937], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const marker = L.marker([lat, lng], {
      icon: L.divIcon({ className: 'user-location-marker', html: '📍' })
    }).addTo(map);
    map.setView([lat, lng], 13);
  }, () => {
    console.warn("Geolocation not allowed.");
  });
} else {
  console.warn("Geolocation not supported.");
}
