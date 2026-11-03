/* Construye panel/index.html a partir del panel REAL de ACTAS Pro.
   Deja la aplicación intacta y le quita el servidor: sin Supabase, sin claves,
   sin login y sin una sola llamada de red a nada del cliente. */
const fs = require('fs');
const path = require('path');
const os = require('os');

const ORIGEN = path.join(os.homedir(), 'claude-n8n/actas-claude/dashboard/index.html');
const DESTINO = path.join(__dirname, '..', 'panel', 'index.html');

let html = fs.readFileSync(ORIGEN, 'utf8');
const cambios = [];

/* Lo que NO puede quedar en el resultado. Se saca del propio original, de modo
   que este script nunca escribe una dirección ni una clave interna. */
const SECRETOS = [...new Set([
  ...(html.match(/https?:\/\/[a-z0-9.-]+\.(?:supabase\.co|easypanel\.host|pracmatik\.com|jsdelivr\.net)/g) || []),
  ...(html.match(/sb_publishable_[A-Za-z0-9_-]+/g) || [])
])];

/* Los números de grupo de Telegram del panel real (aunque vayan de ejemplo en un formulario)
   son de obras de clientes: se cambian todos por uno inventado y se vuelve a mirar al final. */
const CHAT_DEMO = '-1001234567890';
const CHATS_REALES = [...new Set(html.match(/-100\d{10}/g) || [])].filter(c => c !== CHAT_DEMO);
CHATS_REALES.forEach(c => { html = html.split(c).join(CHAT_DEMO); });

function sustituir(nombre, busca, pon) {
  const antes = html;
  html = html.replace(busca, pon);
  if (html === antes) throw new Error('NO aplicado: ' + nombre);
  cambios.push(nombre);
}

/* 1 · Política de contenido: solo local, sin dominios del cliente */
sustituir('CSP',
  /<meta http-equiv="Content-Security-Policy"[^>]*>/,
  `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; media-src 'self' blob:; frame-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';">`);

/* 2 · Fuera el cliente de Supabase, dentro los datos de demostración y la caducidad */
sustituir('librería Supabase → datos demo',
  '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>',
  '<script src="../caducidad.js"></script>\n<script src="demo-data.js"></script>');

/* 3 · Configuración: ni URL ni clave reales; sesión simulada */
sustituir('config + cliente auth',
  /\/\* ── CONFIG[\s\S]*?const _sb\s*=\s*supabase\.createClient\(SUPABASE_URL, ANON_KEY\);/,
  `/* ── CONFIG (DEMOSTRACIÓN: sin servidor, sin claves) ── */
const SUPABASE_URL    = '';
const ANON_KEY        = '';
const WF002_WEBHOOK   = '';
const _sb = {
  auth: {
    getSession:        async () => ({ data: { session: window.DEMO_SESION } }),
    refreshSession:    async () => ({ data: { session: window.DEMO_SESION } }),
    signInWithPassword:async () => ({ data: { session: window.DEMO_SESION, user: window.DEMO_SESION.user } }),
    signOut:           async () => ({ error: null }),
    updateUser:        async () => ({ data: {}, error: { message: 'Desactivado en la demostración.' } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe(){} } } })
  },
  channel: () => ({ on(){ return this; }, subscribe(){ return this; } }),
  removeChannel: () => {}
};`);

/* 4 · La API deja de salir a la red: responde la base de datos en memoria */
sustituir('api() → DEMO_API',
  /\/\* ── API ── \*\/\s*async function api\(path, opts=\{\}\) \{[\s\S]*?\n\}\n/,
  `/* ── API (DEMOSTRACIÓN: responde datos ficticios en memoria) ── */
async function api(path, opts={}) {
  return window.DEMO_API(path, opts);
}
`);

/* 5 · Arranque directo, sin pantalla de contraseña */
sustituir('arranque sin login',
  /\(async function\(\)\{\s*applyStoredTheme\(\);[\s\S]*?showLogin\(\);\s*\}\s*\}\)\(\);/,
  `(async function(){
  applyStoredTheme();
  const session = window.DEMO_SESION;
  currentToken = session.access_token;
  currentUser  = session.user;
  isAdmin      = true;
  bootApp();
})();`);

/* 6 · Las miniaturas salen de los ficheros de la propia demo */
sustituir('miniaturas sin proxy',
  /if\(fid\) return '[^']*drive-image[^']*' \+ fid;.*/,
  "if(fid) return '';                                            // demo: sin proxy de Drive");

/* 7 · Nada de webhooks externos (las URL internas ni se copian aquí) */
sustituir('alta de obra desactivada',
  /const res = await fetch\('https?:\/\/[^']*crear-obra-web'/,
  "throw new Error('Esta acción está desactivada en la demostración.'); const res = await fetch(''");
sustituir('regenerar acta desactivado',
  /const RERENDER_URL = '[^']*';/,
  "const RERENDER_URL = '';");

/* 8 · Aviso permanente de que esto es una demostración */
sustituir('distintivo de demo', '</body>', `<div id="demo-badge">
  <span class="demo-dot"></span>
  <span>Demostración · datos ficticios</span>
  <a href="../">Volver</a>
</div>
<style>
#demo-badge{position:fixed;right:16px;bottom:16px;z-index:99999;display:flex;align-items:center;gap:10px;
  padding:9px 14px;border-radius:999px;background:#1c1b1a;color:#f2efea;font-size:12px;font-weight:600;
  font-family:system-ui,-apple-system,'Segoe UI',sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.22);}
#demo-badge .demo-dot{width:7px;height:7px;border-radius:50%;background:#f0b429;flex-shrink:0;}
#demo-badge a{color:#f0b429;text-decoration:none;border-left:1px solid rgba(255,255,255,.22);padding-left:10px;}
#demo-badge a:hover{text-decoration:underline;}
@media (max-width:640px){#demo-badge{right:10px;bottom:10px;font-size:11px;padding:7px 11px;}}
</style>
</body>`);

/* ── Comprobación final: que no quede nada real en el resultado ── */
const restos = SECRETOS.filter(p => html.includes(p));
if (restos.length) throw new Error('Quedan ' + restos.length + ' referencias internas en el panel. Abortado.');
const chatsRestantes = (html.match(/-100\d{10}/g) || []).filter(c => c !== CHAT_DEMO);
if (chatsRestantes.length) throw new Error('Quedan ' + chatsRestantes.length + ' grupos de Telegram reales en el panel. Abortado.');

fs.writeFileSync(DESTINO, html, 'utf8');
console.log('Panel generado:', DESTINO, '·', Math.round(html.length / 1024) + ' KB');
console.log('Cambios aplicados:', cambios.length);
cambios.forEach(c => console.log('  ·', c));
console.log('Direcciones y claves internas eliminadas: ' + SECRETOS.length + '/' + SECRETOS.length);
console.log('Grupos de Telegram reales sustituidos: ' + CHATS_REALES.length);
