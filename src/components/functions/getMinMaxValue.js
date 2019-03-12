//Map through each day, and in each day run a loop(forEach) on the intervals for the day to determine max/min value of a property  (example temp_min). A conditional is used to compare the previous interval min/max value to the current min/max value and value is updated based on the conditional 
//EXAMPLE: property1='main', property2='temp_min' maxmin='min'

export const getMinMaxValue = (days,property1,property2,maxmin='min') => { 
 	 	 
 	return days.map((day)=>{
 		var value = day[0][property1][property2]; //temp_min of first element
 		day.forEach((interval)=>{
 			if (maxmin==='min'){
 			if (interval[property1][property2] < value) {
 				value = interval[property1][property2];
 			}
 			}
 			else if (maxmin==='max'){
 				if (interval[property1][property2] > value) {
 				value = interval[property1][property2];
 			}
 			}

 		});
 		return value; 
 	});



 }