# Weather API

![Seasonally appropriate weather image.][weather-image]

You've been tasked with creating a Node.js module that retrieves the 
current weather conditions in any given US city. For example, if your 
module is asked to display the weather in "Los Angeles, CA", it should
return: 

```
THE CURRENT TEMPERATURE IN LOS ANGELES IS: 67.7° F
```

## Setup

Copy this directory to your student folder for the day and work in 
there. `npm init -f && npm install --save` anything you need inside of 
there. Work in (and make your entry point) the file `weatherApi.js`.
This will be the "module" you create. Eventually you will `require` that
module inside of the file `lab.js` to show that it works.

#### Get an API key

In order to get this information programatically, we will need to access
another web application's API. A good, simple weather API can be found 
at the [Weather Underground][wunderground-home]. In order to use it we 
will need to register ourselves on their servers. 
[Create an account][wunderground-sign-up] with them and sign up for an 
API key.

Here is how you can fill out the API key form, **after signing up**:

![Form example][form-image]

> I know, I input some wonky stuff. Just fill it out, basically. 
>  — Phil

#### Play with the API until it works ("Spike") (10 minutes)

Explore the Weather Underground [API documentation][wunderground-docs] 
to determine how to structure your query. Make a few queries, testing
out your API key and the docs. Write your code in the module file
`weatherApi.js`.

You should be able to print to the terminal the line:

```
THE CURRENT TEMPERATURE IN LOS ANGELES IS: 67.7° F
```

It will likely be helpful to use JavaScript's 
[`encodeURIComponent`][encode-uri] to replace and escape the right
characters to make the request to a correctly formatted URL.

**Note!** Do *not* `git commit` once you have added your API key to your
file!

#### Use your module

Create a test program that prints out the current weather in:

- Los Angeles, CA
- Cleveland, OH
- San Antonio, TX
- Toronto, Canada
- Honolulu, HA

#### Add `dotenv` to your module and export it (15 minutes)

You don't want to store your API keys in any code you write! In order
to keep them private, we'll be using the [NPM module `dotenv`][dotenv], 
a clone of the very succesful Ruby Gem.

Use the docs and other materials online to discover how to implement it.

Next, [export your module][node-export] so that you can require ("load")
it in another file. Test this by requiring your module in `lab.js`.

**Note!** Now you should `git commit`, but ***do not*** add the `.env`
file.

Finally, run your above tests from the `lab.js` file, like:

```javascript
var weatherApi = require('./weatherApi');

weatherApi.printTemperatures();
//=> THE CURRENT TEMPERATURE IN LOS ANGELES IS: 67.7° F
//=> THE CURRENT TEMPERATURE IN TORONTO IS: 45° F
//=> THE CURRENT TEMPERATURE IN SAN ANTONIO IS: 67.3° F
//=> THE CURRENT TEMPERATURE IN CLEVELAND IS: 52.5° F
//=> THE CURRENT TEMPERATURE IN HONOLULU IS: 74.5° F

// Note: they'll likely not be in order… Async!
```

---

#### Bonus 1 – Craft your module

Write your module such that it meets the specification:

```javascript
var weatherApi = require('./weatherApi');

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
```

Test that the module works in the file `lab.js`.

**Note!** To do this you will need to write a number of methods for
an object you export, and those methods will need to accept and call
callback functions.

#### Bonus – Update your module's API

Rewrite `temp` to take an optional second parameter: an options
object that recoginizes the values: `{scale: "F"}`, `{scale: "Fahrenheit"}`,
`{scale: "C"}`, or `{scale: "Celsius"}` (and is case insensitive). These
will explicit set the scale of the return temperature.

The default setting should then be to return degrees in Celsius.

<!-- LINKS -->

<!-- [weather-image]: assets/snow-covered-trees-central-park-new-york.jpg -->

[weather-image]: assets/dtla-799x119-72.jpg
[form-image]:    assets/form-example.png

[wunderground-home]:    http://www.wunderground.com/weather/api
[wunderground-sign-up]: http://www.wunderground.com/weather/api/d/login.html
[wunderground-docs]:    http://www.wunderground.com/weather/api/d/docs

[dotenv]: https://github.com/motdotla/dotenvz

[node-export]: https://nodejs.org/api/modules.html#modules_module_exports
[encode-uri]:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
