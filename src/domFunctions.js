import { addDays, format } from "date-fns";

function showTodaysWeather(weatherData) {
    const cityNameDiv = document.querySelector('.city-name');
    cityNameDiv.textContent = weatherData.resolvedAddress;

    const todayTemperatureDiv = document.querySelector('.temperature');
    todayTemperatureDiv.textContent = weatherData.currentConditions.temp;

    const todayConditionsDiv = document.querySelector('.weather-description');
    todayConditionsDiv.textContent = weatherData.currentConditions.conditions;

    const todayIconDiv = document.querySelector('.today-icon-img');
    todayIconDiv.src = `../dist/images/${weatherData.currentConditions.icon}.png`

    const todayWindDiv = document.querySelector('.wind-info');
    todayWindDiv.textContent = weatherData.currentConditions.windspeed;

    const todayVisibilityDiv = document.querySelector('.visibility-info');
    todayVisibilityDiv.textContent = weatherData.currentConditions.visibility;

    const todayMinTempDiv = document.querySelector('.mintemp-info');
    todayMinTempDiv.textContent = weatherData.days[0].tempmin;

    const todayMaxTempDiv = document.querySelector('.maxtemp-info');
    todayMaxTempDiv.textContent = weatherData.days[0].tempmax;

    const todaySunriseDiv = document.querySelector('.sunrise-info');
    todaySunriseDiv.textContent = weatherData.currentConditions.sunrise

    const todaySunsetDiv = document.querySelector('.sunset-info');
    todaySunsetDiv.textContent = weatherData.currentConditions.sunset
}


function showWeekForecast(weatherData) {
    for (let i = 1 ;i <= 5; i++ ) {
        const weekDay = document.getElementById(`day${i}`);
        weekDay.innerHTML = ''

        // Get day name with date-fns
        const dayName = format(addDays(new Date(), i), 'EEEE')
        const weekDayName = document.createElement('div');
        weekDayName.classList.add('week-day-name')
        weekDayName.textContent = dayName
        weekDay.appendChild(weekDayName)

        const dayIcon = document.createElement('img');
        dayIcon.classList.add('week-day-icon')
        dayIcon.src = `../dist/images/${weatherData.days[i].icon}.png`;
        weekDay.appendChild(dayIcon)

        const dayCondition = document.createElement('div');
        dayCondition.classList.add('week-day-condition')
        dayCondition.textContent = weatherData.days[i].conditions
        weekDay.appendChild(dayCondition)

        // Get min and max temp, and remove decimals
        const minTemp = Math.trunc(weatherData.days[i].tempmin);
        const maxTemp = Math.trunc(weatherData.days[i].tempmax);
        const minMaxTemp = document.createElement('div');
        minMaxTemp.classList.add('week-day-temp')
        minMaxTemp.textContent = `${minTemp}°C / ${maxTemp}°C`
        weekDay.appendChild(minMaxTemp)
    }
}

export { showTodaysWeather, showWeekForecast }