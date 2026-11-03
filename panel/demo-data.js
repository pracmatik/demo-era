/* ══════════════════════════════════════════════════════════════════════
   PANEL DE DEMOSTRACIÓN — datos 100% ficticios, sin servidor

   Este fichero sustituye a la base de datos real. La aplicación es la misma
   que usa un cliente, pero aquí no hay conexión con ningún servidor: todo lo
   que se ve está inventado y vive en la memoria del navegador. Al recargar
   la página, vuelve al estado inicial.

   Ninguna obra, persona, empresa ni importe de este fichero corresponde a
   un cliente real.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const HOY = '2026-11-03';
  const EMPRESA_ID = 'e0000000-0000-4000-8000-000000000001';
  const USER_ID = 'u0000000-0000-4000-8000-000000000001';

  /* La URL del acta y del presupuesto de ejemplo, resueltas desde /panel/ */
  const BASE = location.href.replace(/\/panel\/.*$/, '/');
  const ACTA_URL = BASE + 'acta/';

  const uid = (n) => 'v' + String(n).padStart(7, '0') + '-0000-4000-8000-000000000001';

  /* ── EMPRESAS ─────────────────────────────────────────────────────── */
  const empresas = [{
    id: EMPRESA_ID, nombre: 'Estudio de ejemplo', cif: 'B00000000',
    razon_social: 'Estudio de ejemplo, S.L.P.', direccion: 'C/ de la Mostra 5',
    municipio: 'Barcelona', provincia: 'Barcelona', cp: '08007', pais: 'España',
    web: 'ejemplo.test', telefono: '900 000 000', email_contacto: 'estudio@ejemplo.test',
    responsable: 'Clara Vidal Soler', sector: 'Arquitectura Passivhaus · obra',
    created_at: '2026-05-04T09:00:00Z', notas: 'Datos de demostración.'
  }];

  /* ── CLIENTES / USUARIOS ──────────────────────────────────────────── */
  const clientes = [
    { id: 'c1', user_id: USER_ID, email: 'demo@ejemplo.test', nombre: 'Clara Vidal Soler', empresa_id: EMPRESA_ID, es_representante: true, cargo: 'Arquitecta · dirección de obra', telefono: '900 000 000', movil: '600 000 000', created_at: '2026-05-04T09:00:00Z' },
    { id: 'c2', user_id: 'u0000000-0000-4000-8000-000000000002', email: 'tecnico@ejemplo.test', nombre: 'Pere Soler Mas', empresa_id: EMPRESA_ID, es_representante: false, cargo: 'Arquitecto técnico', created_at: '2026-05-04T09:05:00Z' },
    { id: 'c3', user_id: 'u0000000-0000-4000-8000-000000000003', email: 'propiedad@ejemplo.test', nombre: 'Propiedad · Pis Eixample', empresa_id: null, es_representante: false, cargo: 'Propiedad', created_at: '2026-06-15T11:00:00Z' }
  ];

  /* ── OBRAS ────────────────────────────────────────────────────────── */
  const obras = [
    {
      id: 101, chat_id: -1001234567890, alias_obra: 'Pis Eixample',
      nombre_obra: 'Reforma integral Passivhaus de vivienda — Pis Eixample',
      direccion: "C/ de l'Exemple 12, 3º 1ª", municipio: 'Barcelona', provincia: 'Barcelona', cp: '08011',
      promotor: 'Propiedad de demostración', arquitecto: 'Clara Vidal Soler',
      num_colegiado: '00000 (demo)', colegio_profesional: 'Colegio de Arquitectos (demo)',
      email_arquitecto: 'direccion.obra@ejemplo.test', num_licencia: 'OM-2026-000000 (demo)',
      num_expediente: 'EXP-2026-0000 (demo)', dias_visita: 'Martes',
      fecha_inicio_obra: '2026-06-15', fecha_fin_prevista: '2027-01-29',
      archivada: false, empresa_id: EMPRESA_ID, drive_folder_id: '', latitud: null, longitud: null
    },
    {
      id: 102, chat_id: -1001234567891, alias_obra: 'Casa Valldoreix',
      nombre_obra: 'Casa unifamiliar de balance energético positivo — Valldoreix',
      direccion: 'C/ del Bosc 0 (demo)', municipio: 'Sant Cugat del Vallès', provincia: 'Barcelona', cp: '08197',
      promotor: 'Propiedad de demostración', arquitecto: 'Clara Vidal Soler',
      num_colegiado: '00000 (demo)', colegio_profesional: 'Colegio de Arquitectos (demo)',
      email_arquitecto: 'direccion.obra@ejemplo.test', num_licencia: 'OM-2026-000001 (demo)',
      num_expediente: 'EXP-2026-0001 (demo)', dias_visita: 'Martes',
      fecha_inicio_obra: '2026-09-07', fecha_fin_prevista: '2027-07-30',
      archivada: false, empresa_id: EMPRESA_ID, drive_folder_id: '', latitud: null, longitud: null
    },
    {
      id: 103, chat_id: -1001234567892, alias_obra: 'Àtic Gràcia',
      nombre_obra: 'Reforma de ático con altillo — Àtic Gràcia',
      direccion: 'C/ de la Prova 3, ático (demo)', municipio: 'Barcelona', provincia: 'Barcelona', cp: '08012',
      promotor: 'Propiedad de demostración', arquitecto: 'Clara Vidal Soler',
      num_colegiado: '00000 (demo)', colegio_profesional: 'Colegio de Arquitectos (demo)',
      email_arquitecto: 'direccion.obra@ejemplo.test', num_licencia: 'OM-2025-000042 (demo)',
      num_expediente: 'EXP-2025-0042 (demo)', dias_visita: 'Jueves',
      fecha_inicio_obra: '2025-11-03', fecha_fin_prevista: '2026-05-29',
      archivada: true, empresa_id: EMPRESA_ID, drive_folder_id: '', latitud: null, longitud: null
    }
  ];

  /* ── ACCESOS ──────────────────────────────────────────────────────── */
  const obra_accesos = [
    { id: 'a1', obra_id: 101, user_id: USER_ID, rol: 'arquitecto', empresa_id: EMPRESA_ID, created_at: '2026-06-15T08:00:00Z' },
    { id: 'a2', obra_id: 102, user_id: USER_ID, rol: 'arquitecto', empresa_id: EMPRESA_ID, created_at: '2026-09-07T08:00:00Z' },
    { id: 'a3', obra_id: 103, user_id: USER_ID, rol: 'arquitecto', empresa_id: EMPRESA_ID, created_at: '2025-11-03T08:00:00Z' },
    { id: 'a4', obra_id: 101, user_id: 'u0000000-0000-4000-8000-000000000003', rol: 'promotor', empresa_id: null, created_at: '2026-06-15T11:00:00Z' }
  ];

  /* ── INDUSTRIALES ─────────────────────────────────────────────────── */
  const industriales = [
    { id: 1, nombre: 'Roger Font',   especialidad: 'Carpintería exterior',       contacto: 'carpinteria@ejemplo.test',  estado: true, obra_id: '101', Empresa: 'Fusteria Exemple, S.L.' },
    { id: 2, nombre: 'Laura Serra',  especialidad: 'Ventilación y climatización', contacto: 'ventilacion@ejemplo.test',  estado: true, obra_id: '101', Empresa: 'Clima Exemple, S.L.' },
    { id: 3, nombre: 'Oriol Bas',    especialidad: 'Aislamiento y pladur',        contacto: 'aislamiento@ejemplo.test',  estado: true, obra_id: '101', Empresa: 'Aïllaments Exemple, S.L.' },
    { id: 4, nombre: 'Toni Ferrer',  especialidad: 'Fontanería',                  contacto: 'fontaneria@ejemplo.test',   estado: true, obra_id: '101', Empresa: 'Fontaneria Exemple, S.L.' },
    { id: 5, nombre: 'Mireia Coll',  especialidad: 'Electricidad',                contacto: 'electricidad@ejemplo.test', estado: true, obra_id: '101', Empresa: 'Electricitat Exemple, S.L.' },
    { id: 6, nombre: 'Marc Puig',    especialidad: 'Contratista',                 contacto: 'obra@ejemplo.test',         estado: true, obra_id: '101', Empresa: 'Reformes Exemple, S.L.' },
    { id: 7, nombre: 'Laia Ribas',   especialidad: 'Estructura de madera',        contacto: 'madera@ejemplo.test',       estado: true, obra_id: '102', Empresa: 'Fusta Exemple, S.L.' },
    { id: 8, nombre: 'Pau Estrada',  especialidad: 'Cimentación',                 contacto: 'cimentacion@ejemplo.test',  estado: true, obra_id: '102', Empresa: 'Excavacions Exemple, S.L.' }
  ];

  /* ── VISITAS ──────────────────────────────────────────────────────── */
  const visitas = [];
  /* horario de invierno (+01:00) o de verano (+02:00) según la fecha */
  const zona = (f) => (f >= '2026-03-29' && f < '2026-10-25') || (f >= '2025-03-30' && f < '2025-10-26') ? '+02:00' : '+01:00';
  function nuevaVisita(n, chat_id, nombre_obra, fecha, asistentes, horaFin) {
    const z = zona(fecha);
    visitas.push({
      visit_id: uid(n), chat_id, status: 'completada', nombre_obra,
      fecha_inicio: fecha + 'T09:30:00' + z, fecha_fin: fecha + 'T' + horaFin + ':00' + z,
      created_at: fecha + 'T09:28:00' + z, hora_inicio: '09:30', hora_fin: horaFin,
      num_visita: null, num_acta: null, pdf_url: ACTA_URL, impreso: true,
      asistentes, tiene_archivos: true, nombre_carpeta_visita: null,
      drive_folder_id_visita: '', doc_id_texto: '',
      meteo: { descripcion: 'Despejado', temperatura: 19, viento: '10 km/h' }
    });
  }

  const ASIST_101 = 'Clara Vidal Soler (dirección de obra) · Marc Puig (contratista) · Roger Font (carpintería exterior) · Laura Serra (ventilación) · Toni Ferrer (fontanería)';
  const FECHAS_101 = ['2026-06-23', '2026-07-07', '2026-07-21', '2026-08-04', '2026-08-25', '2026-09-08', '2026-09-15', '2026-09-22', '2026-09-29', '2026-10-06', '2026-10-13', '2026-10-20', '2026-10-27'];
  FECHAS_101.forEach((f, i) => nuevaVisita(i + 1, -1001234567890, obras[0].nombre_obra, f, ASIST_101, i % 3 === 0 ? '10:40' : '10:55'));

  const ASIST_102 = 'Clara Vidal Soler (dirección de obra) · Laia Ribas (estructura de madera) · Pau Estrada (cimentación)';
  const FECHAS_102 = ['2026-09-15', '2026-09-29', '2026-10-13', '2026-10-27'];
  FECHAS_102.forEach((f, i) => nuevaVisita(100 + i + 1, -1001234567891, obras[1].nombre_obra, f, ASIST_102, '12:15'));

  const ASIST_103 = 'Clara Vidal Soler (dirección de obra) · Marc Puig (contratista)';
  const FECHAS_103 = ['2025-11-13', '2025-12-04', '2026-01-15', '2026-02-05', '2026-02-26', '2026-03-19', '2026-04-16', '2026-05-07', '2026-05-28'];
  FECHAS_103.forEach((f, i) => nuevaVisita(200 + i + 1, -1001234567892, obras[2].nombre_obra, f, ASIST_103, '11:20'));

  /* Visita en curso: la arquitecta está en la obra ahora mismo enviando material */
  visitas.push({
    visit_id: uid(15), chat_id: -1001234567890, status: 'abierta', nombre_obra: obras[0].nombre_obra,
    fecha_inicio: HOY + 'T09:30:00+01:00', fecha_fin: null, created_at: HOY + 'T09:28:00+01:00',
    hora_inicio: '09:30', hora_fin: null, num_visita: null, num_acta: null,
    pdf_url: null, impreso: false, asistentes: ASIST_101, tiene_archivos: true,
    nombre_carpeta_visita: null, drive_folder_id_visita: '', doc_id_texto: '',
    meteo: { descripcion: 'Nubes altas', temperatura: 16, viento: '8 km/h' }
  });

  /* numeración correlativa por obra, de la más antigua a la más reciente */
  [[-1001234567890, 2026], [-1001234567891, 2026], [-1001234567892, 2025]].forEach(([chat, anyo]) => {
    const cerradas = visitas.filter(v => v.chat_id === chat && v.status === 'completada')
      .sort((a, b) => a.fecha_inicio.localeCompare(b.fecha_inicio));
    cerradas.forEach((v, i) => { v.num_visita = i + 1; v.num_acta = anyo + '/' + String(i + 1).padStart(3, '0'); });
    /* la visita en curso lleva número de orden, pero todavía no número de acta */
    visitas.filter(v => v.chat_id === chat && v.status !== 'completada')
      .forEach(v => { v.num_visita = cerradas.length + 1; });
  });

  /* La propiedad ha firmado las actas anteriores desde su enlace; la última está pendiente */
  visitas.filter(v => v.chat_id === -1001234567890 && v.status === 'completada' && v.num_visita < 13).forEach(v => {
    const d = new Date(v.fecha_inicio); d.setDate(d.getDate() + 2);
    v.acta_aprobada = true; v.promotor_aprobado_at = d.toISOString(); v.promotor_firma = 'Propiedad de demostración';
  });

  const V = (n) => uid(n);

  /* ── TAREAS ───────────────────────────────────────────────────────── */
  let _tid = 0;
  const T = (visitN, chat_id, descripcion, responsable, empresa, prioridad, estado, fecha_limite, created_at) => ({
    id: ++_tid, visit_id: V(visitN), chat_id, descripcion, responsable, empresa,
    prioridad, estado, cargo: null, fecha_limite, created_at,
    fecha_detectada: created_at, origen_ia: true, comentario: null,
    evidencia_cierre_url: null, completada_at: estado === 'RESUELTO' ? created_at : null,
    completada_por: estado === 'RESUELTO' ? 'Clara Vidal Soler' : null, imagenes_ids: []
  });

  const actas_tareas = [
    /* — visita 13 · 27/10 — la última, la que abre el acta de ejemplo — */
    T(13, -1001234567890, 'Colocar la cinta de estanqueidad interior en los tres huecos pendientes (dormitorio 2, cocina y baño 1) antes de cerrar trasdosados.', 'Roger Font', 'Fusteria Exemple, S.L.', 'ALTA', 'PENDIENTE', '2026-10-30', '2026-10-27T10:55:00Z'),
    T(13, -1001234567890, 'Sellar con manguitos de estanqueidad los pasos de los conductos de ventilación a través de la barrera hermética.', 'Laura Serra', 'Clima Exemple, S.L.', 'ALTA', 'PENDIENTE', '2026-10-31', '2026-10-27T10:55:00Z'),
    T(13, -1001234567890, 'Desplazar 5 cm hacia la izquierda la toma de agua del lavabo del baño 2 para que coincida con el mueble de proyecto.', 'Toni Ferrer', 'Fontaneria Exemple, S.L.', 'MEDIA', 'PENDIENTE', '2026-10-31', '2026-10-27T10:55:00Z'),
    T(13, -1001234567890, 'No cerrar los trasdosados de fachada hasta superar el test Blower Door intermedio.', 'Oriol Bas', 'Aïllaments Exemple, S.L.', 'ALTA', 'PENDIENTE', '2026-11-06', '2026-10-27T10:55:00Z'),
    T(13, -1001234567890, 'Fijar con la empresa certificadora la fecha del test Blower Door intermedio y confirmarla a la dirección de obra.', 'Marc Puig', 'Reformes Exemple, S.L.', 'ALTA', 'PENDIENTE', '2026-10-30', '2026-10-27T10:55:00Z'),
    T(13, -1001234567890, 'Aportar la ficha técnica de las cajas de mecanismos estancas previstas en los muros de fachada.', 'Mireia Coll', 'Electricitat Exemple, S.L.', 'MEDIA', 'PENDIENTE', '2026-11-03', '2026-10-27T10:55:00Z'),
    T(13, -1001234567890, 'Preparar presupuesto anexo para el cambio de pavimento del salón solicitado por la propiedad.', 'Marc Puig', 'Reformes Exemple, S.L.', 'BAJA', 'PENDIENTE', '2026-11-10', '2026-10-27T10:55:00Z'),
    T(13, -1001234567890, 'Enviar a la propiedad la actualización del plazo con las demoras imputadas hasta la fecha.', 'Clara Vidal Soler', 'Estudio de ejemplo', 'MEDIA', 'RESUELTO', '2026-10-27', '2026-10-27T11:10:00Z'),
    /* — visita 12 · 20/10 — */
    T(12, -1001234567890, 'Aportar el certificado del triple vidrio con su valor Ug de las carpinterías colocadas.', 'Roger Font', 'Fusteria Exemple, S.L.', 'MEDIA', 'RESUELTO', '2026-10-23', '2026-10-20T11:00:00Z'),
    T(12, -1001234567890, 'Entregar el esquema de conductos de ventilación con el caudal de cada estancia.', 'Laura Serra', 'Clima Exemple, S.L.', 'MEDIA', 'PENDIENTE', '2026-10-23', '2026-10-20T11:00:00Z'),
    T(12, -1001234567890, 'Retirar los recortes de placa acumulados en el salón.', 'Oriol Bas', 'Aïllaments Exemple, S.L.', 'BAJA', 'RESUELTO', '2026-10-22', '2026-10-20T11:00:00Z'),
    /* — visita 11 · 13/10 — */
    T(11, -1001234567890, 'Proteger los premarcos ya colocados antes de los trabajos de regatas.', 'Marc Puig', 'Reformes Exemple, S.L.', 'MEDIA', 'RESUELTO', '2026-10-15', '2026-10-13T11:05:00Z'),
    T(11, -1001234567890, 'Confirmar por escrito la fecha de entrega de las carpinterías de fábrica.', 'Roger Font', 'Fusteria Exemple, S.L.', 'ALTA', 'RESUELTO', '2026-10-15', '2026-10-13T11:05:00Z'),
    /* — visitas anteriores, resumidas — */
    T(10, -1001234567890, 'Replantear con la dirección de obra la posición de la unidad de ventilación en el falso techo del baño.', 'Laura Serra', 'Clima Exemple, S.L.', 'MEDIA', 'RESUELTO', '2026-10-09', '2026-10-06T10:50:00Z'),
    T(9, -1001234567890, 'Aportar la ficha técnica de la membrana de hermeticidad prevista en el encuentro de forjado.', 'Oriol Bas', 'Aïllaments Exemple, S.L.', 'MEDIA', 'RESUELTO', '2026-10-02', '2026-09-29T10:50:00Z'),
    T(7, -1001234567890, 'Rehacer el trazado de la derivación de agua caliente de la cocina según la nueva distribución.', 'Toni Ferrer', 'Fontaneria Exemple, S.L.', 'MEDIA', 'RESUELTO', '2026-09-18', '2026-09-15T10:45:00Z'),
    T(5, -1001234567890, 'Entregar la nueva distribución de cocina pedida por la propiedad, con cotas.', 'Clara Vidal Soler', 'Estudio de ejemplo', 'ALTA', 'RESUELTO', '2026-08-28', '2026-08-25T10:40:00Z'),
    T(3, -1001234567890, 'Retirar los escombros de demolición del rellano antes del viernes.', 'Marc Puig', 'Reformes Exemple, S.L.', 'MEDIA', 'RESUELTO', '2026-07-24', '2026-07-21T10:40:00Z'),
    T(1, -1001234567890, 'Aportar el acta de replanteo firmada por todas las partes.', 'Marc Puig', 'Reformes Exemple, S.L.', 'ALTA', 'RESUELTO', '2026-06-26', '2026-06-23T10:40:00Z'),
    /* — obra 102 — */
    T(104, -1001234567891, 'Aportar el detalle del encuentro entre la solera y el muro de madera para evitar el puente térmico.', 'Laia Ribas', 'Fusta Exemple, S.L.', 'ALTA', 'PENDIENTE', '2026-11-06', '2026-10-27T12:10:00Z'),
    T(104, -1001234567891, 'Presentar el plan de acopio y protección de los paneles de madera frente a la lluvia.', 'Laia Ribas', 'Fusta Exemple, S.L.', 'MEDIA', 'PENDIENTE', '2026-11-04', '2026-10-27T12:10:00Z'),
    T(103, -1001234567891, 'Entregar el resultado del ensayo de compactación del relleno bajo solera.', 'Pau Estrada', 'Excavacions Exemple, S.L.', 'ALTA', 'RESUELTO', '2026-10-20', '2026-10-13T12:10:00Z'),
    /* — obra 103 (terminada) — */
    T(209, -1001234567892, 'Entregar la documentación final de obra y el certificado de fin de obra.', 'Marc Puig', 'Reformes Exemple, S.L.', 'ALTA', 'RESUELTO', '2026-06-04', '2026-05-28T11:15:00Z'),
    T(208, -1001234567892, 'Repasar las juntas de la escalera del altillo antes de la recepción.', 'Marc Puig', 'Reformes Exemple, S.L.', 'MEDIA', 'RESUELTO', '2026-05-14', '2026-05-07T11:15:00Z')
  ];

  /* ── BITÁCORA (lo que la arquitecta envía por Telegram durante la visita) ── */
  const actas_bitacora = [
    { id: 1, visit_id: V(13), orden: 1, tipo: 'audio', timestamp: '2026-10-27T08:34:00Z', strict_timestamp: '2026-10-27T08:34:00Z', transcripcion: 'Empezamos. Las ventanas de la fachada principal ya están todas puestas. El certificado del vidrio lo trajeron el jueves, eso está cerrado. Pero en tres huecos falta la cinta de estanqueidad por dentro: dormitorio dos, cocina y baño uno.', descripcion_ia: 'Carpinterías de fachada principal colocadas. Falta la cinta de estanqueidad interior en tres huecos.', industrial: 'Roger Font', contenido: null, telegram_caption: null, ref_imagen: null, drive_url: null, message_id: '1001', audio_match: 1 },
    { id: 2, visit_id: V(13), orden: 2, tipo: 'foto', timestamp: '2026-10-27T08:36:00Z', strict_timestamp: '2026-10-27T08:36:00Z', transcripcion: null, descripcion_ia: 'Ventana de triple vidrio del dormitorio 2 sin la cinta de estanqueidad interior en el encuentro con el muro.', industrial: 'Roger Font', contenido: null, telegram_caption: 'ventana dormitorio 2', ref_imagen: 'IMG_0231', drive_url: BASE + 'acta/img/foto-02.svg', message_id: '1002', audio_match: 1 },
    { id: 3, visit_id: V(13), orden: 3, tipo: 'audio', timestamp: '2026-10-27T08:52:00Z', strict_timestamp: '2026-10-27T08:52:00Z', transcripcion: 'Los conductos de la ventilación atraviesan la barrera hermética sin sellar. Que pongan los manguitos antes de que se cierre nada, si no el blower door no pasa.', descripcion_ia: 'Pasos de conductos de ventilación a través de la barrera hermética sin sellar. Se piden manguitos de estanqueidad.', industrial: 'Laura Serra', contenido: null, telegram_caption: null, ref_imagen: null, drive_url: null, message_id: '1003', audio_match: 1 },
    { id: 4, visit_id: V(13), orden: 4, tipo: 'foto', timestamp: '2026-10-27T08:53:00Z', strict_timestamp: '2026-10-27T08:53:00Z', transcripcion: null, descripcion_ia: 'Conducto de ventilación atravesando la barrera hermética sin manguito de estanqueidad.', industrial: 'Laura Serra', contenido: null, telegram_caption: 'paso conducto sin sellar', ref_imagen: 'IMG_0232', drive_url: BASE + 'acta/img/foto-03.svg', message_id: '1004', audio_match: 1 },
    { id: 5, visit_id: V(13), orden: 5, tipo: 'audio', timestamp: '2026-10-27T09:08:00Z', strict_timestamp: '2026-10-27T09:08:00Z', transcripcion: 'En el baño dos la toma del lavabo no cuadra con el mueble. Hay que moverla cinco centímetros a la izquierda. Toni, para el viernes.', descripcion_ia: 'Toma de agua del lavabo del baño 2 desplazada respecto al mueble de proyecto. Se pide moverla 5 cm a la izquierda.', industrial: 'Toni Ferrer', contenido: null, telegram_caption: null, ref_imagen: null, drive_url: null, message_id: '1005', audio_match: 1 },
    { id: 6, visit_id: V(13), orden: 6, tipo: 'foto', timestamp: '2026-10-27T09:09:00Z', strict_timestamp: '2026-10-27T09:09:00Z', transcripcion: null, descripcion_ia: 'Toma de agua del lavabo del baño 2, con la posición del mueble marcada en la pared.', industrial: 'Toni Ferrer', contenido: null, telegram_caption: 'toma lavabo baño 2', ref_imagen: 'IMG_0233', drive_url: BASE + 'acta/img/foto-05.svg', message_id: '1006', audio_match: 1 },
    { id: 7, visit_id: V(13), orden: 7, tipo: 'audio', timestamp: '2026-10-27T09:26:00Z', strict_timestamp: '2026-10-27T09:26:00Z', transcripcion: 'Que nadie cierre los trasdosados de fachada hasta hacer el blower door intermedio. Marc, que me confirme la fecha con la certificadora esta semana.', descripcion_ia: 'Se prohíbe cerrar trasdosados de fachada antes del test Blower Door intermedio. El contratista debe confirmar la fecha.', industrial: 'Oriol Bas', contenido: null, telegram_caption: null, ref_imagen: null, drive_url: null, message_id: '1007', audio_match: 1 },
    { id: 8, visit_id: V(13), orden: 8, tipo: 'foto', timestamp: '2026-10-27T09:27:00Z', strict_timestamp: '2026-10-27T09:27:00Z', transcripcion: null, descripcion_ia: 'Muro de fachada con el aislamiento colocado y el trasdosado todavía abierto.', industrial: 'Oriol Bas', contenido: null, telegram_caption: 'trasdosado abierto', ref_imagen: 'IMG_0234', drive_url: BASE + 'acta/img/foto-06.svg', message_id: '1008', audio_match: 1 },
    { id: 9, visit_id: V(13), orden: 9, tipo: 'texto', timestamp: '2026-10-27T09:50:00Z', strict_timestamp: '2026-10-27T09:50:00Z', transcripcion: null, descripcion_ia: null, industrial: null, contenido: 'La propiedad pregunta por cambiar el pavimento del salón. No entra en contrato: presupuesto anexo. Próxima visita el martes 3 a las 9:30.', telegram_caption: null, ref_imagen: null, drive_url: null, message_id: '1009', audio_match: 0 },
    { id: 10, visit_id: V(12), orden: 1, tipo: 'audio', timestamp: '2026-10-20T08:35:00Z', strict_timestamp: '2026-10-20T08:35:00Z', transcripcion: 'Que el carpintero traiga el certificado del triple vidrio con el valor Ug, lo necesitamos para el expediente.', descripcion_ia: 'Se solicita el certificado del triple vidrio con su valor Ug.', industrial: 'Roger Font', contenido: null, telegram_caption: null, ref_imagen: null, drive_url: null, message_id: '901', audio_match: 1 },
    { id: 11, visit_id: V(12), orden: 2, tipo: 'audio', timestamp: '2026-10-20T08:58:00Z', strict_timestamp: '2026-10-20T08:58:00Z', transcripcion: 'Laura, necesito el esquema de conductos con el caudal de cada habitación antes de la próxima visita.', descripcion_ia: 'Se solicita el esquema de conductos de ventilación con caudales por estancia.', industrial: 'Laura Serra', contenido: null, telegram_caption: null, ref_imagen: null, drive_url: null, message_id: '902', audio_match: 1 },
    /* — visita en curso: material que está entrando ahora mismo — */
    { id: 12, visit_id: V(15), orden: 1, tipo: 'audio', timestamp: HOY + 'T08:33:00Z', strict_timestamp: HOY + 'T08:33:00Z', transcripcion: 'La cinta de estanqueidad ya está en los tres huecos. Eso lo doy por cerrado.', descripcion_ia: 'Cinta de estanqueidad colocada en los tres huecos pendientes. Tarea cerrada.', industrial: 'Roger Font', contenido: null, telegram_caption: null, ref_imagen: null, drive_url: null, message_id: '1101', audio_match: 1 },
    { id: 13, visit_id: V(15), orden: 2, tipo: 'audio', timestamp: HOY + 'T08:41:00Z', strict_timestamp: HOY + 'T08:41:00Z', transcripcion: 'Los pasos de conductos siguen sin sellar, segunda visita con lo mismo. Imputo demora a ventilación.', descripcion_ia: 'Pasos de conductos sin sellar por segunda visita. Se imputa demora al industrial de ventilación.', industrial: 'Laura Serra', contenido: null, telegram_caption: null, ref_imagen: null, drive_url: null, message_id: '1102', audio_match: 1 },
    { id: 14, visit_id: V(15), orden: 3, tipo: 'foto', timestamp: HOY + 'T08:42:00Z', strict_timestamp: HOY + 'T08:42:00Z', transcripcion: null, descripcion_ia: 'Conducto de ventilación: el paso por la barrera hermética sigue sin manguito.', industrial: 'Laura Serra', contenido: null, telegram_caption: 'conducto, sigue igual', ref_imagen: 'IMG_0240', drive_url: BASE + 'acta/img/foto-03.svg', message_id: '1103', audio_match: 1 }
  ];

  /* ── HITOS ────────────────────────────────────────────────────────── */
  const obra_milestones = [
    { id: 1, obra_id: 101, titulo: 'Demoliciones y desescombro', fecha_prevista: '2026-07-24', completado: true, orden: 1 },
    { id: 2, obra_id: 101, titulo: 'Instalaciones empotradas', fecha_prevista: '2026-10-02', completado: true, orden: 2 },
    { id: 3, obra_id: 101, titulo: 'Carpinterías exteriores de triple vidrio', fecha_prevista: '2026-10-23', completado: false, orden: 3 },
    { id: 4, obra_id: 101, titulo: 'Hermeticidad y test Blower Door intermedio', fecha_prevista: '2026-11-13', completado: false, orden: 4 },
    { id: 5, obra_id: 101, titulo: 'Trasdosados, pavimentos y acabados', fecha_prevista: '2026-12-18', completado: false, orden: 5 },
    { id: 6, obra_id: 101, titulo: 'Test Blower Door final y entrega', fecha_prevista: '2027-01-29', completado: false, orden: 6 },
    { id: 7, obra_id: 102, titulo: 'Movimiento de tierras y cimentación', fecha_prevista: '2026-10-30', completado: true, orden: 1 },
    { id: 8, obra_id: 102, titulo: 'Montaje de estructura de madera', fecha_prevista: '2026-12-11', completado: false, orden: 2 },
    { id: 9, obra_id: 102, titulo: 'Envolvente y cubierta', fecha_prevista: '2027-02-26', completado: false, orden: 3 }
  ];

  /* ── PRESUPUESTO POR CAPÍTULOS ────────────────────────────────────── */
  const obra_presupuesto = [
    { id: 1, obra_id: 101, capitulo: '01 · Demoliciones', importe_estimado: 9850, importe_real: 10120, notas: 'Aparece un falso techo no previsto en el pasillo.' },
    { id: 2, obra_id: 101, capitulo: '02 · Carpinterías exteriores', importe_estimado: 38400, importe_real: 38400, notas: 'Triple vidrio, según contrato.' },
    { id: 3, obra_id: 101, capitulo: '03 · Instalaciones y ventilación', importe_estimado: 27600, importe_real: 28950, notas: 'Rehecha la derivación de cocina por el cambio de distribución.' },
    { id: 4, obra_id: 101, capitulo: '04 · Aislamiento, hermeticidad y trasdosados', importe_estimado: 22300, importe_real: null, notas: 'En ejecución.' },
    { id: 5, obra_id: 101, capitulo: '05 · Pavimentos y acabados', importe_estimado: 31900, importe_real: null, notas: 'Cambio de pavimento del salón pendiente de presupuesto anexo.' },
    { id: 6, obra_id: 102, capitulo: '01 · Cimentación', importe_estimado: 41200, importe_real: 40350, notas: 'Terminado.' },
    { id: 7, obra_id: 102, capitulo: '02 · Estructura de madera', importe_estimado: 96500, importe_real: null, notas: 'Paneles en fabricación.' }
  ];

  /* ── DIARIO DE OBRA ───────────────────────────────────────────────── */
  const obra_diario = [
    { id: 1, obra_id: 101, fecha: '2026-10-27', autor: 'Clara Vidal Soler', contenido: 'Visita 13. Carpinterías de fachada colocadas. Faltan la cinta de estanqueidad en tres huecos y el sellado de los pasos de ventilación. No se cierran trasdosados hasta el test Blower Door intermedio.' },
    { id: 2, obra_id: 101, fecha: '2026-10-23', autor: 'Pere Soler Mas', contenido: 'Recibido el certificado del triple vidrio. Valor Ug conforme al proyecto.' },
    { id: 3, obra_id: 101, fecha: '2026-09-15', autor: 'Clara Vidal Soler', contenido: 'Se rehace la derivación de agua de la cocina por la nueva distribución pedida por la propiedad en agosto.' },
    { id: 4, obra_id: 101, fecha: '2026-08-25', autor: 'Clara Vidal Soler', contenido: 'La propiedad pide cambiar la distribución de la cocina. Se entrega plano nuevo y se imputa la demora a la propiedad.' },
    { id: 5, obra_id: 101, fecha: '2026-06-23', autor: 'Clara Vidal Soler', contenido: 'Acta de replanteo firmada por todas las partes. Inicio efectivo de las demoliciones.' }
  ];

  /* ── DEMORAS IMPUTADAS ────────────────────────────────────────────── */
  const obra_demoras = [
    { id: 1, obra_id: 101, dias: 8, categoria: 'licencias', responsable: 'Ayuntamiento', fecha: '2026-06-23', justificacion: 'La licencia de obras llegó ocho días laborables más tarde de lo previsto. Las demoliciones no pudieron empezar en la fecha del contrato.', created_by: 'Clara Vidal Soler', created_at: '2026-06-23T11:00:00Z' },
    { id: 2, obra_id: 101, dias: 6, categoria: 'promotor', responsable: 'Propiedad de demostración', fecha: '2026-08-25', justificacion: 'La propiedad pidió cambiar la distribución de la cocina con las instalaciones ya trazadas. Hubo que rehacer plano y derivaciones.', created_by: 'Clara Vidal Soler', created_at: '2026-08-25T11:00:00Z' },
    { id: 3, obra_id: 101, dias: 7, categoria: 'industrial', responsable: 'Oriol Bas · Aïllaments Exemple, S.L.', fecha: '2026-09-22', justificacion: 'El industrial de aislamiento y pladur entró tres semanas más tarde de lo acordado. Afecta a siete días del camino crítico.', created_by: 'Clara Vidal Soler', created_at: '2026-09-22T11:10:00Z' },
    { id: 4, obra_id: 101, dias: 4, categoria: 'suministro', responsable: 'Fusteria Exemple, S.L.', fecha: '2026-10-13', justificacion: 'Las carpinterías de triple vidrio salieron de fábrica cuatro días más tarde de la fecha confirmada.', created_by: 'Clara Vidal Soler', created_at: '2026-10-13T11:00:00Z' },
    { id: 5, obra_id: 101, dias: 2, categoria: 'industrial', responsable: 'Laura Serra · Clima Exemple, S.L.', fecha: '2026-10-27', justificacion: 'Pasos de conductos de ventilación sin sellar. Bloquea el test Blower Door intermedio.', created_by: 'Clara Vidal Soler', created_at: '2026-10-27T11:00:00Z' },
    { id: 6, obra_id: 102, dias: 3, categoria: 'clima', responsable: null, fecha: '2026-10-13', justificacion: 'Tres jornadas de lluvia sin poder hormigonar la solera.', created_by: 'Clara Vidal Soler', created_at: '2026-10-13T12:20:00Z' }
  ];

  /* ── COLA DE PROCESO (lo que el sistema ha digerido) ──────────────── */
  const actas_queue = [
    { id: 1, visit_id: V(13), chat_id: -1001234567890, tipo_archivo: 'audio', status: 'DONE', attempts: 1, created_at: '2026-10-27T08:34:10Z', processing_started_at: '2026-10-27T08:34:12Z', nombre_archivo: 'audio_0231.ogg' },
    { id: 2, visit_id: V(13), chat_id: -1001234567890, tipo_archivo: 'foto', status: 'DONE', attempts: 1, created_at: '2026-10-27T08:36:22Z', processing_started_at: '2026-10-27T08:36:24Z', nombre_archivo: 'IMG_0231.jpg' },
    { id: 3, visit_id: V(13), chat_id: -1001234567890, tipo_archivo: 'audio', status: 'DONE', attempts: 1, created_at: '2026-10-27T08:52:03Z', processing_started_at: '2026-10-27T08:52:05Z', nombre_archivo: 'audio_0232.ogg' },
    { id: 4, visit_id: V(13), chat_id: -1001234567890, tipo_archivo: 'foto', status: 'DONE', attempts: 2, created_at: '2026-10-27T08:53:41Z', processing_started_at: '2026-10-27T08:53:58Z', nombre_archivo: 'IMG_0232.jpg' },
    { id: 5, visit_id: V(13), chat_id: -1001234567890, tipo_archivo: 'audio', status: 'DONE', attempts: 1, created_at: '2026-10-27T09:08:19Z', processing_started_at: '2026-10-27T09:08:21Z', nombre_archivo: 'audio_0233.ogg' },
    { id: 6, visit_id: V(13), chat_id: -1001234567890, tipo_archivo: 'foto', status: 'DONE', attempts: 1, created_at: '2026-10-27T09:09:02Z', processing_started_at: '2026-10-27T09:09:04Z', nombre_archivo: 'IMG_0233.jpg' },
    { id: 7, visit_id: V(104), chat_id: -1001234567891, tipo_archivo: 'foto', status: 'DONE', attempts: 1, created_at: '2026-10-27T11:42:00Z', processing_started_at: '2026-10-27T11:42:03Z', nombre_archivo: 'IMG_0410.jpg' }
  ];

  /* ══════════════════════════════════════════════════════════════════
     BASE DE DATOS EN MEMORIA + EMULADOR DE LA API
     ══════════════════════════════════════════════════════════════════ */
  const DB = {
    obras, visitas, actas_tareas, actas_bitacora, actas_queue,
    clientes, empresas, industriales, obra_accesos,
    obra_milestones, obra_presupuesto, obra_diario, obra_demoras
  };

  const SEQ = {};
  function siguienteId(tabla) {
    if (SEQ[tabla] == null) {
      SEQ[tabla] = DB[tabla].reduce((m, r) => Math.max(m, Number(r.id) || 0), 0);
    }
    return ++SEQ[tabla];
  }

  /* Traduce un filtro PostgREST (eq.5, in.(a,b), not.is.null…) a una prueba */
  function pasaFiltro(valor, expr) {
    if (expr.startsWith('eq.')) return String(valor) === expr.slice(3);
    if (expr.startsWith('neq.')) return String(valor) !== expr.slice(4);
    if (expr.startsWith('gte.')) return valor >= expr.slice(4);
    if (expr.startsWith('lte.')) return valor <= expr.slice(4);
    if (expr.startsWith('gt.')) return valor > expr.slice(3);
    if (expr.startsWith('lt.')) return valor < expr.slice(3);
    if (expr === 'is.null') return valor == null;
    if (expr === 'not.is.null') return valor != null;
    if (expr.startsWith('in.(')) {
      const lista = expr.slice(4, -1).split(',').map(s => s.replace(/^"|"$/g, ''));
      return lista.includes(String(valor));
    }
    if (expr.startsWith('ilike.')) {
      const patron = expr.slice(6).replace(/\*/g, '');
      return String(valor || '').toLowerCase().includes(patron.toLowerCase());
    }
    return true;
  }

  function ordenar(filas, orderExpr) {
    if (!orderExpr) return filas;
    const claves = orderExpr.split(',').reduce((acc, parte) => {
      const t = parte.split('.');
      if (t.length && (t[t.length - 1] === 'nullslast' || t[t.length - 1] === 'nullsfirst')) t.pop();
      if (t[0]) acc.push({ col: t[0], desc: t[1] === 'desc' });
      return acc;
    }, []);
    return filas.slice().sort((a, b) => {
      for (const k of claves) {
        const va = a[k.col], vb = b[k.col];
        if (va == null && vb == null) continue;
        if (va == null) return 1;
        if (vb == null) return -1;
        if (va < vb) return k.desc ? 1 : -1;
        if (va > vb) return k.desc ? -1 : 1;
      }
      return 0;
    });
  }

  const RESERVADOS = new Set(['select', 'order', 'limit', 'offset', 'or', 'and', 'columns', 'on_conflict']);

  function consultar(tabla, params) {
    let filas = (DB[tabla] || []).slice();
    params.forEach((valor, clave) => {
      if (RESERVADOS.has(clave)) return;
      filas = filas.filter(f => pasaFiltro(f[clave], valor));
    });
    /* búsqueda libre: or=(campo.ilike.*texto*,otro.ilike.*texto*) */
    const or = params.get('or');
    if (or) {
      const trozos = or.replace(/^\(|\)$/g, '').split(/,(?=[a-z_]+\.)/);
      filas = filas.filter(f => trozos.some(t => {
        const i = t.indexOf('.');
        return pasaFiltro(f[t.slice(0, i)], t.slice(i + 1));
      }));
    }
    filas = ordenar(filas, params.get('order'));
    const limite = parseInt(params.get('limit'), 10);
    if (limite > 0) filas = filas.slice(0, limite);
    return filas;
  }

  window.DEMO_DB = DB;

  window.DEMO_API = async function (ruta, opciones) {
    opciones = opciones || {};
    const metodo = (opciones.method || 'GET').toUpperCase();
    await new Promise(r => setTimeout(r, 90)); /* latencia realista */

    /* Enlaces firmados de almacenamiento → el acta de ejemplo */
    if (ruta.indexOf('/storage/v1/object/sign') === 0) {
      if (metodo === 'POST') {
        const cuerpo = JSON.parse(opciones.body || '{}');
        return (cuerpo.paths || []).map(p => ({ path: p, signedURL: ACTA_URL }));
      }
      return { signedURL: ACTA_URL };
    }
    if (ruta.indexOf('/functions/v1/') === 0 || ruta.indexOf('/rest/v1/rpc/') === 0) {
      throw new Error('Esta acción está desactivada en la demostración.');
    }

    const m = ruta.match(/^\/rest\/v1\/([a-z_]+)(\?(.*))?$/);
    if (!m) return null;
    const tabla = m[1];
    const params = new URLSearchParams(m[3] || '');
    if (!DB[tabla]) return [];

    if (metodo === 'GET') return consultar(tabla, params);

    if (metodo === 'POST') {
      const cuerpo = JSON.parse(opciones.body || '{}');
      const nuevas = (Array.isArray(cuerpo) ? cuerpo : [cuerpo]).map(r => {
        const fila = Object.assign({ id: siguienteId(tabla), created_at: new Date().toISOString() }, r);
        DB[tabla].push(fila);
        return fila;
      });
      return nuevas;
    }

    if (metodo === 'PATCH') {
      const cambios = JSON.parse(opciones.body || '{}');
      const afectadas = consultar(tabla, params);
      afectadas.forEach(f => Object.assign(f, cambios));
      return afectadas;
    }

    if (metodo === 'DELETE') {
      const afectadas = consultar(tabla, params);
      DB[tabla] = DB[tabla].filter(f => afectadas.indexOf(f) === -1);
      return null;
    }
    return null;
  };

  /* Sesión simulada: el panel arranca ya dentro, sin pedir contraseña */
  window.DEMO_SESION = {
    access_token: 'demo',
    user: {
      id: USER_ID, email: 'demo@ejemplo.test',
      app_metadata: { role: 'admin' },
      user_metadata: { role: 'admin', nombre: 'Clara Vidal Soler' }
    }
  };
})();
