/* eslint-disable no-undef */
/**
 * map to link google sheets
 */
 // URL for points CSV download
 let pointsURL =
 "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBA3Di-J9fmW82NdqIogniXwoZe_87w2fL40gbKgG7y3p8BTg2UmvIXONdnyZquPSGREbFdWP7Z-5B/pub?gid=930695825&single=true&output=csv";

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
   
    for (let row = 0; row < data.length; row++) {
        let marker;
        marker = L.marker([data[row].lat, data[row].lon]);
    marker.addTo(pointGroupLayer);
    marker.bindPopup('<h2>' + data[row].Name + '</h2><p>Email: '+ data[row].Email + '<br>URL: ' + data[row].URL + '</br> <br>Items : ' + data[row].Items + '</br><br>Details of items to be collected: ' + data[row].Notes + '</br><br>Photo references: ' + data[row].References + '</br><br>Collection Method: ' + data[row].How + '</br><br>Address: ' + data[row].Address + '</br><br>Postal Code: ' + data[row].PostalCode + '</br><br>Any other info: ' + data[row].Remarks + '</br><br>Collection End Date: ' + data[row].End + '</br></p>') ;
;

//    }
   }
  }
