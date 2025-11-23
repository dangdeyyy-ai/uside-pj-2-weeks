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

        // WEATHER FORECAST NEXT 12 HOURS
        const card = document.querySelector(
            ".hourly-forecast .container .card"
        );
        card.innerHTML = "";
        const next12 = dataForecast.list.slice(0, 5);

        next12.forEach((item) => {
            const start = new Date(item.dt * 1000);
            const startHour =
                start.getHours().toString().padStart(2, "0") + ":00";
            const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
            const endHour = end.getHours().toString().padStart(2, "0") + ":00";

            const icon = item.weather[0].icon;
            const temp = Math.round(item.main.temp);
            const des = item.weather[0].description;

            const hourCard = document.createElement("div");
            hourCard.classList.add("hour-card");

            hourCard.innerHTML = `
                <div class="h-time">${startHour} - ${endHour}</div>
                <img class="h-icon" src="https://openweathermap.org/img/wn/${icon}@4x.png">
                <div class="h-temp">${temp}°C</div>
                <div class="h-des">${des}</div>
            `;

            card.appendChild(hourCard);
        });

        // WEATHER FORECAST NEXT 7 DAYS
        const days = document.querySelector(".daily-forecast .container .days");
        days.innerHTML = "";
        const next7Days = dataForecast.list.filter((_, i) => i % 8 === 0);
        next7Days.forEach((day) => {
            const date = new Date(day.dt * 1000);
            const weekDay = date.toLocaleDateString("vi-VN", {
                weekday: "long",
            });

            const des = day.weather[0].description;
            const maxTemp = Math.round(day.main.temp_max);
            const minTemp = Math.round(day.main.temp_min);

            const dailyCard = document.createElement("div");
            dailyCard.classList.add("day-card");

            dailyCard.innerHTML += `
            <div class="day">
                <div class="d-time">${weekDay}</div>
                <img class="d-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png">
                <div class="d-temp">${minTemp} - ${maxTemp}°C</div>
                <div class="d-des">${des}</div>
            </div>
        `;

            days.appendChild(dailyCard);
        });
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

getWeather();

setInterval(() => {
    getWeather();
}, 300000);
