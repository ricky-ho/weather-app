import React from "react";
import "./WeatherCard.css";

function WeatherCard({ useMetric, weatherData }) {
  let date, time;

  const formatDate = () => {
    let dateString = convertTimezone(weatherData.date);
    [date, time] = dateString.split(", ");
    date = date.match(/\d+\/\d+/)[0];
    time = time.match(/\d+:\d+/)[0];
    time += dateString.slice(-3);
  };

  const convertTimezone = (date) => {
    let date_utc = new Date(date);
    date_utc.setSeconds(date_utc.getSeconds() + weatherData.timezone);
    return date_utc.toLocaleString();
  };

  return weatherData.status === 1 ? (
    <div className="weather-card">
      <div className="info-row">
        <div className="info city">{weatherData.city}</div>
        <div className="info country">{weatherData.country}</div>
      </div>
      <div className="info-row">
        {formatDate()}
        <div className="info date-time">{`${date} ${time}`}</div>
      </div>
      <div className="info-row-condition">
        <div className="description-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt={`${weatherData.description} icon`}
          />
        </div>
        <div className="info">{weatherData.description}</div>
      </div>
      <div className="temp-info-row">
        <div className="info min-temp">
          <span>Low:</span>
          {useMetric
            ? `${weatherData.minTemp_metric}\u00B0`
            : `${weatherData.minTemp_imperial}\u00B0`}
        </div>
        <div className="info temp">
          {useMetric
            ? `${weatherData.temp_metric}\u00B0C`
            : `${weatherData.temp_imperial}\u00B0F`}
        </div>
        <div className="info max-temp">
          <span>High:</span>
          {useMetric
            ? `${weatherData.maxTemp_metric}\u00B0`
            : `${weatherData.maxTemp_imperial}\u00B0`}
        </div>
      </div>
    </div>
  ) : weatherData.status === 404 ? (
    <div className="weather-card invalid-query">
      <h2>City not found</h2>
    </div>
  ) : null;
}

export default WeatherCard;
