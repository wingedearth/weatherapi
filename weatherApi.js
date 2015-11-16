// use this module to send http requests
var request = require('request');

// use this module to hide file with API Key
require('dotenv').load();

// here's where we set up the weatherApi object.
weatherApi = {

  // build a base URI for http requests.
  // includes my API key for Weather Underground
  baseUri: 'http://api.wunderground.com/api/'
  + process.env.WUNDERGROUND_API_KEY + '/conditions/q/',

  /* Build the full URL by adding request-specific information
  to the base URI. The .split(","") method divides location input
  separated by commas into separate elements in an array.
  This assumes a city, state style input.
  Then the .map method takes each element
  (as variable str) and encodes it into URI format
  using encodeURIComponent. The .trim() method removes whitespace
  before or after the encoded text.
  */
  buildUri: function(location) {
    var place = location.split(",").map(function(str) {
      return encodeURIComponent(str.trim());
    });
    return this.baseUri + place[1] + '/' + place[0] + '.json';
  },

  /* Send an http request using the URI built above.
  The request module is used, with a get method to send
  the request. Then a callback function operates  */
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
          'The current temperature in ' +
          location + ' is: ' + temp + '° F';
      cb(err, formattedTemp);
    });
  }
};

weatherApi.temp = weatherApi.tempF;

module.exports = weatherApi;
