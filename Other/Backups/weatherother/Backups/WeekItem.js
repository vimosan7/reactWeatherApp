import React from 'react';
import './WeekItem.css';

const WeekItem = ({day,dayOfWeek, onDaySelect,selectedDay}) => {


 

/* selectedtest = ()=>{
		//ref.current.addEventListener('load',this.setSpans);
		if (day===selectedDay){
		ref.current.classList.add('selected');}
		console.log('reftest'); 
		console.log(ref.current);
	}

	selectedtest();*/
/*
componentDidMount(){
		this.imageRef.current.addEventListener('load',this.setSpans);
	}

	setSpans = ()=> {
		const height = this.imageRef.current.clientHeight;
		const spans = Math.ceil(height / 10);
		this.setState({spans: spans});
	}

*/
//const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

	console.log(day);
	//	{dayOfWeek[(new Date(day[0].dt*1000)).getUTCDay()].toUpperCase()}<br/>

//This component returns the JSX for each individual day to the parent component Weeklist, if the day is the same as the selectedDay (state from App Component) it will add class 'selected' to the day, otherwise it will return the JSX without the 'selected' class. The 'selected' class makes the background of the individual day a bit darker to show the user that it is the current selected day. The first day is selected by default, because the selectedDay state is the first day by default. 
//<i className={`wi wi-owm-day-${day[0].weather[0].id} weathericon`}/> is using an external css file to map different icons to id's on openweathermap since the openweathermap icons are ugly	
//<img src={`http://openweathermap.org/img/w/${day[0].weather[0].icon}.png`} alt="weathericon" />
//<img src={`http://openweathermap.org/img/w/${day[0].weather[0].icon}.png`} alt="weathericon" />
if (day===selectedDay){
	return (
	<div onClick={()=>onDaySelect(day)} className="week-item item selected" id="selected">

	<div className="content">

	<div className="header">
	{dayOfWeek.substring(0,3)}<br/>
	
	<i className={`wi wi-owm-day-${day[0].weather[0].id} weathericon`}/>
	
	<br/>
	<div className="temperature">
	{Math.round(day[0].main.temp)}&deg; C 
	</div>
	{day[0].weather[0].description.toUpperCase()}<br/>
	</div>
	</div>

	</div>

	);
}

return (
	<div onClick={()=>onDaySelect(day)} className="week-item item" >

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