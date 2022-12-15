var date = document.querySelector(".dates")
    setInterval(function(){
      date.textContent = moment().format("MMMM Do YYYY")})

let weather = {
  apiKey: "6af174eb1acf790c330054f1967a6d0f",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&units=imperial&appid=" + this.apiKey)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
    },

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
      
  },

  fetchFutureWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" +
    city + "&units=imperial&appid=" + this.apiKey)
      .then((response) => response.json())
      .then((data) =>{ console.log(data)

        var dateEls = document.getElementsByClassName("date")
        console.log(dateEls)

      for(i = 0; i < dateEls.length; (i++)){

        var dates = moment.unix(`${data.list[i].dt}`).calendar()
        var dateEl = dateEls[i]
  
        dateEl.innerHTML = dates
  
        }

        var tempEls = document.getElementsByClassName("temp")
        console.log(tempEls)
  
      for(i = 0; i<tempEls.length; i++){
  
          var temperature = (`${data.list[i].main.temp}°F`)
  
          var tempEl = tempEls[i]
  
         tempEl.innerText = temperature
  
        }

        var iconEls = document.getElementsByClassName("icon")
      
        console.log(iconEls)

      for(i = 0; i < iconEls.length ; i++){ 

        var icon = (data.list[i].weather[0].icon)

        var icons = ("https://openweathermap.org/img/wn/" + icon + ".png")

        var iconEl = iconEls[i]

        iconEl.src = icons
      }

      var descEls = document.getElementsByClassName("description")

      console.log(descEls)

      for(i = 0; i<descEls.length ; i++){

        var desc = (data.list[i].weather[0].description)
        
        var descEl = descEls[i]

        descEl.innerHTML = desc
      }

      var humidEls = document.getElementsByClassName("humidity")
      
      console.log(humidEls)

      for(i=0; i<humidEls.length ;i++){

        var humid = `Humidity: ${data.list[i].main.humidity}%`

        var humidEl = humidEls[i]

        humidEl.innerHTML = humid
      }

      var speedEls = document.getElementsByClassName("speed")

      console.log(speedEls)

      for(i=0; i<speedEls.length ;i++){
        
        var speed = `Wind Speed: ${data.list[i].wind.speed} MPH`;
        
        var speedEl = speedEls[i]
        
        speedEl.innerHTML = speed
      } 
  


      });
   },

  search: function (){
    this.fetchWeather(document.querySelector(".search-bar").value)
    this.fetchFutureWeather(document.querySelector(".search-bar").value)
  }
};

document.querySelector(".card-header button").addEventListener("click", function(){
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event){
  if (event.key == "Enter"){
    weather.search();
  }
});



  weather.fetchWeather("Atlanta")
  weather.fetchFutureWeather("Atlanta")