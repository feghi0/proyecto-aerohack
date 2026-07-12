import React from 'react';
import { Shirt, ThermometerSun, TreePine } from 'lucide-react';
import Reveal from './Reveal';

const features = [
  {
    icon: ThermometerSun,
    title: 'Microclimas en Tiempo Real',
    text: 'Monitoreo dinámico de 9 zonas críticas del barrio utilizando fórmulas de sensación térmica Rothfusz alimentadas por datos base climáticos.'
  },
  {
    icon: TreePine,
    title: 'Impacto del Arbolado y Superficie',
    text: 'Analiza cómo la densidad del arbolado público, el flujo de tránsito vehicular y el tipo de suelo alteran localmente la sensación térmica.'
  },
  {
    icon: Shirt,
    title: 'Mitigación por Albedo de Vestimenta',
    text: 'Recomendaciones inteligentes de vestimenta según reflectancia de colores, telas sugeridas y exposición del peatón en zonas críticas.'
  }
];

export default function AboutSection() {
  return (
    <section className="about-section">
      <Reveal className="section-header">
        <h2 className="section-title">Sobre el Proyecto</h2>
        <p className="section-desc">
          Este sistema simula y expone la telemetría climática urbana del barrio de Monte Castro, CABA, para modelar islas de calor urbanas y proponer estrategias de mitigación.
        </p>
      </Reveal>

      <div className="features-grid">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} className="feature-card" delay={idx * 0.08}>
              <div className="feature-icon-wrapper" aria-hidden="true">
                <Icon size={30} strokeWidth={1.9} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
