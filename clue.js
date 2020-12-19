Radar.initialize("prj_test_pk_195f3978e612ac59d90041639ebac732b3db7810");

navigator.geolocation.getCurrentPosition(showCurrentLocation);

var userId;
var userLat;
var userLng;

function showCurrentLocation(position) {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;

    document.getElementById("latlng").innerHTML = "Your current latitude: " + userLat + " and longitude: " + userLng;

    Radar.getDistance({
        origin: {
            latitude: userLat, 
            longitude: userLng 
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
};

//When page first loads
window.onload = function(){
    createUser();
    //console.log(localStorage.getItem("game_code"))
    document.getElementById("game_code").innerHTML = "GAME CODE: " + localStorage.getItem("game_code");
}

function createUser(){

    userId = localStorage.getItem("name");
    //console.log(userId);

    fetch("https://api.radar.io/v1/track", {
    body: `deviceId=C305F2DB-56DC-404F-B6C1-BC52F0B680D8&userId=${userId}&latitude=${userLat}&longitude=${userLng}&accuracy=5`,
    headers: {
        Authorization: "prj_test_pk_195f3978e612ac59d90041639ebac732b3db7810",
        "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
    }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
          });
        }
      });

  } 

    // Radar.trackOnce(function(err, result) {
    //     if (err) {
    //       // do something with result.location, result.events, result.user
    //       console.error(err);
    //       return;
    //     }
    //     else{
    //         console.log(result);
    //         //identify the user when logged in
            
    //         Radar.setUserId(userId);
    //         console.log(result.userId);

    //         //set an optional dictionary of custom metadata for the user
    //         Radar.setMetadata(result.metadata);

    //         //set an optional description for the user
    //         Radar.setDescription(result.description);
    //     }
    //   });

