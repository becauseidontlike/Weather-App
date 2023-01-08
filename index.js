function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#write-in");
  console.log(searchInput.value);
  search(searchInput.value);
 }

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSearch);

function search(city) {
  let apiKey = "8fce6cea2c137d0262b10c9613860590";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8fce6cea2c137d0262b10c9613860590`;
  axios.get(apiUrl).then(showT);
}

search("Krakow");

function showT(response) {
  let description = document.querySelector(".current");
  let windy = document.querySelector(".speed");
  let rain = document.querySelector(".humid");
  let h2 = document.querySelector(".actualTemp");
  let current = document.querySelector("h1");
  let iconElement = document.querySelector("#icon");
  description.innerHTML = response.data.weather[0].description;
  windy.innerHTML = Math.round(response.data.wind.speed);
  rain.innerHTML = response.data.main.humidity;

  celsiusTemp = response.data.main.temp;

  h2.innerHTML = Math.round(response.data.main.temp);
  current.innerHTML = `${response.data.name}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description);
}

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

function showFTemp(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let CTemp = document.querySelector(".actualTemp");
  let fTemp = (celsiusTemp * 9) / 5 + 32;
  CTemp.innerHTML = Math.round(fTemp);
}


function showCTemp(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let CTemp = document.querySelector(".actualTemp");
  CTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheitT");
fahrenheitLink.addEventListener("click", showFTemp);

let celsiusLink = document.querySelector("#celsiusT");
celsiusLink.addEventListener("click", showCTemp);