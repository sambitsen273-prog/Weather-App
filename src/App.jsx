import { useState } from "react";
import SearchBox from "./SearchBox";
import WeatherCard from "./WeatherCard";

export default function App() {

  const [weather, setWeather] = useState(null);

  return (
    <div>

      <h1 style={{fontSize:"60px", color:"black"}}>Weather App</h1>

      <SearchBox setWeather={setWeather} />

      <WeatherCard weather={weather} />

    </div>
  );
}