var type = "";
var placeLoc = {};
var latlng;

function handleLocationError(browserHasGeolocation,infoWindow,pos) {
	
	infoWindow.setPosition(post);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: Geolocation failed!':
		'Error: Your browser does not support geolocation');

}

function setSearchType(searchType) {
	type = searchType;
}

function callback (results,status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {

		var customPlaces = [];
		$.getJSON("places/all",function (json) {
			customPlaces = json;
			for (var i = 0; i < customPlaces.length; i++) {
				customPlaces[i]

				if (customPlaces[i].type == type) {

					customPlaces[i].geometry = {location:"",viewport:""};
					customPlaces[i].geometry.location = {lat:0,lng:0};
					customPlaces[i].geometry.location.lat = customPlaces[i].lat;
					customPlaces[i].geometry.location.lng = customPlaces[i].lng;

					placeLoc = customPlaces[i].geometry.location;
					latlng = new google.maps.LatLng(placeLoc.lat,placeLoc.lng);

					createMarker(customPlaces[i]);

				}
			}



		})

		for (var i = 0; i < results.length; i++) {
			
			latlng = results[i].geometry.location;
			createMarker(results[i])
		
		}
	}
}



//<!-- Creates each marker -->
function createMarker(place) {

    // var for storing the image of the pin to be used
    var icon;
    // switch cases for checking the searchtype to determine which color of pins to display
    switch(type){
        case "food":
            icon = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png";
            break;
        case "drink":
            icon = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png";
            break;
        case "entertainment":
            icon = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png";
            break;
        case "shopping":
            icon = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/ltblue-dot.png";
            break;
        case "lodging":
            icon = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png";
            break;
        case "parking":
            icon = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/pink-dot.png";
            break;
        case "bank":
            icon = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/orange-dot.png";
            break;
        case "place_of_worship":
            icon = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/purple-dot.png";
            break;
        default:
            icon = place.icon;
            break;
    }

    var marker = new google.maps.Marker({
        map: map,
        icon: icon,
        position: latlng
        
    });


	function getPlaceInfo(place) {
		var element;
		var info;
		for(element in place){
			info += place[element] + "<br>"
		}
		return info;
	}

	function displayInfo() {
		
		var element;
		var tag;
		
		var lat = place.geometry.location.lat;
		var lng = place.geometry.location.lng;
		var location = place.geometry.location
	
		if(location.toString() == "[object Object]"){
			location = "(" + lat.toString() + "," + lng.toString() + ")";
		}
	
		tag = document.getElementById("tab1default").innerHTML =
			"Place Name:" + place.name + "<br>" + 
			"Location:"  + location + "<br>" + 
			"Address:" + place.vicinity;
	
		window.scrollTo(0,document.body.scrollHeight);
		return tag;
	}

	google.maps.event.addListener(marker,'mouseover',function () {
	    infowindow.setContent(place.name);
	    infowindow.open(map,this);
	  });
	          
	google.maps.event.addListener(marker,'mouseout',function () {
	  infowindow.setContent(place.name);
	  infowindow.close(map,this);
	});
	          
	google.maps.event.addListener(marker,'click',function () {
	  displayInfo();
	});


//need to encapsulate everything in createMarker!
} //<- forgot this

