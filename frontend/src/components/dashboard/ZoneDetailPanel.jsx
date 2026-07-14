import React from 'react';
import { Car, Mountain, Shirt, Sprout, X } from 'lucide-react';
import { motion } from 'motion/react';
import Badge from '../ui/Badge';
import Chip from '../ui/Chip';

export default function ZoneDetailPanel({ zona, onClose }) {
  if (!zona) return null;

  const isCritico = zona.sensacionTermica >= 33;
  const isModerado = zona.sensacionTermica >= 28 && zona.sensacionTermica < 33;

  let level = 'confort';
  let badgeText = 'Oasis Térmico';
  if (isCritico) {
    level = 'critico';
    badgeText = 'Isla de Calor';
  } else if (isModerado) {
    level = 'moderado';
    badgeText = 'Moderado';
  }

  return (
    <motion.aside
      className="zone-detail-panel active"
      aria-live="polite"
      initial={{ opacity: 0, x: 30, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="close-panel-btn" onClick={onClose} aria-label="Cerrar detalles">
        <X size={16} strokeWidth={2.2} />
      </button>

      <div className="panel-header">
        <Badge level={level}>{badgeText}</Badge>
        <h3>{zona.nombre}</h3>
        <p className="zone-update">Monitoreo activo</p>
      </div>

      <div className="panel-stats">
        <div className="stat-box main-stat">
          <span className="stat-lbl">Sensación térmica</span>
          <span className="stat-val">{zona.sensacionTermica.toFixed(1)} °C</span>
        </div>
        <div className="stat-box">
          <span className="stat-lbl">Temp. aire</span>
          <span className="stat-val-sub">{zona.temperatura.toFixed(1)} °C</span>
        </div>
        <div className="stat-box">
          <span className="stat-lbl">Humedad</span>
          <span className="stat-val-sub">{zona.humedad}%</span>
        </div>
        <div className="stat-box">
          <span className="stat-lbl">Índice UV</span>
          <span className="stat-val-sub">{zona.uv.toFixed(1)}</span>
        </div>
      </div>

      <div className="panel-divider" />

      <div className="panel-env-details">
        <div className="env-item">
          <span className="env-lbl"><Sprout size={15} /> Arbolado</span>
          <span className="env-val">{zona.arbolado}</span>
        </div>
        <div className="env-item">
          <span className="env-lbl"><Car size={15} /> Tránsito</span>
          <span className="env-val">{zona.transito}</span>
        </div>
        <div className="env-item">
          <span className="env-lbl"><Mountain size={15} /> Superficie</span>
          <span className="env-val">{zona.superficie}</span>
        </div>
      </div>

      <div className="panel-divider" />

      {zona.outfit && (
        <div className="panel-outfit">
          <h4 className="outfit-title"><Shirt size={16} /> Sugerencia térmica para esta zona</h4>
          <div className="outfit-section-mini">
            <span className="outfit-lbl">Recomendado:</span>
            <div className="color-chips">
              {zona.outfit.coloresRecomendados?.map((c) => <Chip key={c} type="ok" label={c} />)}
            </div>
          </div>
          <div className="outfit-section-mini">
            <span className="outfit-lbl">Evitar:</span>
            <div className="color-chips">
              {zona.outfit.coloresProhibidos?.map((c) => <Chip key={c} type="bad" label={c} />)}
            </div>
          </div>
          <p className="outfit-explanation">{zona.outfit.explicacionFisica}</p>
        </div>
      )}
    </motion.aside>
  );
}
