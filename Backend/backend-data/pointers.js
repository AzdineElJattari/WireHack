var pointers = [];

//Division points to spread out the zombies
const POINTS = [
  {
    latitude: 50.772076,
    longitude: 3.332703,
    raduis: 3
  },
  {
    latitude: 50.787086,
    longitude: 3.235718,
    raduis: 2
  },
  {
    latitude: 50.816546,
    longitude: 3.335531,
    raduis: 2
  },
  {
    latitude: 50.865456,
    longitude: 3.241828,
    raduis: 1
  },
  {
    latitude: 50.781094,
    longitude: 3.279419,
    raduis: 3
  },
  {
    latitude: 50.814245,
    longitude: 3.286933,
    raduis: 4
  },
  {
    latitude: 50.827969,
    longitude: 3.26493,
    raduis: 5
  },
  {
    latitude: 50.864868,
    longitude: 3.260193,
    raduis: 6
  }
];

//Function #1
function randomGeo(lat, long, radius) {
  var y0 = lat;
  var x0 = long;
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x / Math.cos(y0);

  return [y + y0, xp + x0];
}

//Function #2
function getPointFromRaduis(lat, lng, r) {
  return randomGeo(lat, lng, r);
}

//Function #3
function createPointers() {
  if (pointers.length < 1250 / 4) {
    for (let i = 0; i < 50 /*Bijvoegen van zombies per interval*/; i++) {
      let pointi = Math.abs(Math.round(Math.random() * POINTS.length - 1));
      let point = POINTS[pointi];

      let latlng = getPointFromRaduis(
        point.latitude,
        point.longitude,
        point.raduis * 1000
      );
      if (latlng != null) {
        var pointer = {
          latitude: latlng[0],
          longitude: latlng[1]
        };
        pointers.push(pointer);
      }
    }
    setTimeout(createPointers, 6500);
  }
}

//Function #4
function sendZombiesToCentralPoint() {
  const r = 0.00025; //Aanpassen voor snelheid zombies aan te passen
  pointers.forEach(pointer => {
    let closest = POINTS[0];
    let d = 588;
    POINTS.map(x => {
      if (
        getDistanceFromLatLonInKm(
          x.latitude,
          x.longitude,
          pointer.latitude,
          pointer.longitude
        ) < d
      ) {
        closest = x;
        d = getDistanceFromLatLonInKm(
          x.latitude,
          x.longitude,
          pointer.latitude,
          pointer.longitude
        );
      }
    });
    let rX = Math.random() * r;
    let rY = Math.random() * r;

    if(Math.random() * 100 > 30)
    if (pointer.latitude < closest.latitude) {
      rY = -rY;
    }
    if(Math.random() * 100 > 30)
    if (pointer.longitude < closest.longitude) {
      rX = -rX;
    }
    if(Math.random() * 100 > 50){
      pointer.latitude -= rY;
    }else{
      pointer.longitude -= rX;
    }
    if (
      getDistanceFromLatLonInKm(
        closest.latitude,
        closest.longitude,
        pointer.latitude,
        pointer.longitude
      ) < 0.05
    ) {
      let pointi = Math.abs(Math.round(Math.random() * POINTS.length - 1));
      let point = POINTS[pointi];

      let latlng = getPointFromRaduis(
        point.latitude,
        point.longitude,
        point.raduis * 1000
      );

      pointer.latitude = latlng[0];
      pointer.longitude = latlng[1];
    }
  });
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

//Function #5
function updatePointers() {
  for (let i = 0; i < pointers.length; i++) {
    r = 0.002;
    let addLat = (Math.random() * (r * 2) - r) % 24;
    let addLng = Math.random() * (r * 2) - r;

    pointers[i].latitude += addLat;
    pointers[i].longitude += addLng;
  }
  console.log("Updating the pointers...");
  createPointers();
}

//Creating the pointers on the Leaflet map
createPointers();

//Setting interval to update the pointers positioning on the Leaflet map
setInterval(sendZombiesToCentralPoint, 800);

const playSound = () => {
  pointers.map(pointer=> {
    let closest = POINTS[0];
    let d = 588;
    POINTS.map(x => {
      if (
        getDistanceFromLatLonInKm(
          x.latitude,
          x.longitude,
          pointer.latitude,
          pointer.longitude
        ) < d
      ) {
        closest = x;
        d = getDistanceFromLatLonInKm(
          x.latitude,
          x.longitude,
          pointer.latitude,
          pointer.longitude
        );
      }
    });

    if (
      getDistanceFromLatLonInKm(
        closest.latitude,
        closest.longitude,
        pointer.latitude,
        pointer.longitude
      ) < closest.radius * 1000
    ) {
      let pointi = Math.abs(Math.round(Math.random() * POINTS.length - 1));
      let point = POINTS[pointi];

      let latlng = getPointFromRaduis(
        point.latitude,
        point.longitude,
        point.raduis * 1000
      );

      pointer.latitude = latlng[0];
      pointer.longitude = latlng[1];
    }
  });
}

module.exports.pointers = pointers;
module.exports.playSound = playSound;