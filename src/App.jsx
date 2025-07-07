import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('celsius');

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setWeather(null);
        return;
      }
      const { latitude, longitude } = data.results[0];
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherResponse.json();
      setWeather({ ...weatherData.current_weather, city: cityName });
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    }
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      <button onClick={toggleUnit} className="toggle-btn">
        Switch to {unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
      </button>
      {weather && <WeatherCard weather={weather} unit={unit} />}
    </div>
  );
};

export default App;