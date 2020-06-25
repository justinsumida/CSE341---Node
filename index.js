const express = require('express')
var request = require('request-promise')
const path = require('path');
const { response } = require('express');
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/getValues' , getValues)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

 
 function getValues(req , res){
  const city = req.query.city;
  const state = req.query.state;
  const country = req.query.country;
  findWeather(city, state, country, res).then(function(results){
    var weather_data = {weather_data : results};
    console.log(weather_data);
  });
  
  }

async function findWeather(city , state, country, res){
  //if(state === ""){
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=436f123420e5088b09867a190d053298`;
  //}
  //else{
   // var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=imperial&appid=436f123420e5088b09867a190d053298`;
 // } 
  var weather_body = await request(url);
 
  var weather_json = JSON.parse(weather_body);
  
  var weather = {
    city : city,
    temperature : Math.round(weather_json.main.temp),
    description : weather_json.weather.description,
    icon : weather_json.weather.icon
};
return weather;
}
