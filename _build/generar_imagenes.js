/* Genera los marcadores gráficos de la demo.
   En un acta real, aquí van las fotos que el técnico envía por Telegram
   durante la visita. En la demo no se publica ninguna imagen de obra real. */
const fs = require('fs');
const path = require('path');

const SALIDA = path.join(__dirname, '..', 'acta', 'img');
fs.mkdirSync(SALIDA, { recursive: true });

/* ── 01 · portada: alzado de fachada de un edificio del Eixample (también hace de cabecera) ── */
function portada() {
  const filas = [0, 1, 2, 3, 4];
  const cols = [0, 1, 2, 3];
  let huecos = '';
  filas.forEach(f => cols.forEach(c => {
    const x = 96 + c * 116, y = 84 + f * 74;
    huecos += `<rect x="${x}" y="${y}" width="72" height="46" fill="none" stroke="#6f6a63" stroke-width="1.6"/>`;
    if (f > 0) huecos += `<path d="M${x - 8} ${y + 54} h88" stroke="#5d5850" stroke-width="3"/>`;
  }));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480" role="img" aria-label="Alzado de la fachada">
  <rect width="640" height="480" fill="#232120"/>
  <rect x="60" y="46" width="520" height="400" fill="#2e2b29"/>
  ${huecos}
  <path d="M60 46 h520" stroke="#6f6a63" stroke-width="2.4"/>
</svg>`;
}

/* ── 02-06 · hueco de fotografía ── */
function hueco(rotulo, n) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480" role="img" aria-label="${rotulo}">
  <rect width="640" height="480" fill="#eae7e2"/>
  <rect x="0.5" y="0.5" width="639" height="479" fill="none" stroke="#cbc6be"/>
  <g transform="translate(320 212)" fill="none" stroke="#b0aaa1" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-44 -15 h17 l8 -11 h38 l8 11 h17 a7 7 0 0 1 7 7 v40 a7 7 0 0 1 -7 7 h-88 a7 7 0 0 1 -7 -7 v-40 a7 7 0 0 1 7 -7 z"/>
    <circle cx="0" cy="17" r="16"/>
  </g>
  <text x="320" y="304" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#807a72">${rotulo}</text>
  <text x="320" y="330" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#aaa49b" letter-spacing="1.8">FOTOGRAFÍA DE LA VISITA · DEMOSTRACIÓN</text>
  <text x="320" y="442" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" fill="#bab4ab">${String(n).padStart(2, '0')}</text>
</svg>`;
}

const ROTULOS = [
  null,
  'Ventana · dormitorio 2',
  'Paso de conducto sin sellar',
  'Unidad de ventilación · baño',
  'Toma de lavabo · baño 2',
  'Trasdosado de fachada abierto'
];

fs.writeFileSync(path.join(SALIDA, 'foto-01.svg'), portada(), 'utf8');
ROTULOS.forEach((r, i) => {
  if (!r) return;
  const n = i + 1;
  fs.writeFileSync(path.join(SALIDA, `foto-${String(n).padStart(2, '0')}.svg`), hueco(r, n), 'utf8');
});
console.log(ROTULOS.length + ' imágenes generadas en', SALIDA);
