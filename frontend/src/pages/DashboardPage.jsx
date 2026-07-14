import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'motion/react';

const sidebarVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};
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
  }, []);

  if (!telemetria) {
    return (
      <>
        <Helmet>
          <title>Cargando... | Climate Monte Castro</title>
        </Helmet>
        <div className="app-container skeleton-container">
          <aside className="sidebar skeleton-sidebar">
            <div className="skeleton-header shimmer" />
            <div className="skeleton-card shimmer" style={{ height: '120px' }} />
            <div className="skeleton-card shimmer" style={{ height: '90px' }} />
            <div className="skeleton-card shimmer" style={{ height: '140px' }} />
            <div className="skeleton-card shimmer" style={{ height: '160px' }} />
          </aside>
          <main className="map-wrapper skeleton-map-wrapper">
            <div className="skeleton-map shimmer" />
          </main>
        </div>
      </>
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
      <motion.aside 
        className="sidebar"
        variants={sidebarVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="sidebar-header" variants={sectionVariants}>
          <span className="sidebar-badge">Panel Operativo</span>
          <h1>Climate Monte Castro</h1>
          <p className="subtitle">Telemetría de confort térmico y mitigación urbana</p>
        </motion.div>

        {/* Sección 1: Estado General */}
        <motion.div className="sidebar-section" variants={sectionVariants}>
          <h4 className="sidebar-section-title">Estado General</h4>
          <DataCard 
            label="Sensación Térmica Promedio"
            value={`${telemetria.promedioGeneral.toFixed(1)} °C`}
            footer={`Última simulación: ${telemetria.horaLectura}`}
            extraClass="card-promedio"
          />
          <AlertCard 
            tempPromedio={telemetria.promedioGeneral}
            nivelText={telemetria.outfit?.nivel}
          />
        </motion.div>

        {/* Sección 2: Análisis de Manzanas */}
        <motion.div className="sidebar-section" variants={sectionVariants}>
          <h4 className="sidebar-section-title">Análisis de Manzanas</h4>
          <HeatmapLegend 
            showPolygons={showPolygons}
            onTogglePolygons={setShowPolygons}
          />
          <ManzanasSummary zonas={telemetria.sensores} />
          <div className="card">
            <span className="card-label">Punto Crítico de Calor</span>
            <span className="card-value-small">{telemetria.calleAEvitar}</span>
          </div>
          <HistoryChart data={historico} />
        </motion.div>

        {/* Sección 3: Confort & Mitigación */}
        <motion.div className="sidebar-section" variants={sectionVariants}>
          <h4 className="sidebar-section-title">Recomendación Peatonal</h4>
          <OutfitCard outfit={telemetria.outfit} scope="Barrio" />
        </motion.div>

        <AnimatePresence>
          {selectedZone && (
            <ZoneDetailPanel
              zona={selectedZone}
              onClose={() => setSelectedZone(null)}
            />
          )}
        </AnimatePresence>

        <motion.p className="update-info" variants={sectionVariants}>
          Microclimas procesados vía {telemetria.fuenteClima}. Base de datos: {telemetria.database}
        </motion.p>
      </motion.aside>

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



