import React from 'react';
import { informacionMateria } from '../../data/integrantes';

export default function Footer() {
  return (
    <footer className="footer">
      <div><strong>{informacionMateria.colegio}</strong> - {informacionMateria.curso}</div>
      <div>{informacionMateria.materia}</div>
      <div>&copy; {informacionMateria.anio}</div>
    </footer>
  );
}
