// SELECTORS
let searchInput = document.querySelector('.searchBar input');
let searchButton = document.querySelector('.searchBar button');
let weatherDescription = document.querySelector(".weather-des-card .weather-desc");
let temperature = document.querySelector(".temperature .value");
let windSpeed = document.querySelector(".wind-speed .value");
let humidity = document.querySelector(".humidity .value");
let weatherIcon = document.querySelector(".weatherIcon img");
let sunriseHolder = document.querySelector(".sunRise .value");
let sunsetHolder = document.querySelector(".sunSet .value");

let details = [temperature ,windSpeed ,humidity ,sunriseHolder ,sunsetHolder];

// cat svg image 

async function loadCatSVG() {
    const response = await fetch(`/public/cat.svg`);
    const svgText = await response.text();
    
    document.getElementById("cat-container").innerHTML = svgText;
}

loadCatSVG();

// API KEY
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// ICONS IMPORTS
import icon01d from './images/sun.png';
import icon01n from './images/moon.png';
import icon02d from './images/sunny.png';
import icon02n from './images/night.png';
import icon03 from './images/cloud(1).png';
import icon04 from './images/clouds.png';
import icon09 from './images/heavy-rain.png';
import icon10d from './images/cloudy.png';
import icon10n from './images/rainy-night.png';
import icon11 from './images/storm.png';
import icon13 from './images/snow.png';
import icon50 from './images/mist.png';
import noResultIcon from './images/no-results.png'; 

const customIcons = {
    "01d": icon01d,
    "01n": icon01n,
    "02d": icon02d,
    "02n": icon02n,
    "03d": icon03,
    "03n": icon03,
    "04d": icon04,
    "04n": icon04,
    "09d": icon09,
    "09n": icon09,
    "10d": icon10d,
    "10n": icon10n,
    "11d": icon11,
    "11n": icon11,
    "13d": icon13,
    "13n": icon13,
    "50d": icon50,
    "50n": icon50
};

// EVENT LISTENERS and click handlers
searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
});



// FUNCTIONS
function handleSearch() {
    let cityName = searchInput.value.trim();
    if (!cityName) return;
    fetchWeather(cityName);
    window.localStorage.setItem("city", cityName);
}

function fetchWeather(city) {
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then((result) => result.json())
    .then((myData)=>{
        if (!myData || !myData.weather || !myData.main) throw new Error("Invalid data"); // to trigger catch block if data is invalid
        updateWeatherUI(myData)
    })
    .catch((err)=>{
        weatherDescription.textContent = "City not found!";
        weatherIcon.src = noResultIcon;
        details.forEach(div => {
            div.textContent = "!!";
        });
    })
    .finally(()=>{
        searchInput.focus();
        searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    })
}

// update UI with fetched data
function updateWeatherUI(data){
    searchInput.value = data.name;
    weatherDescription.textContent = `${data.weather[0].description} today in ${data.name}, ${data.sys.country}`;
    // set weather icon
    weatherIcon.src = customIcons[data.weather[0].icon] || icon01d;
    weatherIcon.alt = data.weather[0].description;        

    temperature.textContent = Math.round(data.main.temp) + " °C";
    windSpeed.textContent = Math.round(data.wind.speed * 3.6) + " Km/h";
    humidity.textContent = data.main.humidity + "%";

    updateSunTimes(data)
}

function updateSunTimes(data){
    //get sunrise and sunset time from API data
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    let timeZone = data.timezone;
    // calculate sunrise and sunset time based on timezone
    let sunriseTime = new Date((sunrise + timeZone) * 1000);
    let sunsetTime = new Date((sunset + timeZone) * 1000);   

    // format time to HH:MM
    sunriseHolder.textContent = sunriseTime.getUTCHours().toString().padStart(2, "0") + ":" + sunriseTime.getUTCMinutes().toString().padStart(2, "0");
    sunsetHolder.textContent = sunsetTime.getUTCHours().toString().padStart(2, "0") + ":" + sunsetTime.getUTCMinutes().toString().padStart(2, "0");

    updateDayNightMode(timeZone,sunrise,sunset)

}

// set day mode or night mode based on current time

function updateDayNightMode(timeZone,sunrise,sunset){
    let timeNow = (Date.now() / 1000) + timeZone;

    if (timeNow > sunrise && timeNow < sunset) {
        document.body.classList.remove("nightMode");
        document.body.classList.add("dayMode");
    }else {
        document.body.classList.add("nightMode");
        document.body.classList.remove("dayMode");
    }
}

function showInitialState() {
    weatherDescription.textContent = "Allow location access or search for a city 😊";
    weatherIcon.src = icon01d; 
    
    details.forEach(div => {
        div.textContent = "--";
    });

    document.body.classList.remove("nightMode");
    document.body.classList.add("dayMode");
}

function fetchWeatherByCoords(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then(res => res.json())
        .then(data => {
            if (!data || !data.weather || !data.main) throw new Error();
            updateWeatherUI(data);
        })
        .catch(() => showInitialState());
}


function getUserLocation() {
    if (!navigator.geolocation) {
        showInitialState();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        },
        () => {
            showInitialState();
        }
    );
}

        
window.addEventListener("load", () => {
    const savedCity = localStorage.getItem("city");

    if (savedCity) {
        fetchWeather(savedCity);
        searchInput.value = savedCity;
    } else {
        getUserLocation();
    }
});
