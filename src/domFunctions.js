import { addDays, format, parse } from 'date-fns';
import getWeather from './apiCall';

function searchCity() {
  const searchCityButton = document.querySelector('.search-city-button');
  searchCityButton.addEventListener('click', (event) => {
    const cityName = document.querySelector('.city-input').value;
    if (cityName) {
      getWeather(cityName);
    }
    event.preventDefault();
  });
  getWeather('New York');
}

function showTodaysWeather(weatherData) {
  const cityNameDiv = document.querySelector('.city-name');
  cityNameDiv.textContent = weatherData.resolvedAddress;

  const todayDate = document.querySelector('.today-date');
  todayDate.textContent = `Today, ${format(new Date(), 'HH:mm')}`;

  const todayTemperatureDiv = document.querySelector('.temperature');
  todayTemperatureDiv.textContent = `${Math.trunc(
    weatherData.currentConditions.temp,
  )}°C`;

  const todayConditionsDiv = document.querySelector('.weather-description');
  todayConditionsDiv.textContent = weatherData.currentConditions.conditions;

  const todayIconDiv = document.querySelector('.today-icon-img');
  todayIconDiv.src = `./images/${weatherData.currentConditions.icon}.png`;

  const todayWindDiv = document.querySelector('.wind-info');
  todayWindDiv.textContent = `${weatherData.currentConditions.windspeed} km/h`;

  const todayVisibilityDiv = document.querySelector('.visibility-info');
  todayVisibilityDiv.textContent = `${Math.trunc(weatherData.currentConditions.visibility)} km`;

  const todayMinTempDiv = document.querySelector('.mintemp-info');
  todayMinTempDiv.textContent = `${Math.trunc(weatherData.days[0].tempmin)}°C`;

  const todayMaxTempDiv = document.querySelector('.maxtemp-info');
  todayMaxTempDiv.textContent = `${Math.trunc(weatherData.days[0].tempmax)}°C`;

  // Format sunrise time to be in HH:mm format
  const formatTime = (apiTime) => {
    const parsedTime = parse(apiTime, 'HH:mm:ss', new Date());
    return format(parsedTime, 'HH:mm')
  }

  const todaySunriseDiv = document.querySelector('.sunrise-info');
  todaySunriseDiv.textContent = formatTime(weatherData.currentConditions.sunrise)

  const todaySunsetDiv = document.querySelector('.sunset-info');
  todaySunsetDiv.textContent = formatTime(weatherData.currentConditions.sunset);
}

function showWeekForecast(weatherData) {
  for (let i = 1; i <= 5; i++) {
    const weekDay = document.getElementById(`day${i}`);
    weekDay.innerHTML = '';

    // Get day name with date-fns
    const dayName = format(addDays(new Date(), i), 'EEEE');
    const weekDayName = document.createElement('div');
    weekDayName.classList.add('week-day-name');
    weekDayName.textContent = dayName;
    weekDay.appendChild(weekDayName);

    const dayIcon = document.createElement('img');
    dayIcon.classList.add('week-day-icon');
    dayIcon.src = `./images/${weatherData.days[i].icon}.png`;
    weekDay.appendChild(dayIcon);

    // Get min and max temp, and remove decimals
    const minTemp = Math.trunc(weatherData.days[i].tempmin);
    const maxTemp = Math.trunc(weatherData.days[i].tempmax);
    const minMaxTemp = document.createElement('div');
    minMaxTemp.classList.add('week-day-temp');
    minMaxTemp.textContent = `${minTemp}°C / ${maxTemp}°C`;
    weekDay.appendChild(minMaxTemp);
  }
}

function showError() {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.style.display = 'block';
}

function hideError() {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.style.display = 'none';
}

export { showTodaysWeather, showWeekForecast, searchCity, showError, hideError, };
