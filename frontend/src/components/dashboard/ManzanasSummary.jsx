import React from 'react';

export default function ManzanasSummary({ zonas = [] }) {
  let islas = 0;
  let moderadas = 0;
  let frescas = 0;

  zonas.forEach(z => {
    if (z.sensacionTermica >= 33) islas++;
    else if (z.sensacionTermica >= 28) moderadas++;
    else frescas++;
  });

  return (
    <div className="card">
      <span className="card-label">Estado de Manzanas (9 Zonas)</span>
      <div className="manzanas-summary">
        <div className="manzana-stat">
          <span className="manzana-stat-val isla">{islas}</span>
          <span className="manzana-stat-label">Islas Calor</span>
        </div>
        <div className="manzana-stat">
          <span className="manzana-stat-val moderada">{moderadas}</span>
          <span className="manzana-stat-label">Moderadas</span>
        </div>
        <div className="manzana-stat">
          <span className="manzana-stat-val fresca">{frescas}</span>
          <span className="manzana-stat-label">Frescas</span>
        </div>
      </div>
    </div>
  );
}
