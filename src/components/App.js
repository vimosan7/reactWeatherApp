import React from 'react'; 
import openweather from '../api/openweather';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import WeekList from './WeekList';
import DayList from './DayList';
import WeeklyAverages from './WeeklyAverages';
import Graph from './Graph';
import {getMinMaxValue} from './functions/getMinMaxValue';
import {getDayOfWeekArray} from './functions/getDayOfWeekArray';
import './css/landingPage.css';
import './css/cold.css';
import './css/warm.css';


class App extends React.Component { 


	//All the states of this App component are set using the response of the onTermSubmit function (API Call).
	state = {weather:null,weatherSplit:null,selectedDay:null,graphKey:null}; 
	
	

	//API CALL
	//This API call is passed to the SearchBar component as a prop. In the SearchBar component this API is called with a 'term'. This 'term' is the city followed by country code, and is the parameter required for this API call. This 'term' is determined with the help of Google's Places API (see SearchBar component). This API call is what sets all the values for the properties in the state of this App component. 
	onTermSubmit =  async (term) => {

	const response = await openweather.get('/forecast', {
		params: { q: term }
		
	});

	//Creating an array that splits the weather (response from API) into seperate days based on the day 

	//Get first date, set it equal to prevdate, check if prevdate = currdate, if its not equal create a new array and then push the data into the new array 
	var prevday = (new Date(response.data.list[0].dt*1000)).getUTCDate(); 

	//This array will consist of elements that are also arrays (each element will be called a day). There will be a new array for each day, each day array will contain all the weather data for that day, each element will be referred to as interval.
	var weatherSplitArray = [[]]; 

	//Counter is used to keep track of current day, incremented when the day changes. It is used to index the weatherSplitArray
	var counter = 0; 

	(response.data.list).forEach((curr) => {

		//Create new date object from UNIX timestamp (response.data.list.dt is UNIX timestamp). Please note the difference between this day variable and the day array.
		var day = (new Date(curr.dt*1000)).getUTCDate(); 

		//Check if day===prevday if it is, we will set prevday to the day variable (current), and then push the element into the day array, in other words it will be added as an interval for that day
		if (day === prevday){
			prevday=day; 
			weatherSplitArray[counter].push(curr);
			
		} 

		//Otherwise, if it is a new day, we will again set prevday to the day variable (current). Increase the counter since it is a new day, create an empty array in the weatherSplitArray for the new day and push the element (interval) into the new day. 
		else {

			prevday=day; 
			counter = counter + 1; 
			//Create new array to hold the new day's data 
			weatherSplitArray[counter] = []; 
			weatherSplitArray[counter].push(curr);

			
		}
		

		

	}); 


	this.setState({weather:response.data.list,weatherSplit:weatherSplitArray,selectedDay:weatherSplitArray[0],graphKey:Math.random()});
	//Math.Random() sets new random key for graphKey property so itll re-render the graph when new city entered. If a new key isn't passed into the graph (chartjs) it fails to re-render the graph even though the prop being passed to it from this App component (weatherSplit) changes. So we use this to generate a random new key and update the key when new city entered so the graph will rerender accordingly. 
	


	

	};

	//Function to set the state of selectedDay. This function will be passed as a prop to child components. 
	onDaySelect = (day) => {
		this.setState({selectedDay:day});
	

	};








render(){


//Landing page, no API call is made yet. 
if (this.state.weatherSplit===null){return (


		<div className="landingBackground">
		<div className="ui container">
		<div className="ui grid">
		<div className="ui row">

		<div className="eight wide column centered">
		<div className="landingSearchBar">
		<SearchBar onTermSubmit={this.onTermSubmit}/>
		</div>
		</div>

		</div>
		</div>
		</div>
		</div>
		);}


//After user selects a city from dropdown
	else  {
		//Check if the weather is warm or cold (can add more conditions in the future like mild day, or extremely cold day, etc.)
		var background,searchbar,dayType;
		if (this.state.weather[0].main.temp <= 5){
		  background = 'coldBackground';
		  searchbar = 'coldSearchBar'; 
		  dayType = 'coldDay';
		}
		else if (this.state.weather[0].main.temp > 5){
		 background = 'warmBackground';
		 searchbar = 'warmSearchBar'; 
		 dayType = 'warmDay';
		}


		return (
		<div className={background}>
		<div className="ui container">
		<div className="ui grid">

		<div className="ui row">
		<div className="eight wide column centered">
		<div className={searchbar}>
		<SearchBar onTermSubmit={this.onTermSubmit}/>
		</div>
		</div>
		</div>
		
		<div className="ui row centered">
		<CurrentWeather today={this.state.weather[0]}/>
		</div>

		

		<div className="ui row centered">
		<div className={dayType}>
		<WeekList days={this.state.weatherSplit} DayOfWeekArray={getDayOfWeekArray(this.state.weatherSplit)} onDaySelect={this.onDaySelect} selectedDay={this.state.selectedDay}/> 
		</div>
		</div>

	

		<div className="ui row centered">
		<DayList day={this.state.selectedDay}/>
		</div>

		<div className="ui row centered">
		<WeeklyAverages weather={this.state.weather}/>
		</div>


		<div className="ui row centered">

		<div className="eight wide column centered">
		<Graph 
		key={this.state.graphKey}
		label={getDayOfWeekArray(this.state.weatherSplit)} 
		data1label='Min Temp'
		data1={getMinMaxValue(this.state.weatherSplit,'main','temp_min','min')} 
		data2label='Max Temp'
		data2={getMinMaxValue(this.state.weatherSplit,'main','temp_max','max')} 
		title={'Weekly Temperature (°C)'}
		/>
		</div>

		<div className="eight wide column centered">
		<Graph 
		key={this.state.graphKey}
		label={getDayOfWeekArray(this.state.weatherSplit)} 
		data1label= 'Min Wind Speed'
		data1={getMinMaxValue(this.state.weatherSplit,'wind','speed','min')} 
		data2label= 'Max Wind Speed'
		data2={getMinMaxValue(this.state.weatherSplit,'wind','speed','max')}
		title={'Weekly Wind Speeds (km/h)'}
		/>
		</div>

		</div>

		

		
		</div>
		</div>
		</div>
		);
	}

	
	

		}

}


export default App; 