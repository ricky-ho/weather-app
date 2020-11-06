import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ useMetric, toggle }) {
  return (
    <div className="toggle-wrapper">
      <label className="switch">
        <input type="checkbox" onClick={() => toggle()} />
        <span className="slider round"></span>
      </label>
      <div className="unit-display">{useMetric ? "Metric" : " Imperial"}</div>
    </div>
  );
}

export default ToggleSwitch;
