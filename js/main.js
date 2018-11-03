//https://stackoverflow.com/questions/19640055/multiple-markers-google-map-api-v3-from-array-of-addresses-and-avoid-over-query
//https://stackoverflow.com/questions/11792916/over-query-limit-in-google-maps-api-v3-how-do-i-pause-delay-in-javascript-to-sl

// Make variables globally available
var map, marker, myLat, myLng, myLatLng;

// Delay prevents flooding the maps api
var delay = 1000;

// Global variable to remind us what to do next
var nextAddress = 0;

// Initialize map and styles
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.1443502, lng: -98.513289 },
        zoom: 4,
        //Apply Dark map style - https://mapstyle.withgoogle.com/
        styles: [
            {
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#212121'
                    }
                ]
            },
            {
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        color: '#212121'
                    }
                ]
            },
            {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                featureType: 'administrative.country',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#9e9e9e'
                    }
                ]
            },
            {
                featureType: 'administrative.land_parcel',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#bdbdbd'
                    }
                ]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#181818'
                    }
                ]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#616161'
                    }
                ]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        color: '#1b1b1b'
                    }
                ]
            },
            {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#2c2c2c'
                    }
                ]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#8a8a8a'
                    }
                ]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#373737'
                    }
                ]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#3c3c3c'
                    }
                ]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#4e4e4e'
                    }
                ]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#616161'
                    }
                ]
            },
            {
                featureType: 'transit',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000'
                    }
                ]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#3d3d3d'
                    }
                ]
            }
        ]
    });

    map.data.setStyle(function (allLocations) {
        //the count of missing children determines magnitude
        var magnitude = allLocations.getProperty('count');
        return {
            icon: getCircle(magnitude)
        };
    });
}

// Calculate radius/magnitude of circle
function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#a63f6b',
        fillOpacity: .2,
        scale: Math.log(magnitude) * 8 + 2,
        strokeColor: '#ffffff',
        strokeWeight: .5
    };
}

function geocodeLocation(location, next) {

    var locationCity = allLocations[nextAddress].city;
    var locationCount = allLocations[nextAddress].count;
    var magnitude = allLocations[nextAddress].count;
    var geocodeKey = 'GEOCODE API KEY .env';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + allLocations[nextAddress].city + '&key=' + geocodeKey;

    $.getJSON(url, function (res) {
        var status = res.status;
        if (status == "OK") {
            var res = res.results[0].geometry.location
            myLat = res.lat;
            myLng = res.lng;
            myLatLng = { lat: myLat, lng: myLng };
            //fix grammar in infowindow
            if (locationCount !== "1") {
                var infowindow = new google.maps.InfoWindow({
                    content: locationCount + " children went missing from " + locationCity + " in 2017."
                });
            } else {
                var infowindow = new google.maps.InfoWindow({
                    content: locationCount + " child went missing from " + locationCity + " in 2017."
                });
            }
            marker = new google.maps.Marker({
                icon: getCircle(magnitude),
                position: myLatLng,
                map: map,
                setMap: map
            });
            marker.addListener('click', function () {
                infowindow.open(map, this);
            });
        }
        else {
            //if we were sending the requests too fast, try this one again and increase the delay
            if (status !== "OK") {
                nextAddress--;
                delay++;
            } else {
                var reason = "Code " + status;
                var msg = 'address="' + locationCity + '" error=' + reason + '(delay=' + delay + 'ms)';
                console.log(msg);
            }
        }
        next();
    });
};

// Function to call the next Geocode operation when the reply comes back
function theNext() {
    if (nextAddress < allLocations.length) {
        console.log("This is the current city " + allLocations[nextAddress].city + " | lat: " + myLat + ", lng: " + myLng)
        setTimeout('geocodeLocation("' + allLocations[nextAddress].city + '", theNext)', delay);
        nextAddress++;
    } else {
        // Show map bounds
        map.fitBounds(bounds);
    }
}

// Call that function for the first time

theNext();