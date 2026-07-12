import React from 'react';
import Chip from '../ui/Chip';

export default function OutfitCard({ outfit, scope = 'Barrio' }) {
  if (!outfit) return null;

  return (
    <div className="card outfit-card">
      <div className="card-header-row">
        <span className="card-label">👕 Confort General — Vestimenta</span>
        <span className="badge-global">{scope}</span>
      </div>

      <div className="outfit-section">
        <span class="outfit-subtitle">Colores reflectantes recomendados</span>
        <div className="color-chips">
          {outfit.coloresRecomendados?.map((color, idx) => (
            <Chip key={idx} type="ok" label={color} />
          ))}
        </div>
      </div>

      <div className="outfit-section">
        <span class="outfit-subtitle">Evitar colores absorbentes</span>
        <div className="color-chips">
          {outfit.coloresProhibidos?.map((color, idx) => (
            <Chip key={idx} type="bad" label={color} />
          ))}
        </div>
      </div>

      <div className="outfit-section">
        <span class="outfit-subtitle">Tela sugerida</span>
        <p className="outfit-text">{outfit.telaSugerida || '--'}</p>
      </div>

      <div className="outfit-section">
        <span class="outfit-subtitle">Fundamentación de Albedo</span>
        <p className="outfit-text explicacion">{outfit.explicacionFisica || '--'}</p>
      </div>
    </div>
  );
}
