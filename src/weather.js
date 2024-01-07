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
  todayElement.textContent = `Today, ${new Date().getHours()}:${new Date().getMinutes()}`;

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
  todaySunriseElement.textContent = removeSecondsFromTime(weatherData.currentConditions.sunrise);

  const todaySunsetElement = document.querySelector('.sunset-info');
  todaySunsetElement.textContent = removeSecondsFromTime(weatherData.currentConditions.sunset);
}

export function showWeekForecast(weatherData) {
  for (let i = 1; i <= 5; i++) {
    const weekDay = document.getElementById(`day${i}`);
    weekDay.innerHTML = '';

    const dayName = getWeekdayName(i);
    const weekDayName = document.createElement('div');
    weekDayName.classList.add('week-day-name');
    weekDayName.textContent = dayName;
    weekDay.appendChild(weekDayName);

    const dayIcon = document.createElement('img');
    dayIcon.classList.add('week-day-icon');
    dayIcon.src = `./images/${weatherData.days[i].icon}.png`;
    weekDay.appendChild(dayIcon);

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

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getWeekdayName(n) {
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + n);
  return targetDate.toLocaleString('en-US', { weekday: 'long' });
}

function removeSecondsFromTime(time) {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
}
