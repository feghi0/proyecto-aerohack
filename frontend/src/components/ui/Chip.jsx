import React from 'react';

export default function Chip({ type = 'ok', label }) {
  const className = `chip ${type === 'ok' ? 'chip-ok' : 'chip-bad'}`;
  return <span className={className}>{label}</span>;
}
