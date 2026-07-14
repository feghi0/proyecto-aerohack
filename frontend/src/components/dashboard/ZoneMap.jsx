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

  const polygonRefsMap = useRef(new Map());
  const selectedZoneIdRef = useRef(null);

  // Mantener la ref del ID de la zona seleccionada al día
  useEffect(() => {
    selectedZoneIdRef.current = selectedZone?.id;
  }, [selectedZone]);

  const getNormalStyle = (zona, isSelected) => {
    let color = '#2ec4b6';
    if (zona.sensacionTermica >= 33) color = '#ff4d6d';
    else if (zona.sensacionTermica >= 28) color = '#ff9f1c';

    return {
      fillColor: color,
      color: isSelected ? '#ffffff' : color,
      weight: isSelected ? 4 : 1.5,
      opacity: isSelected ? 0.95 : 0.55,
      fillOpacity: isSelected ? 0.58 : 0.34
    };
  };

  useEffect(() => {
    const L = window.L;
    const map = mapInstanceRef.current;
    const layers = layersGroupRef.current;

    if (!L || !map || !layers) return;

    layers.clearLayers();
    polygonRefsMap.current.clear();

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
      const isSelected = selectedZoneIdRef.current === zona.id;
      const baseStyle = getNormalStyle(zona, isSelected);

      const pol = L.polygon(zona.polygon, baseStyle).addTo(layers);
      polygonRefsMap.current.set(zona.id, pol);

      pol.on('mouseover', () => {
        const currentlySelected = selectedZoneIdRef.current === zona.id;
        if (!currentlySelected) {
          pol.setStyle({ fillOpacity: 0.48, opacity: 0.85, weight: 2.5 });
        }
      });

      pol.on('mouseout', () => {
        const currentlySelected = selectedZoneIdRef.current === zona.id;
        if (!currentlySelected) {
          pol.setStyle(getNormalStyle(zona, false));
        }
      });

      pol.on('click', (event) => {
        L.DomEvent.stopPropagation(event);
        onZoneSelect?.(zona);
      });
    });
  }, [zonas, showPolygons, onZoneSelect]);

  // Actualización dinámica de estilos
  useEffect(() => {
    const L = window.L;
    if (!L) return;

    polygonRefsMap.current.forEach((pol, id) => {
      const zona = zonas.find(z => z.id === id);
      if (!zona) return;
      const isSelected = selectedZone?.id === id;
      pol.setStyle(getNormalStyle(zona, isSelected));
    });
  }, [selectedZone, zonas]);

  return (
    <div className="map-wrapper">
      <div ref={mapContainerRef} id="map" style={{ height: '100%', width: '100%' }} />
      <div className="map-overlay-tip">
        Hacé click en cualquier zona coloreada para inspeccionar su microclima. Click en el mapa para cerrar el panel.
      </div>
    </div>
  );
}
