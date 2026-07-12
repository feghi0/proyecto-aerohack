import React, { useEffect, useRef } from 'react';
import { MONTE_CASTRO_POLY, mapaConfig } from '../../data/barrioPerimetro';

export default function MapaMonteCastro() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Accedemos a Leaflet desde el objeto global del navegador (window.L)
    const L = window.L;
    if (!L) {
      console.error('La librería Leaflet (L) no se encuentra cargada en window.');
      return;
    }

    // 1. Inicialización del mapa y encuadre óptimo
    mapInstanceRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: true
    }).setView(mapaConfig.center, mapaConfig.zoom);

    // Zoom arriba a la derecha para no tapar los controles del sidebar izquierdo
    L.control.zoom({ position: 'topright' }).addTo(mapInstanceRef.current);

    // 2. Cargar capa base oscura de CartoDB (estética premium)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(mapInstanceRef.current);

    // 3. Estilo del Polígono de Límites
    // Nota de Advertencia de Formato:
    // Leaflet utiliza coordenadas en formato [Latitud, Longitud] para sus capas geográficas en React/JS.
    // Si necesitas exportar esto a GeoJSON estándar (RFC 7946), recuerda invertir los ejes a [Longitud, Latitud].
    const perimetroEstilo = {
      color: '#2ec4b6',        // Verde turquesa suave prolijo
      weight: 3,               // Grosor de línea fino solicitado
      opacity: 0.85,           // Opacidad de la línea de contorno
      fillColor: '#2ec4b6',    // Relleno coincidente turquesa
      fillOpacity: 0.2,        // Opacidad de relleno baja solicitada
      lineJoin: 'round'
    };

    // 4. Dibujar y agregar el polígono perimetral al mapa
    const poligono = L.polygon(MONTE_CASTRO_POLY, perimetroEstilo).addTo(mapInstanceRef.current);

    // 5. Marcador de referencia en el centro geográfico del barrio
    const popupContent = `
      <div style="font-family: 'Outfit', sans-serif; color: #0e1726; padding: 4px;">
        <h4 style="margin: 0 0 4px 0; color: #2ec4b6;">Monte Castro</h4>
        <p style="margin: 0; font-size: 0.8rem; color: #555;">Barrio Oficial CABA</p>
      </div>
    `;
    L.marker(mapaConfig.center)
      .addTo(mapInstanceRef.current)
      .bindPopup(popupContent);

    // Ajusta automáticamente el encuadre óptimo según el tamaño físico del viewport
    mapInstanceRef.current.fitBounds(poligono.getBounds(), {
      padding: [30, 30]
    });

    // Limpieza al desmontar el componente en React
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="map-wrapper" style={{ height: '100%', width: '100%', position: 'relative' }}>
      <div 
        ref={mapContainerRef} 
        style={{ 
          height: '100%', 
          width: '100%', 
          backgroundColor: '#050a12',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      ></div>
      
      <div 
        className="map-overlay-tip"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'rgba(14, 23, 38, 0.85)',
          padding: '10px 18px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.78rem',
          color: '#f5f7fa',
          pointerEvents: 'none',
          zIndex: 1000
        }}
      >
        🗺️ Límite oficial del barrio georreferenciado (ET Nº 35)
      </div>
    </div>
  );
}
