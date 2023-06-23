function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let d;
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes} `;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sat", "Sun", "Mon", "Tues", "Wed", "Thu"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
                <div class="weather-forecast-day">Fri</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                  alt=""
                  with="36"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-maxtemp"> 18°</span
                  ><span class="weather-forecast-mintemp">10°</span>
                </div>
                </div>
              `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celcTemp = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celcTemp);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = "2fffe23940fcdata45965eb10o0309a4";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

function showfahrLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //update active interaction
  celcLink.classList.remove("active");
  //update far toactive when clicked
  fahrLink.classList.add("active");
  let fahrTemp = (celcTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrTemp);
}

function showfcelcLink(event) {
  event.preventDefault();
  celcLink.classList.add("active");
  fahrLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celcTemp);
}

let celcTemp = null;

let form = document.querySelector("#SearchForm");
form.addEventListener("submit", handleSubmit);

let fahrLink = document.querySelector("#fahrLink");
fahrLink.addEventListener("click", showfahrLink);

let celcLink = document.querySelector("#celcLink");
celcLink.addEventListener("click", showfcelcLink);

search("London");
displayForecast();
