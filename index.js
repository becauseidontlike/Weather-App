function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#write-in");
  let h1 = document.querySelector("h1");

  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  }
}

let form = document.querySelector("#form-search");
form.addEventListener("submit", search);

function showT(response) {
  console.log(response);
  console.log(response.data);
  console.log(response.data.wind.speed);
  console.log(response.data.main.humidity);
  console.log(response.data.weather[0].description);
  let opis = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let rainy = response.data.main.humidity;
  let tempC = Math.round(response.data.main.temp);
  let description = document.querySelector(".current");
  let windy = document.querySelector(".speed");
  let rain = document.querySelector(".humid");
  let h2 = document.querySelector(".actualTemp");
  let current = document.querySelector("h1");
  description.innerHTML = `${opis}`;
  windy.innerHTML = `${wind}`;
  rain.innerHTML = `${rainy}`;
  h2.innerHTML = `${tempC}℃`;
  current.innerHTML = `${response.data.name}`;
}

function test(event) {
  event.preventDefault();
  let apiKey = "8fce6cea2c137d0262b10c9613860590";
  let city = document.querySelector(".myCity").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8fce6cea2c137d0262b10c9613860590`;
  axios.get(apiUrl).then(showT);
}

form.addEventListener("submit", test);

function showPosition(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  console.log(position);
  let apiKey = "8fce6cea2c137d0262b10c9613860590";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8fce6cea2c137d0262b10c9613860590&units=metric`;
  axios.get(apiUrl).then(showT);
}

function getCurrentPos() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let position = document.querySelector("#searching-loc");
position.addEventListener("click", getCurrentPos);

let timing = document.querySelector(".time");
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timing.innerHTML = ` ${hours}:${minutes} `;

let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
];
let day = days[now.getDay()];

let today = document.querySelector(".today");
today.innerHTML = `${day}`;
