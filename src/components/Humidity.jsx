import React from 'react'
import { GaugeComponent } from "react-gauge-component";

const Humidity = ({ humidity }) => {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mb-4 mt-18">
        Current Humidity:
      </h1>
      <GaugeComponent
        value={humidity}
        type="grafana"
        arc={{
          width: 0.25,
          subArcs: [
            { limit: 30, color: "#ffcc80" },
            { limit: 60, color: "#4fc3f7" },
            { color: "#0277bd" },
          ],
        }}
        pointer={{
          type: "blob",
          color: "#4fc3f7",
          elastic: true,
          maxFps: 30,
        }}
        labels={{
          valueLabel: {
            formatTextValue: (e) => "".concat(Math.round(e), "% RH"),
            style: {
              fontSize: "22px",
              fill: "#4fc3f7",
              fontWeight: "bold",
            },
          },
          tickLabels: {
            type: "outer",
            ticks: [{ value: 0 }, { value: 30 }, { value: 60 }, { value: 100 }],
            defaultTickValueConfig: {
              formatTextValue: (e) => "".concat(e, "%"),
              style: { fontSize: "9px", fill: "#aaa" },
            },
          },
        }}
      />
    </div>
  );
};

export default Humidity