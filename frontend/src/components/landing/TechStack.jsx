import React from 'react';
import { BarChart3, Boxes, Component, Map, Palette, Route, Server, Sparkles, Zap } from 'lucide-react';
import Reveal from './Reveal';

const stack = [
  { icon: Component, nombre: 'React 19 & JSX', desc: 'Componentes modulares' },
  { icon: Zap, nombre: 'Vite 8', desc: 'Build ultrarrápido' },
  { icon: Route, nombre: 'React Router', desc: 'Rutas de landing y dashboard' },
  { icon: Sparkles, nombre: 'Motion', desc: 'Animaciones por viewport' },
  { icon: Server, nombre: 'Node.js & Express', desc: 'API de telemetría' },
  { icon: Map, nombre: 'Mapa georreferenciado', desc: 'Polígonos barriales custom' },
  { icon: BarChart3, nombre: 'Chart.js', desc: 'Histórico térmico' },
  { icon: Boxes, nombre: 'lucide-react', desc: 'Sistema de íconos SVG' },
  { icon: Palette, nombre: 'CSS3', desc: 'Dark glassmorphism responsive' }
];

export default function TechStack() {
  return (
    <Reveal as="section" className="stack-section">
      <h3 className="section-label">Tecnologías Utilizadas</h3>
      <div className="stack-grid">
        {stack.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.nombre} className="stack-item">
              <span className="stack-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={1.9} />
              </span>
              <div>
                <div className="stack-name">{item.nombre}</div>
                <div className="stack-desc">{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
