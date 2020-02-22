var pointers = [];

const CENTRAAL = {
    latitude: 50.799961,
    longitude: 3.279420
};

const LANGSTE_ARM = {
    latitude: 50.719920,
    longitude: 3.332220
}

function getLongest(){
    let lla = Math.abs(CENTRAAL.latitude - LANGSTE_ARM.latitude);
    let lln = Math.abs(CENTRAAL.longitude - LANGSTE_ARM.longitude);

    return Math.max(lla,lln);
}

//Function for creating pointers(location of zombies)
function createPointers() {

  if(pointers.length < 250){
  for (let i = 0; i < 10; i++) {
    
    let r = getLongest() % 24;

    let lat = (Math.random() * (r * 2) - r);
    let long = (Math.random() * (r * 2) - r);

    var pointer = {
        latitude: lat,
        longitude: long
    };
    pointers.push(pointer);
    console.log(pointer);
  }}
}

function updatePointers(){
  for(let i =0; i < pointers.length; i++) {
    r = 0.002;
   let addLat = (Math.random() * (r * 2) - r) % 24;
   let addLng = (Math.random() * (r * 2) - r);

   pointers[i].latitude += addLat;
   pointers[i].longitude += addLng;
  }
  console.log("Updated all pointer");
  createPointers();
}

createPointers();
setInterval(updatePointers, 2000);


module.exports = pointers;

// 50.799961, 3.279420 -- centraal
// 50.719920, 3.332220 -- verste

// 0,080041 , -0,0528
// 0,080041 -- radius   