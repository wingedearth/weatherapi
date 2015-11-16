var weatherApi = require('./weatherApi');

// weatherApi.getObservation('Los Angeles, CA', function(err, currentObservation) {
//   console.log(currentObservation);
// });

function printConditions(citystate) {
  weatherApi.temperature(citystate, function(err, temp_desc) {
    console.log(temp_desc);
  });
}

var ny = {
  name: "New York State",
  cities: ['New York, NY', 'Rochester, NY', 'Fairport, NY'
  ]
};

var california = {
  name: "California",
  cities: ['Los Angeles, CA', 'Pasadena, CA', 'San Francisco, CA'
  ]
};

var states = [ny, california];

function printState(state, index) {
  console.log("Conditions for areas in: ", state.name);
  state.cities.forEach(printConditions);
}

function printCali() {
  setTimeout(printState(california), 8000);
}

printCali();
printState(ny);

// printState(ny).onload = function() {
//   printState(california);
// }



// function printTemps() {
//   states.forEach(value, index, function {
//     printState(value);

//   });
// }

// printTemps();

// var async_function = function(){
//   var i=0;
//   if (i < states.length) {
//     printState(states[i]);
//     i++;
//   }
// };

// async_function();

// printState(ny);
// printState(california);


// weatherApi.temperature('Rochester, NY', function(err, temp_desc) {
//   console.log(temp_desc);

//   weatherApi.temperature('Fairport, NY', function(err, temp_desc) {
//     console.log(temp_desc);
//   });

// });

// weatherApi.temperature('Pasadena, CA', function(err, temp_desc) {
//   console.log(temp_desc);
// });

// weatherApi.temperature('Los Angeles, CA', function(err, temp_desc) {
//   console.log(temp_desc);
// });



