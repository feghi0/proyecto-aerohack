import React from 'react';
import ToggleSwitch from '../ui/ToggleSwitch';

export default function HeatmapLegend({ showPolygons, onTogglePolygons }) {
  return (
    <div className="card">
      <span className="card-label">Zonificación Térmica</span>
      
      <ToggleSwitch 
        checked={showPolygons} 
        onChange={onTogglePolygons} 
        label="🗺️ Mostrar Polígonos de Calor" 
      />

      <div className="heatmap-legend"></div>
      <div className="heatmap-legend-labels">
        <span>Confort (&lt; 28° ST)</span>
        <span>Moderado (28° - 33°)</span>
        <span>Crítico (&gt; 33° ST)</span>
      </div>
    </div>
  );
}
