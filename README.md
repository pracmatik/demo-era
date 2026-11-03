# Demostración · actas y presupuestos

Página estática que enseña, sin servidor y sin datos reales, cómo queda una
dirección de obra ordenada con el sistema de Pracmatik.

Caduca el 04/12/2026 (`caducidad.js`).

## Qué hay

| Ruta | Qué es |
|---|---|
| `/` | Portada: el método en 5 pasos y los accesos |
| `/panel/` | El panel real de ACTAS Pro, sin servidor y con datos inventados |
| `/acta/` | Un acta generada por el motor real con una visita inventada |
| `/presupuesto/` | Un presupuesto con el formato del motor de presupuestos |

## Aviso importante

**Todos los datos son ficticios.** La obra (Pis Eixample, reforma Passivhaus), las personas, las
empresas industriales y los importes están inventados para esta demostración.
No procede nada de ningún cliente.

El panel no tiene conexión con ninguna base de datos: responde desde
`panel/demo-data.js`, en la memoria del navegador. No lleva ni la dirección ni
la clave de ningún servidor, y no hace una sola petición fuera de este sitio.

## Cómo se reconstruye

Los tres documentos se generan desde `_build/` (no se editan a mano):

```bash
cd _build
node generar_imagenes.js      # marcadores de fotografía del acta
node generar_acta.js          # acta, con el motor real de ACTAS Pro
node generar_panel.js         # panel, parcheando el dashboard real
node generar_presupuesto.js   # presupuesto
```

`generar_acta.js` y `generar_panel.js` leen el código real desde
`~/claude-n8n/actas-claude/`, así que solo funcionan en el equipo de Albert.
Antes de escribir el panel, el script comprueba que no quede ninguna dirección
ni clave interna en el resultado y aborta si encuentra alguna.
