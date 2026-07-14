import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import DataCard from '../components/cards/DataCard';
import AlertCard from '../components/cards/AlertCard';
import OutfitCard from '../components/cards/OutfitCard';
import ManzanasSummary from '../components/dashboard/ManzanasSummary';
import HeatmapLegend from '../components/dashboard/HeatmapLegend';
import HistoryChart from '../components/dashboard/HistoryChart';
import ZoneMap from '../components/dashboard/ZoneMap';
import ZoneDetailPanel from '../components/dashboard/ZoneDetailPanel';
import { obtenerZonasProcesadas, calcularOutfit } from '../utils/clima';
import { historicoPromediosMock } from '../data/historico';

export default function DashboardPage() {
  const [telemetria, setTelemetria] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showPolygons, setShowPolygons] = useState(true);
  const [climaBase, setClimaBase] = useState({
    temperatura: 31.5,
    humedad: 65,
    uv: 6.8
  });

  const selectedZoneRef = useRef(selectedZone);
  const climaBaseRef = useRef(climaBase);

  // Mantener las refs actualizadas
  useEffect(() => {
    selectedZoneRef.current = selectedZone;
  }, [selectedZone]);

  useEffect(() => {
    climaBaseRef.current = climaBase;
  }, [climaBase]);

  const handleZoneSelect = useCallback((zona) => {
    setSelectedZone(prev => {
      if (!zona || prev?.id === zona.id) return null;
      return zona;
    });
  }, []);

  // Cargar datos (remoto con fallback local)
  const cargarDatos = async () => {
    try {
      const res = await fetch('/api/telemetria');
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setTelemetria(data);
      
      // Actualizar zona seleccionada con datos frescos
      if (selectedZoneRef.current) {
        const fresca = data.sensores?.find(z => z.id === selectedZoneRef.current.id);
        if (fresca) setSelectedZone(fresca);
      }
    } catch {
      // Fallback local: simular datos en cliente
      const base = climaBaseRef.current;
      const fluctuacionTemp = base.temperatura + (Math.random() - 0.5) * 0.3;
      const fluctuacionHum = Math.max(20, Math.min(100, base.humedad + Math.round((Math.random() - 0.5) * 2)));
      
      const nuevoClima = {
        temperatura: parseFloat(fluctuacionTemp.toFixed(2)),
        humedad: fluctuacionHum,
        uv: base.uv
      };
      setClimaBase(nuevoClima);

      const zonasProcesadas = obtenerZonasProcesadas(nuevoClima);

      const sumaSensaciones = zonasProcesadas.reduce((acc, z) => acc + z.sensacionTermica, 0);
      const promedioGeneral = parseFloat((sumaSensaciones / zonasProcesadas.length).toFixed(1));
      const outfitGlobal = calcularOutfit(promedioGeneral);

      const critica = zonasProcesadas.reduce((max, z) =>
        z.sensacionTermica > max.sensacionTermica ? z : max
      , zonasProcesadas[0]);

      setTelemetria({
        barrio: 'Monte Castro, CABA, Argentina',
        promedioGeneral,
        horaLectura: new Date().toLocaleTimeString('es-AR'),
        calleAEvitar: critica ? `${critica.nombre} (${critica.sensacionTermica}°C ST)` : '--',
        outfit: outfitGlobal,
        sensores: zonasProcesadas,
        fuenteClima: 'Simulador Client-side',
        database: 'Local Memory'
      });

      if (selectedZoneRef.current) {
        const fresca = zonasProcesadas.find(z => z.id === selectedZoneRef.current.id);
        if (fresca) setSelectedZone(fresca);
      }
    }
  };

  const cargarHistorico = async () => {
    try {
      const res = await fetch('/api/historico');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setHistorico(data);
    } catch {
      setHistorico(historicoPromediosMock);
    }
  };

  // Carga inicial y refresco cada 15 segundos
  useEffect(() => {
    cargarDatos();
    cargarHistorico();

    const dataInterval = setInterval(cargarDatos, 15000);
    const histInterval = setInterval(cargarHistorico, 60000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(histInterval);
    };
  }, []);;

  if (!telemetria) {
    return (
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <h2>Cargando Telemetría Climática...</h2>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard Climático | Climate Monte Castro</title>
        <meta name="description" content="Panel de monitoreo térmico por zonas para Monte Castro con histórico, alertas y recomendaciones de albedo." />
      </Helmet>
      <div className="app-container">
      {/* Panel Lateral Izquierdo */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Climate Monte Castro</h1>
          <h2>Monitoreo Térmico v2</h2>
          <p className="subtitle">Monitoreo térmico avanzado y analíticas de confort urbano</p>
        </div>

        {/* Telemetría Promedio */}
        <DataCard 
          label="Sensación Térmica Promedio"
          value={`${telemetria.promedioGeneral.toFixed(1)} °C`}
          footer={`Última simulación: ${telemetria.horaLectura}`}
          extraClass="card-promedio"
        />

        {/* Leyenda y Control de Polígonos */}
        <HeatmapLegend 
          showPolygons={showPolygons}
          onTogglePolygons={setShowPolygons}
        />

        {/* Estado de las 9 Zonas */}
        <ManzanasSummary zonas={telemetria.sensores} />

        {/* Gráfico Sparkline de Tendencia */}
        <HistoryChart data={historico} />

        {/* Alerta Térmica */}
        <AlertCard 
          tempPromedio={telemetria.promedioGeneral}
          nivelText={telemetria.outfit?.nivel}
        />

        {/* Punto Crítico de Calor */}
        <div className="card">
          <span className="card-label">Punto Crítico de Calor</span>
          <span className="card-value-small">{telemetria.calleAEvitar}</span>
        </div>

        <ZoneDetailPanel
          zona={selectedZone}
          onClose={() => setSelectedZone(null)}
        />

        {/* Recomendación de Vestimenta Global */}
        <OutfitCard outfit={telemetria.outfit} scope="Barrio" />

        <p className="update-info">
          Microclimas procesados vía {telemetria.fuenteClima}. Base de datos: {telemetria.database}
        </p>
      </aside>

      {/* Mapa y Detalle de Zona */}
      <main className="map-wrapper">
        <ZoneMap 
          zonas={telemetria.sensores}
          selectedZone={selectedZone}
          onZoneSelect={handleZoneSelect}
          showPolygons={showPolygons}
        />
      </main>
      </div>
    </>
  );
}



