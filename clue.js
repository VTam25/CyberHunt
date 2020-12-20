Radar.initialize("prj_test_sk_37bca26db16576c0ea4aeff834e48b4cb4998996");

navigator.geolocation.getCurrentPosition(showCurrentLocation);

var userId;
var userLat;
var userLng;

var currentClue = 1;
var clueLat;
var clueLong;
var clueText; 

function showCurrentLocation(position) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // save clue texts somewhere in google cloud
    var json_body = JSON.stringify({"gamecode": localStorage.getItem("game_code"), "clue_num": currentClue});
    console.log(json_body);
    fetch(proxyurl + "https://us-central1-cse6242-291522.cloudfunctions.net/cyber-hunt-get", {
        body: json_body,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'cors'
    }).then(response => {
                if (response.ok) {
                  response.json().then(json => {
                    console.log(json[currentClue])
                    clueLat = json[currentClue].lat;
                    clueLong = json[currentClue].lng;
                    clueText = json[currentClue].text;
                    document.getElementById("clue_text").innerHTML = clueText;

                  });
                }
              });

    userLat = position.coords.latitude;
    userLng = position.coords.longitude;

    document.getElementById("latlng").innerHTML = "Your current latitude: " + userLat + " and longitude: " + userLng;

    console.log(clueLat, clueLong)
    Radar.getDistance({
        origin: {
            latitude: userLat, 
            longitude: userLng 
        },
        destination: {
            // latitude: clueLat, //42.4627873, 
            // longitude: clueLong //-71.1295618
            latitude: clueLat, //42.4627873, 
            longitude: clueLong //-71.1295618
        },
        modes: [
            'foot',
            'car'
          ],
        units: 'imperial'
        }, 
        function(err, result) {
            if (err) {
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
    body: `deviceId=test&userId=${userId}&latitude=${userLat}&longitude=${userLng}&accuracy=20`,
    headers: {
        Authorization: "prj_test_sk_37bca26db16576c0ea4aeff834e48b4cb4998996",
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


  //updates location every 3 minutes and checks if user has entered geofence
  setInterval(function() {
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
    console.log("Updated location");

    //search for geofences
    fetch("https://api.radar.io/v1/track", {
    body: `deviceId=test&userId=${userId}&latitude=${userLat}&longitude=${userLng}&accuracy=20`,
    headers: {
        Authorization: "prj_test_sk_37bca26db16576c0ea4aeff834e48b4cb4998996",
        "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
    }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log("tracking update: ", json.user);
            if (json.user.geofences[0].externalId === ""+currentClue){
                console.log("You found the clue!");
                alert("You found the clue!!")
                currentClue+=1;
            }
          });
        }
      });
  }, 30 * 1000); //120 * 1000 milliseconds = 3min


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

