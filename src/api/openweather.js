import axios from 'axios';
const KEY = '26d18bf5a16703540694881d6c74be54';


export default axios.create({

baseURL:'http://api.openweathermap.org/data/2.5',
params:{
	APPID:KEY,
	units:'metric'
}


});
