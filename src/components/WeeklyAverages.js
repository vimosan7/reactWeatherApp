import React from 'react'; 
import './css/WeeklyAverages.css';
import {Spring} from 'react-spring/renderprops';


//This component contains a function to calculate the average weekly average for a selected property. This component uses that function to calculate various weekly aveages and then displays them. 
const WeeklyAverages = ({weather}) => {



//getAverage is a function that loops through the array that is passed to the function, in this case the weather array (all the weather data for the city), and calculates the average of a specified property. Property1 is parent property and Property2 is the child property of each array element
const getAverage = (weather,property1,property2) => {
var runningTotal = 0;
weather.forEach((curr)=> {
runningTotal = runningTotal +  curr[property1][property2];  

});
return (runningTotal/weather.length);

}; 



//Calculate averages to be displayed
var averagePressure = getAverage(weather,'main','pressure');
var averageTemperature = getAverage(weather,'main','temp');
var averageHumidity = getAverage(weather,'main','humidity');
var averageWindSpeed = getAverage(weather,'wind','speed');


return (

	<Spring
	      from={{opacity:0}} to={{opacity:1}} config={{delay:400}}>
	      {props=>(
	        <div style={props}>


				<div className="AverageWeather"> 
				<div className="content">

				<div className="header">
				Weekly Averages <br/>
				</div>

				<div className="averageData">
				Pressure: {averagePressure.toFixed(2)} hPa<br/>
				Temperature: {averageTemperature.toFixed(2)} &deg; C<br/>
				Humidity: {averageHumidity.toFixed(2)}%<br/>
				Wind Speed: {averageWindSpeed.toFixed(2)} m/s<br/>
				</div>

				</div>
				</div>

		</div>
	      )}
	      </Spring>


	);



};

export default WeeklyAverages;