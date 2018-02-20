

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
    console.log("ok here");
        console.log(navigator.camera);
  }


  function setOptions(srcType) {
    var options = {

        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,

        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    }
    return options;
  }


  document.getElementById('camera')
       .addEventListener('click', openCamera);
  document.getElementById('gallery')
     .addEventListener('click', openFilePicker);

  function openCamera() {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);


    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri);



    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
  }
  function displayImage(imgUri) {

    var elem = document.getElementById('myImage');
    elem.src = imgUri;
    elem.style.display = "block";
  }

  function openFilePicker(selection) {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);


    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
  }
  function cameraError(message) {
  alert('Failed because: ' + message);
  }
