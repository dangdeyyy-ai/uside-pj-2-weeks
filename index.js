const apiKey = "bff8437b16a728e963c0cb8aa995deb7";
const lat = 10.8231;
const lon = 106.6297;

// GET API DATA
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;
    try {
        const [resNow, resForecast] = await Promise.all([
            fetch(url),
            fetch(forecastUrl),
        ]);
        const dataNow = await resNow.json();
        const dataForecast = await resForecast.json();

        // HCM CURRENT DATA

        // DEGREE
        document.getElementById("hcmDegree").textContent =
            dataNow.main.temp + "°C";
        // DESCRIPTION
        document.getElementById("hcmDes").textContent =
            dataNow.weather[0].description;
        // ICON
        const iconCode = dataNow.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        document.getElementById("hcmWeatherIcon").src = iconUrl;
        // FEEL LIKE
        document.getElementById("hcmFL").textContent =
            dataNow.main.feels_like + "°C";
        // HUMIDITY
        document.getElementById("hcmHumi").textContent =
            dataNow.main.humidity + "%";
        // VISIBILITY
        document.getElementById("hcmVisi").textContent =
            dataNow.visibility / 1000 + " km";
        // PRESSURE
        document.getElementById("hcmPr").textContent =
            dataNow.main.pressure + " hPa";
        // WIND SPEED
        document.getElementById("hcmWind").textContent =
            dataNow.wind.speed + " m/s";
        const container = document.querySelector(".hourly-forecast .container");
        container.innerHTML = "";

        // WEATHER FORECAST NEXT 12 HOURS
        const next12 = dataForecast.list.slice(0, 5);

        next12.forEach((item) => {
            const time = new Date(item.dt * 1000);
            const hour = time.getHours().toString().padStart(2, "0") + ":00";

            const icon = item.weather[0].icon;
            const temp = Math.round(item.main.temp);
            const des = item.weather[0].description;

            const card = document.createElement("div");
            card.classList.add("hour-card");

            card.innerHTML = `
                <div class="h-time">${hour}</div>
                <img class="h-icon" src="https://openweathermap.org/img/wn/${icon}@4x.png">
                <div class="h-temp">${temp}°C</div>
                <div class="h-des">${des}</div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

getWeather();

setInterval(() => {
    getWeather();
}, 300000);
