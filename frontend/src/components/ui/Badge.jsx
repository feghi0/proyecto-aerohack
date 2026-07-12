import React from 'react';

export default function Badge({ level, children }) {
  let badgeClass = 'zone-badge';
  if (level === 'critica' || level === 'critico') badgeClass += ' critico';
  else if (level === 'moderada' || level === 'moderado') badgeClass += ' moderado';
  else badgeClass += ' confort';

  return (
    <span className={badgeClass}>
      {children}
    </span>
  );
}
