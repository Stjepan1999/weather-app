import { format, addDays} from 'date-fns'
import { showTodaysWeather, showWeekForecast } from './domFunctions';

function searchCity() {
    const searchCityButton = document.querySelector('.search-city-button');
    searchCityButton.addEventListener('click', () => {
        const cityName = document.querySelector('.city-input').value;
        if (cityName) {
            getWeather(cityName)
        }
    })
    getWeather('New York')
}

async function getWeather(cityName) {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const fifthDayDate = format(addDays(new Date(), 5), 'yyyy-MM-dd');
    const apiKey = 'R7BYG2ZJK7JJDLMPD3NCB6D7T'
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${todayDate}/${fifthDayDate}?unitGroup=metric&include=days%2Ccurrent&key=${apiKey}&contentType=json`

    try {
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok) {
            console.log('Failed to fetch weather data: ', response.status)
        }
        const weatherData = await response.json();
        showTodaysWeather(weatherData)
        showWeekForecast(weatherData)
    } catch (error){
        console.log('Error fetching weather data: ', error.message)
    }

}


export { searchCity }