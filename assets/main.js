var date = document.querySelector(".date")
    setInterval(function(){
      date.textContent = moment().format("MMMM Do YYYY")})

let weather = {
  apiKey: "6af174eb1acf790c330054f1967a6d0f",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&units=imperial&appid=" + this.apiKey, {SameSite:"None"}
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
    },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, date, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = name;
    document.querySelector(".temp").innerHTML = temp + "°F";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".humidity").innerHTML =
      "Humidity: " + humidity + "%";
    document.querySelector(".speed").innerHTML =
      "Wind Speed: " + speed + "mph ";
  }
}
