import { format, addDays} from 'date-fns'

function searchCity() {
    const searchCityButton = document.querySelector('.search-city-button');
    searchCityButton.addEventListener('click', () => {
        const cityName = document.querySelector('.city-input').value;
        if (cityName) {
            getWeather(cityName)
        }
    })

    getWeather('zagreb')
}

async function getWeather(cityName) {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const fifthDayDate = format(addDays(new Date(), 5), 'yyyy-MM-dd');

    const apiKey = 'R7BYG2ZJK7JJDLMPD3NCB6D7T'
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${todayDate}/${fifthDayDate}?unitGroup=metric&include=days%2Ccurrent&key=${apiKey}&contentType=json`

    console.log(url)
    try {
        const response = await fetch(url, {mode: 'cors'});

        if (!response.ok) {
            console.log('Failed to fetch weather data: ', response.status)
        }

        const weatherData = await response.json();
        console.log(weatherData)
    } catch (error){
        console.log('Error fetching weather data: ', error.message)
    }

}


export { searchCity }