function callAPI(url, callback) {
  var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          var response = JSON.parse(xmlHttp.responseText);
              callback(response);
        }
      }
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
}


function getRequestObject(data) {

    data.infoid = Math.random() * 10000000000000000 + 1;
    return data;
}
