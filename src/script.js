function searchCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#city-input").value;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = changeCity;
  let tempUrl = `https://api.openweathermap.org/data/2.5/weather?q=${changeCity}&units=metric`;
  let apiKey = "f8cf1918df495b424b75f902d7a988e4";

  axios.get(`${tempUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = `Wind speed: ${wind} mph`;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function currentTemp(response) {
  let temperatureElement = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temperatureElement;
  let location = response.data.name;
  let city = document.querySelector("#city-name");
  city.innerHTML = location;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f8cf1918df495b424b75f902d7a988e4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(currentTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  fahrenheit.classList.add("active");
  celcius.classList.remove("active");
}

function showCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
}

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = `Last updated: ${formatDate(now)}`;

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

let celciusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemp);

let position = document.querySelector("#location");
position.addEventListener("click", getCurrentPosition);
