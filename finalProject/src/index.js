let todayTime = new Date();
function dayValue(DayIndex) {
  let Day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return Day[DayIndex];
}
let currentDate = document.querySelector("#current-day-time");
let apiKey = "f1e5044fce63dedfebf7bf6f1c98f16b";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
currentDate.innerHTML = `${dayValue(
  todayTime.getDay()
)} ${todayTime.getHours()}:${todayTime.getMinutes()}`;

function showTemperatureCurrentCity(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  console.log(city);
  let temp = document.querySelector("#temperature");
  let displayCity = document.querySelector("#city-value");
  displayCity.innerHTML = city;
  temp.innerHTML = `${temperature}˚`;
}
function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${temperature}˚`;
}
function displayEnteredCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let displayCity = document.querySelector("#city-value");
  displayCity.innerHTML = input.value;
  let apiUrlCity = `${apiUrl}?q=${input.value}&appid=${apiKey}`;
  axios.get(`${apiUrlCity}`).then(showTemperature);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl2 = `${apiUrl}?lat=${lat}&lon=${long}&appid=${apiKey}`;
  axios.get(`${apiUrl2}`).then(showTemperatureCurrentCity);
}

function DisplayCurrentCity(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let cityName = document.querySelector("#special-form");
cityName.addEventListener("submit", displayEnteredCity);

function DisplayFarenhiet(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = "52˚";
}

function DisplayCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = "19˚";
}

let farenheitValue = document.querySelector("#farenheit-value");
farenheitValue.addEventListener("click", DisplayFarenhiet);

let celciusValue = document.querySelector("#celcius-value");
celciusValue.addEventListener("click", DisplayCelcius);

let currentCityName = document.querySelector("#current-city");
currentCityName.addEventListener("click", DisplayCurrentCity);
