import React from 'react';
import {Spring} from 'react-spring/renderprops';
import './css/CurrentWeather.css';


//This component displays the most recent data available from the OpenWeatherMap API. 
const CurrentWeather = ({today}) => {


return (

    	<Spring
          from={{opacity:0}} to={{opacity:1}} config={{delay:400}}>
          {props=>(
            <div style={props}>


                <div className="CurrentWeather">

                <div className="title">
                CURRENT WEATHER <br/>
                </div>
                
                <i className={`wi wi-owm-day-${today.weather[0].id} weathericon`}/><br/>

                <div className="weatherdetails">
                {Math.round(today.main.temp)}&deg; C <br/>
                {today.weather[0].description.toUpperCase()}
                </div>

                </div>


            </div>
          )}
          </Spring>
	

  );

};

export default CurrentWeather;