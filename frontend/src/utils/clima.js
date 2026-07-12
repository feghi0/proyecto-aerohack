// Algoritmo de Sensación Térmica (Fórmula del Heat Index de Rothfusz)
export function calcularSensacionTermica(T, RH) {
  const Tf = T * 9/5 + 32;
  let HI = -42.379 + 2.04901523*Tf + 10.14333127*RH
    - 0.22475541*Tf*RH - 0.00683783*Tf*Tf
    - 0.05481717*RH*RH + 0.00122874*Tf*Tf*RH
    + 0.00085282*Tf*RH*RH - 0.00000199*Tf*Tf*RH*RH;
  
  if (RH < 13 && Tf >= 80 && Tf <= 112) {
    const ajuste = ((13 - RH) / 4) * Math.sqrt((17 - Math.abs(Tf - 95)) / 17);
    HI -= ajuste;
  } else if (RH > 85 && Tf >= 80 && Tf <= 87) {
    const ajuste = ((RH - 85) / 10) * ((87 - Tf) / 5);
    HI += ajuste;
  }
  
  if (Tf < 80) {
    HI = 0.5 * (Tf + 61.0 + ((Tf - 68.0) * 1.2) + (RH * 0.094));
  }

  return parseFloat(((HI - 32) * 5/9).toFixed(1));
}

// Algoritmo de Vestimenta según Albedo y Sensación Térmica
export function calcularOutfit(promedioSensacion) {
  let nivel, coloresRecomendados, coloresProhibidos, tela, explicacion;

  if (promedioSensacion >= 33) {
    nivel = 'Alerta Roja - Calor Extremo';
    coloresRecomendados = ['Blanco', 'Beige', 'Celeste pastel', 'Gris claro'];
    coloresProhibidos = ['Negro', 'Azul marino', 'Marrón oscuro', 'Bordó'];
    tela = 'Lino 100% o Algodón liviano de trama abierta';
    explicacion = 'Con sensación térmica superior a 33°C, el albedo de las telas es clave: los colores claros reflejan el calor, mientras los oscuros absorben radiación solar y elevan la sensación térmica del cuerpo.';
  } else if (promedioSensacion >= 28) {
    nivel = 'Alerta Naranja - Calor Moderado';
    coloresRecomendados = ['Blanco roto', 'Gris claro', 'Pasteles', 'Caqui claro'];
    coloresProhibidos = ['Negro', 'Azul marino y colores muy saturados'];
    tela = 'Algodón liviano o mezclas de lino y viscosa';
    explicacion = 'Sensación térmica de 28°C a 32.9°C. Se aconseja vestir remeras sueltas de colores claros para evitar la radiación y caminar por calles con abundante arbolado.';
  } else {
    nivel = 'Zona Verde - Confort Térmico';
    coloresRecomendados = ['Tonalidades claras e intermedias', 'Colores vivos'];
    coloresProhibidos = ['Negro expuesto al sol directo de manera prolongada'];
    tela = 'Algodón estándar o mezclas transpirables';
    explicacion = 'Por debajo de los 28°C, la diferencia de absorción de calor es menor. Disfrute del tránsito peatonal agradable.';
  }

  return {
    nivel,
    coloresRecomendados,
    coloresProhibidos,
    telaSugerida: tela,
    explicacionFisica: explicacion
  };
}

// Función para procesar y enriquecer las zonas con simulación climática
export function obtenerZonasProcesadas(climaBase) {
  const { temperatura, humedad, uv } = climaBase;
  
  return [
    {
      id: 'zona-nw',
      nombre: 'Miranda y Segurola (Noroeste - Sector Comercial)',
      polygon: [
        [-34.612, -58.510],
        [-34.612, -58.504],
        [-34.608, -58.504],
        [-34.608, -58.510]
      ],
      arbolado: 'Medio',
      transito: 'Bajo',
      superficie: 'Asfalto',
      offsetTemp: -0.5
    },
    {
      id: 'zona-nc',
      nombre: 'Miranda y Bermúdez (Norte Centro - Residencial)',
      polygon: [
        [-34.612, -58.504],
        [-34.612, -58.498],
        [-34.608, -58.498],
        [-34.608, -58.504]
      ],
      arbolado: 'Excelente',
      transito: 'Bajo',
      superficie: 'Pavimento',
      offsetTemp: -1.2
    },
    {
      id: 'zona-ne',
      nombre: 'Miranda y Concordia (Noreste - Sector Industrial)',
      polygon: [
        [-34.612, -58.498],
        [-34.612, -58.492],
        [-34.608, -58.492],
        [-34.608, -58.498]
      ],
      arbolado: 'Bajo',
      transito: 'Moderado',
      superficie: 'Asfalto',
      offsetTemp: 0.5
    },
    {
      id: 'zona-cw',
      nombre: 'Baigorria y Segurola (Centro Oeste - Alta Densidad)',
      polygon: [
        [-34.616, -58.510],
        [-34.616, -58.504],
        [-34.612, -58.504],
        [-34.612, -58.510]
      ],
      arbolado: 'Bajo',
      transito: 'Pesado',
      superficie: 'Asfalto',
      offsetTemp: 1.2
    },
    {
      id: 'zona-cc',
      nombre: 'Plaza Don Pedro de Mendoza (Centro - Oasis Verde)',
      polygon: [
        [-34.616, -58.504],
        [-34.616, -58.498],
        [-34.612, -58.498],
        [-34.612, -58.504]
      ],
      arbolado: 'Excelente',
      transito: 'Nulo',
      superficie: 'Tierra/Pasto',
      offsetTemp: -3.1
    },
    {
      id: 'zona-ce',
      nombre: 'Baigorria y Concordia (Centro Este - Tránsito Moderado)',
      polygon: [
        [-34.616, -58.498],
        [-34.616, -58.492],
        [-34.612, -58.492],
        [-34.612, -58.498]
      ],
      arbolado: 'Medio',
      transito: 'Moderado',
      superficie: 'Pavimento',
      offsetTemp: 0.1
    },
    {
      id: 'zona-sw',
      nombre: 'Av. Álvarez Jonte y Segurola (Suroeste - Corredor Comercial)',
      polygon: [
        [-34.620, -58.510],
        [-34.620, -58.504],
        [-34.616, -58.504],
        [-34.616, -58.510]
      ],
      arbolado: 'Bajo',
      transito: 'Pesado',
      superficie: 'Asfalto',
      offsetTemp: 1.8
    },
    {
      id: 'zona-sc',
      nombre: 'Av. Álvarez Jonte y Bermúdez (Sur Centro - Residencial)',
      polygon: [
        [-34.620, -58.504],
        [-34.620, -58.498],
        [-34.616, -58.498],
        [-34.616, -58.504]
      ],
      arbolado: 'Medio',
      transito: 'Moderado',
      superficie: 'Asfalto',
      offsetTemp: 0.8
    },
    {
      id: 'zona-se',
      nombre: 'Lascano y Concordia (Sureste - Zona Residencial Calma)',
      polygon: [
        [-34.620, -58.498],
        [-34.620, -58.492],
        [-34.616, -58.492],
        [-34.616, -58.498]
      ],
      arbolado: 'Alto',
      transito: 'Bajo',
      superficie: 'Pavimento',
      offsetTemp: -0.8
    }
  ].map(zona => {
    const tempZona = Number((temperatura + zona.offsetTemp).toFixed(1));
    const humOffset = zona.arbolado === 'Excelente' ? 6 : (zona.arbolado === 'Bajo' ? -5 : 0);
    const humZona = Math.max(20, Math.min(100, humedad + humOffset));
    const stZona = calcularSensacionTermica(tempZona, humZona);

    const uvOffset = zona.arbolado === 'Excelente' ? 0.25 : (zona.arbolado === 'Alto' ? 0.5 : 1.0);
    const uvZona = Number((uv * uvOffset).toFixed(1));

    const esIsla = (stZona >= 33 && zona.arbolado === 'Bajo' && zona.superficie === 'Asfalto');

    let nivelLocal = 'verde';
    if (stZona >= 33) nivelLocal = 'critica';
    else if (stZona >= 28) nivelLocal = 'moderada';

    const outfitLocal = calcularOutfit(stZona);

    return {
      ...zona,
      temperatura: tempZona,
      humedad: humZona,
      uv: uvZona,
      sensacionTermica: stZona,
      islaDeCalor: esIsla,
      nivelLocal,
      outfit: outfitLocal,
      lastUpdated: new Date()
    };
  });
}
