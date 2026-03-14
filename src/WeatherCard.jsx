import "./WeatherCard.css";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiNightClear
} from "react-icons/wi";

function getIcon(desc, isDay) {

  desc = desc.toLowerCase();

  if (desc.includes("rain")) return <WiRain className="rain-icon" />;
  if (desc.includes("cloud")) return <WiCloudy className="cloud-icon" />;
  if (desc.includes("snow")) return <WiSnow className="snow-icon" />;
  if (desc.includes("thunder")) return <WiThunderstorm className="thunder-icon" />;

  if (isDay === 0) return <WiNightClear className="moon-icon" />;

  return <WiDaySunny className="sun-icon" />;
}

function getBackground(desc, isDay) {

  desc = desc.toLowerCase();

  /* NIGHT BACKGROUND */
  if (isDay === 0 ) {
    return "linear-gradient(135deg,#0f2027,#203a43,#2c5364)";
  }

  /* DAY WEATHER BACKGROUNDS */

  if (desc.includes("rain"))
    return "linear-gradient(135deg,#4e54c8,#8f94fb)";

  if (desc.includes("cloud"))
    return "linear-gradient(135deg,#757f9a,#d7dde8)";

  if (desc.includes("snow"))
    return "linear-gradient(135deg,#e6dada,#274046)";

  return "linear-gradient(135deg,#56ccf2,#2f80ed)";
}

export default function WeatherCard({ weather }) {

  if (!weather) return null;

  return (
    <div
      className="weather-card"
      style={{
        background: getBackground(weather.description, weather.isDay)
      }}
    >
      <div className="weather-content">

        <h2>{weather.city}</h2>

        <div className="icon">
          {getIcon(weather.description, weather.isDay)}
        </div>

        <div className="temp">
          {weather.temp}°
        </div>

        <h3>{weather.description}</h3>

        <p>Feels Like: {weather.feels} °C</p>
        <p>Humidity: {weather.humidity} %</p>
        <p>Wind: {weather.wind} km/h</p>

      </div>
    </div>
  );
}