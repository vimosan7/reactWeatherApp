<!---GOOGLE API---->
//PUT THIS ABOVE BODY
<script>
  geolocate();
var country, city; 
var placeSearch, autocomplete;
  var componentForm = {
    //street_number: 'short_name',
    //route: 'long_name',
    locality: 'long_name',
    //administrative_area_level_1: 'short_name',
    country: 'short_name'

  };

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to cities
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')),
    {types: ['(cities)'],
  
});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  //console.log(place); 



  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  //Loop through each item in the address_components response
  for (var i = 0; i < place.address_components.length; i++) {
    //Set addressType to the type from each item in the address_components response
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) 
    //If the addressType exists in the componentForm found above set val to that response element from the API (called with short_code or long_code depending on what is chosen above.
    //Essentially it iterates through each element in address_component array. It finds the type of each element and sets it to address type. If that address type is in the componentForm as well, it will set a new variable val to the value of that address type (value can be short_name or long_name depending on what is specified in the componentForm). Lastly it will find an input form with id set to the found addressType and set its value to the value determined from the API call.
    {
      var val = place.address_components[i][componentForm[addressType]];
      //If the addressType was determined to be country, we're gonna set the country variable defined above to the value returned. Same for locality (city)
      if (addressType==='country'){
        console.log('foundcountry');
        country = val; 
        console.log(country);
      }
 else if (addressType==='locality'){
        console.log('foundcity');
        city=val;
        console.log(city);
      }
      //document.getElementById(addressType).value = val;
    }
  }
  //Maybe update state for searchbar 'term' instead of value?
  document.getElementById('autocomplete').value=`${city},${country}`;

}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

</script>

<!--/GOOGLE API-->


//PUT THIS RIGHT BEFORE END OF BODY
           <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQBjsv5y7jIqNpv0JlcoGRiaD-7VgWImA&libraries=places&callback=initAutocomplete"
        async defer></script>