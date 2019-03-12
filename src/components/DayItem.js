import React from 'react';
import './css/DayItem.css';

//This component displays a single interval for a day and the weather data for that given interval. This component is the child component of DayList.

const DayItem = ({interval}) => {

	//Get date of current interval (Will be used to get the time)
	const date = new Date(interval.dt*1000);

	//Function to pad a number to 2 digits, used when we return hour/minutes of the current day
	const pad2 = (number) => {
		return (number<10?'0':'') + number
	}
	
	
	//If interval is not loaded yet 
	if (!interval){
		return <div>Loading...</div>;
	}


	return (

		 <div className='DayItem item'>
		 <div className="content">
		 <div className="header">
		
		 {pad2(date.getUTCHours())}:{pad2(date.getUTCMinutes())} <br/>

		 <i className={`wi wi-owm-day-${interval.weather[0].id} weathericon`}/> <br/>

		 {Math.round(interval.main.temp)}&deg; C <br/>

		 {interval.weather[0].description.toUpperCase()} <br/>

		 </div>
		 </div>
		 </div>


		

		);
};



export default DayItem;