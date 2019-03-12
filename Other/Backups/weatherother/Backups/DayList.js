import React from 'react';
import DayDetail from './DayDetail';
import './DayList.css';
import {Spring} from 'react-spring/renderprops';

const DayList = ({day}) => {

	const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	const date = new Date(day[0].dt*1000);

	//If the response from the API isn't loaded yet 
	if (!day){
		return <div>Loading...</div>;
	}



	const renderedList = day.map((interval)=>{

	//console.log(day);
	return <DayDetail  key={interval.dt} interval={interval}/>;


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

	);



}; 

export default DayList;