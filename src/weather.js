import { addDays, format, parse } from 'date-fns';
import { getWeather } from './api';

export function searchCity() {
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

export function showTodaysWeather(weatherData) {
  const cityNameElement = document.querySelector('.city-name');
  cityNameElement.textContent = weatherData.resolvedAddress;

  const todayElement = document.querySelector('.today-date');
  todayElement.textContent = `Today, ${format(new Date(), 'HH:mm')}`;

  const todayTemperatureElement = document.querySelector('.temperature');
  todayTemperatureElement.textContent = `${Math.trunc(weatherData.currentConditions.temp)}°C`;

  const todayConditionsElement = document.querySelector('.weather-description');
  todayConditionsElement.textContent = weatherData.currentConditions.conditions;

  const todayIconElement = document.querySelector('.today-icon-img');
  todayIconElement.src = `./images/${weatherData.currentConditions.icon}.png`;

  const todayWindElement = document.querySelector('.wind-info');
  todayWindElement.textContent = `${weatherData.currentConditions.windspeed} km/h`;

  const todayVisibilityElement = document.querySelector('.visibility-info');
  todayVisibilityElement.textContent = `${Math.trunc(weatherData.currentConditions.visibility)} km`;

  const todayMinTempElement = document.querySelector('.mintemp-info');
  todayMinTempElement.textContent = `${Math.trunc(weatherData.days[0].tempmin)}°C`;

  const todayMaxTempElement = document.querySelector('.maxtemp-info');
  todayMaxTempElement.textContent = `${Math.trunc(weatherData.days[0].tempmax)}°C`;

  const todaySunriseElement = document.querySelector('.sunrise-info');
  todaySunriseElement.textContent = formatTime(weatherData.currentConditions.sunrise);

  const todaySunsetElement = document.querySelector('.sunset-info');
  todaySunsetElement.textContent = formatTime(weatherData.currentConditions.sunset);
}

function formatTime(apiTime) {
  const parsedTime = parse(apiTime, 'HH:mm:ss', new Date());
  return format(parsedTime, 'HH:mm');
}

export function showWeekForecast(weatherData) {
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

export function showError() {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.style.display = 'block';
}

export function hideError() {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.style.display = 'none';
}
