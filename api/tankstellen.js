
export default async function handler(req, res) {
  const { lat, lng, rad = 5, type = 'e5' } = req.query;
  const API_KEY = '7c70651b-0129-99e3-e7f3-b28255ddd859';
  const url = `https://creativecommons.tankerkoenig.de/json/list.php?lat=${lat}&lng=${lng}&rad=${rad}&sort=price&type=${type}&apikey=${API_KEY}`;
  try {
    const response = await fetch(url, { timeout: 7000 });
    const json = await response.json();
    res.status(200).json({ ok: true, stations: json.stations });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Fehler beim Abrufen der Tankstellen." });
  }
}
