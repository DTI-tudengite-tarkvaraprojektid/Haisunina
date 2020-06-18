$(function(){
    axios.get('api/smellType/read.php')
        .then(function (response) {
            var options = document.getElementById('smellSelect');

            response.data.records.forEach((x)=>{
                var option = document.createElement('option');
                option.value = x.id;
                option.text = x.type;
                options.appendChild(option);
            });
        });
})

$(document).on("change", "#smellSelect", function() {
    if($(this).find("option:selected").text() === 'Muu') {
        document.getElementById("smellElse").style.display='block';
    } else {
        document.getElementById("smellElse").style.display='none';
    }
});

// Lõhna tugevuse skaala numbriline näit
var slider = document.getElementById("customRange1");
var output = document.getElementById("valueOutput");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

// Automaatne kuupäev
var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = day + "." + month + "." + year;

document.getElementById('dateAuto').value = today;

// Automaatne kellaaeg
var hourNow = date.getHours();
var minuteNow = date.getMinutes();

if(minuteNow < 10 ) { 
    minuteNow = "0" + minuteNow; 
}

var time = hourNow + ":" + minuteNow;
document.getElementById('timeAuto').value = time;

// Kas manuaalne või automaatne sisestamine
var latit = 0;
var longit = 0;
var userLocation;
var entryLocation = {};
var entryLat;
var entryLng;
var userIcon = L.icon({
    iconUrl: 'img/userLocation2.png',
    iconSize: [25, 43],
    iconAnchor: [18, 40]
});

let map = L.map('manualMap').setView([59.436, 24.753], 11);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; ' + mapLink,
        maxZoom: 18,
    }).addTo(map);

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

map.on('click', function(e){
    var coords = e.latlng;
    entryLat = coords.lat;
    entryLng = coords.lng;

    if (entryLocation !== undefined) {
        map.removeLayer(entryLocation);
    }

    entryLocation = L.marker([entryLat, entryLng]).addTo(map)
});

// Kellaeg
$("input[type=radio][name=timeRadio][id=timeRadio1]").click(function () {
    if($(this).prop("checked")) { 
        document.getElementById("timeAuto").removeAttribute("type", "hidden");
        document.getElementById("timeManually").setAttribute("type", "hidden");
    }
});

$("input[type=radio][name=timeRadio][id=timeRadio2]").click(function () {
    if($(this).prop("checked")) { 
        document.getElementById("timeManually").removeAttribute("type", "hidden");
        document.getElementById("timeManually").setAttribute("type", "time");
        document.getElementById("timeAuto").setAttribute("type", "hidden");
    }
});

// Kuupäev
$("input[type=radio][name=dateRadio][id=dateRadio1]").click(function () {
    if($(this).prop("checked")) { 
        document.getElementById("dateAuto").removeAttribute("type", "hidden");
        document.getElementById("dateManually").setAttribute("type", "hidden");
    } else {
        document.getElementById("dateAuto").setAttribute("type", "hidden");
        document.getElementById("dateManually").removeAttribute("type", "hidden");
    }
});

$("input[type=radio][name=dateRadio][id=dateRadio2]").click(function () {
    if($(this).prop("checked")) { 
        document.getElementById("dateManually").removeAttribute("type", "hidden");
        document.getElementById("dateManually").setAttribute("type", "date");
        document.getElementById("dateAuto").setAttribute("type", "hidden");
    }
});

// Asukoht
var manualMap = document.getElementById('manualMap');
manualMap.style.display = "none"

$("input[type=radio][name=locationRadio][id=locationRadio1]").click(function () {
    if($(this).prop("checked")) {
        manualMap.style.display = 'none';
    }
});

$("input[type=radio][name=locationRadio][id=locationRadio2]").click(function () {
    if($(this).prop("checked")) {
        document.getElementById("locationAuto").setAttribute("type", "hidden");
        manualMap.style.display = 'block';
    }
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        $('#locationAuto').val(position.coords.latitude+" "+ position.coords.longitude)
    })
}

$('#smellSubmit').on('click', function(){
    var check = document.getElementById('smellSelect').value
    if(check !== "1"){

        if ($('#timeRadio2').is(':checked')) {
            $('#timeAuto').val(document.getElementById('timeManually').value)
        }

        if ($('#dateRadio2').is(':checked')) {
            $('#dateAuto').val(document.getElementById('dateManually').value)
        }

        if ($('#timeRadio1').is(':checked')) {
            $('#timeAuto').val(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
        }

        if ($('#dateRadio1').is(':checked')) {
            $('#dateAuto').val(year + "-" + month + "-" + day)
        }

        if ($('#locationRadio2').is(':checked')) {
            if(entryLat !== null || entryLng !== null){
                $('#locationAuto').val(entryLat+" "+entryLng)
            } else {
                alert("Valige koht kaardil")
            }
        }
        window.location = "index.html"
    } else {
        alert("Vali õige lõhnahäiringu iseloomustus")
    }
})

$('#smellForm').submit(function (e) {

    axios({
        method: 'post',
        url: 'api/smell/create.php',
        data: {
            type: document.getElementById('smellSelect').value,
            strength: document.getElementById('customRange1').value,
            location: document.getElementById('locationAuto').value,
            date: document.getElementById('dateAuto').value,
            time: document.getElementById('timeAuto').value,
            description: document.getElementById('smellElse').value,
            user_id: 1,
            smellType_id: document.getElementById('smellSelect').value
        }
    });
    e.preventDefault();
});

