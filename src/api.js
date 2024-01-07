import { showTodaysWeather, showWeekForecast, showError, hideError, formatDate } from './weather';

export async function getWeather(cityName) {
  const todayDate = formatDate(new Date());
  const fifthDayDate = new Date();
  fifthDayDate.setDate(fifthDayDate.getDate() + 5);
  const formattedFifthDayDate = formatDate(fifthDayDate);
  const apiKey = 'R7BYG2ZJK7JJDLMPD3NCB6D7T';
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${todayDate}/${formattedFifthDayDate}?unitGroup=metric&include=days%2Ccurrent&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      console.error('Failed to fetch weather data: ', response.status);
    }
    const weatherData = await response.json();
    hideError();
    showTodaysWeather(weatherData);
    showWeekForecast(weatherData);
  } catch (error) {
    console.error('Error fetching weather data: ', error.message);
    showError();
  }
}
