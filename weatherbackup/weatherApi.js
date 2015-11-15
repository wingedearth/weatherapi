// require request, locus, and opener modules.
var request = require('request'),
    locus   = require('locus'),
    opener  = require('opener');

require('dotenv').load();

// var baseUri = 'http://api.wunderground.com/api/'
// + process.env.WUNDERGROUND_API_KEY + '/conditions/q/';
//
// var buildUri = function(location) {
//   var place = location.split(",").map(function(str) {
//     return encodeURIComponent(str.trim());
//   });
//   return baseUri + place[1] + '/' + place[0] + '.json';
// };
//
// var parseTemp = function(body) {
//    return JSON.parse(body).current_observation.temp_f;
// };
//
// function getTemp(city, state) {
//   var location = city + ", " + state;
//   request.get(buildUri(location), function(err, res, body) {
//      var temp = parseTemp(body);
//      console.log('The current temperature in ' + location + ' is: ' + temp + '° F');
//   });
// }
//
// var weatherApi = {};
//
// weatherAPI.printTemperatures = function() {
//   getTemp('Los Angeles', 'CA');
//   getTemp('Pasadena', 'CA');
//   getTemp('Rochester', 'NY');
//   getTemp('Fairport', 'NY');
//   getTemp('Boston', 'MA');
//   getTemp('Canton', 'MA');
//   getTemp('Providence', 'RI');
// }
//
// weatherAPI.printTemperatures();

weatherApi = {

  var baseUri: 'http://api.wunderground.com/api/' + process.env.WUNDERGROUND_API_KEY + '/conditions/q/',

  var buildUri: function(location) {
    var place = location.split(",").map(function(str) {
      return encodeURIComponent(str.trim());
    })
    return this.baseUri + place[1] + '/' + place[0] + '.json';
  },

  var parseTemp: function(body) {
    return JSON.parse(body).current_observation.temp_f;
  },

  // Call the callback *given* to the method at the end of
  // the callback *inside* of the method
  getObservation: function(location, cb) {
    request.get(this.buildUri(location), function(err, res, body) {
      var results = JSON.parse(body);
      cb(err, results.current_observation);
    });
  },

  tempF: function(location, cb) {
    this.getObservation(location, function(err, observation) {
      cb(err, observation.temp_f);
    });
  },

  tempC: function(location, cb) {
    this.getObservation(location, function(err, observation) {
      cb(err, observation.temp_c);
    });
  },

  temperature: function(location, cb) {
    this.temp(location, function(err, temp) {
      var formattedTemp =
          'THE CURRENT TEMPERATURE IN ' +
          location.split(",")[0].toUpperCase() +
          ' IS: ' + temp + '° F';
      cb(err, formattedTemp);
    });
  }
};

//default temperature is Farenheit
weatherApi.temp = weatherApi.tempF;

module.exports = weatherApi;

