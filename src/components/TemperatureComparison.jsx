import { useWeather } from "../utils/context";
import { useMqtt } from "../utils/useMqtt";

function TemperatureComparison() {
  const weather = useWeather();
  const { dht, status } = useMqtt();

  if (!weather || dht.length == 0 || status == "offline") return;

  const data = {
    api: {
      temperature: Math.round(weather.temperature_2m),
      humidity: weather.relative_humidity_2m,
      feelsLike: 33,
    },
    esp32: {
      temperature: dht[dht.length - 1].temp,
      humidity: dht[dht.length - 1].humidity,
      feelsLike: 30,
    },
  };

  const difference = (data.esp32.temperature - data.api.temperature).toFixed(1);

  let tempState;
  if (difference > 0) {
    tempState =
      "Temperature in the room is hotter than outside! turn on the fan.";
  } else {
    tempState = "Room is cool like outside!";
  }

  return (
    <div
      className="
      w-full
      max-w-3xl
      mx-auto
      mt-8
      p-6
      rounded-3xl
      bg-gradient-to-br
      from-slate-900
      via-blue-900
      to-cyan-800
      text-white
      shadow-2xl
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-6
        flex
        items-center
        gap-2
      "
      >
        📊 API vs ESP32 Comparison
      </h2>

      <div
        className="
        grid
        md:grid-cols-2
        gap-5
      "
      >
        {/* API Card */}
        <div
          className="
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          rounded-2xl
          p-5
          "
        >
          <h3
            className="
            text-xl
            font-semibold
            mb-4
          "
          >
            🌐 Weather API
          </h3>

          <DataRow label="Temperature" value={`${data.api.temperature} °C`} />

          <DataRow label="Humidity" value={`${data.api.humidity}%`} />

          <DataRow label="Feels Like" value={`${data.api.feelsLike} °C`} />
        </div>

        {/* ESP32 Card */}
        <div
          className="
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          rounded-2xl
          p-5
          "
        >
          <h3
            className="
            text-xl
            font-semibold
            mb-4
          "
          >
            🔌 ESP32 Sensor
          </h3>

          <DataRow label="Temperature" value={`${data.esp32.temperature} °C`} />

          <DataRow label="Humidity" value={`${data.esp32.humidity}%`} />

          <DataRow label="Feels Like" value={`${data.esp32.feelsLike} °C`} />
        </div>
      </div>

      {/* Difference */}
      <div
        className="
        mt-6
        bg-black/20
        rounded-2xl
        p-4
        flex
        justify-between
        items-center
        "
      >
        <span className="text-white/70">Temperature Difference</span>

        <span
          className="
          text-xl
          font-bold
          text-yellow-300
          "
        >
          {difference} °C
        </span>
      </div>
      <div
        className="
        mt-6
        bg-black/20
        rounded-2xl
        p-4
        flex
        justify-between
        items-center
        "
      >
        <span
          className="
          text-xl
          font-bold
          text-yellow-300
          "
        >
          {tempState}
        </span>
      </div>
    </div>
  );
}

function DataRow({ label, value }) {
  return (
    <div
      className="
      flex
      justify-between
      items-center
      py-3
      border-b
      border-white/10
      "
    >
      <span className="text-white/60">{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

export default TemperatureComparison;
