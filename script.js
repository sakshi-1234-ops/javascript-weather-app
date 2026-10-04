const API_KEY = "b950eafa10a746cab3362658260410";

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    const weatherDiv = document.getElementById("weather");

    if (city === "") {

        weatherDiv.innerHTML =
            "<p class='error'>Please enter a city name.</p>";

        return;
    }

    try {

        const url =
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Something went wrong");
        }

        weatherDiv.innerHTML = `

            <img
                src="https:${data.current.condition.icon}"
                alt="Weather icon"
            >

            <h2>${data.location.name}</h2>

            <div class="info">
                🌡️ Temperature:
                ${data.current.temp_c} °C
            </div>

            <div class="info">
                ☁️ Condition:
                ${data.current.condition.text}
            </div>

            <div class="info">
                💧 Humidity:
                ${data.current.humidity}%
            </div>

            <div class="info">
                💨 Wind:
                ${data.current.wind_kph} km/h
            </div>

        `;

    } catch (error) {

        weatherDiv.innerHTML =
            `<p class="error">${error.message}</p>`;

    }
}