const api_key = '8de00c3e50fab8039d396f04085faf77';

const getWeather = async (city) => {
  const api_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`;
  try {
    const response = await fetch(api_url);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    const { lon: longitude, lat: latitude } = data[0];

    const api_url_2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;
    const response_2 = await fetch(api_url_2);
    if (!response_2.ok) throw new Error('Weather not found');
    return await response_2.json();
  } catch (err) {
    console.error(err);
  }
};

const displayData = (data, city) => {
  const toTime = ts => new Date(ts * 1000).toLocaleTimeString();
  const container = document.getElementById('weather-details');
  container.innerHTML = `
    <h1>${city}</h1>
    <div class="data-container">
      <span><h2>Time</h2> <h3>${toTime(data.current.sunrise)}</h3></span>
      <span><h2>Temperature</h2> <h3>${data.current.temp}°C</h3></span>
      <span><h2>Humidity</h2> <h3>${data.current.humidity}%</h3></span>
      <span><h2>Pressure</h2> <h3>${data.current.pressure} hPa</h3></span>
      <span><h2>Wind Speed</h2> <h3>${data.current.wind_speed} m/s</h3></span>
      <span><h2>Clouds</h2> <h3>${data.current.clouds}%</h3></span>
      <span><h2>Sunset</h2> <h3>${toTime(data.current.sunset)}</h3></span>
    </div>
  `;
};

document.getElementById('get-weather').addEventListener('click', async () => {
  const city = document.getElementById('city-name').value.trim();
  if (!city) return alert('Please enter a city name');
  const data = await getWeather(city);
  if (data) displayData(data, city);
});

document.getElementById('city-name').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('get-weather').click();
  }
});