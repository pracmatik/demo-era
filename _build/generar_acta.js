/* Ejecuta el motor REAL de actas (03_Generar_HTML_Acta_CODE.js) con datos ficticios.
   Así el acta de la demo sale del mismo código que la de un cliente,
   pero sin un solo dato real. */
const fs = require('fs');
const path = require('path');
const os = require('os');

const MOTOR = path.join(os.homedir(), 'claude-n8n/actas-claude/03_Generar_HTML_Acta_CODE.js');
const INPUT = path.join(__dirname, 'acta_input.json');
const SALIDA = path.join(__dirname, '..', 'acta', 'index.html');

const datos = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const codigo = fs.readFileSync(MOTOR, 'utf8');

const $input = { first: () => ({ json: datos }) };
const salida = new Function('$input', codigo + '\n')($input);

let html = salida[0].json.html;
/* La demo deja de mostrarse tras la fecha de caducidad.js; el aviso vive en un único fichero */
html = html.replace('</head>', '<script src="../caducidad.js"></script></head>');
if (!html.includes('caducidad.js')) throw new Error('No se pudo insertar la caducidad en el acta.');
fs.mkdirSync(path.dirname(SALIDA), { recursive: true });
fs.writeFileSync(SALIDA, html, 'utf8');
console.log('Acta generada:', SALIDA, '·', Math.round(html.length / 1024) + ' KB');
