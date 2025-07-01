const api_key = '8de00c3e50fab8039d396f04085faf77';

const getWeather = async (city) => {
    const api_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`;
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);
        const longitude = data[0].lon;
        const latitude = data[0].lat;
        const api_url_2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;
        try {
            const response_2 = await fetch(api_url_2);
            if (!response.ok) {
                throw new Error('Weather not found');
            }
            const data_2 = await response_2.json();
            console.log(data_2);
            return data_2;
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}

const displayData = (data,city) => {
    const weatherContainer = document.getElementById('weather-details');
    weatherContainer.innerHTML = `
    <h1 style="margin-bottom: 20px;">${city}</h1>
    <center>
    <div class="data-container">
    <span>
        <h2>Temperature </h2> <h3>${data.current.temp}</h3>
    </span>
    <br>
    <span>
        <h2>Humidity</h2> <h3>${data.current.humidity}</h3> 
    </span>
    <br>
    <span>
        <h2>Pressure </h2><h3>${data.current.pressure}</h3> 
    </span>
    <br>
    <span>
        <h2>Wind Speed </h2> <h3>${data.current.wind_speed}</h3> 
    </span>
    <br>
    <span>
        <h2>Clouds </h2> <h3>${data.current.clouds}</h3> 
    </span>
    <br>
    <span>
        <h2>Sunrise </h2> <h3>${data.current.sunrise}</h3> 
    </span>
    <br>
    <span>
        <h2>Sunset </h2> <h3>${data.current.sunset}</h3> 
    </span>
    </div>
    </center>
    `;
}
document.getElementById('get-weather').addEventListener('click', async() => {
    const city = document.getElementById('city-name').value;
    if (city) {
        const data = await getWeather(city);
        if(data) {
            displayData(data,city);
        }
    }
    else{
        alert('Please enter a city name');
    }
})