window.addEventListener('load', docLoaded);
var templong;
var templat;
function getLatLong() {
  var address_first= $('#address_first').val();
      address_first = address_first.split(' ').join('+');
  var address_second= $('#address_second').val();
      address_second = address_second.split(' ').join('+');
  var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address_first + "&key=AIzaSyC2ssmB4OYp3klzfoEhQFrbIL57NbOcnK4" ;
      callAPI(requestUrl, setOrigin);
    var   requestUrl2 = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address_second + "&key=AIzaSyC2ssmB4OYp3klzfoEhQFrbIL57NbOcnK4" ;
      callAPI(requestUrl2, setDestination);
    var   requestUrl3 = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + address_first + "&destinations=" + address_second +"&key=AIzaSyC2ssmB4OYp3klzfoEhQFrbIL57NbOcnK4";
  callAPI(requestUrl3, setDistance);
}
var templong_ori;
var templat_ori;
var templong_dest;
var templat_dest;
function setOrigin(response) {
  templong_ori=Number(response.results[0].geometry.location.lng);
  templat_ori=Number(response.results[0].geometry.location.lat);

  $('#addressDisplay_ori').html( response.results[0].formatted_address);
  $('#long_ori').html(templong_ori);
  $('#lat_ori').html(templat_ori);
  $('#resultsArea').show();
}

function setDestination(response) {
  templong_dest=Number(response.results[0].geometry.location.lng);
  templat_dest=Number(response.results[0].geometry.location.lat);

  $('#addressDisplay_dest').html( response.results[0].formatted_address);
  $('#long_dest').html(templong_dest);
  $('#lat_dest').html(templat_dest);
  //$('#resultsArea').show();
}

function setDistance(response) {
  $('#distance_here').html(response.rows[0].elements[0].distance.value);
  initMap();

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
function getDistanceFromLatLonInKm(origin_latlong,dest_latlong) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(dest_latlong.lat-origin_latlong.lat);  // deg2rad below
  var dLon = deg2rad(dest_latlong.lng-origin_latlong.lng);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(origin_latlong.lat)) * Math.cos(deg2rad(dest_latlong.lat)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}




function initMap() {

$('#map_display').show();
       var directionsService = new google.maps.DirectionsService;
       var directionsDisplay = new google.maps.DirectionsRenderer;
       var map = new google.maps.Map(document.getElementById('map_area'), {
         zoom: 7,
         center: {lat: templat_ori, lng: templong_ori}
       });
       directionsDisplay.setMap(map);
       directionsDisplay.setPanel(document.getElementById('right-panel'));



         calculateAndDisplayRoute(directionsService, directionsDisplay);


     }

     function calculateAndDisplayRoute(directionsService, directionsDisplay) {
       directionsService.route({
         origin:  $('#address_first').val(),
         destination: $('#address_second').val(),
         travelMode: 'DRIVING'
       }, function(response, status) {
         if (status === 'OK') {
           directionsDisplay.setDirections(response);
         } else {
           window.alert('Directions request failed due to ' + status);
         }
       });
     }



function initMap1() {
$('#map_display').show();
var origin_latlong= { lat: templat_ori, lng: templong_ori };
var dest_latlong = { lat: templat_dest, lng: templong_dest };

var distance_here = Math.floor(getDistanceFromLatLonInKm(origin_latlong, dest_latlong));

$('#distance_here').html(distance_here+' Km');

var map = new google.maps.Map(document.getElementById('map_area'), {
  zoom: 2,
  center: origin_latlong
});
var origMarker = new google.maps.Marker({
  position: origin_latlong,
  map: map
});
var destMarker = new google.maps.Marker({
  position: dest_latlong,
  map: map
});
var polylineCoords = [
  origin_latlong,
  dest_latlong,
];
var flightPath = new google.maps.Polyline({
  path: polylineCoords,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  map: map
});
}

function docLoaded() {
  document.getElementById("getLatLong").addEventListener('click', getLatLong);
}



// for device Location
var options = {maximumAge: 300000, timeout: 5000, enableHighAccuracy: true};
function getCurrent() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

}



function onSuccess(position) {

  templong=Number(position.coords.longitude);
  templat=Number(position.coords.latitude);


$('#long').html( position.coords.longitude);
$('#lat').html( position.coords.latitude);
$('#resultsArea').show();
  var coords = {
    lat: templat,
    lng: templong
  };
  var map = new google.maps.Map(document.getElementById('map_area'), {
    zoom: 14,
    center: coords
  });
  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });
  var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                    position.coords.latitude + ',' + position.coords.longitude +
                   "&key=AIzaSyC2ssmB4OYp3klzfoEhQFrbIL57NbOcnK4" ;
  callAPI(requestUrl, getAddress);
};

function getAddress(response) {
  $('#addressDisplay').html(response.results[0].formatted_address);
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
          getCurrent();
}
