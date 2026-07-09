import Temp from "./components/Temp";
import Humidity from "./components/Humidity";
import ControlCard from "./components/ControlCard";
import { useMqtt } from "./utils/useMqtt";
import Status from "./components/Status";
import TempChart from "./components/TempChart";
import { useEffect } from "react";
import WeatherCard from "./components/WeatherApi"
import TemperatureComparison from "./components/TemperatureComparison"
import WeatherProvider from "./utils/context";

const App = () => {
  const { dht, isLoading } = useMqtt();

  if (isLoading)
    return (
      <div className="min-h-dvh bg-slate-800 text-white pt-8 px-6 select-none flex justify-center items-center">
        <svg className="h-8 w-8 animate-spin" viewBox="0 0 100 100">
          <circle
            fill="none"
            strokeWidth="10"
            className="stroke-current opacity-40"
            cx="50"
            cy="50"
            r="40"
          />
          <circle
            fill="none"
            strokeWidth="10"
            className="stroke-current"
            strokeDasharray="250"
            strokeDashoffset="210"
            cx="50"
            cy="50"
            r="40"
          />
        </svg>
      </div>
    );

  return (
    <div className="min-h-dvh bg-slate-800 text-white pt-8 px-6 select-none">
      {/**<div className="mb-12">
        <h1 className="text-center font-bold text-2xl">Some Controls</h1>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <ControlCard
            onClick={() => {
              setControls((prev) => ({ ...prev, led: !controls.led }));
            }}
            title={"Led"}
            value={controls.led ? "On" : "Off"}
            active={controls.led}
          />
          <ControlCard
            onMouseDown={() =>
              setControls((prev) => ({ ...prev, buzzer: true }))
            }
            onMouseUp={() =>
              setControls((prev) => ({ ...prev, buzzer: false }))
            }
            title={"Buzzer"}
            value={controls.buzzer ? "On" : "Off"}
            active={controls.buzzer}
          />
        </div>
      </div>**/}
      <Status />
      <WeatherProvider>
        <WeatherCard />
        {dht.length > 0 && (
          <>
            <div className="pb-8">
              <Temp temp={dht[dht.length - 1].temp} />
              <Humidity humidity={dht[dht.length - 1].humidity} />
            </div>
            <TempChart />
          </>
        )}
        <TemperatureComparison />
      </WeatherProvider>
    </div>
  );
};

export default App;
