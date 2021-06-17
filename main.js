
function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // below actually runs the function we pass in as a callback
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url + type + "/");
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    // below iterates over the keys in our object
    // and pushes them to our tableHeaders array
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`)
    });

    return `<tr>${tableHeaders}</tr>`;
}


function generatePaginationButtons(next, prev) {
    if (next && prev) { // if we have a next & prev value (more data)
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
        <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) { // if only next and not prev (start of data set)
        return `<button onclick="writeToDocument('${prev}')">Next</button>`;
    } else if (!next && prev) { // if only prev and no next (end of data set)
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

// 'type' as in type of things from API, e.g. people/starships/vehicles/etc
function writeToDocument(url) {
    // below el variable stores our data ID, helps cut out other content when pressing buttons
    var el = document.getElementById("data");
    el.innerHTML = "";  // setting this to an empty string will clear the element everytime button is clicked

    getData(url, function(data) {
        var pagination;
        if (data.next|| data.previous) { // if data.next or data.previous exist...
            pagination = generatePaginationButtons(data.next, data.prev);
        } 
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]); // passing through first object in the array

        data.forEach(function(item) {
            var dataRow = [];
            // iterating over the keys, our star wars data is held in key-value pairs (e.g. name: luke skywalker)
            // doing a second forEach loop inside this forEach loop
            // Object.keys(item).forEach(function(key) {
            // 
            // films doesn't have a key called name, so we need to fix that
            // by iterating over the keys to build a table of data wihtout
            // explicitly specifying a property (like we have with 'name')

            Object.keys(item).forEach(function(key) {
                // rowData is set to the value of the key, made sure it's string
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0,15); // from 0 to 15th character
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            // once the row is created after it's iterated over, we need to push that
            // row into tableRows array:
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
    });
}

