const baseURL = "https://ci-swapi.herokuapp.com/api/";
// 'cb' stands for callback, function argument passed to function

function getData(type, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseURL + type + "/");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // below actually runs the function we pass in as a callback
            cb(JSON.parse(this.responseText));
        };
    };
};
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
            el.innerHTML += "<p>" + item.name; "</p"
        })

        // we're setting out data to 'results' here because that's what it's called in the API star wars object
        // but just the data.results below isn't enough 'data.results'
        // we need to overwrite our data variable itself with the 
    });
}