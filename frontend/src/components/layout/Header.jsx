import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThermometerSun } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-icon" aria-hidden="true"><ThermometerSun size={26} strokeWidth={1.9} /></span>
        <h1>Climate Monte Castro</h1>
      </div>
      <nav className="header-nav" aria-label="Navegación principal">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Presentación
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Panel de Monitoreo
        </NavLink>
      </nav>
    </header>
  );
}
