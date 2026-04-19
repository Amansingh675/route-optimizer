export async function getWeather(lat: number, lon: number) {
  const API_KEY = "b4000c79e2f92ce3c444a6d9fd237f16";

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const data = await res.json();

  return data.weather[0].main; // Rain / Clear / Clouds
}