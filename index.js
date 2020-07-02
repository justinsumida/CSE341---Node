/*const express = require('express')
var request = require('request-promise')
const path = require('path');
var bodyParser = require('body-parser');
const { response } = require('express');
const PORT = process.env.PORT || 5000

var app = express()

*/


function getWeather(){
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;
  var country = document.getElementById('country').value;

  if(state === ""){
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=436f123420e5088b09867a190d053298`;
  }
  else{
   var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=imperial&appid=436f123420e5088b09867a190d053298`;
  }

  fetch(url)
    .then(function(reponse){
      return reponse.json();
    })
    .then(function(data){
      updateWeather(data);
    });
}

function updateWeather(data){
  var weatherInfo = document.getElementById('weatherInfo');
  console.log(data);
  var temp = data.main.temp;
  var feelLike = data.main.feels_like;
  var name = data.name;
  var description = data.weather[0].description;
  var icon = data.weather[0].icon;
  var cod = data.cod;
  var content = '';
  if(cod == 200){
    content += "<h3>" + name + "</h3><br><p>" + description + "<br> Temperature: " + temp + "  Feels Like: " + feelLike + "</p>";
    content += "<img src=\"http://openweathermap.org/img/w/" + icon + ".png\">"; 
  }
  else{
    content += "404, city not found. Please enter a valid city, lower case and two letter initials for state and country";
  }

  weatherInfo.innerHTML += content;
}
//app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

