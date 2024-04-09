// global variables
document.addEventListener("DOMContentLoaded", function () {
  const weatherAPIKey = "f812babb8e064a3fb3c6e4e0ffd5591d";
  const weatherUrl = "http://api.openweathermap.org";

  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const todayContainer = document.querySelector("#today");
  const forecastContainer = document.querySelector("#forecast");

  // weather function
  function weather(event) {
    event.preventDefault();
    const cityName = searchInput.value;

    // fetching data
    fetch(`${weatherUrl}/geo/1.0/direct?q=${cityName}&appid=${weatherAPIKey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        console.log(latitude, longitude);

        fetch(
          `${weatherUrl}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            forecastContainer.innerHTML = "";

            // display 5 day forecast
            for (let i = 0; i < 5; i++) {
              const forecastItem = data.list[i];
              const dateTime = forecastItem.dt_txt;
              const temperature = forecastItem.main.temp;
              const windSpeed = forecastItem.wind.speed;
              const humidity = forecastItem.main.humidity;

              const forecastCard = document.createElement("div");
              forecastCard.classList.add("forecast-card");

              const dateElement = document.createElement("p");
              dateElement.textContent = `Date & Time: ${dateTime}`;

              const tempElement = document.createElement("p");
              tempElement.textContent = `Temperature: ${temperature} K`;

              const windElement = document.createElement("p");
              windElement.textContent = `Wind Speed: ${windSpeed} m/s`;

              const humidityElement = document.createElement("p");
              humidityElement.textContent = `Humidity: ${humidity}%`;

              forecastCard.appendChild(dateElement);
              forecastCard.appendChild(tempElement);
              forecastCard.appendChild(windElement);
              forecastCard.appendChild(humidityElement);

              forecastContainer.appendChild(forecastCard);
            }
          })
          .catch((error) => {
            console.error("Error fetching forecast data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
      });
  }

  searchForm.addEventListener("submit", weather);
});
