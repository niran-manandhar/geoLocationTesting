window.addEventListener('load', docLoaded);
var templong;
var templat;
var tempaddress;
function getLatLong() {
  var address = $('#address').val();
      address = address.split(' ').join('+');
  var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC2ssmB4OYp3klzfoEhQFrbIL57NbOcnK4" ;
      callAPI(requestUrl, printLongLat);
}

function printLongLat(response) {
  templong=Number(response.results[0].geometry.location.lng);
  templat=Number(response.results[0].geometry.location.lat);
tempaddress=response.results[0].formatted_address;
  $('#addressDisplay').html(tempaddress);
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
  document.getElementById("saveLocation").addEventListener('click', saveLocation);
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

var SAVEURL="http://101bits.com/blog/oamkgeoproject/add_markers.php";
function saveLocation(){

  var request = getRequestObject({
    name:$('#address_title').val(),
    address:tempaddress,
    lat:templat,
    lng:templong,
    type:'usermarker',
  });
  $.post(SAVEURL, request, function (result) {
      if (result.RESULT == "SUCCESS") {



alert("Marker saved!");

}else{
  alert("Something went wrong.");
}

      
  }, "json");

}
