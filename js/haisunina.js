var mymap = L.map('mapid').setView([59.436, 24.753], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var locations = [
    [59.436, 24.753, "Mädanev", "Kellaaeg: 19:05"],
    [59.395, 24.700, "Terav", "Kellaaeg: 12:30"],
    [59.564, 24.800, "Hapukas", "Kellaaeg: 14:15"],
    [59.320, 24.750, "Keemiline", "Kellaaeg: 23:59"]
];
for(let i = 0; i <= locations.length; i++){
    L.marker([locations[i][0], locations[i][1]]).addTo(mymap)
        .bindPopup("<b>"+locations[i][2] +"</b><br />"+locations[i][3]+"").openPopup();
}

$('.nav a').on('click', function() {
    $('.navbar-collapse').collapse('hide');
});







