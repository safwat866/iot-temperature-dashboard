import { useEffect, useState } from "react";
import { useWeather } from "../utils/context";

const weatherCodes = {
  0: { text: "Clear Sky", icon: "☀️" },
  1: { text: "Mainly Clear", icon: "🌤️" },
  2: { text: "Partly Cloudy", icon: "⛅" },
  3: { text: "Cloudy", icon: "☁️" },
  45: { text: "Fog", icon: "🌫️" },
  51: { text: "Drizzle", icon: "🌦️" },
  61: { text: "Rain", icon: "🌧️" },
  63: { text: "Heavy Rain", icon: "🌧️" },
  80: { text: "Rain Showers", icon: "🌦️" },
  95: { text: "Thunderstorm", icon: "⛈️" },
};

export default function WeatherCard() {
  const weather = useWeather();
  if (!weather) {
    return (
      <h2 className="text-white text-2xl animate-pulse text-center">
        Loading weather...
      </h2>
    );
  }

  const condition = weatherCodes[weather.weather_code] || {
    text: "Unknown",
    icon: "🌍",
  };

  return (
    <div
      className="
        w-full
        max-w-md
        rounded-3xl
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        shadow-2xl
        p-8
        text-white
        animate-[fadeIn_.5s_ease]
        m-auto
        mb-12
        "
    >
      {/* Location */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">📍</span>

        <h2 className="text-xl font-semibold">Damietta, Egypt</h2>
      </div>

      {/* Main Weather */}
      <div
        className="
          flex
          items-center
          justify-between
          mt-8
        "
      >
        <div>
          <h1
            className="
              text-7xl
              font-bold
              tracking-tight
            "
          >
            {Math.round(weather.temperature_2m)}
            <span className="text-4xl">°C</span>
          </h1>

          <p
            className="
              text-lg
              text-white/80
              mt-2
            "
          >
            {condition.text}
          </p>
        </div>

        <div
          className="
            text-7xl
            drop-shadow-xl
            "
        >
          {condition.icon}
        </div>
      </div>

      {/* Stats */}
      <div
        className="
          grid
          grid-cols-3
          gap-3
          mt-10
          "
      >
        <WeatherStat
          icon="🌡️"
          title="Feels"
          value={`${weather.apparent_temperature}°`}
        />

        <WeatherStat
          icon="💧"
          title="Humidity"
          value={`${weather.relative_humidity_2m}%`}
        />

        <WeatherStat
          icon="💨"
          title="Wind"
          value={`${weather.wind_speed_10m} km/h`}
        />
      </div>
    </div>
  );
}

function WeatherStat({ icon, title, value }) {
  return (
    <div
      className="
      bg-white/10
      rounded-2xl
      p-4
      text-center
      border
      border-white/10
      "
    >
      <div className="text-2xl">{icon}</div>

      <p
        className="
        text-xs
        text-white/60
        mt-2
      "
      >
        {title}
      </p>

      <strong
        className="
        block
        mt-1
        text-sm
      "
      >
        {value}
      </strong>
    </div>
  );
}
