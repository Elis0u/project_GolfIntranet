import React, { useState, useEffect } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import loader from "../../../assets/img/loader.svg";
import { getWeather } from '../../../services/api';

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const translations = {
    'Clouds': 'Nuages',
    'Rain': 'Pluie',
    'Snow': 'Neige',
    'Clear': 'Dégagé',
    'Mist': 'Brouillard',
    'Thunderstorm': 'Orage'
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await getWeather(city);
        setWeatherData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const renderLoader = () => {
    return (
      <div className="loader">
        <img src={loader} alt="Loading" />
      </div>
    );
  };

  return (
    <>
      {(isLoading || !weatherData) ? (
        renderLoader()
      ) : (
        <>
          <h3>
            <IoLocationOutline /> {city}
          </h3>
          <p>Température : {weatherData.main.temp} °C</p>
          <p>Humidité : {weatherData.main.humidity} %</p>
          <p>Vent : {weatherData.wind.speed}m/s</p>
          <p>
            {translations[weatherData.weather[0].main] || weatherData.weather[0].main} - {weatherData.weather[0].description}
          </p>
        </>
      )}
    </>
  );
};

export default Weather;