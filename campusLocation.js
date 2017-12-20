
function myMap() {
  var myCenter = new google.maps.LatLng(29.752711, -95.3397064);
  var mapCanvas = document.getElementById("googleMap");
  var mapOptions = {center: myCenter, zoom: 15};
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({position:myCenter});
  marker.setMap(map);

  var infowindow = new google.maps.InfoWindow({
    content: `3302 Canal St, Houston, TX 77003`
  });
  infowindow.open(map,marker);
}
