const express = require('express')
var request = require('request-promise')
const path = require('path');
const fetch = require("node-fetch");
const axios = require('axios');
var bodyParser = require('body-parser');
const { response } = require('express');
const PORT = process.env.PORT || 5000

var app = express()
//app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.use("/static", express.static('./static/'));
app.get('/loadPage' , function(req , res){
  res.render('weather');
});

app.get('/getWeather' , function (req , res){
  var city = req.query.city;
  var state = req.query.state;
  var country = req.query.country;

  if(state === ""){
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=436f123420e5088b09867a190d053298`;
  }
  else{
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=imperial&appid=436f123420e5088b09867a190d053298`;
  }
  
  axios.get(url)
  .then(response => {
    console.log('This:');
    console.log(response.data);
    res.status(200).json({name: response.data.name, temp: response.data.main.temp, feelLike: response.data.main.feels_like, cod: response.data.cod, icon: response.data.weather[0].icon, description: response.data.weather[0].description});
  })
  .catch(error =>{
    console.log(error);
  })
});

/*function updateWeather(data){
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
}*/
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

