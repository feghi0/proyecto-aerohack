import React from 'react';
import { Building2, Home, Trees } from 'lucide-react';
import Reveal from './Reveal';
import plazaImage from '../../assets/plaza.jfif';
import jonteImage from '../../assets/alvarezjonte.jfif';
import callesImage from '../../assets/calles.jfif';

const lugares = [
  {
    titulo: 'Plaza Don Pedro de Mendoza',
    icon: Trees,
    descripcion: 'Pulmón verde central del barrio. Actúa como oasis térmico con arbolado excelente que mitiga temperaturas extremas locales.',
    image: plazaImage,
    alt: 'Arboleda urbana con sendero y sombra, referencia visual para la plaza del barrio'
  },
  {
    titulo: 'Centro Comercial Av. Álvarez Jonte',
    icon: Building2,
    descripcion: 'Corredor de mayor densidad comercial y tránsito. El pavimento oscuro absorbe calor y favorece una isla de calor urbana activa.',
    image: jonteImage,
    alt: 'Avenida urbana con edificios y tránsito, referencia visual para un corredor comercial'
  },
  {
    titulo: 'Calles Residenciales Arboladas',
    icon: Home,
    descripcion: 'Calles barriales con sombra natural, menor exposición solar directa y mejores condiciones de confort para caminar.',
    image: callesImage,
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
