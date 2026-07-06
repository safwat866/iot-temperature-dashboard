import Temp from "./components/Temp";
import Humidity from "./components/Humidity";
import ControlCard from "./components/ControlCard";
import { useMqtt } from "./utils/useMqtt";
import Status from "./components/Status";

const App = () => {
  const { dht } = useMqtt();

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
      {dht && (
        <div className="pb-8">
          <Temp temp={dht.temp} />
          <Humidity humidity={dht.humidity} />
        </div>
      )}
    </div>
  );
};

export default App;
