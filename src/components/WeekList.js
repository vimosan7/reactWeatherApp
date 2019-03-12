import React from 'react';
import WeekItem from './WeekItem';
import {Spring} from 'react-spring/renderprops';


//This component is the parent component to WeekItem. This component creates an array of WeekItem components which will be rendered together. There will be a WeekItem for each day of the week that is returned from the OpenWeatherMap API.

const WeekList = ({days,DayOfWeekArray,onDaySelect,selectedDay}) => {

	//If the response from the API isn't loaded yet 
	if (!days){
		return <div>Loading...</div>;
	}

	

	//Map through the days array and create a WeekItem component for each day in the days array. The data for each day is also passed into this child component.
	const renderedList = days.map((day,index)=>{

	return <WeekItem key={day[0].dt_txt} day={day} dayOfWeek={DayOfWeekArray[index]} onDaySelect={onDaySelect} selectedDay={selectedDay}/>;

	}); 


	return (

			<Spring
			      from={{opacity:0}} to={{opacity:1}} config={{delay:400}}>
			      {props=>(
			        <div style={props}>

						<div className="ui horizontal list centered">
						{renderedList}
						</div>

					</div>
			      )}
			</Spring>


		);



}; 

export default WeekList;