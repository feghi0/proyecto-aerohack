import React, { useEffect, useRef } from 'react';
import { perimetroMonteCastro } from '../../data/barrioPerimetro';

export default function ZoneMap({ zonas = [], selectedZone = null, onZoneSelect, showPolygons = true }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersGroupRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const L = window.L;
    if (!L) {
      console.error('Leaflet is not loaded on window.');
      return;
    }

    mapInstanceRef.current = L.map(mapContainerRef.current, {
      zoomControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(mapInstanceRef.current);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(mapInstanceRef.current);

    layersGroupRef.current = L.layerGroup().addTo(mapInstanceRef.current);
    mapInstanceRef.current.fitBounds(L.latLngBounds(perimetroMonteCastro), { padding: [36, 36] });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const L = window.L;
    const map = mapInstanceRef.current;
    if (!L || !map || !onZoneSelect) return;

    const clearSelection = () => onZoneSelect(null);
    map.on('click', clearSelection);

    return () => {
      map.off('click', clearSelection);
    };
  }, [onZoneSelect]);

  useEffect(() => {
    const L = window.L;
    const map = mapInstanceRef.current;
    const layers = layersGroupRef.current;

    if (!L || !map || !layers) return;

    layers.clearLayers();

    L.polygon(perimetroMonteCastro, {
      color: '#ff9f1c',
      weight: 3,
      fillColor: '#1b2d4a',
      fillOpacity: 0.08,
      dashArray: '6, 10',
      interactive: false
    }).addTo(layers);

    if (!showPolygons) return;

    zonas.forEach((zona) => {
      const isSelected = selectedZone?.id === zona.id;
      let color = '#2ec4b6';
      if (zona.sensacionTermica >= 33) color = '#ff4d6d';
      else if (zona.sensacionTermica >= 28) color = '#ff9f1c';

      const baseStyle = {
        fillColor: color,
        color: isSelected ? '#ffffff' : color,
        weight: isSelected ? 4 : 1.5,
        opacity: isSelected ? 0.95 : 0.55,
        fillOpacity: isSelected ? 0.58 : 0.34,
        className: isSelected ? 'leaflet-selected-polygon' : ''
      };

      const pol = L.polygon(zona.polygon, baseStyle).addTo(layers);

      pol.on('mouseover', () => {
        if (!isSelected) {
          pol.setStyle({ fillOpacity: 0.48, opacity: 0.85, weight: 2.5 });
        }
      });

      pol.on('mouseout', () => {
        if (!isSelected) pol.setStyle(baseStyle);
      });

      pol.on('click', (event) => {
        L.DomEvent.stopPropagation(event);
        onZoneSelect?.(zona);
      });
    });
  }, [zonas, selectedZone, showPolygons, onZoneSelect]);

  return (
    <div className="map-wrapper">
      <div ref={mapContainerRef} id="map" style={{ height: '100%', width: '100%' }} />
      <div className="map-overlay-tip">
        Hacé click en cualquier zona coloreada para inspeccionar su microclima. Click en el mapa para cerrar el panel.
      </div>
    </div>
  );
}
