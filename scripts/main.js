
const statusText = document.getElementById("status");
const radiusSlider = document.getElementById("radiusSlider");
const radiusDisplay = document.getElementById("radiusDisplay");
const fuelType = document.getElementById("fuelType");
const langButtons = document.querySelectorAll(".lang-btn");

let map, marker, userMarker;

radiusSlider.addEventListener("input", () => {
  radiusDisplay.textContent = `(${radiusSlider.value} km)`;
  if (userMarker) fetchStations();
});

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.documentElement.lang = btn.dataset.lang;
  });
});

function fetchStations() {
  const { lat, lng } = userMarker.getLatLng();
  const rad = radiusSlider.value;
  const type = fuelType.value;

  fetch(`/api/tankstellen.js?lat=${lat}&lng=${lng}&rad=${rad}&type=${type}`)
    .then(res => res.json())
    .then(data => {
      if (!data.ok) throw new Error(data.message);
      marker?.remove();
      data.stations.forEach(s => {
        L.marker([s.lat, s.lng])
          .addTo(map)
          .bindPopup(`${s.name}<br>${s.price} €`);
      });
    })
    .catch(err => {
      statusText.textContent = "❌ Fehler beim Abrufen der Tankstellen.";
      console.error("Fehler:", err.message);
    });
}

navigator.geolocation.getCurrentPosition(
  pos => {
    const { latitude, longitude } = pos.coords;
    map = L.map("map").setView([latitude, longitude], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    userMarker = L.marker([latitude, longitude], { icon: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [32, 32] }) }).addTo(map).bindPopup("📍 Dein Standort");
    fetchStations();
  },
  () => {
    statusText.textContent = "❌ Standortzugriff abgelehnt.";
  }
);
