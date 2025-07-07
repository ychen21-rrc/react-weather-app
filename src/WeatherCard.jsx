import React from 'react';

const WeatherCard = ({ weather, unit }) => {
  const { temperature, windspeed, weathercode, city } = weather;
  const temp = unit === 'celsius' ? temperature : (temperature * 9/5 + 32).toFixed(1);
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p>Temperature: {temp}{unitSymbol}</p>
      <p>Wind Speed: {windspeed} km/h</p>
      <p>Weather Code: {weathercode}</p>
    </div>
  );
};

export default WeatherCard;