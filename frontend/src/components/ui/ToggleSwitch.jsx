import React from 'react';

export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <div className="toggle-container">
      {label && <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{label}</span>}
      <label className="switch">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}
