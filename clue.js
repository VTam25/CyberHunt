Radar.initialize("prj_test_pk_195f3978e612ac59d90041639ebac732b3db7810");

navigator.geolocation.getCurrentPosition(showCurrentLocation);

//create user when page loads
window.onload = function(){
    createUser();
}

function createUser(){

    fetch("https://api.radar.io/v1/track", {
    body: "deviceId=C305F2DB-56DC-404F-B6C1-BC52F0B680D8&userId=1&latitude=40.78382&longitude=-73.97536&accuracy=65",
    headers: {
        Authorization: "prj_test_pk_195f3978e612ac59d90041639ebac732b3db7810",
        "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
    })

    Radar.trackOnce(function(err, result) {
        if (err) {
          // do something with result.location, result.events, result.user
          console.error(err);
          return;
        }
        else{
            console.log(result);
            //identify the user when logged in
            Radar.setUserId(userId);
            console.log(result.userId);

            //set an optional dictionary of custom metadata for the user
            Radar.setMetadata(result.metadata);

            //set an optional description for the user
            Radar.setDescription(result.description);
        }
      });
}; 

Radar.getDistance({
    origin: {
        latitude: 42.4250297,
        longitude: -71.0672822
    },
    destination: {
        latitude: 40.70390,
        longitude: -73.98670
    },
    modes: [
        'foot',
        'car'
      ],
    units: 'imperial'
    }, 
    function(err, result) {
        if (err) {
            // do something with result.routes
            console.error(err);
            return;
        }
        else{
            // console.log(result.routes.foot.distance.text);
            document.getElementById("miles").innerHTML = result.routes.foot.distance.text;
            document.getElementById("time").innerHTML = result.routes.foot.duration.text;
        }
    });

function showCurrentLocation(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    document.getElementById("latlng").innerHTML = "Latitude: " + lat + " Longitude: " + lng;
};