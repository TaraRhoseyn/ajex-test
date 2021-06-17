// create new instance of the XMLHttpRequest object
var xhr = new XMLHttpRequest(); // XMLHttpRequest is an inbuilt object from JS, allows us to consume APIs
// method to open connections/close etc

// to open a connection. First argument we parse in 'GET' (retrieving data from star wars API. second argument is the URL that we want to restrieve)
xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
// send the request
xhr.send();

// whenever the state changes of our xhr object, we want to run a check (the function below)
xhr.onreadystatechange = function() {
    // readyState checks that the request has been completed ('4' reps completion
    // status code (200) means 'OK', request successed & content delivered
    if (this.readyState == 4 && this.status == 200) {
        // below gets our div with the id data and puts the response text in it
        // note: below produces a string that looks like json, not actually json
        document.getElementById("data").innerHTML = this.responseText;
    }
}

// The xhr object mains an internal state as it's completing parts of our request operation
// "readyState = 4" means that the operation has been completed
// ^documentation available from mozilla developer network

// PARSING STRINGS INTO JSON DATA STRUCTURES
// If we want to manipulate the API data, we need it be an object

// JSON.parse parses string into an object
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
    }
};

// the function & console.log below DON'T WORK
// because the console runs before the function which runs five times
// meaning the console.log can't run because data has not been 
// defined when it only runs the once
// so it will produce 'undefined'
// has to be moved into the function
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = this.responseText;
    }
};
console.log(data);

// here the console.log(data) works, BUT
// it's a problem bcos everything would have to be done
// inside a function, which is messy
// so we parse our data to a seperate function
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = this.responseText;
        console.log(data);
    }
};

// seperating out functions is also called
// de-serialising our JSON:
function setData(jsonData) {
    data = jsonData;
    console.log(data);
}

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = this.responseText;
        setData(JSON.parse(this.responseText));
    }
};

// BUT this still isn't ideal. Because we're
// just moving the problem of messy functions
// to another function
// so we use 'timeouts' and 'callbacks' instead

// SET TIMEOUT FUNCTION

// telling the console.log to wait for 500 miliseconds, so giving our 'onreadystatechange' function time to reach
// a readyState of 4
setTimeout(function() {
    // this console.log will only run after the time specified, in this case 500 ms
    console.log(data);
}, 500);

// CALLBACK FUNCTION
// Remember, a function is also an object (everything is an object in JS)
// So it can be passed as a parameter/argument to another function
// a callback is a function that's passed as a meter to another function
// and executed inside that function


// 'cb' stands for callback, function argument passed to function

function getData(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // below actually runs the function we pass in as a callback
            cb(JSON.parse(this.responseText));
        };
    };
};

// OT: I don't understand where 'data' argument is actually coming from?
// from Slack:
// 'data' is taking the value 'JSON.parse(this.responseText), the data returned from the API request
// suggests looking into 'fetch', more modern way than XMLHttpRequest

function printDataToConsole(data) {
    console.log(data);
}

getData(printDataToConsole);

// 'type' as in type of things from API, e.g. people/starships/vehicles/etc
function writeToDocument(type) {
    // below el variable stores our data ID, helps cut out other content when pressing buttons
    var el = document.getElementById("data");
    el.innerHTML = ""; // setting this to an empty string will clear the element everytime button is clicked

    getData(type, function(data) {
        // console.dir means directory, pass in data
        // console.dir(data);
        data = data.results;


        // this function will run for each element in 'data' variable
        data.forEach(function(item) {
            // iterating over the keys, our star wars data is held in key-value pairs (e.g. name: luke skywalker)
            // doing a second forEach loop inside this forEach loop
            Object.keys(item).forEach(function(key) {
                console.log(key);
                // films doesn't have a key called name, so we need to fix that
                // by iterating over the keys to build a table of data wihtout
                // explicitly specifying a property (like we have with 'name')
            })
            el.innerHTML += "<p>" + item.name; "</p"
        })

        // we're setting out data to 'results' here because that's what it's called in the API star wars object
        // but just the data.results below isn't enough 'data.results'
        // we need to overwrite our data variable itself with the 
    });