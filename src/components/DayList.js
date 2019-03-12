import React from 'react';
import DayItem from './DayItem';
import './css/DayList.css';
import {Spring} from 'react-spring/renderprops';


//This component is the parent component to DayItem. This component creates an array of DayItem components which will be rendered together. There will be a DayItem for each interval(3-hour interval). The day that will be displayed is the selectedDay state property from the App component. By default, the first day returned from the OpenWeatherMap API will be displayed. However, if data only exists for one interval of the first day, this component will be hidden.

const DayList = ({day}) => {

	const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	const date = new Date(day[0].dt*1000);

	//If the response from the API isn't loaded yet 
	if (!day){
		return <div>Loading...</div>;
	}

	//Only render the DayItem if there is more than one element in the day array prop
	//Looks silly rendering 1 element and the element would already be displayed under current weather. This (usually) only occurs for the first day of the returned API data. 
	else if (day.length>=2){



		const renderedList = day.map((interval)=>{

		return <DayItem  key={interval.dt} interval={interval}/>;

			}); 


		return (

				<Spring
				      from={{opacity:0}} to={{opacity:1}} config={{delay:400}}>
				      {props=>(
				        <div style={props}>


					<div className="daylist">

					<div className="dayOfWeek">
					{daysOfWeek[date.getUTCDay()].toUpperCase()}<hr/>
					</div>

					<div className="ListContainer" >
					<div className="ui horizontal list centered" >
					{renderedList}
					</div>
					</div>

					</div>

					
					</div>

				      )}
				</Spring>

		);}


//If day.length<2 we will render nothing (component won't show)
return(null); 



}; 

export default DayList;