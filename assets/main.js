//Displays date on current day card
var date = document.querySelector(".dates")
    setInterval(function(){
      date.textContent = moment().format("MMMM Do YYYY")})


//Object containing functions for current day and 5 day api fetch      
let weather = {
  apiKey: "6af174eb1acf790c330054f1967a6d0f",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&units=imperial&appid=" + this.apiKey)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
    },
//Function to fetch weather for current day card. Displays the city, date, temperature, icon, description, humidity, and wind speed for current day.
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const {lon, lat} = data.coord;
    console.log(name, lon, lat, date, icon, description, temp, humidity, speed);
    
    document.querySelector(".citys").innerText = name;
    document.querySelector(".temps").innerHTML = temp + "°F";
    document.querySelector(".icons").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".descriptions").innerHTML = description;
    document.querySelector(".humiditys").innerHTML =
      "Humidity: " + humidity + "%";
    document.querySelector(".speeds").innerHTML =
      "Wind Speed: " + speed + "mph ";

      // Adds only new cities to history button list
      if (allCities.includes(name) == false) {
        allCities.push(name);
        localStorage.setItem("cities", JSON.stringify(allCities));
        historyEl = document.createElement("button");
        historyEl.setAttribute("class", "btn btn-secondary");
        historyEl.innerText = name;
        document.querySelector(".history").appendChild(historyEl);
      }
      
  },

  //Function to fetch weather for 5 day cards. Displays the date, temperature, icon, description, humidity, and wind speed for each day iterated by for loop.
  fetchFutureWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" +
    city + "&units=imperial&appid=" + this.apiKey)
      .then((response) => response.json())
      .then((data) =>{ console.log(data)

        var dateEls = document.getElementsByClassName("date")
        console.log(dateEls)

      for(i = 0; i < dateEls.length; (i++)){

        var dates = moment.unix(`${data.list[i*8].dt}`).format('LL')
        var dateEl = dateEls[i]
  
        dateEl.innerHTML = dates
  
        }

        var tempEls = document.getElementsByClassName("temp")
        console.log(tempEls)
  
      for(i = 0; i<tempEls.length; i++){
  
          var temperature = (`${data.list[i*8].main.temp}°F`)
  
          var tempEl = tempEls[i]
  
         tempEl.innerText = temperature
  
        }

        var iconEls = document.getElementsByClassName("icon")
      
        console.log(iconEls)

      for(i = 0; i < iconEls.length ; i++){ 

        var icon = (data.list[i*8].weather[0].icon)

        var icons = ("https://openweathermap.org/img/wn/" + icon + ".png")

        var iconEl = iconEls[i]

        iconEl.src = icons
      }

      var descEls = document.getElementsByClassName("description")

      console.log(descEls)

      for(i = 0; i<descEls.length ; i++){

        var desc = (data.list[i*8].weather[0].description)
        
        var descEl = descEls[i]

        descEl.innerHTML = desc
      }

      var humidEls = document.getElementsByClassName("humidity")
      
      console.log(humidEls)

      for(i=0; i<humidEls.length ;i++){

        var humid = `Humidity: ${data.list[i*8].main.humidity}%`

        var humidEl = humidEls[i]

        humidEl.innerHTML = humid
      }

      var speedEls = document.getElementsByClassName("speed")

      console.log(speedEls)

      for(i=0; i<speedEls.length ;i++){
        
        var speed = `Wind Speed: ${data.list[i*8].wind.speed} MPH`;
        
        var speedEl = speedEls[i]
        
        speedEl.innerHTML = speed
      } 
  
 

      });
   },

//Function to fetch weather for value in search bar
  search: function (){
    this.fetchWeather(document.querySelector(".search-bar").value)
    this.fetchFutureWeather(document.querySelector(".search-bar").value)
  }
};

//Event listner for click of the search button
$(".card-header button").on("click", () =>{
  weather.search();
});

// Event listner for enter key
$(".search-bar").on("keyup", (event) =>{
  if (event.key == "Enter"){
    weather.search();
  }
});

// Event listener for click on historical search buttons
$(".history").on("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    weather.fetchWeather(event.target.innerText);
    weather.fetchFutureWeather(event.target.innerText);

  }
});


// recalls and loads cities from local storage
var allCities = JSON.parse(localStorage.getItem("cities"));
if (!allCities) {
  allCities = [];
} else {
  for (i = 0; i < allCities.length; i++) {
    var historyEl = document.createElement("button");
    historyEl.setAttribute("class", "btn btn-secondary");
    historyEl.innerText = allCities[i];
    document.querySelector(".history").appendChild(historyEl);
  }
};


// local storage clear
var clearLocalStorage = function () {
  localStorage.removeItem("allCities");
  $(".history").html('');
  searchedHistory = [];
  localStorage.clear()
  location.reload();
}
$("#clear").on('click', clearLocalStorage);
  

// Automatically displays Atlanta's weather to the page on load
  weather.fetchWeather("Atlanta")
  weather.fetchFutureWeather("Atlanta")