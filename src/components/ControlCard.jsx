import React from 'react'

function ControlCard({ title, value, onClick,onMouseDown,onMouseUp, active }) {
    let ringColor;
    if (title == "Buzzer" && active) {
        ringColor = "ring-2 ring-red-500 active:shadow-red-500/20";
    } else if (active) {
        ringColor = "ring-2 ring-yellow-500";
    } else {
        ringColor = "";
    }
  return (
    <div
      onClick={onClick}
      onPointerDown={onMouseDown}
      onPointerUp={onMouseUp}
      className={`
        cursor-pointer p-5 rounded-2xl
        bg-slate-700/60 backdrop-blur
        border border-slate-600
        transition-all duration-300
        active:scale-95 active:bg-slate-700
        active:shadow-lg active:shadow-cyan-500/20
        ${ringColor}
      `}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-slate-300 text-sm mt-1">{value}</p>
    </div>
  );
}

export default ControlCard