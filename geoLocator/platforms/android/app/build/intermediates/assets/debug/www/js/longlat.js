window.addEventListener('load', docLoaded);
var templong;
var templat;
function getLatLong() {
  var address = $('#address').val();
      address = address.split(' ').join('+');
  var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC2ssmB4OYp3klzfoEhQFrbIL57NbOcnK4" ;
      callAPI(requestUrl, printLongLat);
}

function printLongLat(response) {
  templong=Number(response.results[0].geometry.location.lng);
  templat=Number(response.results[0].geometry.location.lat);

  $('#addressDisplay').html( response.results[0].formatted_address);
$('#long').html(templong);
$('#lat').html(templat);
$('#resultsArea').show();

  initMap();
}

function initMap() {
$('#map_display').show();
   var coords = { lat: templat, lng: templong };
   var map = new google.maps.Map(document.getElementById('map_area'), {
     zoom: 10,
     center: coords
   });
   var marker = new google.maps.Marker({
     position: coords,
     map: map
   });
}

function docLoaded() {
  document.getElementById("getLatLong").addEventListener('click', getLatLong);
}
