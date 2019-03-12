import React from 'react';
import './css/SearchBar.css';
import {Spring} from 'react-spring/renderprops';

/* global google */


//Will be used to save the countrycode and cityname
var country, city; 

//Will be used in the handlePlaceChanged callback function 
var componentForm = {
    locality: 'long_name',
    country: 'short_name'
  };

//Props: onTermSubmit function (API Call) from App component is passed as a prop to this SearchBar component as onTermSubmit

class SearchBar extends React.Component {

	//State is added with the term property in order to make this a controlled component. Term's value is of form 'City,CountryCode'. It is set once the user clicks a location from the dropdown GoogleAPI. This 'term' property is used only to make the API call in this project, but can be used again if needed in future projects/modifications. 

	state = {term:''}; 

	constructor(props) {
    super(props);
    //ref created and will be set to the input tag in the rendered jsx 
    this.autocompleteInput = React.createRef();


  }


  //Similar to initAutocomplete from Google API documentation (see documentation). Initializes new autocomplete object, and adds callback function handlePlaceChanged as listener to autocomplete object
  componentDidMount() {
  	//Initializes new autocomplete object
    this.autocomplete = new google.maps.places.Autocomplete(
    //"types":["(cities)"] specifies to only suggest cities
    this.autocompleteInput.current,{"types": ["(cities)"]});
    //handlePlaceChanged callback is invoked each time a place_changed event occurs (when user clicks a city from dropdown)
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    //Invoke geolocation 
    this.geolocate();
    
  }


 



  //Prevents the default form submission action.
  onFormSubmit = (event) => {
		event.preventDefault(); 
	};

	//handlePlaceChanged is the callback function that is called when a city from the dropdown is clicked.

  //Essentially this function iterates through each element in address_component array(from Google Places API). It finds the type of each element and sets it to address type. If that address type is in the componentForm as well, it will set a new variable (val) to the value of that address type (value can be short_name or long_name depending on what is specified in the componentForm). Lastly, depending on the address type (country or city) it will set the global variables country/city to the value. It then sets the state property 'term' to city,country and then invokes the function onTermSubmit(API call) that was passed to this component as a prop with the state property 'term'. 
  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    //If user types something that doesn't return a result from Google Places API (user doesn't select something from the dropdown)
    if(typeof place.address_components == 'undefined'){
    	alert('Please select from dropdown');
    return;
	}
   

    //Getting the CityName,CountryCode
    //Loop through each item in the address_components response 
  	for (var i = 0; i < place.address_components.length; i++) {

    //Set addressType to the type from each item in the address_components response
    var addressType = place.address_components[i].types[0];

    //If the addressType exists in the componentForm found above set val to that value of that addressType from the google API (short_code or long_code depending on what is chosen above in the componentForm)
    if (componentForm[addressType]) 
    {
      var val = place.address_components[i][componentForm[addressType]];
      
      //If the addressType was determined to be country, we're gonna set the country variable defined above to the value returned. Same for locality (city)
      if (addressType==='country'){
        country = val; 
      }
      else if (addressType==='locality'){
        city=val;
      }
      
    }
  }

  //Set the 'term' (state property) of this component to the city,country variables (CityName,CountryCode) determined above using Google Places API. Invoke the onTermSubmit function (API Call) which was passed as a prop to this component using the 'term' property from this component's state.
  this.setState({term:`${city},${country}`});
  this.props.onTermSubmit(this.state.term);


    
  };

  


  
  //Function to get user's location. This location will be used with the Google Places API to provide more accurate suggestions (cities close to user location). See Google Places API documentation for more details.
  geolocate = ()=> {

  if (navigator.geolocation) {
  	//Callback function is in ES6 form to preserve 'this' keyword, will cause errors if we do not pass the callback function in ES6 format or if we don't bind 'this'.
    navigator.geolocation.getCurrentPosition((position)=> {
      //Get geolocation 
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //Set circle center + radius using geolocation found above and accuracy 
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      //setBounds method invoked on the autocomplete object using the circle found above 
      this.autocomplete.setBounds(circle.getBounds());
    });
  }
};



   


	render(){
		return (

<Spring
      from={{opacity:0}} to={{opacity:1}} config={{delay:400}}>
      {props=>(
        <div style={props}>

   <div className="ui " >
    <form className="ui form" onSubmit={this.onFormSubmit} >
    <div className="field" >
  		<input ref={this.autocompleteInput}  id="autocomplete" placeholder="Enter your city"
         type="text" autoFocus={true}></input>
        </div>
        </form>
       </div>


</div>
      )}
      </Spring>
       
			);
	}


}


export default SearchBar;