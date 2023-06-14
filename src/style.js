function displayTemperature(response) {
  console.log(response.data.condition.description);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
}

let apiKey = "2fffe23940fcdata45965eb10o0309a4";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;
console.log(apiURL);
axios.get(apiURL).then(displayTemperature);
