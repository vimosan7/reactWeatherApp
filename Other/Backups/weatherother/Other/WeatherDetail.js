import React from 'react';

//state = {}; 

class WeatherDetail extends React.Component {

//lets map through this.props.data or for each item in it lets display sometihng 
//DO NOT FORGET TO INCLUDE KEYS FOR THE LIST!

//how can we test to make sure its rendering correctly?

 renderContent(){
 	if (this.props.data===null){return <div>EMPTY</div>;}
 	var weather = this.props.data[0].weather[0].description;
 	return (
 			<div>
 			{weather}
 			</div>
 		);
 	
 }

	render(){
		
			return (
					<div>{this.renderContent()}</div>

				);
		
	}


}


export default WeatherDetail;