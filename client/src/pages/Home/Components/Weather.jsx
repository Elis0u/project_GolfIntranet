import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoLocationOutline } from "react-icons/io5";

function Weather({ city }){
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'API';

  const translations = {
    'Clouds': 'Nuages',
    'Rain': 'Pluie',
    'Snow' : 'Neige',
    'Clear' : 'Dégagé',
    'Mist': 'Brouillard',
    'Thunderstorm' : 'Orage'
  };



  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);
  
  return (
    <div>
      {weatherData ? (
        <>
          <h3> <IoLocationOutline /> {city}</h3>
          <p>Température : {weatherData.main.temp} °C</p>
          <p>Humidité : {weatherData.main.humidity} %</p>
          <p>Vent : {weatherData.wind.speed}m/s</p>
          <p>
            {translations[weatherData.weather[0].main] || weatherData.weather[0].main} - {weatherData.weather[0].description}
          </p>
        </>
      ) : (
        <p>Chargement de la météo...</p>
      )}
    </div>
  );
};

export default Weather;