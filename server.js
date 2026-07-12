require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Definición de las 9 zonas de Monte Castro recortadas contra el perímetro real de OSM relation 2221446.
const zonasMontecastro = [
  {
    id: 'zona-1',
    nombre: 'Irigoyen y Álvarez Jonte (Oeste)',
    polygon: [
      [-34.6243904, -58.5216417],
      [-34.6244354, -58.5215835],
      [-34.6246963, -58.5212419],
      [-34.6250799, -58.5207474],
      [-34.6251526, -58.5206503],
      [-34.6252153, -58.5205729],
      [-34.6252573, -58.5205187],
      [-34.6253252, -58.5204307],
      [-34.6255749, -58.5200931],
      [-34.6259248, -58.5196633],
      [-34.6259914, -58.519576],
      [-34.6260451, -58.5195032],
      [-34.6264459, -58.5189904],
      [-34.626758, -58.5185682],
      [-34.6268313, -58.5184746],
      [-34.6268739, -58.5184195],
      [-34.6215221, -58.5184195],
      [-34.6218492, -58.5187952],
      [-34.6219348, -58.5188941],
      [-34.6223764, -58.5193917],
      [-34.6227315, -58.5197878],
      [-34.6228367, -58.5199052],
      [-34.6231898, -58.5202969],
      [-34.6235475, -58.5207039],
      [-34.6239851, -58.5211912],
      [-34.6242399, -58.5214711],
      [-34.6242713, -58.5215066],
      [-34.6243134, -58.5215543]
    ],
    arbolado: 'Medio',
    transito: 'Bajo',
    superficie: 'Asfalto',
    offsetTemp: -0.5
  },
  {
    id: 'zona-2',
    nombre: 'Irigoyen y Elpidio González',
    polygon: [
      [-34.6268739, -58.5184195],
      [-34.6268815, -58.5184097],
      [-34.6270321, -58.518215],
      [-34.6272248, -58.517966],
      [-34.6276471, -58.5174171],
      [-34.6277143, -58.517332],
      [-34.627995, -58.5169709],
      [-34.6280486, -58.5169029],
      [-34.6283954, -58.5164635],
      [-34.628455, -58.516388],
      [-34.6283817, -58.5163022],
      [-34.6283151, -58.5162245],
      [-34.6283009, -58.5162079],
      [-34.6276308, -58.5154253],
      [-34.6274296, -58.5151973],
      [-34.6186427, -58.5151973],
      [-34.6189603, -58.515557],
      [-34.6190838, -58.5156973],
      [-34.6197205, -58.516407],
      [-34.6198298, -58.5165278],
      [-34.6200756, -58.516797],
      [-34.6202068, -58.5169399],
      [-34.6206315, -58.517432],
      [-34.6209194, -58.5177562],
      [-34.6210605, -58.5179095],
      [-34.6215038, -58.5183985],
      [-34.6215221, -58.5184195]
    ],
    arbolado: 'Bajo',
    transito: 'Pesado',
    superficie: 'Asfalto',
    offsetTemp: 1.2
  },
  {
    id: 'zona-3',
    nombre: 'Lope de Vega Oeste',
    polygon: [
      [-34.6274296, -58.5151973],
      [-34.6268692, -58.5145624],
      [-34.6264629, -58.5141058],
      [-34.6260455, -58.5136292],
      [-34.6259825, -58.5135599],
      [-34.6259139, -58.5134844],
      [-34.6258511, -58.5134129],
      [-34.6251266, -58.5126206],
      [-34.624554, -58.5119752],
      [-34.616079, -58.5119752],
      [-34.6161785, -58.5121471],
      [-34.6164389, -58.5125846],
      [-34.6165898, -58.5128364],
      [-34.6166096, -58.5128695],
      [-34.6166334, -58.5129093],
      [-34.6166736, -58.5129764],
      [-34.6167199, -58.5130536],
      [-34.6167788, -58.5131184],
      [-34.6172637, -58.5136513],
      [-34.6178688, -58.5143321],
      [-34.6184222, -58.5149475],
      [-34.6184811, -58.5150143],
      [-34.6186427, -58.5151973]
    ],
    arbolado: 'Medio',
    transito: 'Moderado',
    superficie: 'Pavimento',
    offsetTemp: 0.2
  },
  {
    id: 'zona-4',
    nombre: 'Plaza Don Pedro de Mendoza (Oasis Verde)',
    polygon: [
      [-34.624554, -58.5119752],
      [-34.6242735, -58.511659],
      [-34.6244591, -58.5114194],
      [-34.6246158, -58.5112173],
      [-34.6251114, -58.5105694],
      [-34.6254065, -58.5101903],
      [-34.6258328, -58.5096354],
      [-34.6259813, -58.5094421],
      [-34.6260367, -58.5093692],
      [-34.6261039, -58.5092834],
      [-34.6261348, -58.509242],
      [-34.6261806, -58.5091803],
      [-34.6264986, -58.508753],
      [-34.6141619, -58.508753],
      [-34.6143404, -58.5090621],
      [-34.6144845, -58.5093056],
      [-34.614536, -58.5093907],
      [-34.6146439, -58.5095797],
      [-34.6149217, -58.510026],
      [-34.6151682, -58.5104359],
      [-34.6154112, -58.51084],
      [-34.6156696, -58.5112697],
      [-34.6159095, -58.5116822],
      [-34.616079, -58.5119752]
    ],
    arbolado: 'Excelente',
    transito: 'Nulo',
    superficie: 'Tierra/Pasto',
    offsetTemp: -3.1
  },
  {
    id: 'zona-5',
    nombre: 'Centro de Monte Castro',
    polygon: [
      [-34.6264986, -58.508753],
      [-34.6266944, -58.5084898],
      [-34.6267651, -58.5083947],
      [-34.6268261, -58.5083153],
      [-34.6268888, -58.5082286],
      [-34.6269384, -58.5081619],
      [-34.6275228, -58.5073774],
      [-34.6275818, -58.5072968],
      [-34.6275067, -58.507215],
      [-34.6263377, -58.5059689],
      [-34.6259294, -58.5055308],
      [-34.6122865, -58.5055308],
      [-34.612366, -58.5056732],
      [-34.6130906, -58.5069016],
      [-34.6131131, -58.5069394],
      [-34.6131606, -58.5070195],
      [-34.613179, -58.5070504],
      [-34.6132018, -58.5070898],
      [-34.6134543, -58.5075272],
      [-34.6136528, -58.507871],
      [-34.613825, -58.5081693],
      [-34.6139113, -58.5083188],
      [-34.6141482, -58.5087293],
      [-34.6141619, -58.508753]
    ],
    arbolado: 'Medio',
    transito: 'Moderado',
    superficie: 'Pavimento',
    offsetTemp: 0.4
  },
  {
    id: 'zona-6',
    nombre: 'Av. Álvarez Jonte Centro',
    polygon: [
      [-34.6259294, -58.5055308],
      [-34.625217, -58.5047664],
      [-34.6240224, -58.5034968],
      [-34.6236298, -58.502703],
      [-34.6234313, -58.5023086],
      [-34.6103592, -58.5023086],
      [-34.6104022, -58.5023811],
      [-34.6108088, -58.5030472],
      [-34.6109379, -58.5032587],
      [-34.6112117, -58.5037235],
      [-34.6114597, -58.5041446],
      [-34.6116922, -58.5045394],
      [-34.6121105, -58.5052232],
      [-34.6121482, -58.5052847],
      [-34.6122225, -58.5054161],
      [-34.6122865, -58.5055308]
    ],
    arbolado: 'Bajo',
    transito: 'Pesado',
    superficie: 'Asfalto',
    offsetTemp: 1.4
  },
  {
    id: 'zona-7',
    nombre: 'Bermúdez y Lascano',
    polygon: [
      [-34.6234313, -58.5023086],
      [-34.6230713, -58.5015935],
      [-34.6224138, -58.500272],
      [-34.6218687, -58.4991813],
      [-34.6218213, -58.4990865],
      [-34.6103715, -58.4990865],
      [-34.6100636, -58.4993543],
      [-34.609965, -58.4994421],
      [-34.609115, -58.5001993],
      [-34.6097833, -58.501337],
      [-34.6098636, -58.5014737],
      [-34.6100374, -58.5017665],
      [-34.6102755, -58.5021677],
      [-34.6103592, -58.5023086]
    ],
    arbolado: 'Alto',
    transito: 'Bajo',
    superficie: 'Pavimento',
    offsetTemp: -0.8
  },
  {
    id: 'zona-8',
    nombre: 'Joaquín V. González Centro',
    polygon: [
      [-34.6218213, -58.4990865],
      [-34.6214555, -58.4983546],
      [-34.6214182, -58.4982799],
      [-34.6213619, -58.4981941],
      [-34.6213249, -58.4981498],
      [-34.6205513, -58.4972288],
      [-34.6198089, -58.4963224],
      [-34.6194307, -58.4958643],
      [-34.6140478, -58.4958643],
      [-34.6132522, -58.4965696],
      [-34.612137, -58.4975402],
      [-34.6120364, -58.4976285],
      [-34.611263, -58.4983076],
      [-34.61105, -58.4984961],
      [-34.6103715, -58.4990865]
    ],
    arbolado: 'Medio',
    transito: 'Moderado',
    superficie: 'Pavimento',
    offsetTemp: 0.1
  },
  {
    id: 'zona-9',
    nombre: 'Joaquín V. González y Baigorria (Este)',
    polygon: [
      [-34.6194307, -58.4958643],
      [-34.6192099, -58.4955968],
      [-34.6190854, -58.495446],
      [-34.6183206, -58.4945196],
      [-34.6175692, -58.4936368],
      [-34.6167188, -58.4926421],
      [-34.6158571, -58.4937204],
      [-34.6150071, -58.4947894],
      [-34.6143799, -58.4955699],
      [-34.6140478, -58.4958643]
    ],
    arbolado: 'Bajo',
    transito: 'Moderado',
    superficie: 'Asfalto',
    offsetTemp: 0.5
  }
];

// Clima Base Simulado
let climaBaseSimulado = {
  temperatura: 31.5,
  humedad: 65,
  uv: 6.8,
  fuente: 'Simulador (Local)'
};

// Histórico circular en memoria
let historicoPromedios = [];
const ahora = new Date();
for (let i = 11; i >= 0; i--) {
  const tiempo = new Date(ahora.getTime() - i * 10 * 60 * 1000);
  historicoPromedios.push({
    hora: tiempo.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    tempPromedio: parseFloat((29.0 + Math.sin(i / 3.5) * 1.5 + (Math.random() - 0.5) * 0.5).toFixed(1))
  });
}

// Algoritmos Físicos y de Confort
function calcularSensacionTermica(T, RH) {
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

function calcularOutfit(promedioSensacion) {
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

// Ingesta de datos de clima base desde OpenWeatherMap si hay clave disponible
async function actualizarClimaDeInternet() {
  const apiKey = process.env.OWM_API_KEY;
  if (!apiKey) {
    climaBaseSimulado.fuente = 'Simulador (Local)';
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=-34.6155&lon=-58.5005&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const data = await response.json();
    climaBaseSimulado.temperatura = data.main.temp;
    climaBaseSimulado.humedad = data.main.humidity;
    
    const hora = new Date().getHours();
    let uvBase = 0;
    if (hora >= 8 && hora <= 18) {
      uvBase = Math.sin((hora - 8) / 10 * Math.PI) * 10;
    }
    climaBaseSimulado.uv = Number((uvBase + (Math.random() - 0.5) * 1.0).toFixed(1));
    climaBaseSimulado.fuente = 'OpenWeatherMap API';
    console.log(`Clima base actualizado: ${climaBaseSimulado.temperatura}°C, ${climaBaseSimulado.humedad}% HR.`);
  } catch (err) {
    console.error('Error al consultar OWM. Usando simulación local:', err.message);
    climaBaseSimulado.fuente = 'Simulador (Fallback)';
  }
}

// Genera los datos enriquecidos de cada una de las 9 zonas
function obtenerZonasProcesadas() {
  return zonasMontecastro.map(zona => {
    let tempZona = Number((climaBaseSimulado.temperatura + zona.offsetTemp).toFixed(1));
    let humOffset = zona.arbolado === 'Excelente' ? 6 : (zona.arbolado === 'Bajo' ? -5 : 0);
    let humZona = Math.max(20, Math.min(100, climaBaseSimulado.humedad + humOffset));
    let stZona = calcularSensacionTermica(tempZona, humZona);

    let uvOffset = zona.arbolado === 'Excelente' ? 0.25 : (zona.arbolado === 'Alto' ? 0.5 : 1.0);
    let uvZona = Number((climaBaseSimulado.uv * uvOffset).toFixed(1));

    // Clasificación de isla de calor
    const esIsla = (stZona >= 33 && zona.arbolado === 'Bajo' && zona.superficie === 'Asfalto');

    // Determinar nivel local
    let nivelLocal = 'verde';
    if (stZona >= 33) nivelLocal = 'critica';
    else if (stZona >= 28) nivelLocal = 'moderada';

    // Algoritmo Outfit específico de la zona
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

// Actualización periódica en memoria
let zonasProcesadasCache = [];

async function recalcularZonas() {
  zonasProcesadasCache = obtenerZonasProcesadas();
  
  // Agregar promedio al histórico circular
  const sumaSt = zonasProcesadasCache.reduce((acc, z) => acc + z.sensacionTermica, 0);
  const promSt = parseFloat((sumaSt / zonasProcesadasCache.length).toFixed(1));
  const ahoraStr = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  historicoPromedios.push({ hora: ahoraStr, tempPromedio: promSt });
  if (historicoPromedios.length > 12) {
    historicoPromedios.shift();
  }
}

// Fluctuación rápida simulada en memoria (dinamismo local)
setInterval(async () => {
  if (climaBaseSimulado.fuente.includes('Simulador')) {
    climaBaseSimulado.temperatura = Number((climaBaseSimulado.temperatura + (Math.random() - 0.5) * 0.3).toFixed(2));
    climaBaseSimulado.humedad = Math.max(20, Math.min(100, climaBaseSimulado.humedad + Math.round((Math.random() - 0.5) * 2)));
  }
  await recalcularZonas();
}, 15000);

// Inicialización de clima y zonas
async function inicializar() {
  await actualizarClimaDeInternet();
  await recalcularZonas();
}
inicializar();

// --- ENDPOINTS ---

// 1. Obtener la telemetría completa de las zonas
app.get('/api/telemetria', async (req, res) => {
  try {
    const zonas = zonasProcesadasCache.length > 0 ? zonasProcesadasCache : obtenerZonasProcesadas();
    const sumaSensaciones = zonas.reduce((acc, z) => acc + z.sensacionTermica, 0);
    const promedioGeneral = parseFloat((sumaSensaciones / zonas.length).toFixed(1));
    const outfitGlobal = calcularOutfit(promedioGeneral);

    // Identificar zona más crítica (isla de calor o mayor temperatura)
    const critica = zonas.reduce((max, z) =>
      z.sensacionTermica > max.sensacionTermica ? z : max
    , zonas[0]);

    res.json({
      barrio: 'Monte Castro, CABA, Argentina',
      promedioGeneral,
      horaLectura: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
      calleAEvitar: critica ? `${critica.nombre} (${critica.sensacionTermica}°C ST)` : '--',
      outfit: outfitGlobal,
      sensores: zonas, // Mantenemos el campo "sensores" para compatibilidad de interfaz simplificada
      fuenteClima: climaBaseSimulado.fuente,
      database: 'Memory (DataTest Estricto)'
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar telemetría.', detalles: err.message });
  }
});

// 2. Obtener histórico de las últimas 2 horas
app.get('/api/historico', (req, res) => {
  res.json(historicoPromedios);
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor "Monte Castro Smart Climate v2" corriendo en http://localhost:${PORT}`);
});



