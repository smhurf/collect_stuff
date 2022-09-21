/* eslint-disable no-undef */
/**
 * map to link google sheets
 */
 // URL for points CSV download
 let pointsURL =
 "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBA3Di-J9fmW82NdqIogniXwoZe_87w2fL40gbKgG7y3p8BTg2UmvIXONdnyZquPSGREbFdWP7Z-5B/pub?output=csv";

window.addEventListener("DOMContentLoaded", init);

let map;

function init() {
  // Create map
  map = L.map('map').setView([1.365, 103.8412], 11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
 }).addTo(map);

  //Parse google sheets
  Papa.parse(pointsURL, {
      download: true,
      header: true,
      complete: addPoints,
    });
  }

 function addPoints(data) {
   data = data.data;
    //create a layer group to add the points to
    let pointGroupLayer = L.layerGroup().addTo(map);
    let markerType = "marker";
    let markerRadius = 100;
   
    for (let row = 0; row < data.length; row++)  {
        let marker;
        marker = L.marker([data[row].lat, data[row].lon]);
    marker.addTo(pointGroupLayer);
    marker.bindPopup('<strong>' + data[row].Name + '</strong><p><b>Email: </b> '+ data[row].Email + '</p><p><b>URL/Social Media: </b> ' + data[row].URL + '</p><p><b>Items : </b> ' + data[row].Items + '</p><p><b>Details of items to be collected: </b> ' + data[row].Notes + '</p><p><b>Photo references: </b> ' + data[row].References + '</p><p><b>Collection Method: </b> ' + data[row].How + '</p><p><b>Address: </b> ' + data[row].Address + '</p><p><b>Postal Code: </b> ' + data[row].PostalCode + '</p> <p><b>Any other info: </b> ' + data[row].Remarks + '</p><p><b>Collection End Date: </b> ' + data[row].End + '</p>') ;

//    }
   }
  }
