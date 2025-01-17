import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const apiKey=process.env.WEATHER_API_KEY;



const getWeather = async (req,res,next)=>{


try{
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Taal&days=6&aqi=no&alerts=no`;
    const response = await axios.get(url);
    console.log(response.data);
    res.json(response.data);

}catch(error){
    console.log(error);
    next(error);

}

}



export default {getWeather};