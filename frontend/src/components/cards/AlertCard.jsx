import React from 'react';

export default function AlertCard({ tempPromedio, nivelText }) {
  let alertLevelClass = '';
  if (tempPromedio >= 33) alertLevelClass = 'nivel-rojo';
  else if (tempPromedio >= 28) alertLevelClass = 'nivel-naranja';
  else alertLevelClass = 'nivel-verde';

  return (
    <div className={`card alerta ${alertLevelClass}`}>
      <span className="card-label">Nivel de Alerta Térmica</span>
      <span className="card-value-small">{nivelText || '--'}</span>
    </div>
  );
}
