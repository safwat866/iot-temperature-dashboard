import { createContext, useContext, useEffect , useState} from "react";

const WeatherContext = createContext({});

export default function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=31.4165&longitude=31.8133&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current));
  }, []);

  return (<WeatherContext.Provider value={weather}>{children}</WeatherContext.Provider>);
}

export const useWeather = () => useContext(WeatherContext);
