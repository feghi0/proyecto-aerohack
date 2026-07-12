import React from 'react';
import { Activity, MapPinned, Radar, Shirt } from 'lucide-react';
import Reveal from './Reveal';

const steps = [
  { icon: Radar, title: 'Ingesta climática', text: 'Temperatura, humedad e índice UV llegan desde API o simulador local.' },
  { icon: Activity, title: 'Sensación térmica', text: 'Cada zona aplica Rothfusz y offsets urbanos por arbolado, tránsito y superficie.' },
  { icon: MapPinned, title: 'Isla de calor', text: 'El mapa clasifica zonas críticas, moderadas y confortables sobre el perímetro oficial.' },
  { icon: Shirt, title: 'Albedo aplicado', text: 'La app recomienda colores y telas que reducen absorción de calor corporal.' }
];

export default function MethodologySection() {
  return (
    <section className="method-section">
      <Reveal className="section-header">
        <h2 className="section-title">Metodología</h2>
        <p className="section-desc">
          El flujo combina datos climáticos, geometría barrial y criterios físicos simples para convertir telemetría en decisiones entendibles.
        </p>
      </Reveal>

      <div className="method-grid">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} className="method-step" delay={idx * 0.07}>
              <span className="method-number">{String(idx + 1).padStart(2, '0')}</span>
              <div className="method-icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.9} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
