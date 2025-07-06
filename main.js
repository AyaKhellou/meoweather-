let searchInput = document.querySelector('.searchBar input');

let searchIcon = document.querySelector('.searchBar i');

let weatherDescription = document.querySelector(".weather-des-card .weather-desc");

let temperature = document.querySelector(".temperature span .value");

let windSpeed = document.querySelector(".wind-speed .value");

let humidity = document.querySelector(".humidity .value");

let weatherIcon = document.querySelector(".weatherIcon img");

let sunriseHolder = document.querySelector(".sunRise span .value");
let sunsetHolder = document.querySelector(".sunSet span .value");

let details = [temperature ,windSpeed ,humidity ,sunriseHolder ,sunsetHolder];

const customIcons = {
    "01d": "sun.png",
    "01n": "moon.png",
    "02d": "sunny.png",
    "02n": "night.png",
    "03d": "cloud(1).png",
    "03n": "cloud(1).png",
    "04d": "clouds.png",
    "04n": "clouds.png",
    "09d": "heavy-rain.png",
    "09n": "heavy-rain.png",
    "10d": "cloudy.png",
    "10n": "rainy-night.png",
    "11d": "storm.png",
    "11n": "storm.png",
    "13d": "snow.png",
    "13n": "snow.png",
    "50d": "mist.png",
    "50n": "mist.png",
};

searchIcon.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
});



// FUNCTIONS
function handleSearch() {
    let cityName = searchInput.value.trim();
    if (!cityName) return;
    getData(cityName);
    window.localStorage.setItem("city", cityName);
}

function getData(city) {
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=97272d0f2201262866c7b7da22de9390`)
    .then((result) => result.json())
    .then((myData)=>{

        if (!myData || !myData.weather || !myData.main) throw new Error("Invalid data");

        weatherDescription.textContent = `hi, ${myData.weather[0].description} today 😊`;

        weatherIcon.src = "images/" + (customIcons[myData.weather[0].icon] || "sun.png");

        weatherIcon.alt = myData.weather[0].description;

        temperature.textContent = Math.round(myData.main.temp) + " °C";

        windSpeed.textContent = Math.round(myData.wind.speed * 3.6) + " Km/h";

        humidity.textContent = myData.main.humidity + "%";

        let sunrise = myData.sys.sunrise;
        let sunset = myData.sys.sunset;
        let timeZone = myData.timezone;

        let sunriseTime = new Date((sunrise + timeZone) * 1000);
        let sunsetTime = new Date((sunset + timeZone) * 1000);   

        sunriseHolder.textContent = sunriseTime.getUTCHours().toString().padStart(2, "0") + ":" + sunriseTime.getUTCMinutes().toString().padStart(2, "0");
        
        sunsetHolder.textContent = sunsetTime.getUTCHours().toString().padStart(2, "0") + ":" + sunsetTime.getUTCMinutes().toString().padStart(2, "0");
        
        let timeNow = (Date.now() / 1000) + timeZone;

        if (timeNow > sunrise && timeNow < sunset) {
                document.body.classList.remove("nightMode");
                document.body.classList.add("dayMode");
        }else {
                document.body.classList.add("nightMode");
                document.body.classList.remove("dayMode");
        }
        
    })
    .catch((err)=>{

        weatherDescription.textContent = "we're unable to find the city you entred";
        weatherIcon.src = "images/no-results.png";
        details.forEach(div => {
            div.textContent = "--";
        });
    })
    .finally(()=>{
        searchInput.focus();
        searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    })
}

window.addEventListener("load", function(){
    getData(window.localStorage.getItem("city") || "touggourt");
    searchInput.value = window.localStorage.getItem("city");
})
