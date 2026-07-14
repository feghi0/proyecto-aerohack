import React from 'react';
import { School } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import BarrioGallery from '../components/landing/BarrioGallery';
import MethodologySection from '../components/landing/MethodologySection';
import TechStack from '../components/landing/TechStack';
import Reveal from '../components/landing/Reveal';
import { informacionMateria } from '../data/integrantes';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <Helmet>
        <title>Climate Monte Castro | Aerohack ET 35</title>
        <meta name="description" content="Proyecto Aerohack de monitoreo térmico urbano, albedo y confort peatonal para Monte Castro, CABA." />
        <meta property="og:title" content="Climate Monte Castro" />
        <meta property="og:description" content="Dashboard y landing del proyecto escolar Aerohack sobre islas de calor urbanas en Monte Castro." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/src/assets/hero.png" />
      </Helmet>

      <Reveal as="section" className="school-banner">
        <div className="school-info">
          <span className="school-badge">Proyecto Escolar</span>
          <h2 className="school-name">{informacionMateria.colegio}</h2>
          <h3 className="school-subname">Especialidad en Computación</h3>

          <div className="school-details">
            <div className="school-detail-item">
              <span className="school-detail-lbl">Materia</span>
              <span className="school-detail-val">{informacionMateria.materia}</span>
            </div>
            <div className="school-detail-item">
              <span className="school-detail-lbl">Curso</span>
              <span className="school-detail-val">{informacionMateria.curso}</span>
            </div>
            <div className="school-detail-item">
              <span className="school-detail-lbl">Ubicación</span>
              <span className="school-detail-val">{informacionMateria.ubicacion}</span>
            </div>
          </div>
        </div>
        <div className="school-logo-placeholder" aria-hidden="true">
          <School size={40} strokeWidth={1.8} />
        </div>
      </Reveal>

      <HeroSection />
      <AboutSection />
      <BarrioGallery />
      <MethodologySection />
      <TechStack />
    </div>
  );
}
