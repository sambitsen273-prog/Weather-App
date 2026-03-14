import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Drizzle",
  61: "Rain",
  71: "Snow",
  80: "Rain showers",
  95: "Thunderstorm"
};

export default function SearchBox({ setWeather }) {

  const [city, setCity] = useState("");

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const getWeatherInfo = async (city) => {

    const geoURL =
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if (!geoData.results) {
      alert("City not found");
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    const weatherURL =
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,is_day&timezone=auto`;
    
    const res = await fetch(weatherURL);
    const data = await res.json();
    
    const result = {
      city: name,
      temp: data.current.temperature_2m,
      feels: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m,
      description: weatherCodes[data.current.weather_code] || "Clear",
      isDay: data.current.is_day
    };

    setWeather(result);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await getWeatherInfo(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <TextField
        label="City Name"
        variant="standard"
        required
        value={city}
        onChange={handleChange}
      />

      <br /><br />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        type="submit"
      >
        SEARCH
      </Button>

    </form>
  );
}