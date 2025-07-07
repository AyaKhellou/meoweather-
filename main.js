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

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;



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
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then((result) => result.json())
    .then((myData)=>{

        if (!myData || !myData.weather || !myData.main) throw new Error("Invalid data");

        weatherDescription.textContent = `hi, ${myData.weather[0].description} today 😊`;

        weatherIcon.src = customIcons[myData.weather[0].icon] || icon01d;


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
        weatherIcon.src = noResultIcon;

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
