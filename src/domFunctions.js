function showTodaysWeather(weatherData) {
    const cityNameDiv = document.querySelector('.city-name');
    cityNameDiv.textContent = weatherData.resolvedAddress;

    const todayTemperatureDiv = document.querySelector('.temperature');
    todayTemperatureDiv.textContent = weatherData.currentConditions.temp;

    const todayConditionsDiv = document.querySelector('.weather-description');
    todayConditionsDiv.textContent = weatherData.currentConditions.conditions;

    const todayIconDiv = document.querySelector('.today-icon-img');
    todayIconDiv.textContent = weatherData.currentConditions.icon;

    const todayWindDiv = document.querySelector('.wind-info');
    todayWindDiv.textContent = weatherData.currentConditions.windspeed;

    const todayVisibilityDiv = document.querySelector('.visibility-info');
    todayVisibilityDiv.textContent = weatherData.currentConditions.visibility;

    const todayMinTempDiv = document.querySelector('.mintemp-info');
    todayMinTempDiv.textContent = weatherData.days[0].tempmin;

    const todayMaxTempDiv = document.querySelector('maxtemp-info');
    todayMaxTempDiv.textContent = weatherData.days[0].tempmax;

    const todaySunriseDiv = document.querySelector('.sunrise-info');
    todaySunriseDiv.textContent = weatherData.currentConditions.sunrise

    const todaySunsetDiv = document.querySelector('sunset-info');
    todaySunsetDiv.textContent = weatherData.currentConditions.sunset

}


export { showTodaysWeather }