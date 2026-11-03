/* Presupuesto de ejemplo — mismo formato de salida que el motor de presupuestos
   (capítulos, coeficiente regulador, notas por partida, subtotales, IVA aparte).
   Obra, empresa e importes inventados: no es el presupuesto de ningún cliente. */
const fs = require('fs');
const path = require('path');

const COEF = 1.08;
const SALIDA = path.join(__dirname, '..', 'presupuesto', 'index.html');

/* pu: null = la partida no está en la base de precios. No se inventa: queda marcada. */
const CAPITULOS = [
  {
    num: 1, titulo: 'DEMOLICIONES',
    partidas: [
      { n: '1.1', d: 'Demolición de tabiquería interior de ladrillo hueco, incluida retirada de escombros a contenedor.', ud: 'm²', med: 86.40, pu: 14.50, nota: '' },
      { n: '1.2', d: 'Levantado de pavimento existente de terrazo, incluido mortero de agarre y retirada a contenedor.', ud: 'm²', med: 92.30, pu: 16.80, nota: '' },
      { n: '1.3', d: 'Desmontaje de carpinterías exteriores existentes, incluida retirada de premarcos.', ud: 'ud', med: 7.00, pu: 85.00, nota: '' },
      { n: '1.4', d: 'Carga, transporte y gestión de residuos de construcción en vertedero autorizado, incluido canon.', ud: 'm³', med: 18.00, pu: 62.00, nota: '' }
    ]
  },
  {
    num: 2, titulo: 'CARPINTERÍAS EXTERIORES',
    partidas: [
      { n: '2.1', d: 'Ventana de madera-aluminio certificada Passivhaus con triple vidrio bajo emisivo y cámaras con argón, Uw ≤ 0,80 W/m²K, incluida colocación sobre premarco.', ud: 'ud', med: 7.00, pu: 1980.00, nota: 'Precio por unidad tipo de 1,20 × 1,50 m. Las unidades de otra medida se valoran según la tabla del fabricante.' },
      { n: '2.2', d: 'Cinta de estanqueidad interior y exterior en el encuentro de la carpintería con el muro, según detalle de proyecto.', ud: 'ml', med: 38.40, pu: 18.60, nota: '' },
      { n: '2.3', d: 'Persiana enrollable de aluminio con cajón aislado y registrable desde el exterior.', ud: 'ud', med: 7.00, pu: 420.00, nota: '' }
    ]
  },
  {
    num: 3, titulo: 'INSTALACIONES Y VENTILACIÓN',
    partidas: [
      { n: '3.1', d: 'Unidad de ventilación mecánica con recuperación de calor certificada Passivhaus, rendimiento ≥ 75 %, incluida puesta en marcha.', ud: 'ud', med: 1.00, pu: 3850.00, nota: '' },
      { n: '3.2', d: 'Red de conductos de ventilación aislados con bocas de impulsión y extracción, incluido equilibrado de caudales.', ud: 'ml', med: 46.00, pu: 38.50, nota: '' },
      { n: '3.3', d: 'Manguito de estanqueidad para paso de conducto o tubo a través de la barrera hermética.', ud: 'ud', med: 9.00, pu: 24.00, nota: '' },
      { n: '3.4', d: 'Instalación de fontanería de agua fría y caliente en tubo multicapa para cocina y dos baños, incluidas llaves de corte.', ud: 'ud', med: 1.00, pu: 4650.00, nota: '' },
      { n: '3.5', d: 'Instalación eléctrica completa de vivienda, con cajas de mecanismos estancas en los muros de fachada.', ud: 'ud', med: 1.00, pu: 6200.00, nota: '' }
    ]
  },
  {
    num: 4, titulo: 'AISLAMIENTO, HERMETICIDAD Y TRASDOSADOS',
    partidas: [
      { n: '4.1', d: 'Aislamiento por el interior de muros de fachada con panel de fibra de madera de 60 mm.', ud: 'm²', med: 64.80, pu: 42.00, nota: '' },
      { n: '4.2', d: 'Lámina de hermeticidad con cintas y adhesivos en los encuentros con forjados y tabiques.', ud: 'm²', med: 64.80, pu: 11.40, nota: '' },
      { n: '4.3', d: 'Trasdosado autoportante de placa de yeso laminado con perfilería y cámara para instalaciones.', ud: 'm²', med: 64.80, pu: 34.50, nota: '' },
      { n: '4.4', d: 'Ensayo de estanqueidad Blower Door intermedio y final por empresa certificadora.', ud: 'ud', med: 2.00, pu: null, nota: 'Esta partida no está en vuestra base de precios. No se le pone ningún precio: queda marcada para que la decidáis vosotros.' }
    ]
  },
  {
    num: 5, titulo: 'PAVIMENTOS Y ACABADOS',
    partidas: [
      { n: '5.1', d: 'Pavimento de tarima de roble natural sobre lámina acústica, incluidos rodapiés.', ud: 'm²', med: 92.30, pu: 58.00, nota: '' },
      { n: '5.2', d: 'Alicatado de baños con baldosa de gres porcelánico, incluido material de agarre y rejuntado.', ud: 'm²', med: 38.50, pu: 46.00, nota: '' },
      { n: '5.3', d: 'Pintura plástica mate en paredes y techos, dos manos sobre imprimación.', ud: 'm²', med: 310.00, pu: 7.80, nota: '' }
    ]
  }
];

/* Mediciones que entraron al sistema (extracto del Excel del arquitecto técnico) */
const ENTRADA = [
  ['1.1', 'Demolición tabiquería', 'm²', '86,40'],
  ['2.1', 'Ventana triple vidrio', 'ud', '7,00'],
  ['2.2', 'Cinta de estanqueidad', 'ml', '38,40'],
  ['3.2', 'Conductos ventilación', 'ml', '46,00'],
  ['4.1', 'Aislamiento fibra madera', 'm²', '64,80'],
  ['4.4', 'Ensayo Blower Door', 'ud', '2,00'],
  ['5.1', 'Tarima de roble', 'm²', '92,30'],
  ['…', '19 partidas en total', '', '']
];

const eur = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: 'always' });
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let total = 0;
const capsHTML = CAPITULOS.map(cap => {
  let subtotal = 0;
  const filas = cap.partidas.map(p => {
    if (p.pu == null) return `<tr class="p-row p-marca">
        <td class="c-num">${p.n}</td>
        <td class="c-desc">${esc(p.d)}<div class="p-nota"><span>Marcada</span> ${esc(p.nota)}</div></td>
        <td class="c-ud">${p.ud}</td>
        <td class="c-num-r">${eur(p.med)}</td>
        <td class="c-num-r">a decidir</td>
        <td class="c-num-r">—</td>
        <td class="c-num-r c-imp">—</td>
      </tr>`;
    const puCoef = Math.round(p.pu * COEF * 100) / 100;
    const importe = Math.round(p.med * puCoef * 100) / 100;
    subtotal += importe;
    return `<tr class="p-row">
        <td class="c-num">${p.n}</td>
        <td class="c-desc">${esc(p.d)}${p.nota ? `<div class="p-nota"><span>Nota</span> ${esc(p.nota)}</div>` : ''}</td>
        <td class="c-ud">${p.ud}</td>
        <td class="c-num-r">${eur(p.med)}</td>
        <td class="c-num-r">${eur(p.pu)}</td>
        <td class="c-num-r">${eur(puCoef)}</td>
        <td class="c-num-r c-imp">${eur(importe)}</td>
      </tr>`;
  }).join('');
  subtotal = Math.round(subtotal * 100) / 100;
  total += subtotal;
  return `<tbody class="cap">
      <tr class="cap-head"><td colspan="7"><span class="cap-n">${cap.num}</span> ${esc(cap.titulo)}</td></tr>
      ${filas}
      <tr class="cap-sub"><td colspan="6">SUBTOTAL CAPÍTULO ${cap.num}</td><td class="c-num-r">${eur(subtotal)}</td></tr>
    </tbody>`;
}).join('');
total = Math.round(total * 100) / 100;

const resumenHTML = (() => {
  let acc = 0;
  const filas = CAPITULOS.map(cap => {
    const s = Math.round(cap.partidas.filter(p => p.pu != null).reduce((x, p) => x + Math.round(p.med * (Math.round(p.pu * COEF * 100) / 100) * 100) / 100, 0) * 100) / 100;
    acc += s;
    return `<tr><td>${cap.num} · ${esc(cap.titulo)}</td><td class="c-num-r">${eur(s)}</td></tr>`;
  }).join('');
  return filas;
})();

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Presupuesto de ejemplo — Pis Eixample</title>
<script src="../caducidad.js"></script>
</head>
<body>
<div class="wrap">

<div class="origen no-print">
  <div class="origen-t">Cómo se ha hecho</div>
  <div class="origen-g">
    <div class="origen-c">
      <div class="origen-k">1 · Entra</div>
      <p>Las mediciones tal como os llegan. Aquí, un Excel. También vale BC3 o PDF, aunque sea escaneado.</p>
      <table class="mini">
        <thead><tr><th>Nº</th><th>Partida</th><th>Ud.</th><th>Medición</th></tr></thead>
        <tbody>${ENTRADA.map(r => `<tr><td>${r[0]}</td><td>${esc(r[1])}</td><td>${r[2]}</td><td class="c-num-r">${r[3]}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="origen-c">
      <div class="origen-k">2 · Se cruza</div>
      <p>Cada partida se busca en vuestra base de precios. La que no está queda <b>marcada</b> en el documento para que le pongáis precio vosotros. No se inventa ninguno.</p>
      <p>Si trabajáis con coeficiente, se aplica el vuestro (aquí <b>${COEF.toFixed(2).replace('.', ',')}</b>), y cada partida lleva sus notas.</p>
    </div>
    <div class="origen-c">
      <div class="origen-k">3 · Sale</div>
      <p>Este documento por capítulos, con vuestro formato. Lo revisáis, decidís lo marcado y lo enviáis.</p>
      <p class="origen-time">Aquí hay <b>1 partida marcada</b>: la 4.4.</p>
    </div>
  </div>
</div>

<div class="doc">
  <div class="doc-head">
    <div>
      <div class="doc-k">Presupuesto</div>
      <h1>Reforma integral Passivhaus de vivienda</h1>
      <div class="doc-dir">C/ de l'Exemple 12, 3º 1ª · 08011 Barcelona</div>
    </div>
    <div class="doc-ref">
      <div><span>Referencia</span> P-2026-0213</div>
      <div><span>Fecha</span> 03/11/2026</div>
      <div><span>Promotor</span> Propiedad (demo)</div>
      <div><span>Validez</span> 30 días</div>
    </div>
  </div>

  <table class="tabla">
    <thead>
      <tr>
        <th class="c-num">Núm.</th><th>Descripción</th><th class="c-ud">Ud.</th>
        <th class="c-num-r">Medición</th><th class="c-num-r">P. unitario</th>
        <th class="c-num-r">P. u. × coef.</th><th class="c-num-r">Importe</th>
      </tr>
    </thead>
    ${capsHTML}
  </table>

  <div class="cierre">
    <table class="resumen">
      <tr class="resumen-h"><td colspan="2">Resumen por capítulos</td></tr>
      ${resumenHTML}
      <tr class="resumen-t"><td>Total presupuesto</td><td class="c-num-r">${eur(total)} €</td></tr>
    </table>
    <div class="cierre-nota">
      <p><b>IVA no incluido.</b> Coeficiente aplicado: ${COEF.toFixed(2).replace('.', ',')}. El total no incluye la partida marcada 4.4, pendiente de precio.</p>
      <p>El presupuesto se ha realizado teniendo en cuenta las mediciones del arquitecto técnico. En caso de modificación durante la ejecución de las obras, se facturará la diferencia.</p>
      <p>Rogamos consulten con nuestros técnicos para aclarar cualquier duda que les pueda surgir.</p>
    </div>
  </div>

  <div class="pie">Documento de demostración · obra, empresa e importes ficticios</div>
</div>

<div class="volver no-print"><a href="../">← Volver</a> · <a href="javascript:window.print()">Imprimir o guardar en PDF</a></div>
</div>

<style>
:root{--ink:#1a1a1a;--ink2:#444;--ink3:#888;--ink4:#bbb;--line:#e4e4e4;--w:#fff;--bg:#f4f2ef;--acc:#b7791f;}
*{box-sizing:border-box;}
body{margin:0;background:var(--bg);color:var(--ink);
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;font-size:14px;line-height:1.6;
  -webkit-font-smoothing:antialiased;}
.wrap{max-width:1120px;margin:0 auto;padding:28px 20px 64px;}

/* ── Cómo se ha hecho ── */
.origen{background:#232120;color:#efece7;border-radius:14px;padding:26px 28px;margin-bottom:30px;}
.origen-t{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);font-weight:700;margin-bottom:18px;}
.origen-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:26px;}
.origen-c p{margin:0 0 10px;font-size:13px;color:#c9c4bc;line-height:1.65;}
.origen-c b{color:#efece7;}
.origen-k{font-size:12px;font-weight:700;color:#efece7;margin-bottom:8px;letter-spacing:.02em;}
.origen-time{color:var(--acc)!important;}
.mini{width:100%;border-collapse:collapse;font-size:11.5px;margin-top:12px;}
.mini th{text-align:left;font-weight:600;color:#8f8a82;border-bottom:1px solid #3a3735;padding:5px 6px;font-size:10px;
  text-transform:uppercase;letter-spacing:.06em;}
.mini td{padding:4px 6px;border-bottom:1px solid #2e2b29;color:#c9c4bc;}

/* ── Documento ── */
.doc{background:var(--w);border:1px solid var(--line);border-radius:12px;overflow:hidden;}
.doc-head{display:flex;justify-content:space-between;gap:28px;flex-wrap:wrap;
  padding:30px 32px 26px;border-bottom:2px solid var(--ink);}
.doc-k{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink3);font-weight:700;}
.doc h1{margin:6px 0 4px;font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-.01em;}
.doc-dir{font-size:13.5px;color:var(--ink2);}
.doc-ref{font-size:12px;color:var(--ink2);min-width:210px;}
.doc-ref div{display:flex;justify-content:space-between;gap:14px;padding:3px 0;border-bottom:1px solid var(--line);}
.doc-ref span{color:var(--ink3);}

.tabla{width:100%;border-collapse:collapse;font-size:12.5px;}
.tabla thead th{background:#faf9f7;text-align:left;font-size:10px;letter-spacing:.07em;text-transform:uppercase;
  color:var(--ink3);font-weight:700;padding:10px 12px;border-bottom:1px solid var(--line);white-space:nowrap;}
.c-num{width:46px;color:var(--ink3);font-variant-numeric:tabular-nums;}
.c-ud{width:44px;color:var(--ink3);}
.c-num-r{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;}
.c-imp{font-weight:700;}
.cap-head td{padding:16px 12px 8px;font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;
  color:var(--ink);border-bottom:1px solid var(--ink);}
.cap-n{display:inline-block;min-width:20px;color:var(--acc);}
.p-row td{padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:top;}
.c-desc{color:var(--ink2);line-height:1.55;}
.p-nota{margin-top:6px;padding:7px 10px;background:#faf8f4;border-left:2px solid var(--acc);
  font-size:11px;color:var(--ink3);line-height:1.5;border-radius:0 4px 4px 0;}
.p-marca td{background:#fff8ec;}
.p-marca .p-nota{background:#fff1d6;}
.p-nota span{font-weight:700;color:var(--acc);text-transform:uppercase;font-size:9.5px;letter-spacing:.08em;}
.cap-sub td{padding:9px 12px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  background:#faf9f7;border-bottom:1px solid var(--line);color:var(--ink2);}
.cap-sub td:last-child{font-size:12.5px;color:var(--ink);}

.cierre{display:flex;gap:32px;flex-wrap:wrap;padding:28px 32px 32px;}
.resumen{border-collapse:collapse;font-size:12.5px;min-width:330px;flex:1;}
.resumen td{padding:8px 0;border-bottom:1px solid var(--line);color:var(--ink2);}
.resumen-h td{font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:var(--ink3);font-weight:700;
  border-bottom:1px solid var(--ink);}
.resumen-t td{font-size:16px;font-weight:800;color:var(--ink);border-bottom:none;padding-top:14px;}
.cierre-nota{flex:1;min-width:280px;font-size:11.5px;color:var(--ink3);line-height:1.6;}
.cierre-nota p{margin:0 0 8px;}
.cierre-nota b{color:var(--ink2);}
.pie{padding:14px 32px;background:#faf9f7;border-top:1px solid var(--line);
  font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink4);text-align:center;}

.volver{margin-top:22px;text-align:center;font-size:13px;color:var(--ink3);}
.volver a{color:var(--acc);text-decoration:none;font-weight:600;}
.volver a:hover{text-decoration:underline;}

@media (max-width:760px){
  .doc-head{padding:22px;}
  .doc h1{font-size:19px;}
  .tabla{font-size:11.5px;}
  .p-row td,.tabla thead th{padding:8px 7px;}
  .cierre{padding:20px 22px;}
}
@media print{
  body{background:#fff;}
  .no-print{display:none!important;}
  .wrap{max-width:none;padding:0;}
  .doc{border:none;border-radius:0;}
  .cap{break-inside:auto;}
  .p-row{break-inside:avoid;}
  .cap-head{break-after:avoid;}
  .cierre{break-inside:avoid;}
}
</style>
</body>
</html>`;

fs.mkdirSync(path.dirname(SALIDA), { recursive: true });
fs.writeFileSync(SALIDA, html, 'utf8');
console.log('Presupuesto generado:', SALIDA);
console.log('Total calculado:', eur(total), '€ (IVA no incluido) · coeficiente', COEF);
console.log('Partidas:', CAPITULOS.reduce((s, c) => s + c.partidas.length, 0), 'en', CAPITULOS.length, 'capítulos');
