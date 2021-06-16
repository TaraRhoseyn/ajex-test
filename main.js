var xhr = new XMLHttpRequest(); // XMLHttpRequest is an inbuilt object from JS, allows us to consume APIs
// method to open connections/close etc

// whenever the state changes of our xhr object, we want to run a check (the function below)
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("data").innerHTML = this.responseText;
    }
}

// to open a connection
xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");

xhr.send();