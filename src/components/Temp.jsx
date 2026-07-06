import React from 'react'
import { GaugeComponent } from "react-gauge-component";

const Temp = ({temp}) => {
  return (
    <div>
        <h1 className='text-center font-bold text-2xl mb-4'>Current Temperature:</h1>
      <GaugeComponent
        value={temp}
        type="semicircle"
        minValue={10}
        maxValue={50}
        arc={{
          width: 0.2,
          padding: 0.015,
          cornerRadius: 2,
          subArcs: [
            {
              limit: 18,
              color: "#00bcd4",
              showTick: true,
              tooltip: { text: "Cold" },
            },
            {
              limit: 25,
              color: "#4caf50",
              showTick: true,
              tooltip: { text: "Optimal" },
            },
            {
              limit: 35,
              color: "#ff9800",
              showTick: true,
              tooltip: { text: "Warm" },
            },
            { color: "#f44336", tooltip: { text: "Critical!" } },
          ],
        }}
        pointer={{
          type: "needle",
          color: "#e0e0e0",
          length: 0.7,
          width: 8,
          maxFps: 30,
        }}
        labels={{
          valueLabel: {
            formatTextValue: (e) => "".concat(e.toFixed(1), "\xb0C"),
            style: {
              fontSize: "20px",
              fill: "#e0e0e0",
              fontWeight: "bold",
            },
          },
          tickLabels: {
            type: "outer",
            defaultTickValueConfig: {
              formatTextValue: (e) => "".concat(e, "\xb0"),
              style: { fontSize: "9px", fill: "#aaa" },
            },
            defaultTickLineConfig: { color: "#666", length: 4, width: 1 },
          },
        }}
      />
    </div>
  );
}

export default Temp