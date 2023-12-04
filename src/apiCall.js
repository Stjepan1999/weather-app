import { format, addDays} from 'date-fns'
import { showTodaysWeather, showWeekForecast, showError, hideError } from './domFunctions';


async function getWeather(cityName) {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const fifthDayDate = format(addDays(new Date(), 5), 'yyyy-MM-dd');
    const apiKey = 'R7BYG2ZJK7JJDLMPD3NCB6D7T'
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${todayDate}/${fifthDayDate}?unitGroup=metric&include=days%2Ccurrent&key=${apiKey}&contentType=json`

    try {
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok) {
            console.error('Failed to fetch weather data: ', response.status)
        }
        const weatherData = await response.json();
        hideError()
        showTodaysWeather(weatherData)
        showWeekForecast(weatherData)
        console.log(weatherData)

    } catch (error){
        console.error('Error fetching weather data: ', error.message)
        showError()
    }

}


export default getWeather