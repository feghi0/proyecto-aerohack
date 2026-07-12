import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function HistoryChart({ data = [] }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');

    // Destroy existing instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.hora),
        datasets: [{
          label: 'ST Promedio',
          data: data.map(d => d.tempPromedio),
          borderColor: '#2ec4b6',
          backgroundColor: 'rgba(46, 196, 182, 0.06)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: '#2ec4b6',
          pointBorderColor: '#050a12',
          pointHoverRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(18, 31, 51, 0.95)',
            titleColor: '#f0f2f5',
            bodyColor: '#9bb1cf',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
            displayColors: false,
            titleFont: { family: 'Outfit' },
            bodyFont: { family: 'Outfit' }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#9bb1cf', font: { size: 9, family: 'Outfit' } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: { color: '#9bb1cf', font: { size: 9, family: 'Outfit' } }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="card">
      <span className="card-label">Tendencia del Barrio (Últimas 2hs)</span>
      <div className="chart-container">
        <canvas ref={canvasRef} id="chart-historico"></canvas>
      </div>
    </div>
  );
}
