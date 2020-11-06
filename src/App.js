import React, { useState } from "react";
import Searchbar from "./components/Searchbar";
import WeatherCard from "./components/WeatherCard";
import ToggleSwitch from "./components/ToggleSwitch";
import "./App.css";

function App() {
  const [useMetric, setUseMetric] = useState(false);

  const toggleUnits = () => {
    setUseMetric(!useMetric);
  };

  const [weatherData, setWeatherData] = useState({ status: 0 });

  const getWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        setWeatherData({ status: response.status });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const setWeather = (data) => {
    function convertToCelsius(temp) {
      return Math.round((temp - 32) * (5 / 9));
    }
    setWeatherData({
      status: 1,
      city: data.name,
      country: data.sys.country,
      date: new Date().toLocaleString("en-US", {
        timeZone: "UTC",
      }),
      timezone: data.timezone,
      description: data.weather[0].main,
      icon: data.weather[0].icon,
      temp_imperial: Math.round(data.main.temp),
      minTemp_imperial: Math.round(data.main.temp_min),
      maxTemp_imperial: Math.round(data.main.temp_max),
      temp_metric: convertToCelsius(Math.round(data.main.temp)),
      minTemp_metric: convertToCelsius(Math.round(data.main.temp_min)),
      maxTemp_metric: convertToCelsius(Math.round(data.main.temp_max)),
    });
  };

  return (
    <div className="App">
      <ToggleSwitch useMetric={useMetric} toggle={toggleUnits} />
      <Searchbar handleSubmit={getWeatherData} />
      <WeatherCard useMetric={useMetric} weatherData={weatherData} />
    </div>
  );
}

export default App;
