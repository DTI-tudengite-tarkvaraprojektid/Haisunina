function check(x){
    if(x.type === "Muu"){
        return "Kirjeldus: "+x.description;
    } else {
        return ""
    }
}

function setToMap(){
    axios.get('api/smell/read.php')
        .then(function (response) {

            response.data.records.forEach((x)=>{
                var location = x.location;
                var locations = location.split(" ")
                var time = x.time.split(":")
                var date = x.date.split("-")

                L.marker([locations[0], locations[1]]).addTo(map)
                    .bindPopup("<b>"+x.type +"</b>" +
                        "<br />Kellaaeg: "+time[0]+":"+time[1]+""+
                        "<br />Kuupäev: "+date[2]+"."+date[1]+"."+date[0]+
                        "<br />Lõhna Tugevus: "+x.strength+
                        "<br />"+check(x)
                );
            });
        });
}

let map = L.map('mapid').setView([59.436, 24.753], 11);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; ' + mapLink,
        maxZoom: 18,
    }).addTo(map);

var latit = 0;
var longit = 0;
var userLocation;
var userIcon = L.icon({
    iconUrl: 'img/userLocation2.png',
    iconSize: [25, 43],
    iconAnchor: [18, 40]
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        latit = position.coords.latitude;
        longit = position.coords.longitude;
        // this is just a marker placed in that position
        userLocation = L.marker([position.coords.latitude, position.coords.longitude], {icon: userIcon}).addTo(map);
        // move the map to have the location in its center
        map.panTo(new L.LatLng(latit, longit));
    })
}

L.easyButton( '<span class="target">&target;</span>', function(){
    map.locate({setView: true, maxZoom: 16});
}).addTo(map);

setToMap();



