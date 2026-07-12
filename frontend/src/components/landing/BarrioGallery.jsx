import React from 'react';
import { Building2, Home, Trees } from 'lucide-react';
import Reveal from './Reveal';

const lugares = [
  {
    titulo: 'Plaza Don Pedro de Mendoza',
    icon: Trees,
    descripcion: 'Pulmón verde central del barrio. Actúa como oasis térmico con arbolado excelente que mitiga temperaturas extremas locales.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80',
    alt: 'Arboleda urbana con sendero y sombra, referencia visual para la plaza del barrio'
  },
  {
    titulo: 'Centro Comercial Av. Álvarez Jonte',
    icon: Building2,
    descripcion: 'Corredor de mayor densidad comercial y tránsito. El pavimento oscuro absorbe calor y favorece una isla de calor urbana activa.',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=80',
    alt: 'Avenida urbana con edificios y tránsito, referencia visual para un corredor comercial'
  },
  {
    titulo: 'Calles Residenciales Arboladas',
    icon: Home,
    descripcion: 'Calles barriales con sombra natural, menor exposición solar directa y mejores condiciones de confort para caminar.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80',
    alt: 'Calle residencial con árboles y viviendas, referencia visual para Monte Castro'
  }
];

export default function BarrioGallery() {
  return (
    <section className="about-section">
      <Reveal className="section-header">
        <h2 className="section-title">Contexto Local: Barrio de Monte Castro</h2>
        <p className="section-desc">
          El análisis se centra en manzanas reales del barrio. Estas escenas de referencia muestran los tres tipos de entorno que alimentan el modelo térmico.
        </p>
      </Reveal>

      <div className="gallery-grid">
        {lugares.map((lugar, idx) => {
          const Icon = lugar.icon;
          return (
            <Reveal key={lugar.titulo} className="gallery-card" delay={idx * 0.08}>
              <div className="gallery-media">
                <img src={lugar.image} alt={lugar.alt} loading="lazy" />
                <div className="gallery-overlay">
                  <Icon size={26} strokeWidth={1.8} />
                  <h3 className="gallery-title">{lugar.titulo}</h3>
                </div>
              </div>
              <div className="gallery-info">
                <p className="gallery-desc">{lugar.descripcion}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
