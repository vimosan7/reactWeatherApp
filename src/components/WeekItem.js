import React from 'react';
import './css/WeekItem.css';

//This component displays the day of the week and the weather data for the given day. It also allows you to change the selectedDay (which will cause a re-render of DayList/DayItem), and will indicate which day is currently selected.

const WeekItem = ({day,dayOfWeek, onDaySelect,selectedDay}) => {


//On each render of this component it checks if day===selectedDay, initially the first day will be the selectedDay. 
//Function to get className depending on the comparison between day and selectedDay
const getWeekItemClass = (day,selectedDay) => {
	
	return (day===selectedDay)? 'week-item item selected':'week-item item';
};



return (
	<div  onClick={()=>onDaySelect(day)} className={getWeekItemClass(day,selectedDay)} >

	<div className="content">

	<div className="header">
	{dayOfWeek.substring(0,3)}<br/>	
	

	<i className={`wi wi-owm-day-${day[0].weather[0].id} weathericon`}/><br/>
	<div className="temperature">
	{Math.round(day[0].main.temp)}&deg; C
	</div>
	{day[0].weather[0].description.toUpperCase()}<br/>
	</div>
	</div>

	</div>

	);


};

export default WeekItem;