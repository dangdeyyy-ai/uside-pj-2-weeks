const apiKey = "bff8437b16a728e963c0cb8aa995deb7";

// FETCH URL
async function fetchWeather(url, forecastUrl) {
    const [nowRes, forecastRes] = await Promise.all([
        fetch(url),
        fetch(forecastUrl),
    ]);

    if (!nowRes.ok) throw new Error("Không tìm thấy dữ liệu!");

    const nowData = await nowRes.json();
    const forecastData = await forecastRes.json();

    return { nowData, forecastData };
}

// DATA
function renderCurrentWeather(data) {
    document.getElementById("hcmDegree").textContent = data.main.temp + "°C";
    document.getElementById("hcmDes").textContent = data.weather[0].description;
    document.getElementById(
        "hcmWeatherIcon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    document.getElementById("hcmFL").textContent = data.main.feels_like + "°C";
    document.getElementById("hcmHumi").textContent = data.main.humidity + "%";
    document.getElementById("hcmVisi").textContent =
        data.visibility / 1000 + " km";
    document.getElementById("hcmPr").textContent = data.main.pressure + " hPa";
    document.getElementById("hcmWind").textContent = data.wind.speed + " m/s";
}

// NEXT 12H FUNCTION
function renderNext12Hours(forecast) {
    const card = document.querySelector(".hourly-forecast .card");
    card.innerHTML = "";

    forecast.slice(0, 5).forEach((item) => {
        const start = new Date(item.dt * 1000);
        const startHour = start.getHours().toString().padStart(2, "0") + ":00";

        const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
        const endHour = end.getHours().toString().padStart(2, "0") + ":00";

        card.innerHTML += `
            <div class="hour-card">
                <div class="h-time">${startHour} - ${endHour}</div>
                <img class="h-icon" src="https://openweathermap.org/img/wn/${
                    item.weather[0].icon
                }@4x.png">
                <div class="h-temp">${Math.round(item.main.temp)}°C</div>
                <div class="h-des">${item.weather[0].description}</div>
            </div>
        `;
    });
}

// NEXT 5 DAYS FUNCTION
function renderNext5Days(forecast) {
    const days = document.querySelector(".daily-forecast .days");
    days.innerHTML = "";

    const dayGroups = {};

    forecast.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString("vi-VN");

        if (!dayGroups[dayKey]) {
            dayGroups[dayKey] = [];
        }
        dayGroups[dayKey].push(item);
    });

    const next5 = Object.values(dayGroups).slice(0, 5);

    next5.forEach((dayList) => {
        const temps = dayList.map((d) => d.main.temp);
        const minTemp = Math.round(Math.min(...temps));
        const maxTemp = Math.round(Math.max(...temps));

        const noon =
            dayList.find((d) => new Date(d.dt * 1000).getHours() === 12) ||
            dayList[0];

        const icon = noon.weather[0].icon;
        const des = noon.weather[0].description;

        const date = new Date(noon.dt * 1000);
        const weekday = date.toLocaleDateString("vi-VN", { weekday: "long" });

        days.innerHTML += `
        <div class="day-card">
            <div class="d-time">${weekday}</div>
            <img class="d-icon" src="https://openweathermap.org/img/wn/${icon}@4x.png">
            <div class="d-temp">${minTemp} - ${maxTemp}°C</div>
            <div class="d-des">${des}</div>
        </div>`;
    });
}

// HCM DATA FUNCTION
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Ho Chi Minh&appid=${apiKey}&units=metric&lang=vi`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Ho Chi Minh&appid=${apiKey}&units=metric&lang=vi`;

    try {
        const { nowData, forecastData } = await fetchWeather(url, forecastUrl);

        document.getElementById("cityName").textContent =
            nowData.name + ", " + nowData.sys.country;

        renderCurrentWeather(nowData);
        renderNext12Hours(forecastData.list);
        renderNext5Days(forecastData.list);
    } catch (e) {
        console.error(e);
    }
}

// WORLD DATA FUNCTION
async function worldWeather(city) {
    if (!city) return alert("⚠ Vui lòng nhập tên thành phố!");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=vi`;

    try {
        const { nowData, forecastData } = await fetchWeather(url, forecastUrl);

        document.getElementById("cityName").textContent =
            nowData.name + ", " + nowData.sys.country;

        renderCurrentWeather(nowData);
        renderNext12Hours(forecastData.list);
        renderNext5Days(forecastData.list);
    } catch (err) {
        console.error(err);
    }
}

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) worldWeather(city);
});

getWeather();
setInterval(getWeather, 300000);
