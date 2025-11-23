// const apiKey = "bff8437b16a728e963c0cb8aa995deb7";
// const lat = 10.8231;
// const lon = 106.6297;

// // GET API DATA IN HCM
// async function getWeather() {
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;
//     try {
//         const [resNow, resForecast] = await Promise.all([
//             fetch(url),
//             fetch(forecastUrl),
//         ]);
//         const dataNow = await resNow.json();
//         const dataForecast = await resForecast.json();

//         // HCM CURRENT DATA

//         // DEGREE
//         document.getElementById("hcmDegree").textContent =
//             dataNow.main.temp + "°C";
//         // DESCRIPTION
//         document.getElementById("hcmDes").textContent =
//             dataNow.weather[0].description;
//         // ICON
//         const iconCode = dataNow.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
//         document.getElementById("hcmWeatherIcon").src = iconUrl;
//         // FEEL LIKE
//         document.getElementById("hcmFL").textContent =
//             dataNow.main.feels_like + "°C";
//         // HUMIDITY
//         document.getElementById("hcmHumi").textContent =
//             dataNow.main.humidity + "%";
//         // VISIBILITY
//         document.getElementById("hcmVisi").textContent =
//             dataNow.visibility / 1000 + " km";
//         // PRESSURE
//         document.getElementById("hcmPr").textContent =
//             dataNow.main.pressure + " hPa";
//         // WIND SPEED
//         document.getElementById("hcmWind").textContent =
//             dataNow.wind.speed + " m/s";

//         // WEATHER FORECAST NEXT 12 HOURS
//         const card = document.querySelector(
//             ".hourly-forecast .container .card"
//         );
//         card.innerHTML = "";
//         const next12 = dataForecast.list.slice(0, 5);

//         next12.forEach((item) => {
//             const start = new Date(item.dt * 1000);
//             const startHour =
//                 start.getHours().toString().padStart(2, "0") + ":00";
//             const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
//             const endHour = end.getHours().toString().padStart(2, "0") + ":00";

//             const icon = item.weather[0].icon;
//             const temp = Math.round(item.main.temp);
//             const des = item.weather[0].description;

//             const hourCard = document.createElement("div");
//             hourCard.classList.add("hour-card");

//             hourCard.innerHTML = `
//                 <div class="h-time">${startHour} - ${endHour}</div>
//                 <img class="h-icon" src="https://openweathermap.org/img/wn/${icon}@4x.png">
//                 <div class="h-temp">${temp}°C</div>
//                 <div class="h-des">${des}</div>
//             `;

//             card.appendChild(hourCard);
//         });

//         // WEATHER FORECAST NEXT 7 DAYS
//         const days = document.querySelector(".daily-forecast .container .days");
//         days.innerHTML = "";
//         const next7Days = dataForecast.list.filter((_, i) => i % 8 === 0);
//         next7Days.forEach((day) => {
//             const date = new Date(day.dt * 1000);
//             const weekDay = date.toLocaleDateString("vi-VN", {
//                 weekday: "long",
//             });

//             const des = day.weather[0].description;
//             const maxTemp = Math.round(day.main.temp_max);
//             const minTemp = Math.round(day.main.temp_min);

//             const dailyCard = document.createElement("div");
//             dailyCard.classList.add("day-card");

//             dailyCard.innerHTML += `
//             <div class="day">
//                 <div class="d-time">${weekDay}</div>
//                 <img class="d-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png">
//                 <div class="d-temp">${minTemp} - ${maxTemp}°C</div>
//                 <div class="d-des">${des}</div>
//             </div>
//         `;

//             days.appendChild(dailyCard);
//         });
//     } catch (error) {
//         console.error("Lỗi:", error);
//     }
// }

// const cityName = document.getElementById("cityName");
// const degree = document.querySelector(".degree");
// const description = document.querySelector("des");
// const feelLike = document.getElementById("hcmFL");
// const humidity = document.getElementById("hcmHumi");
// const pressure = document.getElementById("hcmPr");
// const wind = document.getElementById("hcmWind");
// const worldIcon = document.querySelector(".right top hero");

// // GET API DATA OVER THE WORLD
// async function worldWeather(city) {
//     const worldUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;
//     const worldForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=vi`;
//     try {
//         const [resUrl, resForecastUrl] = await Promise.all([
//             fetch(worldUrl),
//             fetch(worldForecastUrl),
//         ]);
//         if (!resNow.ok) throw new Error("Không tìm thấy thành phố!");
//         const dataWorldNow = await worldUrl.json();
//         const dataWorldForecast = await worldForecastUrl.json();

//         // GET API DATA

//         // CITY
//         cityName.textContent = (dataWorldNow.name, dataWorldNow.sys.country);
//         // DEGREE
//         degree.textContent = [dataWorldNow.main.temp + "°C"];
//         // DESCRIPTION
//         description.textContent = dataWorldNow.weather[0].description;
//         // ICON
//         worldIcon = dataWorldNow.weather[0].icon;
//     } catch (error) {
//         console.error("Lỗi:", error);
//     }
// }

// getWeather();

// setInterval(() => {
//     getWeather();
// }, 300000);

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

    const next7 = forecast.filter((_, i) => i % 8 === 0);

    next7.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const weekday = date.toLocaleDateString("vi-VN", { weekday: "long" });

        const min = Math.round(item.main.temp_min);
        const max = Math.round(item.main.temp_max);
        const icon = item.weather[0].icon;
        const des = item.weather[0].description;

        days.innerHTML += `
        <div class="day-card">
            <div class="d-time">${weekday}</div>
            <img class="d-icon" src="https://openweathermap.org/img/wn/${icon}@4x.png">
            <div class="d-temp">${min} - ${max}°C</div>
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
