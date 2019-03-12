import React from 'react';
import  {Line} from 'react-chartjs-2';
import {Spring} from 'react-spring/renderprops';



class Graph extends React.Component{

/*
//Unused function could be useful for future modifications
//Allows the user to create an array of max/min values of a property for a single day (loops through intervals). This array can be used as a dataset for graphs. 
//getProperty function takes a (single) day and 2 properties, property1 and property2. It maps through the day and creates a new array (returnedArray) with each element who's value is the value specified from property1 and property2. We could use this function to return an array of minimum and maximum temperatures from the selectedDay which can be passed as prop to this component 
//Examples 
//Creates the array of min/max temps for the day using the getProperty function, these will be used as data for the datasets in the state (for ChartJS)
//temp_min = this.getProperty(this.props.selectedDay,'main','temp_min');
//temp_max = this.getProperty(this.props.selectedDay,'main','temp_max');
//dt = this.getProperty(this.props.selectedDay,'dt',null);

 getProperty = (day,property1,property2) => { 
 	var returnedArray = day.map((interval)=> 
 	{
 	if(property2===null){return interval[property1]} //If only one property specified
 	else {return interval[property1][property2]}
 	 //This returns the value of property1.property2 which will be an element in returnedArray
 		})
 	return returnedArray; //The return statement for getProperty is an array with properties that were mapped through

 }

 */


//chartData holds all the data (values) used to render the graph. The data is passed to this component as props. This is to allow this component to be easily rendered with custom data from the parent component. Colors, labels, and other modifications can also be done using the chartData state property.
state = {

chartData:{
        labels: this.props.label, 
        datasets:[
          {
            label:this.props.data1label,
            data:this.props.data1,
            fill:false,
        	backgroundColor : 'white',
        	pointBackgroundColor: 'white',
        	pointHoverBackgroundColor: 'black',
        	borderColor: 'white',
        	pointBorderColor: 'white',
        	pointHoverBorderColor: 'black',


          },


          {
            label:this.props.data2label,
            data:this.props.data2,
            fill:false,
        	backgroundColor : 'white',
        	pointBackgroundColor: 'white',
        	pointHoverBackgroundColor: 'black',
        	borderColor: 'white',
        	pointBorderColor: 'white',
        	pointHoverBorderColor: 'black',


          }

        ],

      }


   


}; 



//Configuration data for ChartJS chart (Titles,scales,axis,etc)
 config = {

	maintainAspectRatio: false,
	animation:{duration:0},
	legend:{display:false},
	title:{display:true,text:this.props.title,fontColor:'white'},
	scales: {

   		xAxes: [{

        gridLines: {
          color: 'white',
          display:false
        },

        ticks:{
        	fontColor:'white'
        } 

      }],



    	yAxes: [{

	        gridLines: {
	          color: 'white',display:false
	        },

	        ticks:{
	        	fontColor:'white'
	        },

      }]
  	}
};


render(){

	return (

<Spring
      from={{opacity:0}} to={{opacity:1}} config={{delay:400}}>
      {props=>(
        <div style={props}>
		


		<div>
		<div className="LineGraphTemp" >

		<Line data={this.state.chartData} 
		 height={200}
		options={this.config} />
		
		</div>
		

		</div>


</div>
      )}
      </Spring>



		); 

}


}

export default Graph;