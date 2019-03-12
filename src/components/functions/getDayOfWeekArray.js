 //Maps through the days array,determine the day of the week and create an array element for each day of the week (each element will be a string)
export const getDayOfWeekArray = (days) => {
const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
 return days.map((day) => {
	const date = new Date(day[0].dt*1000);
	return daysOfWeek[date.getUTCDay()].toUpperCase();
});

}