import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { integrantes, informacionMateria } from '../../data/integrantes';
import Reveal from './Reveal';

const titleLines = ['Monitoreo Climático', 'y Albedo Urbano', 'en Monte Castro'];

export default function HeroSection() {
  return (
    <Reveal as="section" className="hero-section hero-mesh" delay={0.08}>

      <h1 className="hero-title" aria-label="Monitoreo Climático y Albedo Urbano en Monte Castro">
        {titleLines.map((line, idx) => (
          <motion.span
            key={line}
            className="hero-title-line"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 + idx * 0.08 }}
          >
            {line}
          </motion.span>
        ))}
      </h1>

      <p className="hero-subtitle">
        Un proyecto de analíticas ambientales integradas con simulación microclimática y confort térmico peatonal para {informacionMateria.colegio}.
      </p>

      <div className="hero-cta">
        <Link to="/dashboard" className="btn btn-primary">
          Ver Dashboard
          <ArrowRight size={18} strokeWidth={2.2} />
        </Link>
      </div>

      <div className="team-container">
        <h3 className="section-label">Integrantes del Equipo - {informacionMateria.curso}</h3>
        <motion.div
          className="team-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {integrantes.map((miembro) => (
            <motion.div
              key={miembro.nombre}
              className="team-card"
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
            >
              <div className="avatar-placeholder">{miembro.avatar}</div>
              <div className="team-info">
                <span className="team-name">{miembro.nombre}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
}
