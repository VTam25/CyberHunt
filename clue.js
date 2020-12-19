Radar.initialize("prj_test_pk_195f3978e612ac59d90041639ebac732b3db7810");

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
        //console.log(result.routes.foot.distance.text);
        document.getElementById("miles").innerHTML = result.routes.foot.distance.text;
        document.getElementById("time").innerHTML = result.routes.foot.duration.text;
    }
});
