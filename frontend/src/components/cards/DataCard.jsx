import React from 'react';

export default function DataCard({ label, value, footer, hoverEffect = true, extraClass = '' }) {
  return (
    <div className={`card ${hoverEffect ? 'hoverable' : ''} ${extraClass}`}>
      {label && <span className="card-label">{label}</span>}
      {value && <span className="card-value">{value}</span>}
      {footer && <span className="card-footer">{footer}</span>}
    </div>
  );
}
