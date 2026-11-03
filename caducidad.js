/* La demostración deja de mostrarse después del viernes 4 de diciembre de 2026.
   Quien llegue tarde ve una nota con a quién escribir para que se la reabran. */
(function () {
  'use strict';

  var FIN = new Date('2026-12-04T23:59:59+01:00');
  if (new Date() <= FIN) return;

  /* Se oculta la página desde el primer momento para que no asome nada. */
  var tapa = document.createElement('style');
  tapa.textContent = 'html{visibility:hidden!important}';
  (document.head || document.documentElement).appendChild(tapa);

  var AVISO =
    '<div class="cad">' +
    '<div class="cad-marca">pracmatik<span>.</span></div>' +
    '<h1>Este enlace ya no está activo.</h1>' +
    '<p>La demostración estuvo disponible hasta el <b>viernes 4 de diciembre de 2026</b>.</p>' +
    '<p>Si todavía queréis verla, escribidnos y os la reabrimos el mismo día.</p>' +
    '<p class="cad-mail"><a href="mailto:albert@pracmatik.com">albert@pracmatik.com</a></p>' +
    '</div>' +
    '<style>' +
    'html{visibility:visible!important}' +
    'body{margin:0!important;min-height:100vh;display:flex!important;align-items:center;justify-content:center;' +
    'background:#232120!important;color:#efece7;' +
    'font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;}' +
    '.cad{max-width:520px;padding:40px 28px;text-align:center;line-height:1.7;}' +
    '.cad-marca{font-size:19px;font-weight:700;letter-spacing:-.03em;margin-bottom:30px;}' +
    '.cad-marca span{color:#b7791f;}' +
    '.cad h1{font-size:27px;font-weight:700;letter-spacing:-.015em;margin:0 0 18px;line-height:1.25;}' +
    '.cad p{margin:0 0 12px;color:#c9c4bc;font-size:16px;}' +
    '.cad b{color:#efece7;}' +
    '.cad-mail{margin-top:24px!important;}' +
    '.cad-mail a{color:#b7791f;text-decoration:none;font-weight:600;font-size:17px;}' +
    '.cad-mail a:hover{text-decoration:underline;}' +
    '</style>';

  function mostrar() {
    document.title = 'Enlace caducado';
    document.body.innerHTML = AVISO;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mostrar);
  } else {
    mostrar();
  }
})();
