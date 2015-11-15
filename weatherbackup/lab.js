// var express       = require('express'),
//     request       = require('request'),
//     path          = require('path'),
//     cookieParser  = require('cookie-parser');

var weatherApi    = require('./weatherApi');
weatherApi.printTemperatures();


// var routes = require('./routes/index')
// var weatherinfo = require('./routes/weatherinfo');
// var weatherforcities = require('./routes/getweatherforcities');

// var app = express();


console.log(weatherApi.baseUri);
//=> http://api.wunderground.com/api/a57c2a1bdf1a8829/conditions/q/

console.log(weatherApi.buildUri('Los Angeles, CA'));
//=> http://api.wunderground.com/api/a57c2a1bdf1a8829/conditions/q/CA/Los%20Angeles.json

weatherApi.getObservation('Los Angeles, CA', function(err, currentObservation) {
  console.log(currentObservation);
});
//=> {
//=>   image: { … },
//=>   …
//=> }

weatherApi.tempF('Toronto, Canada', function(err, tempF) {
  console.log(tempF);
});
//=> 56.3

weatherApi.tempC('Toronto, Canada', function(err, tempC) {
  console.log(tempC);
});
//=> 7

weatherApi.temp('Toronto, Canada', function(err, temp) {
  console.log(temp);
});
//=> 45 (defaults to Fahrenheit!)

weatherApi.temperature('Los Angeles, CA', function(err, temp_desc) {
  console.log(temp_desc);
});
//=> THE CURRENT TEMPERATURE IN LOS ANGELES IS: 67.7° F
